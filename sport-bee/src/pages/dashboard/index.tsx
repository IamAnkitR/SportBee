import React from "react";
import Articles from "../articles";
import Matches from "../matches";
import AccountLayout from "../../layouts/account";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />
      <Articles />
    </div>
  );
};

export default Dashboard;
