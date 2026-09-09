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
    <Card className="max-w-[1000px] mx-auto">
      <CardContent className="p-2">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Games" />
            <Tab label="Users" />
          </Tabs>
        </Box>

        <Suspense fallback={<div className="mx-auto max-w-[1000px] p-6">Loading results...</div>}>
          {tab === 0 ? <SearchGames /> : <SearchUsers />}
        </Suspense>
      </CardContent>
    </Card>
  );
}