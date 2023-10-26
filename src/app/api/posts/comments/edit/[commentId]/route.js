import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  const commentId = content.params.commentId;
  const { comment } = await request.json();

  try {
    await connectMongoDB();
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return NextResponse.json(
        { message: "Comment is not found" },
        { status: 404 }
      );
    }

    existingComment.comment = comment;
    await existingComment.save();

    const postId = existingComment.post;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("author", "name");

    return NextResponse.json(
      { comments, message: "Comment Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
