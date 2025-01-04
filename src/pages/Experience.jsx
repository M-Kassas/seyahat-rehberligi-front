import React from "react";
import ExperienceLanding from "../components/experience/ExperienceLanding";
import Experiences from "../components/experience/Experiences";
import Navbar from "../components/navbar/Navbar";

const Experience = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <ExperienceLanding />
      <Experiences />
    </div>
  );
};

export default Experience;
