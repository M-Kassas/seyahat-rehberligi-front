import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { ReactContext } from "../context/ReactContext";

const Allcities = () => {
  const ctx = useContext(ReactContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async function() {
      const response = await ctx.api.sehirleriGetir();
      if (!response.error) {
        setCities(response.sehirler);
      }
    })();
  }, [])

  return (
    <div className="bg-black w-full h-full">
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container mx-auto pt-24">
        {cities.map((city) => (
          <Link key={city.id} to={`/cities/${city.id}`}>
            <div
              key={city.id}
              className="w-[200px] h-[280px] lg:w-[220px] h-[310px] mr-5 mb-5 bg-cover bg-center rounded-3xl cursor-pointer flex items-center hover:opacity-100 ease-in-out duration-300 hover:scale-110"
              style={{
                backgroundImage: `url(${city.resim})`,
              }}
            >
              <p className="transform w-[184px] h-[184px] -rotate-90 text-white font-bold text-2xl">
                {city.ad}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Allcities;
