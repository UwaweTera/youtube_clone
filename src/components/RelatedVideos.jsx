import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils";
import { PostedTime } from "../utils";

const RelatedVideos = ({ video }) => {
  console.log('related', video)
  const videoId = video?.id?.videoId || video?.id; 

  return (
    <>
      <Link
        to={`/${videoId}`}
        key={videoId}
        className="flex mb-4 cursor-pointer hover:bg-gray-100"
      >
        <div className="flex-shrink-0 mr-2">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-40 h-24 object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm line-clamp-2">
            {video.snippet.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {video.statistics?.viewCount
              ? `${formatNumber(video.statistics.viewCount)} views`
              : "N/A views"}
            {video.snippet.publishedAt &&
              ` • ${PostedTime(video.snippet.publishedAt)}`}
          </p>
        </div>
      </Link>
    </>
  );
};

export default RelatedVideos;
