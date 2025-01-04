import { useParams } from "react-router";
import allData from "../../data/allData.json";

const GetmoreExp = ({birim}) => {
  return (
    <div className="text-white">
      <div
        className="w-full h-[600px] bg-cover bg-center "
        style={{
          backgroundImage: `url(${birim.resim})`,
        }}
      ></div>
      <div className="w-full -mt-20 bg-gradient-to-r from-[#000000]">
        <div className="container mx-auto">
          <h1 className=" text-5xl pt-5 mb-5">{birim.ad}</h1>
        </div>
        <div className="container mx-auto pr-4 md:pr-96 pb-10">
          <pre className="text-wrap text-2xl font-sans">
            {birim.metin}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default GetmoreExp;
