import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function DELETE(request) {
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

    if (!post.likes.includes(userId)) {
      return NextResponse.json(
        { message: "You have not liked this post yet" },
        { status: 400 }
      );
    }

    // Remove the user ID from the 'likes' array to dislike the post
    const disLiked = post.likes.filter(
      (likedBy) => likedBy.toString() !== userId
    );
    post.likes = disLiked;

    await post.save();

    return NextResponse.json(
      { post, message: "Post disliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
