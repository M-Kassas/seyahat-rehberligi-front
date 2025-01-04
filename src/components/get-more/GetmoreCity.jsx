import allData from "../../data/allData.json";

const GetmoreCity = ({feature, city}) => {
  let title;
  if (feature == "kesfedin") title = "Keşfedin";
  else if (feature == "hisset") title = "Hisset";
  else title = "Lezzet";

  return (
    <div className="text-white">
      <div
        className="w-full h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${city[feature+"Resim"]})`,
        }}
      ></div>
      <div className="w-full -mt-20 bg-gradient-to-r from-[#252525] flex flex-col">
        <div className="container mx-auto">
          <h1 className=" text-5xl pt-5">{title}</h1>
          <h4 className=" text-2xl mt-5 mb-5">{city.ad}</h4>
        </div>
        <div className="container mx-auto pr-4 md:pr-96 pb-10">
          {city[feature+"Metin"]}
        </div>
      </div>
    </div>
  );
};

export default GetmoreCity;
