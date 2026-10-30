"use client";

import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Tab, Tabs } from "@mui/material";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();
  const activePath = ["/home", "/party", "/search"].includes(pathname ?? "")
    ? pathname
    : false;

  return (
    <nav className="mobile-navigation">
      <Tabs value={activePath} variant="fullWidth" className="mobile-navigation-tabs">
        <Tab component={Link} href="/home" value="/home" icon={<HomeIcon />} label="Home" />
        <Tab component={Link} href="/party" value="/party" icon={<CelebrationIcon />} label="Party" />
        <Tab component={Link} href="/search" value="/search" icon={<SearchIcon />} label="Search" />
      </Tabs>
    </nav>
  );
}
