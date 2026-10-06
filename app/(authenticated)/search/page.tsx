"use client";

import SearchGames from "@/components/search-games";
import SearchUsers from "@/components/search-users";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Tab, Tabs } from "@mui/material";
import { Suspense, useState, SyntheticEvent } from "react";

export default function Search() {
  const [tab, setTab] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Card style={{width: "80%", margin: "auto"}}>
      <CardContent style={{padding: ".5rem"}}>
        <Box>
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Games" />
            <Tab label="Users" />
          </Tabs>
        </Box>

        <Suspense fallback={<div>Loading results...</div>}>
          {tab === 0 ? <SearchGames /> : <SearchUsers />}
        </Suspense>
      </CardContent>
    </Card>
  );
}