import React, { useContext, useEffect, useState } from "react";
import CitiesLanding from "../components/cities-info/CitiesLanding";
import Cities from "../components/cities-info/Cities";
import Navbar from "../components/navbar/Navbar";
import { useParams } from "react-router";
import { ReactContext } from "../context/ReactContext";

const CitiesInfo = () => {
  const ctx = useContext(ReactContext);
  const {cityid} = useParams();
  const [city, setCity] = useState({});

  useEffect(() => {
    (async function() {
      const response = await ctx.api.sehirGetir(cityid);
      if (!response.error) {
        console.log(response);
        setCity(response.sehir);
      }
    })();
  }, [])
  
  return (
    <div className="bg-black">
      <Navbar />
      <CitiesLanding city={city}/>
      <Cities city={city}/>
    </div>
  );
};

export default CitiesInfo;
