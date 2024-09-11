import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchChannelInfo = (channelId) => {
  const [channelInfo, setChannelInfo] = useState(null);

  const fetchChannelInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            part: "snippet,statistics",
            id: channelId,
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );
      setChannelInfo(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching channel info:", error);
    }
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      fetchChannelInfo();
    }
  }, [fetchChannelInfo, channelId]);

  return channelInfo;
};
