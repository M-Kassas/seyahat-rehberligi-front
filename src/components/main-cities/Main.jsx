import React from "react";
import MainCitiesCard from "./MainCitiesCard";
const Main = () => {
  return (
    <div id="main-section" className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <h3 className="text-6xl	text-white">Where to next?</h3>
        <p className="text-white pt-[45px] max-w-[852px] text-center">
          The Maiden’s Tower, Cappadocia’s fairy chimneys, or Sumela Monastery?
          There are so many places to see in Türkiye! Traveling in these magical
          lands, you will wish your trip could go on forever!
        </p>
        <div className="flex">
          <MainCitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Main;
