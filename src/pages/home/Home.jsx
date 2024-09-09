import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { formatDate, truncateString } from "../../utils";
import axios from "axios";
import SkeletonVideo from "../../components/SkeletonVideo";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=${process.env.YOUTUBE_API_KEY}`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // console.log('videos : ', videos)

  return (
    <div>
      <Sidebar>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12)
              .fill()
              .map((_, index) => (
                <SkeletonVideo key={index} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <Link to={`/${video.id.videoId}`} key={video.id.videoId} className="cursor-pointer">
                <div className="bg-gray-200 rounded-lg">
                  <img
                    alt={video.snippet.title}
                    className="rounded-lg mb-2 w-full"
                    src={video.snippet.thumbnails.medium.url}
                  />
                </div>
                <div className="flex p-2">
                  <div>
                    <div className="avatar">
                      <div className="w-8 sm:w-10 rounded-full">
                        <img
                          src={video.snippet.thumbnails.default.url}
                          className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 flex-1">
                    <h1 className="font-semibold text-base sm:text-lg leading-5 sm:leading-6">
                      {truncateString(video.snippet.title, 45)}
                    </h1>
                    <p className="text-sm sm:text-base">
                      {video.snippet.channelTitle}
                    </p>
                    <div className="flex flex-col sm:flex-row text-xs sm:text-sm">
                      <p className="mr-2">Views N/A</p>
                      <p>
                        {formatDistanceToNow(
                          new Date(video.snippet.publishedAt),
                          { addSuffix: true, includeSeconds: true }
                        ).replace(
                          /^(about|almost|over|under|less than|more than)\s/i,
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Sidebar>
    </div>
  );
};

export default Home;
