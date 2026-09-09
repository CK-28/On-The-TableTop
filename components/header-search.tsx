"use client"

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearch() {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

    async function handleClick() {
        const query = searchValue.trim();
        router.push(query ? `/search?search=${encodeURIComponent(query)}` : "/search");
    }

    return (
        <Input
            id="search"
            type="search"
            placeholder="Search"
            className="w-80"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleClick();
                }
            }}
            style={
                {
                    background: "white",
                    border: 0,
                    borderRadius: 20
                }
            }
        />)
}