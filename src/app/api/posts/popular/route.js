import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const popularPosts = await Post.find()
      .sort({ likes: -1 }) // Sort posts by likes in descending order (most likes first)
      .limit(3); // Limit the result to the top 3 posts

    return NextResponse.json(
      { popularPosts, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
