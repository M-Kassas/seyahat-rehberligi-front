import React from "react";
import { Link } from "react-router";

const Card = ({ items, linkPrefix, showMoreLink, moreText, gridCols }) => {
  return (
    <div className="my-[45px]">
      <div className={`gap-5 grid ${gridCols}`}>
        {items.map((item) => (
          <Link
            key={item.id}
            to={`${linkPrefix}/${item.id}`}
          >
            <div
              className="w-[200px] h-[280px] lg:w-[220px] lg:h-[310px] mr-5 mb-5 bg-cover bg-center rounded-3xl cursor-pointer flex items-center hover:opacity-100 ease-in-out duration-300 hover:scale-110"
              style={{ backgroundImage: `url(${item.resim})` }}
            >
              <p className="transform w-[184px] h-[184px] -rotate-90 text-white font-bold text-2xl">
                {item.ad}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {showMoreLink && (
        <div className="grid text-white justify-items-end items-center cursor-pointer mr-10">
          <Link to={showMoreLink}>
            <p>{moreText}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;
