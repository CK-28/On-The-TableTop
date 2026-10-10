"use client";

import { createClient } from "@/lib/supabase/client";
import { useAtomValue, useStore, atom } from "jotai";
import { collectionStatusAtom, userGamesAtom, userNameAtom, userWishlistAtom } from "@/app/store";
import { Button } from "./ui/button";
import { Drawer, MenuItem } from "@mui/material";
import { useState } from "react";

type GamesListAtom = ReturnType<typeof atom<Game[]>>;

export default function AddRemoveGame({ game }: { game: Game }) {
  const store = useStore();
  const userCollection = useAtomValue(userGamesAtom);
  const userWishlist = useAtomValue(userWishlistAtom);
  const userName = useAtomValue(userNameAtom);
  const collectionStatus = useAtomValue(collectionStatusAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const isOwned = userCollection.some((currentGame) => currentGame.id === game.id);
  const isWishlisted = userWishlist.some((currentGame) => currentGame.id === game.id);

  if (collectionStatus === "loading") {
    return <span>Loading...</span>;
  } else if (collectionStatus === "error") {
    return <span>Unable to load collection.</span>;
  }

  async function addItem(item: number, listAtom: GamesListAtom): Promise<void> {
    // Don't add the game if it's already in the collection or wishlist
    if (userCollection.some((currentGame) => currentGame.id === item) || userWishlist.some((currentGame) => currentGame.id === item)) return;

    const currentCollection = store.get(listAtom);
    const updatedCollection = [...currentCollection, game];
    await saveCollectionChange(listAtom, updatedCollection, currentCollection);
  }

  async function removeItem(item: number, listAtom: GamesListAtom): Promise<void> {
    const currentCollection = store.get(listAtom);
    const updatedCollection = currentCollection.filter((currentGame) => currentGame.id !== item);
    
    // Item not found in collections, return
    if (currentCollection.length === updatedCollection.length) return;

    await saveCollectionChange(listAtom, updatedCollection, currentCollection);
  }

  async function saveCollectionChange(listAtom: GamesListAtom, updatedList: Game[], previousList: Game[]): Promise<void> {
    store.set(listAtom, updatedList);

    const wasUpdateSuccessful = await updateCollections(store.get(userGamesAtom), store.get(userWishlistAtom));
    // If DB update fails, revert the change in the local state
    if (!wasUpdateSuccessful) {
      store.set(listAtom, previousList);
    }
  }

  // TODO: Dont love that both lists get updated here. There is enough error checking that it's fine, but always improve code!
  async function updateCollections(owned: Game[], wishlist: Game[]): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("UserCollectionByUserName").upsert({
      user_name: userName,
      user_collection: owned.map((currentGame) => currentGame.id),
      user_wishlist: wishlist.map((currentGame) => currentGame.id),
    });

    if (error) {
      console.error("Sync error:", error);
    }

    return !error;
  }

  // HTML
  return !isOwned && !isWishlisted ? (
    <>
      <div className="mt-2 flex w-full items-center justify-center">
        <Button className="w-1/2 bg-[#fc5300] text-white hover:bg-[#fc5300]/90" onClick={() => setMenuOpen(true)}>Add</Button>
      </div>

      <Drawer anchor="bottom" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <MenuItem style={{ justifyContent: "center", textAlign: "center" }}
          onClick={() => { setMenuOpen(false); addItem(game.id, userGamesAtom); }}
        >
          Owned
        </MenuItem>
        <MenuItem style={{ justifyContent: "center", textAlign: "center" }}
          onClick={() => { setMenuOpen(false); addItem(game.id, userWishlistAtom); }}
        >
          Wishlist
        </MenuItem>
      </Drawer>
    </>
  ) : (
    <div className="mt-2 flex w-full items-center justify-center">
      <Button
        className="w-1/2 border border-[#fc5300] bg-transparent text-black shadow-sm hover:bg-[#fc5300]/10 hover:text-black"
        onClick={() => {
          const listAtom = isOwned ? userGamesAtom : userWishlistAtom;
          void removeItem(game.id, listAtom);
        }}
      >
        Remove from {isOwned ? "Owned" : "Wishlist"}
      </Button>
    </div>
  );
}
