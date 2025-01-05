import React from "react";
import MainCitiesCard from "./MainCitiesCard";
const Main = () => {
  return (
    <div id="main-section" className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <h3 className="text-6xl	text-white">Nereye gitmek İstersiniz?</h3>
        <p className="text-white pt-[45px] max-w-[852px] text-center">
        Türkiye'de görülecek o kadar çok yer var ki! Bu büyülü topraklarda seyahat ederken, seyahatinizin sonsuza kadar sürmesini dileyeceksiniz!
        </p>
        <div className="flex">
          <MainCitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Main;
