import { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../authContext";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const { auth } = useAuth();

  const parsedData = JSON.parse(localStorage.getItem("auth"));

  const userID = parsedData.user._id;

  const handleClick = async (e) => {
    e.preventDefault();
    const createFetchReq = await fetch(
      "http://localhost:3000/api/v1/blog/create-blog",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: desc, image, user: userID }),
      }
    );

    const response = await createFetchReq.json();

    if (createFetchReq.ok) {
      setDesc("");
      setTitle("");
      setImage("");
    }

    console.log(response);
  };

  return (
    <form action={"POST"} className="px-20 py-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <label htmlFor="title" className="text-xl text-gray-700 font-semibold">
          Title Here
        </label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          value={title}
          className="w-full rounded-3xl border-2 border-gray-900 px-10 py-4 text-2xl"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <label htmlFor="title" className="text-xl text-gray-700 font-semibold">
          Image Here
        </label>
        <input
          type="text"
          placeholder="Image Here"
          id="title"
          value={image}
          className="w-full rounded-3xl border-2 border-gray-900 px-10 py-4 text-2xl"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <label htmlFor="desc" className="text-xl text-gray-700 font-semibold">
          Description Here
        </label>
        <input
          type="text"
          placeholder="Description Here"
          className="w-full rounded-3xl border-2 border-gray-900 h-[200px] px-10 text-xl"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <Button
        style="bg-blue-300 text-xl px-5 py-2 rounded-full mt-5 cursor-pointer"
        children="Create Blog"
        onClick={handleClick}
      />
    </form>
  );
};

export default CreateBlog;
