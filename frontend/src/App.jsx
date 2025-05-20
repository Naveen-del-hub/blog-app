import React from "react";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Myblogs from "./pages/Myblogs";
import Protected from "./Protected";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/myblogs"
          element={
            <Protected>
              <Myblogs />
            </Protected>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </div>
  );
};

export default App;
