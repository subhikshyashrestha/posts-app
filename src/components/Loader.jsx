// src/components/Loader.jsx
import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return <p className="status">{message}</p>;
};

export default Loader;
