import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../helpers/ImageIoBase64";
import { validateEmail } from "../commen/helper";
import backendDomain from "../commen/api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilePic: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data.name.trim()) {
        setError("Name is required");
        return;
      }

      if (!validateEmail(data.email)) {
        setError("Email is not valid");
        return;
      }

      if (!data.password.trim()) {
        setError("Password is required");
        return;
      }

      if (data.password !== data.confirmpassword) {
        setError("Passwords do not match");
        return;
      }

      setError("");

      const response = await axios.post(
        `${backendDomain}/api/create-user`,
        data
      );
      toast.success(response.data.message);
      navigator("/login");
      setData({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        profilePic: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("No response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-slate-900 bg-opacity-30 p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div className="">
              <img
                src={data.profilePic || loginImage}
                alt="login-image"
                className="object-cover"
              />
            </div>
            <form>
              <label>
                <div className="text-xs cursor-pointer z-1 font-semibold bg-opacity-50 text-black py-5 text-center bg-slate-300 absolute bottom-0 w-full">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="py-5 flex flex-col gap-3">
            <div className="grid py-2">
              <label className="">Name</label>
              <div className="bg-transparent border border-green-600 rounded-md">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter name"
                  autoComplete="off"
                  className="w-full text-white py-4 h-full outline-none ml-4 bg-transparent rounded-md"
                />
              </div>
            </div>

            <div className="grid py-2">
              <label className="">Email</label>
              <div className="bg-transparent border border-green-600 rounded-md">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full py-4 text-white h-full outline-none ml-4 bg-transparent rounded-md"
                />
              </div>
            </div>

            <div className="py-2 grid">
              <label className="">Password</label>
              <div className="bg-transparent  border border-green-600 rounded-md flex items-center px-3">
                <input
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-full py-4 text-white outline-none ml-1 bg-transparent rounded-md"
                />
                <div className="cursor-pointer text-xl" onClick={handlePasswordToggle}>
                  <span>{showPassword ? <FaEyeSlash className="text-white"/> : <FaEye className="text-white"/>}</span>
                </div>
              </div>
            </div>

            <div className="py-2 grid">
              <label className="">Confirm password</label>
              <div className="bg-transparent border border-green-600 rounded-md flex items-center px-3">
                <input
                  name="confirmpassword"
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm password"
                  className="w-full h-full py-4 text-white outline-none ml-1 bg-transparent rounded-md"
                />
                <div className="cursor-pointer text-xl" onClick={handleConfirmPasswordToggle}>
                  <span>{showConfirmPassword ? <FaEyeSlash className="text-white"/> : <FaEye className="text-white"/>}</span>
                </div>
              </div>
              <div className="py-2">
                {error && <div className="text-red-500">{error}</div>}
              </div>
              <Link to={"/forgot-password"} className="block text-white w-fit ml-auto hover:underline pt-2 hover:text-green-600">
                Forgot Password ?
              </Link>
            </div>
            <Button className="bg-transparent text-white px-6 py-6 w-full rounded-lg hover:scale-105 hover:bg-green-600 transition-all mx-auto mt-1 border border-green-600 flex items-center justify-center">
              Sign up
            </Button>
          </form>
          <p className="py-4 text-white">
            Already have an account ?{" "}
            <Link to={"/login"} className="hover:text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
