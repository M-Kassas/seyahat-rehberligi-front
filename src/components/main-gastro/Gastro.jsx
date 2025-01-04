import GastroCard from "./GastroCard";

const Gastro = () => {
  return (
    <div className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <h3 className="text-6xl	text-white">A wonderland of tastes</h3>
        <p className="text-white pt-[45px] max-w-[852px] text-center">
          Türkiye is home to the freshest and tastiest fruits and vegetables
          since it enjoys a temperate climate with all four seasons. The food
          here is mind-blowing! It is a true culinary paradise!
        </p>
        <div className="flex">
          <GastroCard />
        </div>
      </div>
    </div>
  );
};

export default Gastro;
