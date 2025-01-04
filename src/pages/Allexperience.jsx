import React from "react";
import { Link } from "react-router";
import allData from "../data/allData.json";
import Navbar from "../components/navbar/Navbar";

const Allexperience = () => {
  return (
    <div className="bg-black w-full h-full ">
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container mx-auto pt-24">
        {allData.experiences.map((experience) => (
          <Link
            key={experience.id}
            to={`/experience/${experience.name.replace(/\s/g, "")}`}
          >
            <div
              key={experience.id}
              className="w-[200px] h-[280px] lg:w-[220px] h-[310px] mr-5 mb-5 bg-cover bg-center rounded-3xl cursor-pointer flex items-center hover:opacity-100 ease-in-out duration-300 hover:scale-110"
              style={{ backgroundImage: `url(${experience.background})` }}
            >
              <p className="transform w-[184px] h-[184px] -rotate-90 text-white font-bold text-2xl">
                {experience.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Allexperience;
