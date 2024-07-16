import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import backendDomin from "@/commen/api";
import ChangeUserRole from "@/compounts/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/all-users`, {
        withCredentials: "include",
      });
      if (response.data.success) {
        setAllUsers(response.data.users);
      } else {
        console.log("Failed to fetch users:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <motion.div
      className="bg-slate-900 bg-opacity-35 rounded-md pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
      }}
    >
      <h1>All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="text-white">
            <tr>
              <th className="border border-green-600 text-center">ID</th>
              <th className="border border-green-600 text-center">Name</th>
              <th className="border border-green-600 text-center">Email</th>
              <th className="border border-green-600 text-center">Role</th>
              <th className="border border-green-600 text-center">
                Created Date
              </th>
              <th className="border border-green-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {Array.isArray(allUsers) ? (
              allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="border border-green-600 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-green-600 text-center">
                    {user?.name}
                  </td>
                  <td className="border border-green-600 text-center">
                    {user?.email}
                  </td>
                  <td
                    className={`border border-green-600${
                      user?.role === "ADMIN" ? " text-blue-600" : "text-white"
                    } text-center`}
                  >
                    {user?.role}
                  </td>

                  <td className="border border-green-600 text-center">
                    {moment(user?.createdAt).format("ll")}
                  </td>
                  <td className="border border-green-600 text-center">
                    <button
                      onClick={() => {
                        setUpdateUserDetails(user);
                        setOpenUpdate(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-green-600 text-center">
                  Error loading users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openUpdate && (
        <ChangeUserRole
          onClose={() => setOpenUpdate(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </motion.div>
  );
};

export default AllUsers;
