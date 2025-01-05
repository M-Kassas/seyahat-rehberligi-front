import React, { useContext, useEffect, useState } from "react";
import Card from "../card/Card";
import { ReactContext } from "../../context/ReactContext";

const MainCitiesCard = () => {
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
    <Card
      items={cities}
      linkPrefix="/cities"
      showMoreLink="/All-cities"
      moreText="Fazla Şehirler"
      gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    />
  );
};

export default MainCitiesCard;
