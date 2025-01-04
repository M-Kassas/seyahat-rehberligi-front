import React from "react";
import MainExperiencesCard from "./MainExperiencesCard";

const Experience = () => {
  return (
    <div className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <h3 className="text-6xl	text-white">Türkiye experiences</h3>
        <p className="text-white pt-[45px] max-w-[852px] text-center">
          Türkiye is home to infinite locations that are beyond your wildest
          dreams! Full of ancient sites, unique beauty, and unparalleled
          destinations, visiting Türkiye is an unforgettable experience.
        </p>
        <div className="flex">
          <MainExperiencesCard />
        </div>
      </div>
    </div>
  );
};

export default Experience;
