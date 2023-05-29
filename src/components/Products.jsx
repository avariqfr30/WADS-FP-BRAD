import React from "react";
import Cards from "./Cards/Cards";
import Table from "./Table/ProductTable";
import "./Products.css";
const Products = () => {
  return (
    <div className="Products">
      <h1>Products</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default Products;