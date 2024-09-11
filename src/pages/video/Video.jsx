import React, { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatNumber, PostedTime, truncateString } from "../../utils";
import Description from "../../components/Description";
import VideoSkeleton from "../../components/VideoSkeleton";
import RelatedVideos from "../../components/RelatedVideos";
import Comments from "../../components/Comments";
import VideoActions from "../../components/VideoActions";
import { useFetchVideo } from "../../hooks/useFetchVideo";
import { useFetchRelatedVideos } from "../../hooks/useFetchRelatedVideos";
import { useFetchComments } from "../../hooks/useFetchComments";
import { useFetchChannelInfo } from "../../hooks/useFetchChannelInfo";

export const Video = () => {
  const { id } = useParams();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [openReportCommentId, setOpenReportCommentId] = useState(null);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const moreDropdownRef = useRef(null);
  const descriptionRef = useRef(null);

  const observerRef = useRef();
  const commentObserverRef = useRef();

  // call custom hooks

  const video = useFetchVideo(id);
  const channelInfo = useFetchChannelInfo(video?.snippet?.channelId);
  const { relatedVideos, relatedLoading, loadingMore, fetchMoreRelatedVideos } =
    useFetchRelatedVideos(id, video?.snippet?.title);
  const {
    comments,
    loadingMore: loadingMoreComments,
    fetchMoreComments,
    fetchComments,
  } = useFetchComments(id);

  // Fetch comments and related videos when the video ID changes
  useEffect(() => {
    if (id) {
      fetchComments(false);
    }
  }, [id]);

  // Toggle dropdown
  const toggleMore = useCallback(() => {
    setIsMoreOpen((prev) => !prev);
  }, []);

  // Toggle description
  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  // Toggle reply section
  const toggleReply = useCallback((commentId) => {
    setOpenReplyId((prev) => (prev === commentId ? null : commentId));
  }, []);

  // Toggle report comment
  const toggleReportComment = useCallback((commentId) => {
    setOpenReportCommentId((prev) => (prev === commentId ? null : commentId));
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setIsMoreOpen(false);
        setOpenReportCommentId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Infinite scrolling for related videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchMoreRelatedVideos();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchMoreRelatedVideos, loadingMore]);

  // Infinite scrolling for comments
  useEffect(() => {
    const commentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMoreComments) {
          fetchMoreComments();
        }
      },
      { threshold: 1.0 }
    );

    if (commentObserverRef.current) {
      commentObserver.observe(commentObserverRef.current);
    }

    return () => {
      if (commentObserverRef.current) {
        commentObserver.unobserve(commentObserverRef.current);
      }
    };
  }, [fetchMoreComments, loadingMoreComments]);

  return (
    <>
      <Sidebar>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 py-3">
            {!video ? (
              <VideoSkeleton />
            ) : (
              <div>
                <div>
                  <iframe
                    className="w-full aspect-video rounded-xl"
                    // src={`https://www.youtube.com/embed/${id}`}
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0`}
                    title={video.snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h2 className="text-lg font-bold mt-4">
                  {video.snippet.title}
                </h2>

                <div className="flex justify-between items-center flex-wrap my-2">
                  <div className="flex items-center justify-between  my-2">
                    {channelInfo && (
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={channelInfo.snippet.thumbnails.default.url}
                              alt="Channel thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-base">
                            {video.snippet.channelTitle}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatNumber(
                              channelInfo.statistics.subscriberCount
                            )}{" "}
                            subscribers
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mx-3">
                      <button className="bg-black text-white font-medium rounded-full px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>

                  <VideoActions
                    video={video}
                    moreDropdownRef={moreDropdownRef}
                    toggleMore={toggleMore}
                    toggleReportComment={toggleReportComment}
                    isMoreOpen={isMoreOpen}
                  />
                </div>

                {/* description */}
                <div className="m-2 px-4 py-3 bg-gray-100 rounded-xl">
                  <span className="mt-2 mr-2 font-medium text-sm">
                    {" "}
                    {formatNumber(video.statistics.viewCount)}
                  </span>

                  <span className="mr-2 text-sm">
                    {PostedTime(video.snippet.publishedAt)}
                  </span>

                  {/* {video.snippet.tags.map((tag, index) => (
  <span key={index}>#{tag}</span>
))} */}
                  <div
                    ref={descriptionRef}
                    className={`overflow-hidden transition-all duration-300 ${
                      showFullDescription ? "max-h-full" : "max-h-6"
                    }`}
                  >
                    <Description text={video.snippet.localized.description} />
                  </div>
                  <button
                    onClick={toggleDescription}
                    className="text-sm font-bold  text-black hover:text-gray-700"
                  >
                    {showFullDescription ? "Show less" : "...more"}
                  </button>
                </div>
                {/* comments */}

                <Comments
                  comments={comments}
                  video={video}
                  openReplyId={openReplyId}
                  openReportCommentId={openReportCommentId}
                  toggleReply={toggleReply}
                  toggleReportComment={toggleReportComment}
                />

                {loadingMoreComments && <p>Loading more comments...</p>}

                {/* This div will trigger fetching more comments */}
                <div
                  ref={commentObserverRef}
                  style={{ height: "1px" }}
                  className="loading-trigger"
                ></div>
              </div>
            )}
          </div>
          <div className=" md:col-span-1 py-3">
            {relatedVideos.length === 0 || relatedLoading ? (
              Array(7)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex mb-4 animate-pulse">
                    <div className="flex-shrink-0 mr-2 bg-gray-300 w-40 h-24 rounded-xl"></div>
                    <div className="flex flex-col flex-grow">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
            ) : (
              <>
                {relatedVideos.map((video) => (
                  <RelatedVideos key={video.id} video={video} />
                ))}

                {/* Loader for additional videos */}
                {loadingMore && (
                  <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-r-2 border-gray-400"></div>
                  </div>
                )}
                {/* This div will act as the observer target to trigger loading more */}
                <div
                  ref={observerRef}
                  className="loading-trigger"
                  style={{ height: "1px" }}
                ></div>
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};
