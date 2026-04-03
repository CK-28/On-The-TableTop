## Start Up Page
- **User sign in status should be consistent** - High
	Currently the User Stays signed in? After restarting server? or at least the page will say "please sign in" but the sign in button is not there - only logout.
	Could be a Nav Menu issue.
## Party Page
- **Overall UI** - High
	Center page items on screen.
	Let the two user Lists take up half of the height each
- **Games List UI** - High
	Display the games in a table with all the required data separated with a good amount of space (name, owner, player count, time to play, image, etc)
	*Owner is not part of the game object. Would need more work. Make its own ticket?*
- **Games list to update dynamically** - Medium
	Display the games within the player's collections dynamically and without having to use the 'Start Party button'
- **Games List to have filters** - Medium
	Especially filter for based on number of players.
	Decide on other filters and add them? can be separate stories
- **Include the user in the Party Users list and consider their collection for the Party Games** - High

## Users Page
- **User should not be able to add themselves as a friend** - High
	Ensure that the user cannot add themselves as a friend
	or
	Add a friend multiple times
- **Partial searching to be implemented** - Medium

## Search Page
- **Partial searching to be implemented** - Medium

## DataBase
- **Check Naming of tables and colums** - Medium
	Pick a system, stick to it, ensure its updated both in connected tables and code
- **Look into what SupaBase has to offer** - low
	Services in general. Especially Backups, security, BAAS stuff, etc
- **Check RLS Rules** - Medium
	Make sure tables offer only the access that is absolutely required for each table/col/row

## Other
- **Look into hosting** - High
- **Go through all the TODO's in the code and make them tickets** - High
- **Clean up code/repo** - Medium
- **Clean up unused Postgres function in Supabase** - Low