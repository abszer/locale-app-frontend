import React from 'react'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'


const Card = ({ post, handleUpVote, handleDownVote }) => {
     return (
          // transform transition-all duration-300 hover:scale-105 hover:shadow-xl
          <div className="flex flex-col items-center bg-gray-50 rounded-md mt-2 mb-5 shadow-md w-full border">
               <img className=" object-scale-down cursor-pointer rounded-tr-md rounded-tl-md w-full h-64" src={post.image} alt="post" />
               <div className="bot-bar mt-0.5 bg-white rounded-bl-md rounded-br-md w-full">
                    <div className="title-location flex flex-col items-center">
                         <p className="font-heading antialiased text-lg text-black">{post.title}</p>
                         <p className="font-body text-sm text-gray-700">{post.location}</p>
                    </div>
                    <div className="votes-date flex w-full items-center justify-between pl-3 pr-3">
                         <div className="flex">
                              <div className="up flex flex-col items-center">
                                   <p className="text-xl flex mr-2 cursor-pointer hover:text-green-500"><BiUpvote onClick={() => handleUpVote(post)}/></p>
                                   <p>{post.upVotes}</p>
                              </div>
                              <div className="down flex flex-col items-center">
                                   <p className="text-xl cursor-pointer hover:text-red-500"><BiDownvote onClick={() => handleDownVote(post)}/></p>
                                   <p>{post.downVotes}</p>
                              </div>
                         </div>
                         <p className="">{post.date.slice(0, 10)}</p>
                    </div>
               </div>
          </div>
     )
}

export default Card;