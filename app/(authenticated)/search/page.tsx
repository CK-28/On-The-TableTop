"use client";

import SearchGames from "@/components/search-games";
import SearchUsers from "@/components/search-users";
import HeaderSearch from "@/components/header-search";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Tab, Tabs } from "@mui/material";
import { Suspense, useState, SyntheticEvent } from "react";

export default function Search() {
  const [tab, setTab] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="search-page">
      <div className="search-page-mobile-bar">
        <HeaderSearch inputId="mobile-search" />
      </div>
      <Card className="search-page-card">
        <CardContent className="search-page-content">
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
    </div>
  );
}