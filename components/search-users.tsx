"use client"
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import UserList from "./user-list";

export default function SearchUsers() {
    const [searchUser, setSearchUser] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);

    async function handleClick() {
        console.log('User searched for "', searchUser, '"');
        const supabase = await createClient();

        //TODO: make search on partial text
        const {data : profiles} = (await supabase.from("profiles").select().textSearch('user_name', searchUser));
        console.log(profiles)
        setSearchResults(profiles || [])
    }


    return (
        <div className="flex flex-col justify-center items-center p-2">
            <div className="flex flex-row gap-2">
                <Input
                    id="search-users"
                    type="search"
                    placeholder="Search"
                    className="w-80"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <Button onClick={() => handleClick()}>
                    Search
                </Button>
            </div>
            <Suspense fallback={<div>Loading Users...</div>}>
                <UserList users={searchResults} />
            </Suspense>
        </div>
    );
}