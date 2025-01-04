import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { cities } from "../../data/cities";

const CitiesLanding = () => {
  const { cityname } = useParams();

  return (
    <div className="text-white w-full h-full">
      {cities.map(({ name, id, p, video }) =>
        name === cityname ? (
          <div
            key={id}
            className="flex flex-col container mx-auto pt-10 lg:pt-60 lg:flex-row"
          >
            <div className="flex flex-col justify-center w-full lg:w-1/2">
              <h1 className="text-4xl lg:text-8xl">{name}</h1>
              <p className="pt-10">{p}</p>
            </div>
            <div className="flex justify-center items-center w-full lg:w-1/2 lg:ml-10">
              <ReactPlayer url={video} muted className="w-full" height={731} />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CitiesLanding;
