"use client"
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import UserList from "./user-list";
import { Card, CardContent } from "@/components/ui/card";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "next/navigation";

export default function SearchUsers() {
    const searchParams = useSearchParams();
    const searchUser = searchParams.get("search") || "";
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(async (term: string) => {
        console.log('User searched for "', searchUser, '"');
        setIsLoading(true);
        const supabase = await createClient();

        try {
            // TODO: Can this format be used for games? Or Alanna doesnt approve?
            const { data, error } = await supabase.from("profiles").select("id, user_name").ilike("user_name", `%${term}%`).order("user_name", { ascending: true });

            if (error) {
                console.error(error);
            }

            console.log(data);
            setSearchResults(data || []);
        } finally {
            setIsLoading(false);
        }
    }, [searchUser]);

    useEffect(() => {
        if (searchUser) {
            void handleSearch(searchUser);
        } else {
            setSearchResults([]);
        }
    }, [handleSearch, searchUser]);

    return (
        <Card className="max-w-[1000px] mx-auto">
            <CardContent className="flex flex-col justify-center items-center p-2">
                <Stack
                    direction="column"
                    spacing={2}
                    marginTop={2}
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <Label>
                        {searchUser ? `${searchResults.length} Result(s)` : "Search for a user"}
                    </Label>
                    {isLoading ? (
                        <div>Loading Users...</div>
                    ) : (
                        <UserList users={searchResults} />
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}