import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { formatNumber } from "../../utils";
import axios from "axios";
import SkeletonVideo from "../../components/SkeletonVideo";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef();

  const fetchVideos = async (isLoadMore = false) => {
    try {
      setLoadingMore(true);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: "snippet,statistics",
            chart: "mostPopular",
            maxResults: 12,
            pageToken: isLoadMore ? nextPageToken : undefined,
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );
      if (isLoadMore) {
        setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      } else {
        setVideos(response.data.items);
      }
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      setError("An error occurred while fetching videos.");
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load videos initially
  useEffect(() => {
    fetchVideos(false);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loadingMore) {
          fetchVideos(true);
        }
      },
      { threshold: 1.0 } // Trigger when observerRef is fully visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [nextPageToken, loadingMore]);

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
        ) : error ? (
          <div className="text-center text-red-600 font-bold bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 shadow-md mx-auto max-w-2xl my-8">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <Link
                  to={`/${video.id}`}
                  key={video.id.videoId}
                  className="cursor-pointer"
                >
                  <div className="bg-gray-200 rounded-lg h-44">
                    <img
                      alt={video.snippet.title}
                      className="rounded-lg mb-2 w-full h-full object-cover"
                      src={video.snippet.thumbnails.medium.url}
                    />
                  </div>
                  <div className="flex p-2">
                    <div className="flex-shrink-0">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden">
                        <img
                          src={video.snippet.thumbnails.default.url}
                          alt={video.snippet.channelTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {video.snippet.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {video.snippet.channelTitle}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>
                          {formatNumber(video.statistics?.viewCount) || "N/A"}{" "}
                          views
                        </span>
                        <span className="mx-1">•</span>
                        <span>
                          {formatDistanceToNow(
                            new Date(video.snippet.publishedAt),
                            {
                              addSuffix: true,
                              includeSeconds: true,
                            }
                          ).replace(
                            /^(about|almost|over|under|less than|more than)\s/i,
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div ref={observerRef} className="h-10"></div>
            {loadingMore && (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-r-2 border-gray-400"></div>
              </div>
            )}
          </>
        )}
      </Sidebar>
    </div>
  );
};

export default Home;
