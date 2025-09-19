import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Clear the session cookie by setting its expiration to a time in the past
  cookies.set("session", "", {
    path: "/",
    expires: new Date(0), // Sets the expiration to a past date
    httpOnly: true,
    secure: import.meta.env.PROD, // Only use `secure` in production
  });

  // Redirect the user back to the login page or home page
  return redirect("/admin/login");
};
