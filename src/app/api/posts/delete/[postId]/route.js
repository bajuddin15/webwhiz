import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function DELETE(request, content) {
  const postId = content.params.postId;
  try {
    await connectMongoDB();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { message: "Post is not found" },
        { status: 404 }
      );
    }
    await Post.findByIdAndDelete(postId);
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
