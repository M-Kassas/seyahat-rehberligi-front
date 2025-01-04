import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { cities } from "../../data/cities";

const CitiesLanding = ({city}) => {
  return (
    <div className="text-white w-full h-full">
      <div className="flex flex-col mx-auto pt-10 lg:pt-60">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl lg:text-8xl">{city.ad}</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <ReactPlayer
            url={city.video}
            muted
            className="w-full"
            height={731}
            width={1280}
          />
        </div>
      </div>
    </div>
  );
};

export default CitiesLanding;
