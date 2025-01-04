import React from "react";
import Card from "../card/Card";
import allData from "../../data/allData.json";

const MainCitiesCard = () => {
  return (
    <Card
      items={allData.cities}
      linkPrefix="/cities"
      showMoreLink="/All-cities"
      moreText="More Cities"
      gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    />
  );
};

export default MainCitiesCard;
