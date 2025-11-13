import React from "react";
import Wallet from "./wallet";
import Beneficiaries from "./Beneficiaries";
import Transactions from "./Transactions";

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Wallet />
      <Beneficiaries />
      <Transactions />
    </div>
  );
};

export default UserDashboard;
