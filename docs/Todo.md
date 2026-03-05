Attempt to turn MVP into PWA to test process works before we get too far ahead
___
make list of games searchable

button to view user's own collection

add number of players and time to play to database

authenticated users to be able to update the master list (number of players, time to play, add new games)

search for other user's collections

**MAIN GOAL**
enter list of users, display all games owned
	Filter list by number of players, time to play, etc

___
Update policies to check for user_id
	This means adding user_id column and then updating the calls in the code

The board game id column in the userCollection table can likely be mapped to their equivalent entry in the BoardGames table. Might make life easier down the road

Create a linter

Look into the 4 issues need attention on the home page of our Supabase database

Create a store.
	We need to be storing basic info in there for use through the app and when the user goes back and fourth.
		For example, userName, userCollection (of games), and user's list of friends. Amongst Im sure many other things down the road.

	Look into how to actually do this in the best way for react.