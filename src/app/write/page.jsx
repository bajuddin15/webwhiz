"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WritePage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: placeholder || "Start typings...",
  //   },
  //   [placeholder]
  // );

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(
    "https://res.cloudinary.com/dcf23bhzd/image/upload/v1697542825/nextjsblog_uploads/jgoqnlw38veihjhueq4m.png"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("hi this is desc");
  const [catSlug, setCatSlug] = useState("");

  const onUploadImage = async (data) => {
    console.log("click upload");
    if (!file) {
      console.log("please select an image");
      return;
    }
    const image = file;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nextjsblog");
    const base_url = "https://api.cloudinary.com/v1_1/dcf23bhzd";
    const uploadResponse = await fetch(`${base_url}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    setMedia(imageUrl);
    alert("Image Uploaded successfully");
    console.log(imageUrl);
  };

  if (status === "loading") {
    return <div className="">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const postData = {
      title,
      description: description,
      content,
      img: media,
      slug: slugify(title),
      categories: [catSlug || "style"], //If not selected, choose the general category})
      userId: data?.token?.sub,
    };
    console.log(postData, "kjjj");
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data, "submit success");
      router.replace(`/posts`);
    }
    console.log({
      title,
      content,
      img: media,
      slug: slugify(title),
      categories: [catSlug || "style"], //If not selected, choose the general category})
      userId: data?.token?.sub,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-3">
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 border-solid px-5 py-3 text-lg outline-none mb-5"
            placeholder="Write your title here..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="max-h-[500px] border border-gray-300 border-solid dark:bg-gray-700  overflow-y-scroll">
            <JoditEditor
              ref={editor}
              value={content}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
        {/* sidebar menues */}
        <div className="flex flex-col gap-5">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>
          <button
            type="button"
            className="text-white max-w-full bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={onUploadImage}
          >
            Upload
          </button>
          <select
            id="small"
            className="block w-full p-2 text-md md:text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="style" selected>
              category
            </option>
            <option value="style">style</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="culture">culture</option>
            <option value="travel">travel</option>
            <option value="coding">coding</option>
          </select>
          <textarea
            name="desc"
            id="desc"
            className="w-full h-32 border border-gray-300 border-solid p-3 outline-none text-lg"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="text-white max-w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
