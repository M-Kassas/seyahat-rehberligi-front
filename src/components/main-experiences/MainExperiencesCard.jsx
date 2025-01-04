import React from "react";
import Card from "../card/Card";
import allData from "../../data/allData.json";

const MainExperiencesCard = () => {
  return (
    <Card
      items={allData.experiences}
      linkPrefix="/experience"
      showMoreLink="/All-experiences"
      moreText="More Experiences"
      gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    />
  );
};

export default MainExperiencesCard;
