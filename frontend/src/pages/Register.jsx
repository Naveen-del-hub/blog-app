import { useState } from "react";
import Button from "../components/Button";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    const fetchData = await fetch(
      "http://localhost:3000/api/v1/user/register-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await fetchData.json();

    console.log(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form method="post" className="h-[700px] flex items-center justify-center">
      <div className="w-[500px] h-[400px] border-2 border-red-800">
        {/* username */}
        <div className="w-full flex items-center justify-center flex-col px-10 py-2">
          <label
            htmlFor="username"
            className="self-start text-xl font-semibold mb-2 cursor-pointer"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="w-full border border-gray-600 px-4 py-1 rounded-xl"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        {/* email */}
        <div className="w-full flex items-center justify-center flex-col px-10 py-5">
          <label
            htmlFor="email"
            className="self-start text-xl font-semibold mb-2 cursor-pointer"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
            className="w-full border border-gray-600 px-4 py-1 rounded-xl"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        {/* password */}

        <div className="w-full flex items-center justify-center relative flex-col px-10 py-5">
          <label
            htmlFor="pass"
            className="self-start text-xl font-semibold mb-2 cursor-pointer"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            id="password"
            name="password"
            className="w-full border border-gray-600 px-4 py-1 pr-16 rounded-xl "
            value={data.pass}
            onChange={handleChange}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
              console.log(showPassword);
            }}
          >
            <FaEye className="absolute top-16 right-16" />
          </button>

          <Button
            style="bg-green-500 w-32 mt-5 text-base px-3 py-2 rounded-md"
            children="Register"
            onClick={handleClick}
          />
        </div>
      </div>
    </form>
  );
};

export default Register;
