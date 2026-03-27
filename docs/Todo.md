**MAIN GOAL**
enter list of users, display all games owned
	Filter list by number of players, time to play, etc
___
**Long Term**
- Authenticated users to be able to update the master list (number of players, time to play, add new games)
- Check client vs server components
- Look into the 4 issues need attention on the home page of our Supabase database

**Medium Term**
- Search for other user's collections
- Update policies to check for user_id
	- This means adding user_id column and then updating the calls in the code
- The board game id column in the userCollection table can likely be mapped to their equivalent entry in the BoardGames table. Might make life easier down the road
- Create a linter
- Make params look NORMAL

**Short Term**
- Button to view user's own collection
- Is there a way to organize the search results for games by relevance? Maybe by ranking? order them in the table and they will be ordered in the search?

___
**Next Up**
1. party page to filter and show more information
2. look into hosting

3. Should not be able to add self as friend
4. Clean up code
5. invite others
6. fixing search feature
7. etc.