"use client";

import { Avatar, Card, CardContent, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import styles from "./page.module.css";
import {
  collectionStatusAtom,
  userAvatarUrlAtom,
  userEmailAtom,
  userFriendsAtom,
  userGamesAtom,
  userNameAtom,
  userWishlistAtom,
} from "@/app/store";
import GameListHome from "@/components/game-list-home";
import PartyButton from "@/components/party-button";
import UserList from "@/components/user-list";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [mobileTab, setMobileTab] = useState(0);
  const userAvatarUrl = useAtomValue(userAvatarUrlAtom);
  const name = useAtomValue(userNameAtom);
  const email = useAtomValue(userEmailAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const games = useAtomValue(userGamesAtom);
  const wishlist = useAtomValue(userWishlistAtom);
  const friends = useAtomValue(userFriendsAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayName = isClient ? name || "Profile" : "Profile";
  const avatarUrl = isClient && userAvatarUrl
    ? userAvatarUrl
    : "https://ui-avatars.com/api/?name=Profile&background=2563eb&color=ffffff&size=128";

  const handleMobileTabChange = (_: SyntheticEvent, newValue: number) => {
    setMobileTab(newValue);
  };

  const profileCard = (
    <Card className={styles.profile}>
      <CardContent>
        <div>
          <div className={styles.picture}>
            <Avatar src={avatarUrl} />
          </div>
          <div>
            <h2 className={styles.username}>{displayName}</h2>
            <p className={styles.email}>
              {isClient ? email || "No email available" : "No email available"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const friendsPanel = (
    <Card className={styles.friends}>
      <CardContent>
        <h2 className={styles.sectionTitle}>Friends</h2>
        {collectionStatus === "loading" ? (
          <p>Loading friends...</p>
        ) : collectionStatus === "error" ? (
          <p>Unable to load friends</p>
        ) : friends.length > 0 ? (
          <div>
            <UserList users={friends} />
          </div>
        ) : (
          <p>No friends found</p>
        )}
      </CardContent>
    </Card>
  );

  const collectionPanel = (
    <Card className={styles.collection}>
      <CardContent>
        <h2 className={styles.sectionTitle}>Owned</h2>
        {collectionStatus === "loading" ? (
          <p>Loading games...</p>
        ) : collectionStatus === "error" ? (
          <p>Unable to load games</p>
        ) : games.length > 0 ? (
          <GameListHome games={games} />
        ) : (
          <p>No games found</p>
        )}
      </CardContent>
    </Card>
  );

  const wishlistPanel = (
    <Card className={styles.wishlist}>
      <CardContent>
        <h2 className={styles.sectionTitle}>Wishlist</h2>
        {collectionStatus === "loading" ? (
          <p>Loading wishlist...</p>
        ) : collectionStatus === "error" ? (
          <p>Unable to load wishlist</p>
        ) : wishlist.length > 0 ? (
          <GameListHome games={wishlist} />
        ) : (
          <p>Your wishlist is empty!</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={styles.layout} data-tab={mobileTab}>
      <div className={styles.left}>
        {profileCard}
        {friendsPanel}
        <Card
          className={styles.party}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            borderColor: "transparent",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <PartyButton />
        </Card>
      </div>
      <div className={styles.right}>
        <Tabs
          className={styles.tabs}
          value={mobileTab}
          onChange={handleMobileTabChange}
          variant="fullWidth"
        >
          <Tab label="Collection" />
          <Tab label="Friends" />
        </Tabs>
        {collectionPanel}
        {wishlistPanel}
      </div>
    </div>
  );
}
