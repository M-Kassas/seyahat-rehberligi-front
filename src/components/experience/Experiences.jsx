import { useParams } from "react-router";
import { experiences } from "../../data/experiences";
import SectionLeft from "./SectionLeft";

const Experiences = () => {
  const { experienceName } = useParams();
  const findURL = (exp) => {
    return exp.URL === experienceName;
  };
  const data = experiences.find(findURL);

  return (
    <>
      {data.categories.map((x, i) => {
        return <SectionLeft key={i} name={x.name} bg={x.bg} p={x.p} />;
      })}
    </>
  );
};

export default Experiences;
