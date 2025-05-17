import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");

    navigate("/login");
  };

  return (
    <nav className="px-10 min-h-7 bg-navColor flex items-center justify-between">
      {/* logo */}
      <div className="text-titleColor text-titleSize">
        write your <span>self</span>
      </div>

      {/* navlinks */}

      <ul className="flex items-center gap-3">
        <li className="text-md cursor-pointer hover:text-gray-600 duration-150 transition-all">
          <Link to={"/"}>BLogs</Link>
        </li>
        <li className="text-md cursor-pointer hover:text-gray-600 duration-150 transition-all">
          <Link to={"/myblogs"}>My Blog</Link>
        </li>

        {!auth.user ? (
          <>
            <li className="text-md cursor-pointer hover:text-gray-600 duration-150 transition-all">
              <Link to={"/login"}>Sign-in</Link>
            </li>
            <li className="text-md cursor-pointer hover:text-gray-600 duration-150 transition-all">
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        ) : (
          <Link onClick={handleClick}>logout</Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
