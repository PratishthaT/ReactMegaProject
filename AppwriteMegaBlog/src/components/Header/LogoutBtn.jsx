import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("Logged Out Successfully!");
      navigate("/login");
    });
  };

  return (
    <button
      className="flex justify-center font-bold items-center px-6 py-2 duration-200 hover:text-blue-700 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
