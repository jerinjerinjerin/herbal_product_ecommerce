import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import backendDomin from "../../commen/api";
import ROLE from "../../commen/role";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";

const ChangeUserRole = ({ userId, name, email, role, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `${backendDomin}/api/update-user`,
        {
          role: userRole,
          userId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast(response.data.message);
        callFunc();
        onClose(); // Close the modal after successful update
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-full z-10 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-gray-950 shadow-sm text-white shadow-green-300 p-4 w-full max-w-sm rounded-md">
        <button className="block ml-auto" onClick={onClose} disabled={loading}>
          <IoMdClose className="hover:text-red-600 text-red-900  font-semibold text-xl" />
        </button>
        <h1 className="pb-4 text-lg font-medium text-white">
          Change User Role
        </h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1 bg-white text-black"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          onClick={updateUserRole}
          className={`w-fit mx-auto block p-2 px-3 text-white bg-transparent hover:bg-green-800 border border-green-600 ${
            loading ? "bg-gray-600" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Role"}
        </Button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
