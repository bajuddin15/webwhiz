import { getSession } from "next-auth/react";

async function authMiddleware({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/auth/signin" });
    console.log("not authenticated");
    res.end();
    return;
  }

  req.user = session.user; // Attach user data to req

  return session;
}

export default authMiddleware;
