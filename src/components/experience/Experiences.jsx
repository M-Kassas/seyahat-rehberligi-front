import { useParams } from "react-router";
import { experiences } from "../../data/experiences";
import SectionLeft from "./SectionLeft";

const Experiences = ({tecrube}) => {
  console.log(tecrube);
  console.log(tecrube.tecrubeBirimler);
  
  return (
    <>
      {tecrube.tecrubeBirimler.map(birim => {
        return <SectionLeft key={birim.id} id={birim.id} name={birim.ad} bg={birim.resim} p={birim.aciklama} />;
      })}
    </>
  );
};

export default Experiences;
