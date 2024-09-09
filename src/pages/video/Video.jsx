import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { truncateString } from "../../utils";
import { formatDistanceToNow } from "date-fns";

export const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: "snippet,statistics",
              id: id,
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );
        setVideo(response.data.items[0]);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  // console.log("video", video);
  return (
    <div>
      <Sidebar>
        {video ? (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${id}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h2>{video.snippet.title}</h2>
            <div className="flex p-2">
              <div className=" flex items-center">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={video.snippet.thumbnails.default.url}
                      className="w-12 h-12 "
                    />
                  </div>
                </div>
              </div>
              <div className="px-2 flex-1">
                <h1 className="font-semibold text-base sm:text-lg leading-5 sm:leading-6">
                  {video.snippet.channelTitle}
                </h1>
                <p>
                  <span>11.2k</span> subscribers
                </p>
              </div>
            </div>
            <p>Views: {video.statistics.viewCount}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Sidebar>
    </div>
  );
};
