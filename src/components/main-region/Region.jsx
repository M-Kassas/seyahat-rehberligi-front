import Card from "./Card";
const Region = () => {
  return (
    <div className="bg-main-bg">
      <div className="pt-[116px] container mx-auto ">
        <h3 className="text-6xl	text-white">Geographical regions of Türkiye</h3>
        <p className="text-white pt-[45px] max-w-[852px]">
          Türkiye is home to infinite locations that are beyond your wildest
          dreams! Full of ancient sites, unique beauty, and unparalleled
          destinations, visiting Türkiye is an unforgettable experience.
        </p>
        <div className="flex">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Region;
