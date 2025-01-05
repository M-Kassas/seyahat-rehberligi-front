import React, { useContext, useEffect, useState } from "react";
import Card from "../card/Card";
import allData from "../../data/allData.json";
import { ReactContext } from "../../context/ReactContext";

const MainExperiencesCard = () => {
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
    <Card
      items={tecrubeler}
      linkPrefix="/experience"
      showMoreLink="/All-experiences"
      moreText="Fazla Deneyimler"
      gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    />
  );
};

export default MainExperiencesCard;
