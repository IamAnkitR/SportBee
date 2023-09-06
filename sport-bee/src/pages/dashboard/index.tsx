import React from "react";
import Articles from "../articles";
import Matches from "../matches";
import AccountLayout from "../../layouts/account";
import Favourites from "../user/Favourites";

const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />
      <div className="flex">
        <div>
          <Articles />
        </div>
        <Favourites />
      </div>
    </div>
  );
};

export default Dashboard;
