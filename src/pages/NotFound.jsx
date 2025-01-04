import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
