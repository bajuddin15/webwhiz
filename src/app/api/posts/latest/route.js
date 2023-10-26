import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const latestPosts = await Post.find()
      .sort({ createdAt: -1 }) // Sort posts by creation date in descending order (latest first)
      .limit(3); // Limit the result to the top 3 posts

    return NextResponse.json(
      { latestPosts, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
