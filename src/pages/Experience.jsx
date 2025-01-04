import React, { useContext, useEffect, useState } from "react";
import Experiences from "../components/experience/Experiences";
import Navbar from "../components/navbar/Navbar";
import { ReactContext } from "../context/ReactContext";
import { useParams } from "react-router";

const Experience = () => {
  const ctx = useContext(ReactContext);
  const {experienceid} = useParams();
  const [tecrube, setTecrube] = useState(null);

  useEffect(() => {
    (async function() {
      const response = await ctx.api.tecrubeGetir(experienceid);
      if (!response.error) {
        setTecrube(response.tecrube);
      }
    })();
  }, [])

  return (
    <div className="bg-black">
      <Navbar />
      {tecrube && <Experiences tecrube={tecrube} />}
    </div>
  );
};

export default Experience;
