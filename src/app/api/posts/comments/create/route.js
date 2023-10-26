import Comment from "@/models/comment";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { comment, userId, postId } = await req.json();

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const newComment = new Comment({
      comment,
      author: userId, // Assuming userId is a valid user ID
      post: postId, // Assuming postId is a valid post ID
    });

    // Save the comment to the database
    await newComment.save();
    post.comments.push(newComment);
    await post.save();
    // Get all comments for the post, including their content
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("author", "name"); // Assuming you want 'username' and 'email'

    return NextResponse.json(
      { comments, message: "comment added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
