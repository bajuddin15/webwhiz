import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignUp from "@/components/SignUp/SignUp";

const SignupPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignupPage;
