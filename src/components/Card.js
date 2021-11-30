import React from 'react'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'


const Card = ({ post }) => {
     return (
          <div className="flex flex-col items-center rounded-md mt-2 mb-5 cursor-pointer shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
               <img className="object-fill rounded-tr-md rounded-tl-md" src={post.image} alt="post" />
               <div className="bot-bar mt-0.5 bg-white rounded-bl-md rounded-br-md w-full">
                    <div className="title-location flex flex-col items-center">
                         <p className="font-heading antialiased text-lg text-black">{post.title}</p>
                         <p className="font-body text-sm text-gray-700">{post.location}</p>
                    </div>
                    <div className="votes-date flex w-full items-center justify-between pl-3 pr-3">
                         <div className="flex">
                              <BiUpvote />
                              <BiDownvote />
                         </div>
                         <p className="">{post.date.slice(0, 10)}</p>
                    </div>
               </div>
          </div>
     )
}

export default Card;