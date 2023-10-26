import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
