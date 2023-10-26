import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function PUT(request, cont) {
  const postId = cont.params.postId;
  const { title, description, content, slug, img, categories } =
    await request.json();

  try {
    await connectMongoDB();
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return NextResponse.json(
        { message: "Post is not found" },
        { status: 404 }
      );
    }
    existingPost.title = title;
    existingPost.description = description;
    existingPost.content = content;
    existingPost.slug = slug;
    existingPost.img = img;
    existingPost.categories = categories;

    await existingPost.save();

    return NextResponse.json(
      { message: "Post Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
