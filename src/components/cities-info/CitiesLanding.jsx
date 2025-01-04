import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { cities } from "../../data/cities";

const CitiesLanding = () => {
  const { cityname } = useParams();

  return (
    <div className="text-white w-full h-full">
      {cities.map(({ name, id, p, video }) =>
        name === cityname ? (
          <div key={id} className="flex flex-col mx-auto pt-10 lg:pt-60">
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-4xl lg:text-8xl">{name}</h1>
              <p className="py-24 text-center container">{p}</p>
            </div>
            <div className="flex justify-center items-center w-full">
              <ReactPlayer
                url={video}
                muted
                className="w-full"
                height={731}
                width={1280}
              />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CitiesLanding;
