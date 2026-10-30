"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { collectionStatusAtom, userFriendsAtom, userNameAtom } from "@/app/store";
import PartyList from "./party-list";
import PartyGames from "./partyGames";

export default function PartyWrapper() {
  const currentUser = useAtomValue(userNameAtom);
  const friendsAtom = useAtomValue(userFriendsAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const [friends, setFriends] = useState<User[]>([]);
  const [party, setParty] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setParty((currentParty) =>
      currentParty.includes(currentUser) ? currentParty : [...currentParty, currentUser]
    );

    if (collectionStatus !== "loading") {
      setFriends(friendsAtom);
    }
  }, [collectionStatus, currentUser, friendsAtom]);

  function addToParty(user: string) {
    setFriends((currentFriends) => currentFriends.filter((friend) => friend.user_name !== user));
    setParty((currentParty) =>
      currentParty.includes(user) ? currentParty : [...currentParty, user]
    );
  }

  function removeFromParty(user: string) {
    if (currentUser === user) {
      return;
    }

    setParty((currentParty) => currentParty.filter((member) => member !== user));
    setFriends((currentFriends) =>
      currentFriends.some((friend) => friend.user_name === user)
        ? currentFriends
        : [...currentFriends, { id: 0, user_name: user }]
    );
  }

  return (
    <div className="party-page-layout">
      <div className="party-sidebar party-friends">
        <Stack spacing={2}>
          <Card className="party-friends-card">
            <CardContent>
              <Stack spacing={2}>
                <h1 className="text-2xl">Party Members ({party.length})</h1>
                {collectionStatus === "loading" ? (
                  <p>Loading friends...</p>
                ) : collectionStatus === "error" ? (
                  <p>Unable to load friends.</p>
                ) : (
                  <PartyList party={party} onClick={removeFromParty} owner={currentUser} />
                )}
              </Stack>
            </CardContent>
          </Card>
          <Card className="party-friends-card">
            <CardContent>
              <Stack spacing={2}>
                <h1 className="text-2xl">Add Friends</h1>
                {collectionStatus === "loading" ? (
                  <p>Loading friends...</p>
                ) : collectionStatus === "error" ? (
                  <p>Unable to load friends.</p>
                ) : (
                  <PartyList
                    party={friends.map((friend) => friend.user_name)}
                    onClick={addToParty}
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </div>

      <div className="party-sidebar party-mobile-placeholder">
        <Card className="party-profile-placeholder" />
      </div>

      <Card className="party-games-card">
        <CardContent className="party-games-content">
          <PartyGames party={party} />
        </CardContent>
      </Card>
    </div>
  );
}
