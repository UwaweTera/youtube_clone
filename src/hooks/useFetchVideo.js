import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchVideo = (id) => {
  const [video, setVideo] = useState(null);
  
  const fetchVideo = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return video;
};
