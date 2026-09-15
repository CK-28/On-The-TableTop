"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtom, useAtomValue } from "jotai";
import { collectionStatusAtom, userGamesAtom, userNameAtom } from "@/app/store";
import { Button } from "./ui/button";
import { Box, MenuItem, Popover } from "@mui/material";
import { useState } from "react";

export default function AddRemoveGame({ game, item, alreadyInList }: { game: Game, item: number, alreadyInList: boolean }) {
  const [userCollection, setUserCollection] = useAtom(userGamesAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const [itemInList, setItemInList] = useState(alreadyInList);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(menuAnchor);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  } else if (collectionStatus === "error") {
    return <span>Unable to load collection.</span>;
  }

  // Make this not be called "nextCollection" - maybe "updatedCollection"?. Also, make it check if Owned or Wishlist is clicked and update the correct collection given that info
  // Update to use the menu that comes up from the bottom? it will make the app design easier
  function addItem(item: number): void {
    const nextCollection = userCollection.some((currentGame) => currentGame.id === item)
      ? userCollection
      : [...userCollection, game];
    setUserCollection(nextCollection);

    setItemInList(true);
    updateCollection(nextCollection).then((wasUpdateSuccessful) => {
      setItemInList(wasUpdateSuccessful);
    });
  }

  function removeItem(item: number): void {
    const index = userCollection.findIndex((currentGame) => currentGame.id === item);
    if (index > -1) {
      const nextCollection = userCollection.filter((_, currentIndex) => currentIndex !== index);
      setUserCollection(nextCollection);
      setItemInList(false);
      updateCollection(nextCollection).then((wasUpdateSuccessful) => {
        setItemInList(!wasUpdateSuccessful);
      });
    } else {
      setItemInList(false);
    }
  }

  async function updateCollection(collection: Game[]): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("UserCollectionByUserName").upsert({
      user_name: userName,
      user_collection: collection.map((currentGame) => currentGame.id),
    });

    if (error) {
      console.error("Sync error:", error);
    }

    return !error;
  }

  return !itemInList ? (
    <>
      <div className="mt-2 flex w-full items-center justify-center">
        <Button className="w-1/2 bg-[#fc5300] text-white hover:bg-[#fc5300]/90" onClick={(event) => setMenuAnchor(event.currentTarget)}>Add</Button>
      </div>

      <Popover
        open={menuOpen}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => { setMenuAnchor(null); addItem(item); }}>Owned</MenuItem>
          <MenuItem onClick={() => { setMenuAnchor(null); addItem(item); }}>Wishlist</MenuItem>
        </Box>
      </Popover>
    </>
  ) : (
    <div className="mt-2 flex w-full items-center justify-center">
      <Button className="w-1/2 border border-[#fc5300] bg-transparent text-black shadow-sm hover:bg-[#fc5300]/10 hover:text-black" onClick={() => removeItem(item)}>Remove</Button>
    </div>
  );
}
