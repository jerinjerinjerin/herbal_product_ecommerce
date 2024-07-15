import React, { useContext, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backendDomain from "../commen/api";
import { toast } from "react-toastify";
import Context from "../context/context";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigater = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Effect to scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendDomain}/api/login-user`,
        data,
        {
          withCredentials: "include",
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }

      navigater("/");
      fetchUserDetails();
    } catch (error) {
      toast.error(error.response.data.message);
      toast.error(error.response.error.message);
    }
  };

  return (
    <div id="login">
      <div className="mx-auto container p-4">
        <div className="bg-slate-900 rounded-md bg-opacity-30 p-2 py-5 w-full max-w-md mx-auto">
          <div className="flex justify-center items-center">
            <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="py-5 flex flex-col gap-3"
          >
            <div className="grid py-2">
              <label className="">Email</label>
              <div className="bg-transparent  border border-green-600 rounded-md flex items-center px-3">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full text-white py-4 h-full outline-none ml-4 bg-transparent rounded-md"
                />
              </div>
            </div>

            <div className="py-2 grid">
              <label className="">Password</label>
              <div className="bg-transparent  border border-green-600 rounded-md  flex items-center px-3">
                <input
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full text-white h-full py-4 outline-none ml-1 bg-transparent rounded-md"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={handlePasswordToggle}
                >
                  <span>
                    {showPassword ? (
                      <FaEyeSlash className="text-white" />
                    ) : (
                      <FaEye className="text-white" />
                    )}
                  </span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit text-white ml-auto hover:underline pt-4 hover:text-green-600"
              >
                Forgot Password ?
              </Link>
            </div>
            <Button
              className="bg-transparent text-white px-6 py-6 w-full rounded-lg hover:scale-105 hover:bg-green-600 transition-all mx-auto mt-1 border border-green-600 flex items-center justify-center"
            >
              Sign up
            </Button>
          </form>
          <p className="py-4 text-white">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="hover:text-green-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
