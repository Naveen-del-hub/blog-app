import { useEffect } from "react";
import { useAuth } from "./authContext";
import { useLocation, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login", {
        state: location.pathname,
      });
    }
  }, [auth.user, navigate, location]);
  return <>{children}</>;
};

export default Protected;
