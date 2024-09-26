import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const SearchPage = () => {
    const [serachParams] = useSearchParams()
    const searchQuery = serachParams.get("q");

  // Sample static data
  const sampleVideos = [
    {
      id: { videoId: "1" },
      snippet: {
        title: "Sample Video 1",
        channelTitle: "Channel 1",
        thumbnails: {
          medium: { url: "https://via.placeholder.com/320x180" },
          default: { url: "https://via.placeholder.com/88x88" },
        },
        publishedAt: "2023-05-01T12:00:00Z",
      },
      statistics: { viewCount: "1000000" },
    },
    {
      id: { videoId: "2" },
      snippet: {
        title: "Sample Video 2",
        channelTitle: "Channel 2",
        thumbnails: {
          medium: { url: "https://via.placeholder.com/320x180" },
          default: { url: "https://via.placeholder.com/88x88" },
        },
        publishedAt: "2023-05-02T14:30:00Z",
      },
      statistics: { viewCount: "500000" },
    },
    // Add more sample videos as needed
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
  };

  const formatDistanceToNow = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  return (
    <div>
      <Sidebar>
        <div className="">
          {sampleVideos.map((video) => (
            <Link
              to={`#`}
              key={video.id.videoId}
              className="cursor-pointer grid grid-cols-3 w-full gap-x-2"
            >
              <div className="bg-gray-200 rounded-lg h-60 col-span-1 my-2">
                <img
                  alt={video.snippet.title}
                  className="rounded-lg mb-2 w-full h-full object-cover col-span-2"
                  src={video.snippet.thumbnails.medium.url}
                />
              </div>
              <div className=" py-3 px-2">
                <h3 className="text-lg font-semibod text-gray-900 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>
                    {formatNumber(video.statistics?.viewCount) || "N/A"} views
                  </span>
                  <span className="mx-1">•</span>
                  <span>{formatDistanceToNow(video.snippet.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1 my-3">
                  <div className="w-8 sm:w-6 h-8 sm:h-6 rounded-full overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.channelTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-500 ">
                    {video.snippet.channelTitle}
                  </p>
                </div>
                <p className="text-xs text-gray-500">some description</p>
              </div>
            </Link>
          ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default SearchPage;
