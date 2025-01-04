import React from "react";
import Navbar from "../navbar/Navbar";

const Landing = () => {
  const handleScroll = () => {
    const element = document.getElementById("main-section");
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="h-screen relative">
      <img
        src="https://images.unsplash.com/photo-1583060759195-b109e4cd6166?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="landing1"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <Navbar />
      <div className="flex justify-center flex-col items-center h-screen z-10 absolute inset-0">
        <h1 className="text-white text-3xl md:text-4xl lg:text-8xl font-bold text-center px-4">
          TÜRKİYE
        </h1>
        <h2 className="text-white pt-5 text-xl md:text-2xl lg:text-5xl text-center">
          The <span className="italic">new</span> dawn of journey
        </h2>
        <div className="absolute bottom-10">
          <button
            className="rounded-full border border-white p-3 hover:bg-white hover:text-black text-white transition duration-300"
            onClick={handleScroll}
          >
            Scroll Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
