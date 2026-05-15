"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userNameAtom, userGamesAtom, userFriendsAtom } from "@/app/store";
import { createClient } from "@/lib/supabase/client";
import boardGamesImage from "@/lib/board-games.png";
import friendsImage from "@/lib/friends.png";
import partyImage from "@/lib/party.png";
import profileImage from "@/lib/profile.png";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const cardItems = [
  {
    title: "Browse Games",
    image: boardGamesImage.src,
    description: "Explore exciting new games to add to your collection",
    route: "/games",
  },
  {
    title: "Find Friends",
    image: friendsImage.src,
    description: "Find friends to play with",
    route: "/users",
  },
  {
    title: "Plan a Party",
    image: partyImage.src,
    description: "Prepare the perfect game night with friends",
    route: "/party",
  },
  {
    title: "View Your Profile",
    image: profileImage.src,
    description: "View your collection of games and friends",
    route: "/profile",
  },
];

export default function ProtectedPage() {
  const router = useRouter();
  const userName = useAtomValue(userNameAtom);
  const setUserCollection = useSetAtom(userGamesAtom);
  const setUserFriends = useSetAtom(userFriendsAtom);

  // TODO: Can/should these come from the store?
  useEffect(() => {
    async function loadUserData() {
      const supabase = await createClient();
      const response = await supabase
        .from("UserCollectionByUserName")
        .select("*")
        .eq("user_name", userName)
        .single();

      const userGames = response.data?.user_collection || [];
      const userFriends = response.data?.user_friends || [];

      setUserCollection(userGames);
      setUserFriends(userFriends);
    }

    if (userName) {
      loadUserData();
    }
  }, [userName, setUserCollection, setUserFriends]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-6">
      <div className="grid w-full max-w-[1000px] gap-4 sm:grid-cols-2 max-h-[1000px]">
        {cardItems.map((item) => (
          <Card key={item.title} className="max-w-full flex flex-col">
            <CardActionArea onClick={() => router.push(item.route)} className="flex-1 flex flex-col">
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  maxHeight: '300px',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
              <CardContent className="flex-1">
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
