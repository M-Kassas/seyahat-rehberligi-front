import React from "react";
import MainExperiencesCard from "./MainExperiencesCard";

const Experience = () => {
  return (
    <div className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <h3 className="text-6xl	text-white">Türkiye Deneyimleri</h3>
        <p className="text-white pt-[45px] max-w-[852px] text-center">
        Türkiye, hayalinizin ötesindeki sayısız yeri barındıran bir ülkedir! Antik kalıntılar, benzersiz güzellikler ve eşsiz destinasyonlarla dolu olan Türkiye'yi ziyaret etmek, unutulmaz bir deneyimdir
        </p>
        <div className="flex">
          <MainExperiencesCard />
        </div>
      </div>
    </div>
  );
};

export default Experience;
