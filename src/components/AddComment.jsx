import React, { useState } from 'react'
import { FaRegSmileBeam } from "react-icons/fa";


export default function AddComment() {
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  return (
    <div>
       <div className="flex items-start my-5">
                    <div className="avatar">
                      <div className="w-6 sm:w-8 rounded-full">
                        <img
                          src="https://res.cloudinary.com/dqy4dps7q/image/upload/v1717308706/user_ye5vmx.png"
                          className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                      </div>
                    </div>

                    <div className="w-full mx-3">
                      <input
                        type="text"
                        className="border-b border-gray-400 w-full py-2 px-3 focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-700 placeholder-gray-500 rounded-sm"
                        placeholder="Add a comment..."
                        onFocus={() => setShowCommentButtons(true)}
                      />
                      {showCommentButtons && (
                        <div className=" flex items-center justify-between">
                          <div>
                            <FaRegSmileBeam size={25} />
                          </div>
                          <div className="mt-2 flex items-center space-x-2">
                            <button
                              className="rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
                              onClick={() => setShowCommentButtons(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="rounded px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm cursor-pointer"
                              disabled
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
    </div>
  )
}
