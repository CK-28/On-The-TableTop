import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      <Link href="/home" className="mobile-navigation-link">
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link href="/party" className="mobile-navigation-link">
        <CelebrationIcon />
        <span>Party</span>
      </Link>
      <Link href="/search" className="mobile-navigation-link">
        <SearchIcon />
        <span>Search</span>
      </Link>
    </nav>
  );
}
