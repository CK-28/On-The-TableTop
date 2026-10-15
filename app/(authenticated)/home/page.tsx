"use client";

import { Avatar, Card, CardContent, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
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
    <Card className="home-profile">
      <CardContent>
        <div>
          <div className="profile-picture">
            <Avatar src={avatarUrl} />
          </div>
          <div>
            <h2 className="username">{displayName}</h2>
            <p className="email">
              {isClient ? email || "No email available" : "No email available"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const friendsPanel = (
    <Card className="home-friends">
      <CardContent>
        <h2>Friends</h2>
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
    <Card className="home-collection">
      <CardContent>
        <h2>Owned</h2>
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
    <Card className="home-wishlist">
      <CardContent>
        <h2>Wishlist</h2>
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
    <div className="home-layout" data-tab={mobileTab}>
      <div className="home-left">
        {profileCard}
        {friendsPanel}
        <Card className="home-party">
          <PartyButton />
        </Card>
      </div>
      <div className="home-right">
        <Tabs
          className="home-tabs"
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
