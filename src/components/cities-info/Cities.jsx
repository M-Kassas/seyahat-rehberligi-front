import { Link, useParams } from "react-router";
import { cities } from "../../data/cities";

const CitiesSee = ({city}) => {
  
  return (
    <div>
      <div>
        <div
          className="bg-cover bg-center text-white sticky top-0 h-[1080px]"
          style={{
            backgroundImage: `url(${city.kesfedinResim})`,
          }}
        >
          <div className="w-full md:w-[654px] h-full flex flex-col justify-center px-4 md:pl-[120px] bg-gradient-to-r from-[#252525]">
            <h1 className="text-4xl md:text-8xl">Keşfedin</h1>
            <p className="mt-5 mb-10 md:mt-[30px] md:mb-[60px]">
              {city.kesfedinAciklama}
            </p>
            <Link to={`/cities/getmore/kesfedin/${city.id}`}>
              <button className="bg-black flex justify-center items-center rounded-xl w-[100px] h-[40px] hover:bg-white hover:text-black ease-in-out duration-300 ">
                Fazla Bilgi
              </button>
            </Link>
          </div>
        </div>

        <div
          className=" bg-cover bg-center text-white flex justify-end sticky top-0 h-[1080px]"
          style={{
            backgroundImage: `url(${city.hissetResim})`,
          }}
        >
          <div className="w-full md:w-[654px] h-full flex flex-col justify-center px-4 md:pr-[120px] bg-gradient-to-l from-[#252525]">
            <h1 className="text-4xl md:text-8xl">Hisset</h1>
            <p className="mt-5 mb-10 md:mt-[30px] md:mb-[60px]">
              {city.hissetAciklama}
            </p>
            <Link to={`/cities/getmore/hisset/${city.id}`}>
              <button className="bg-main-bg flex justify-center items-center rounded-xl w-[100px] h-[40px] hover:bg-[#2a2a2a] ease-in-out duration-300 ">
                Fazla Bilgi
              </button>
            </Link>
          </div>
        </div>

        <div
          className="bg-cover bg-center text-white sticky top-0 h-[1080px]"
          style={{
            backgroundImage: `url(${city.lezzetResim})`,
          }}
        >
          <div className="w-full md:w-[654px] h-full flex flex-col justify-center px-4 md:pl-[120px] bg-gradient-to-r from-[#252525]">
            <h1 className="text-4xl md:text-8xl">Lezzet</h1>
            <p className="mt-5 mb-10 md:mt-[30px] md:mb-[60px]">
              {city.lezzetAciklama}
            </p>
            <Link to={`/cities/getmore/lezzet/${city.id}`}>
              <button className="bg-main-bg flex justify-center items-center rounded-xl w-[100px] h-[40px] hover:bg-[#2a2a2a] ease-in-out duration-300 ">
                Fazla Bilgi
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitiesSee;
