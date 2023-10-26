import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }
    const userData = { name, email, password: hashedPassword };
    await User.create(userData);
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error accured while registering the user" },
      { status: 500 }
    );
  }
}
