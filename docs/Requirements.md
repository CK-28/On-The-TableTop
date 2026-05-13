## Navigation Menu
- **"On The Table Top" should not text wrap unless required** - High
- **Clicking the logo should navigate to home page** - Medium

## Start Up Page
- **User sign in status should be consistent** - High
	Currently the User Stays signed in? After restarting server? or at least the page will say "please sign in" but the sign in button is not there - only logout.
	Could be a Nav Menu issue.
- **Should not have Navigation Menu** - High
- **Requires proper UI design** - low

## Protected New
- **Page should be deleted** - High
	User should load into the game search page. Or Profile.
	A Home page of sorts can be created later.

## Home Page
- **Replaces Protected New** - Medium
- **Should show trending items** - Low
	Look into the BGG API. There is a "Plays" and "Hot Items" endpoints that can give us trending data.
		Would need us to get a BE. Check SupaBase

## Party Page
[[Party Page.png]]
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
[[Users Page.png]]
- **Partial searching to be implemented** - Medium
- **Username and Add/Remove button should be spaced to take full width of card** - High

## Search Page
 [[Search Page.png]]
- **Partial searching to be implemented** - Medium

## Profile Page
[[Profile Page.png]]
- **Users should be able to see their info along with their Friends and Games list** - High

## Database
- **Check Naming of tables and columns** - Medium
	Pick a system, stick to it, ensure its updated both in connected tables and code
- **Look into what SupaBase has to offer** - low
	- Services in general. Especially Backups, security, BAAS stuff, etc.
	- SupaBase can be used as a BE.
		- Explore this.
			- Can we use it to make calls to BGG and populate some tables/our home page (protected-new)?
- **Check RLS Rules** - Medium
	Make sure tables offer only the access that is absolutely required for each table/col/row

## Header Menu
- **Needs to be dynamic** - High
	Currently required the page to be refreshed for the sign in/up buttons to turn into log out.
	Also the burger menu needs to not be there on unauthenticated pages.
	We can either have two menus or make it dynamic.

| .               | Burger Menu | Title | Right Side | Theme Switcher |
| --------------- | ----------- | ----- | ---------- | -------------- |
| Authenticated   |             | X     | Sign in/up | X              |
| UnAuthenticated | X           | X     | Log out    | X              |

## Theme
- **Pick Main Theme** - Medium
- **Pick Dark Theme** - Low

## Other
- **Look into hosting** - High
- **Go through all the TODO's in the code and make them tickets** - High
- **Clean up code/repo** - Medium
	- **ClassName property needs to be cleaned up, consistent, and using common global classes where possible** - low
- **Clean up unused Postgres function in Supabase** - Low
- **Investigate Footer situation** - High
	There are different ones? compare Start up page to protected-new
- **Come up with a timeline for routine checks and updates of code, database, API, etc.** - Low
- **Search component turns blue-ish grey after use. Stop it** - Medium
- **Take Styling from Sign-in white box and apply it as background to every page's main component** - Medium
	- This includes the game search page since that was taped together and mostly a POC