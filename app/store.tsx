import { createClient } from "@/lib/supabase/client";
import { atom } from "jotai";

export const userNameAtom = atom("");

type UserCollection = {
  user_name: string;
  user_collection: any[];
  friends: any[];
};

const userCollectionAtom = atom<UserCollection | null>(null);
const supabase = await createClient();

//this is a helper atom returns whether the collection us loading
export const isLoadingUserCollectionAtom = atom(false);

//this is the code that populates the store
export const hydrateUserCollectionAtom = atom(
  null,
  async (get, set) => {
    set(isLoadingUserCollectionAtom, true);

    try {
      const userName = get(userNameAtom);
      const { data } = await supabase
        .from("UserCollectionByUserName")
        .select("*")
        .eq("user_name", userName)
        .single();

      set(userCollectionAtom, data);
    } finally {
      set(isLoadingUserCollectionAtom, false);
    }
  }
);

//This is a read-only atom that returns the list of user games
export const userGamesAtom = atom(
  (get) => get(userCollectionAtom)?.user_collection ?? []
);

//THis is a read-only atom that returns the list of user friends
export const userFriendsAtom = atom(
  (get) => get(userCollectionAtom)?.friends ?? []
);


//docs code, ignore
 const baseAtom = atom(0) // do not export
export const countAtom = atom((get) => get(baseAtom)) // read only
export const incAtom = atom(null, (_get, set) => {
  set(baseAtom, (prev) => prev + 1)
})
export const decAtom = atom(null, (_get, set) => {
  set(baseAtom, (prev) => prev - 1)
})

export const dispatchAtom = atom(null, (_get, set, action) => {
  if (action === 'INC') {
    set(incAtom)
  } else if (action === 'DEC') {
    set(decAtom)
  } else {
    throw new Error('unknown action')
  }
})