import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);
  console.log(userData.id);
  console.log(userData.name);
  console.log(userData.email);

  const handleClick = async () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100 pt-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Dashboard
      </h1>
      <div className="flex-row  bg-gray-100 pt-4 border-2">
        <h2>Name = {userData.name}</h2>
        <h2>Email = {userData.email}</h2>
      </div>
      <Link to="/signin" id="logout-link">
        <button onClick={handleClick} className="logOut" id="logOut">
          Log Out
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
