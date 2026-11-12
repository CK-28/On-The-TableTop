import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest } from "next/server";
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const pwaFiles = ['/manifest.json', '/sw.js', '/workbox'];
  if (pwaFiles.some(file => url.pathname.includes(file))) {
    return NextResponse.next();
  }

  // Example auth logic
    // const cookieStore = await cookies();
    // const token = cookieStore.get('accessToken');
    // const isLoggedIn = Boolean(token);
  
    // if (!isLoggedIn && url.pathname !== '/sign-in') {
    //   url.pathname = '/sign-in';
    //   return NextResponse.redirect(url);
    // }
  
    // if (isLoggedIn && url.pathname === '/sign-in') {
    //   url.pathname = '/';
    //   return NextResponse.redirect(url);
    // }
  
    // return NextResponse.next();

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
