import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { set } from "date-fns";

export const useFetchComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [LoadingMore, setLoadingMore] = useState(false);

  const fetchComments = useCallback(
    async (isLoadMore = false) => {
      if (isLoadMore && !nextPageToken) {
        // If trying to load more but no nextPageToken is available, do nothing
        return;
      }

      try {
        setLoadingMore(true);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads`,
          {
            params: {
              part: "snippet",
              videoId: videoId,
              pageToken: isLoadMore ? nextPageToken : undefined,
              maxResults: 20,
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );

        const newComments = response.data.items;

        if (isLoadMore) {
          setComments((prevComments) => [...prevComments, ...newComments]);
        } else {
          setComments(newComments);
        }
        setNextPageToken(response.data.nextPageToken);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoadingMore(false);
        setLoading(false);
      }
    },
    [videoId, nextPageToken]
  );

  useEffect(() => {
    if (videoId) {
      fetchComments(false);
    }
  }, [videoId]);

  return {
    comments,
    Loading,
    LoadingMore,
    fetchComments,
    fetchMoreComments: () => fetchComments(true),
  };
};
