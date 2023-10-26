import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignIn from "@/components/SignIn/SignIn";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SigninPage;
