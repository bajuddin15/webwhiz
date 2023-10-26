import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { postId, userId } = await request.json();
  try {
    await connectMongoDB();
    const post = await Post.findById(postId).populate("author", "name");
    if (!post) {
      return NextResponse.json(
        { message: "Post is not found" },
        { status: 404 }
      );
    }

    if (post.likes.includes(userId)) {
      return NextResponse.json(
        { message: "You have already liked this post" },
        { status: 400 }
      );
    }

    post.likes.push(userId);

    await post.save();

    return NextResponse.json(
      { post, message: "Post liked successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
