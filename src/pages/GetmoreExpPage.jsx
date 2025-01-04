import { useContext, useEffect, useState } from "react";
import Getmore from "../components/get-more/GetmoreExp";
import Navbar from "../components/navbar/Navbar";
import { useParams } from "react-router";
import { ReactContext } from "../context/ReactContext";

const GetmoreExpPage = () => {
  const ctx = useContext(ReactContext);
  const {experienceitemid} = useParams();
  const [tecrubeBirim, setTecrubeBirim] = useState(null);

  useEffect(() => {
    (async function() {
      const response = await ctx.api.tecrubeBirimiGetir(experienceitemid);
      if (!response.error) {
        setTecrubeBirim(response.tecrubeBirimi);
      }
    })();
  }, [])


  return (
    <div className="bg-black">
      <Navbar />
      {tecrubeBirim && <Getmore birim={tecrubeBirim}/>}
    </div>
  );
};

export default GetmoreExpPage;
