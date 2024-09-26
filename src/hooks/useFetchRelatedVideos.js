import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchRelatedVideos = (videoId, videoTitle) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchRelatedVideos = useCallback(
    async (isLoadMore = false) => {
      if (!videoId && !videoTitle) return;
      try {
        setLoadingMore(true);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              type: "video",
              maxResults: 10,
              pageToken: isLoadMore ? nextPageToken : undefined,
              key: process.env.YOUTUBE_API_KEY,
              id: videoId,
              order: "viewCount",
            },
          }
        );
        const relatedVideos = response.data.items;

        const videoIds = relatedVideos
          .map((video) => video.id.videoId)
          .filter((id) => id)
          .join(",");

        if (videoIds.length > 0) {
          const videoDetailsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
              params: {
                part: "snippet,statistics",
                id: videoIds,
                key: process.env.YOUTUBE_API_KEY,
              },
            }
          );

          const fetchVideos = videoDetailsResponse.data.items;
          const uniqueVideos = fetchVideos.filter(
            (newVideo) =>
              !relatedVideos.some(
                (existingVideo) => existingVideo.id === newVideo.id
              ) &&
              newVideo.snippet.title.toLowerCase() !== videoTitle.toLowerCase()
          );
          setRelatedVideos((prevVideos) =>
            isLoadMore ? [...prevVideos, ...uniqueVideos] : uniqueVideos
          );
        }

        setNextPageToken(response.data.nextPageToken || null);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      } finally {
        setRelatedLoading(false);
        setLoadingMore(false);
      }
    },
    [videoId, videoTitle, nextPageToken, relatedVideos]
  );

  useEffect(() => {
    if (videoId || videoTitle) {
      fetchRelatedVideos(false);
    }
  }, [videoId, videoTitle]);

  return {
    relatedVideos,
    relatedLoading,
    loadingMore,
    fetchMoreRelatedVideos: () => fetchRelatedVideos(true),
  };
};
