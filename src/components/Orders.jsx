import React from "react";
import Cards from "./Cards/Cards";
import Table from "./Table/OrderTable";
import "./Clients.css";
const Orders = () => {
  return (
    <div className="Orders">
      <h1>Orders</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default Orders;