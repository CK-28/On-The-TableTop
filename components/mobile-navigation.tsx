import CelebrationIcon from "@mui/icons-material/Celebration";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      <Link href="/search" className="mobile-navigation-link">
        <SearchIcon />
        <span>Search</span>
      </Link>
      <Link href="/party" className="mobile-navigation-link mobile-navigation-party">
        <CelebrationIcon />
        <span>Start a Party</span>
      </Link>
    </nav>
  );
}
