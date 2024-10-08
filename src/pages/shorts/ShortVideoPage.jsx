import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function ShortVideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [error, setError] = useState(null);

  // fetch shorts
  const fetchVideos = async (pageToken = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            maxResults: 1, 
            q: "shorts", 
            type: "video",
            videoDuration: "short",
            pageToken: pageToken,
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );
      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
    setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error("Error fetching shorts:", error);
      setError("An error occurred while fetching shorts.");
    } finally {
      setLoading(false);
    }
  };
  console.log(videos);
  useEffect(() => {
    fetchVideos();
  }, []);

  const loadNextVideo = () => {
    if (!loading && nextPageToken) {
      fetchVideos(nextPageToken);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Sidebar>
      {videos.map((short, index) => (
        <div
          key={index}
          className="short-container h-[100vh] border flex items-center justify-center"
        >
          <div>
            <iframe
              width="315"
              // height="560"
              src={`https://www.youtube.com/embed/${short.id.videoId}`}
              title={short.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[100%]"
            ></iframe>
            <h3>{short.snippet.title}</h3>
            <p>{short.snippet.channelTitle}</p>
            <button onClick={loadNextVideo} className="bg-red-400">Next Video</button>
          </div>
        </div>
      ))}
    </Sidebar>
  );
}

export default ShortVideoPage;
