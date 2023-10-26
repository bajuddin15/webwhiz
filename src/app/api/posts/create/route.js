import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB();
  try {
    const { title, description, content, slug, img, categories, userId } =
      await req.json();
    const author = await User.findById({ _id: userId });
    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }
    const postData = {
      title,
      description: description,
      content,
      slug,
      img,
      categories,
      author: author._id,
    };
    const post = new Post(postData);

    await post.save();
    author.posts.push(post);
    await author.save();
    return NextResponse.json(
      { post, message: "Your Post published successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
