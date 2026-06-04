/* eslint-disable @typescript-eslint/no-unused-vars */
type User = {
  id: number;
  user_name: string;
};

// TODO: Would love these names to be a proper case. They match the database. Change the database. BUT DO NOT LOSE THAT DATA. CHRISTINA WILL HUNT YOU DOWN.
type Game = {
    id: number;
    name: string;
    yearpublished: number;
    is_expansion: boolean;
    minplayers: number;
    maxplayers: number;
    minplaytime: number;
    maxplaytime: number;
    description: string;
    publisher: string;
    image: string;
    owners: string[];
};