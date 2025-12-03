import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { HiOutlineUsers, HiOutlineAcademicCap } from "react-icons/hi";
import { RiLiveLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import DefaultImage from "../../../assets/Images/8.jpg";

const ClassCard = ({ data, link }) => {
  const {
    subject_id,
    title,
    name,
    enroll,
    class: level,
    type,
    rating,
    ratingNo,
    country,
    amount,
    negotiable,
    headerImageVideo,
  } = data;

  const priceText =
    Number(amount) > 0 ? negotiable || "Negotiable" : "Free";

  const finalImage = headerImageVideo ? headerImageVideo : DefaultImage;

  return (
    <Link
      to={link || `/details/${subject_id}`}
      className="block rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all"
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={finalImage}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h2 className="text-[18px] font-semibold text-[#1a1a1a] leading-6 line-clamp-1">
          {title}
        </h2>

        {/* Teacher + Enroll */}
        <div className="mt-3 flex items-center justify-between text-[13px] text-gray-700">
          <span className="flex items-center gap-2">
            <FiUser className="text-gray-600" />
            <span className="truncate">{name}</span>
          </span>

          <span className="flex items-center gap-2">
            <HiOutlineUsers className="text-gray-600" />
            <span>{enroll}</span>
          </span>
        </div>

        {/* Level + Type */}
        <div className="mt-2 flex items-center justify-between text-[13px] text-gray-700">
          <span className="flex items-center gap-2">
            <HiOutlineAcademicCap className="text-gray-600" />
            <span>{level}</span>
          </span>

          <span className="flex items-center gap-2">
            <RiLiveLine className="text-gray-600" />
            <span>{type}</span>
          </span>
        </div>

        {/* Rating + Price Type */}
        <div className="mt-2 flex items-center justify-between text-[13px] text-gray-700">
          <span className="flex items-center gap-1">
            <AiFillStar className="text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500">({ratingNo})</span>
          </span>

          <span className="text-gray-700">{priceText}</span>
        </div>

        {/* Price + Country */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-700 font-extrabold tracking-wide">
            BDT{" "}
            {Number(amount || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <p className="text-gray-700">{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
