import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const postId = content.params.postId;
  try {
    await connectMongoDB();
    const post = await Post.findById(postId)
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" }, // Include the author's username
      });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
