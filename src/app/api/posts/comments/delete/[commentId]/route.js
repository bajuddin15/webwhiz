import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function DELETE(request, content) {
  const commentId = content.params.commentId;

  try {
    await connectMongoDB();
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json(
        { message: "Comment is not found" },
        { status: 404 }
      );
    }

    const postId = comment.post;
    const post = await Post.findById(postId);

    // Remove the comment from the post.comments array
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId
    );
    await post.save();

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("author", "name"); // Assuming you want 'username' and 'email'

    return NextResponse.json(
      { comments, message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
