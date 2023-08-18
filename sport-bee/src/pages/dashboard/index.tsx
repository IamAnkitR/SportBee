import React from "react";
import Articles from "../articles";
import AccountLayout from "../../layouts/account";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100 pt-4">
      <AccountLayout />
      <div>
        <Articles />
      </div>
    </div>
  );
};

export default Dashboard;
