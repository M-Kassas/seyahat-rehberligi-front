import React from "react";
import Card from "../card/Card";
import allData from "../../data/allData.json";

const GastroCard = () => {
  return (
    <Card
      items={allData.gastro}
      linkPrefix="/experience/getmore"
      gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    />
  );
};

export default GastroCard;
