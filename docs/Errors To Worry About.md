# ONE
## Error Type
Blocking Route

## Error Message
Route "/users": Uncached data or `connection()` was accessed outside of `<Suspense>`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route


    at Users (app\users\page.tsx:7:62)

## Code Frame
   5 | export default async function Users() {
   6 |   const supabase = await createClient();
>  7 |   const { data: profiles } = await supabase.from("profiles").select();
     |                                                              ^
   8 |
   9 |   return (
  10 |     <div>

Next.js version: 16.1.6 (Turbopack)

# TWO
[[Pasted image 20260306100309.png]]
