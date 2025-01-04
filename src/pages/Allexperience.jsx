import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { ReactContext } from "../context/ReactContext";

const Allexperience = () => {
  const ctx = useContext(ReactContext);
  const [tecrubeler, setTecrubeler] = useState([]);

  useEffect(() => {
    (async function() {
      const response = await ctx.api.tecrubeleriGetir();
      if (!response.error) {
        setTecrubeler(response.tecrubeler);
      }
    })();
  }, [])

  return (
    <div className="bg-black w-full h-full ">
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container mx-auto pt-24">
        {tecrubeler.map((tecrube) => (
          <Link
            key={tecrube.id}
            to={`/experience/${tecrube.id}`}
          >
            <div
              key={tecrube.id}
              className="w-[200px] h-[280px] lg:w-[220px] h-[310px] mr-5 mb-5 bg-cover bg-center rounded-3xl cursor-pointer flex items-center hover:opacity-100 ease-in-out duration-300 hover:scale-110"
              style={{ backgroundImage: `url(${tecrube.resim})` }}
            >
              <p className="transform w-[184px] h-[184px] -rotate-90 text-white font-bold text-2xl">
                {tecrube.ad}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Allexperience;
