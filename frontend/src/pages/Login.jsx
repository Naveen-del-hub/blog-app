import { useState } from "react";
import Button from "../components/Button";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  // custom hook

  const [auth, setAuth] = useAuth();

  const handleClick = async (e) => {
    try {
      e.preventDefault();

      const fetchData = await fetch(
        "http://localhost:3000/api/v1/user/login-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // ✅ VERY IMPORTANT
        }
      );

      const result = await fetchData.json();

      if (fetchData.ok) {
        navigate(location.state || "/");
        setAuth({
          ...auth,
          user: result.user,
          token: result.token,
        });

        console.log(result.token);

        localStorage.setItem("auth", JSON.stringify(result));
      }

      console.log(result.token);
    } catch (error) {
      console.log("something is wrong", error);
    }
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
      <div className="w-[500px] h-[300px] border-2 border-red-800">
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
            value={data.password}
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
            children="Login"
            onClick={handleClick}
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
