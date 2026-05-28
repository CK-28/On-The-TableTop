## Start Up Page
- **User sign in status should be consistent** - High
	Currently the User Stays signed in? After restarting server? or at least the page will say "please sign in" but the sign in button is not there - only logout.
	Could be a Nav Menu issue.
- **Should not have Navigation Menu** - High
- **Requires proper UI design** - low

## Home Page
- **Should show trending items** - Low
	Look into the BGG API. There is a "Plays" and "Hot Items" endpoints that can give us trending data.
		Would need us to get a BE. Check SupaBase

## Party Page
[[Party Page.png]]
- **Games List UI** - High
	Display the games in a table with all the required data separated with a good amount of space (name, owner, player count, time to play, image, etc)
	*Owner is not part of the game object. Would need more work. Make its own ticket?*
		A "getPartyGames" Edge function has been created to start. Some docs can be found [here](https://supabase.com/docs/reference/javascript/functions-invoke)
- **Games List to have filters** - Medium
	Number of players
	Playtime
	Co-op or not
	Expansions
- **Show Crown next to their name to symbolize being the user/"party owner"** - Medium

## Users Page
[[Users Page.png]]
- **Partial searching to be implemented** - Medium

## Search Page
 [[Search Page.png]]
- **Partial searching to be implemented** - Medium
	- Already did, Alanna was being picky. Make her test it - High
- **Search should submit when hitting "Enter"** - High
- **Page should start with ~something~ showing** - Low
	- Or, only navigate there after using global search bar
	- Show trending games?
- ![[Pasted image 20260528171225.png]] - High
	- Check text wrapping of publisher names
- **Put year on new line cuz there's empty space there anyways** - High
	- Also if year is 0 make it not show or undefined or something

## Profile Page
[[Profile Page.png]]

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
- **Supabase supports real-time subscriptions of tables so updates are shown to users on the go. Look into this.** - Medium

## Header Menu
- **Needs to be dynamic** - High
	Burger menu needs to not be there on unauthenticated pages.
	We can either have two menus or make it dynamic.

| .               | Burger Menu | Title | Right Side | Theme Switcher |
| --------------- | ----------- | ----- | ---------- | -------------- |
| Authenticated   |             | X     | Sign in/up | X              |
| UnAuthenticated | X           | X     | Log out    | X              |

## Footer
- **Needs to have a consistent design across all pages** (except authentication pages) - Medium

## Theme
- **Pick Main Theme** - Medium
- **Pick Dark Theme** - Low

## Sign up Process
- **When signing up, email should not come from supabase and/or should not look stupid** - low
- **Button to go back to sign in after confirming email on sign up** - High
- **Allow users to use username to sign in** - low
- **Should be able to view password when creating account** - medium
- **Duplicate emails need to be pointed out** - High

## Other
- **Go through all the TODO's in the code and make them tickets** - High
- **Clean up code/repo** - Medium
	- **ClassName property needs to be cleaned up, consistent, and using common global classes where possible** - low
- **Clean up unused Postgres function in Supabase** - Low
- **Investigate Footer situation** - High
	There are different ones? compare Start up page to protected-new
- **Come up with a timeline for routine checks and updates of code, database, API, etc.** - Low
- **Search component turns blue-ish grey after use. Stop it** - Medium
- **Take Styling from Sign-in white box and apply it as background to every page's main component** - Medium
- **Tab icon should reflect site information** - Medium
- **Give needed credits** - High
- **The Background zoom/ Main Menu zoom changes from the home page to other pages. Investigate** - Low
- **Clean up game names with weird letting** - low