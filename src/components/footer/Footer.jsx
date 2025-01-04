import turkeyLogo from "../../assets/turkiye-logo.svg";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
const Footer = () => {
  return (
    <div className="bg-black">
      <div className="pt-[116px] container mx-auto flex flex-col justify-center items-center">
        <div className="cursor-pointer flex items-center justify-center">
          <img src={turkeyLogo} alt="turkey-logo" />
        </div>
        <div className="flex mt-5">
          <a href="https://github.com/KaganCubukcu" target="_blank">
            <img
              src={github}
              alt="github_icon"
              className="cursor-pointer mr-5"
            />
          </a>
          <a href="https://www.linkedin.com/in/kagancubukcu/" target="_blank">
            <img
              src={linkedin}
              alt="linkedin_icon"
              className="cursor-pointer"
            />
          </a>
        </div>
        <p className="text-white pt-[45px] max-w-[852px]">
          Created by Kağan Çubukçu
        </p>
      </div>
    </div>
  );
};

export default Footer;
