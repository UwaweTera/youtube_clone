import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import SearchResultSkeleton from "../../components/SearchResultSkeleton";
import { formatNumber, PostedTime, truncateString } from "../../utils";
import Description from "../../components/Description";

const SearchPage = () => {
  const [serachParams] = useSearchParams();
  const searchQuery = serachParams.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef();
  const [error, setError] = useState(null);
  const fetchSearchResults = async (isLoadMore = false) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const searchResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 10,
            q: searchQuery,
            type: "video",
            pageToken: isLoadMore ? nextPageToken : undefined,
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );

      const videoIds = searchResponse.data.items
        .map((video) => video.id.videoId)
        .filter((id) => id) // Remove any undefined or null ids
        .join(",");

      if (videoIds.length > 0) {
        // Fetch video statistics (including view count) for each video
        const videoDetailsResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet,statistics",
              id: videoIds,
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );

        if (isLoadMore) {
          setSearchResults((prevResults) => {
            const newResults = videoDetailsResponse.data.items;
            const uniqueNewResults = newResults.filter(
              (newVideo) =>
                !prevResults.some(
                  (existingVideo) => existingVideo.id.videoId === newVideo.id
                )
            );
            return [...prevResults, ...uniqueNewResults];
          });
        } else {
          setSearchResults(videoDetailsResponse.data.items);
        }
        setNextPageToken(searchResponse.data.nextPageToken);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);
  // Sample static data

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loadingMore) {
          fetchSearchResults(true);
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
  // console.log(searchResults);
  // if error
  if (error) {
    return (
      <div>
        <Sidebar>
          {Array(5)
            .fill()
            .map((_, index) => (
              <SearchResultSkeleton key={index} />
            ))}
        </Sidebar>
      </div>
    );
  }

  return (
    <div>
      <Sidebar>
        <div className="">
          {loading ? (
            Array(5)
              .fill()
              .map((_, index) => <SearchResultSkeleton key={index} />)
          ) : (
            <>
              {searchResults.map((video) => (
                <Link
                  to={`/${video.id}`}
                  key={video.id.videoId}
                  className="cursor-pointer grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-4 w-full"
                >
                  <div
                    className="bg-gray-200 rounded-lg h-48 sm:h-72 my-2"
                  >
                    <img
                      alt={video.snippet.title}
                      className="rounded-lg mb-2 w-full h-full object-cover"
                      src={video.snippet.thumbnails.high.url}
                    />
                  </div>
                  <div className="py-3 px-2 sm:col-span-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                      {video.snippet.title}
                    </h3>
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-2 gap-y-1">
                      <span>
                        {formatNumber(video.statistics?.viewCount) || "N/A"} views
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>{PostedTime(video.snippet.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-x-2 my-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                        <img
                          src={video.snippet.thumbnails.default.url}
                          alt={video.snippet.channelTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {video.snippet.channelTitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      <Description
                        text={video.snippet.localized.description}
                        truncate={true}
                      />
                    </p>
                  </div>
                </Link>
              ))}

              <div ref={observerRef} className="h-10"></div>
              {loadingMore && (
                <div className="flex justify-center items-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-r-2 border-gray-400"></div>
                </div>
              )}
            </>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default SearchPage;
