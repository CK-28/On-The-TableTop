"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import UserList from "./user-list";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchUsers() {
    const [searchUser, setSearchUser] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        console.log('User searched for "', searchUser, '"');
        setIsLoading(true);
        const supabase = await createClient();

        try {
            //TODO: make search on partial text
            const {data : profiles, error} = (await supabase.from("profiles").select().textSearch('user_name', searchUser));

            if (error) {
                console.error(error);
            }

            console.log(profiles);
            setSearchResults(profiles || []);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Card className="max-w-[1000px] mx-auto">
            <CardContent className="flex flex-col justify-center items-center p-2">
                <div className="flex flex-row gap-2 mb-4 mt-4">
                    <Input
                        id="search-users"
                        type="search"
                        placeholder="Search"
                        className="w-80"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }}
                    />
                    <Button onClick={() => handleClick()}>
                        Search
                    </Button>
                </div>
                {isLoading ? (
                    <div>Loading Users...</div>
                ) : (
                    <UserList users={searchResults} />
                )}
            </CardContent>
        </Card>
    );
}