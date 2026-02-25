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