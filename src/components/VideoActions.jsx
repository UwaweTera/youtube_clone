import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { formatNumber } from "../utils";
import { MdOutlineOutlinedFlag } from "react-icons/md";

const VideoActions = ({video, moreDropdownRef, toggleMore, toggleReportComment, isMoreOpen}) => {
  return (
    <div className="flex flex-wrap items-center mt-2">
      <div className="flex items-center mr-2 mb-2">
        <button className="flex items-center bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200">
          <AiOutlineLike className="text-xl mr-2" />
          <span className="text-sm font-medium">{formatNumber(video.statistics.likeCount)}</span>
        </button>
        <button className="flex items-center bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 ml-2">
          <AiOutlineDislike className="text-xl" />
        </button>
      </div>
      <button className="flex items-center bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 mr-2 mb-2">
        <PiShareFatThin className="text-xl mr-2" />
        <span className="text-sm font-medium">Share</span>
      </button>
      <div ref={moreDropdownRef} className="relative mb-2">
        <button
          onClick={toggleMore}
          className="flex items-center justify-center bg-gray-100 w-10 h-10 rounded-full hover:bg-gray-200"
        >
          <IoIosMore className="text-xl" />
        </button>
        {isMoreOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg py-2 z-50">
            <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
              <MdOutlineOutlinedFlag className="mr-2" />
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoActions;