import Button from "../components/Button";
import { IoGrid } from "react-icons/io5";
import { useEffect, useState } from "react";

const Blog = (props) => {
  const { value } = props;

  const handleClick = () => {
    console.log("Hey Am I Clicked ");
    console.log(value);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/v1/blog/get-blogs", {
        credentials: "include",
      });

      const result = await res.json();
      setData(result);
      console.log("Result from server: ", result); // 👈 ye line check karo
      setData(result.blogs); // 👈 sirf blogs array ko set karo
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {/* search bar */}
      <div className="w-full flex items-center justify-center px-20 gap-5">
        <input
          type="text"
          placeholder="Search here......"
          className="w-full border border-black rounded-xl px-5 py-1"
        />

        <Button
          style="text-md bg-[#19d3da] rounded-xl px-5 py-1 cursor-pointer"
          onClick={handleClick}
          children="Search"
        />
      </div>

      <div>
        {data.map((blog) => {
          return (
            // Ye return statement zaroori hai
            <div key={blog._id}>
              <h1>{blog.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
