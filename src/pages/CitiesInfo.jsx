import React from "react";
import CitiesLanding from "../components/cities-info/CitiesLanding";
import Cities from "../components/cities-info/Cities";
import Navbar from "../components/navbar/Navbar";

const CitiesInfo = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <CitiesLanding />
      <Cities />
    </div>
  );
};

export default CitiesInfo;
