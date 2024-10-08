import React from "react";
import AddComment from "./AddComment";
import CommentSkeleton from "./CommentSkeleton";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineLike, AiOutlineMore } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { MdOutlineSort } from "react-icons/md";
import { PiShareFatThin } from "react-icons/pi";
import { PiScissorsLight } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { MdOutlineOutlinedFlag } from "react-icons/md";

const Comments = ({
  comments,
  video,
  openReplyId,
  openReportCommentId,
  toggleReply,
  toggleReportComment,
}) => {
  return (
    <div>
      <div className="my-5  ">
        <div className="flex items-center">
          <h1 className="font-bold text-xl mr-8">
            {video.statistics.commentCount} Commments
          </h1>
          <div className="font-semibold text-md flex items-end">
            <MdOutlineSort size={23} />
            <span>Sort by</span>
          </div>
        </div>
        {/*form for add comment */}
        <AddComment />
        {/* all comments */}
        {comments.length === 0 ? (
          Array(5)
            .fill()
            .map((_, index) => <CommentSkeleton key={index} />)
        ) : (
          <>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between space-x-2 mt-4"
              >
                <div className="flex items-start space-x-2 flex-grow">
                  <div className="avatar">
                    <div className="w-6 sm:w-8 rounded-full">
                      <img
                        src={
                          comment.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </div>
                  </div>

                  <div className="text-sm flex-grow">
                    <div className="flex items-center space-x-2">
                      <p>
                        {
                          comment.snippet.topLevelComment.snippet
                            .authorDisplayName
                        }
                      </p>
                      <p>
                        {formatDistanceToNow(
                          new Date(
                            comment.snippet.topLevelComment.snippet.publishedAt
                          )
                        )}{" "}
                        ago
                      </p>
                    </div>
                    <p
                      className="text-gray-600 mb-4 leading-relaxed break-words max-w-full overflow-hidden"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          comment.snippet.topLevelComment.snippet.textDisplay,
                      }}
                    ></p>
                    <div className="flex items-center space-x-6 ">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <AiOutlineLike />{" "}
                          {comment.snippet.topLevelComment.snippet.likeCount >
                            0 && (
                            <span>
                              {
                                comment.snippet.topLevelComment.snippet
                                  .likeCount
                              }
                            </span>
                          )}
                        </div>
                        <BiDislike />
                      </div>
                      <div className="">
                        <button
                          onClick={() => toggleReply(comment.id)}
                          className="font-semibold"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    {openReplyId === comment.id && (
                      <div className="w-full ">
                        <AddComment />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="relative w-full sm:w-auto">
                    <button onClick={() => toggleReportComment(comment.id)}>
                      <AiOutlineMore size={25} />
                    </button>
                    {openReportCommentId === comment.id && (
                      <div className="bg-gray-200 p-2 rounded absolute top-[110%] right-0 w-[100px] sm:w-auto flex items-center space-x-2 z-30">
                        <MdOutlineOutlinedFlag />
                        <span className="mx-1">Report</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
