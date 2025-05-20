import Button from "../components/Button";
import { IoGrid } from "react-icons/io5";
import { useEffect, useState } from "react";
import CreateBlogIcon from "../components/CreateBlogIcon";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

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
    <div className="mt-5 px-20">
      {/* search bar */}
      <div className="w-full flex items-center justify-center gap-5">
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

      <div className="flex items-center justify-end mt-4">
        {data.length > 0 ? (
          <Link to={"/create-blog"}>
            <MdCreateNewFolder className="text-2xl text-navColor" />
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="w-full flex flex-col items-center justify-center h-screen">
        {data.length !== 0 ? (
          data.map((item) => {
            return (
              <div key={item.title}>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            );
          })
        ) : (
          <Link to={"/create-blog"}>
            <MdCreateNewFolder className="text-8xl text-navColor" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Blog;
