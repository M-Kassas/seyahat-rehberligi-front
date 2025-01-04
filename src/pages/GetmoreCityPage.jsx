import { useContext, useEffect, useState } from "react";
import GetmoreCity from "../components/get-more/GetmoreCity";
import Navbar from "../components/navbar/Navbar";
import { ReactContext } from "../context/ReactContext";
import { useParams } from "react-router";

const GetmoreCityPage = () => {
  const ctx = useContext(ReactContext);
  const {feature, cityid} = useParams();
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
      <GetmoreCity feature={feature} city={city}/>
    </div>
  );
};

export default GetmoreCityPage;
