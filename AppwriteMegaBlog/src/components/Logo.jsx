import React from "react";
import logo from "../assets/logo.png";
function Logo({ width = "100px" }) {
  return (
    <img src={logo} alt="Logo" height={20} width={40} className="rounded-lg" />
  );
}

export default Logo;
