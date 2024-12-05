// export { default } from "next-auth/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log("middleware runs");
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "Admin",
    },
  },
);

export const config = {
  matcher: ["/admin"],
};
