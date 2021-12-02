import React, { useState, useEffect } from 'react'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'



const Card = ({ post, handleUpVote, handleDownVote }) => {
     const [ formattedTags, setFormattedTags ] = useState([]);

     const createFormattedTags = (tags) => {
          const tagArr = tags.split(';');
          if(tagArr.length < 5){
               setFormattedTags(tagArr);
          } else {
               setFormattedTags(tagArr.slice(0, 4));
          }
            
     }
     
     useEffect(() => {
          createFormattedTags(post.tags);
     }, [post.tags])

     return (
          // transform transition-all duration-300 hover:scale-105 hover:shadow-xl
          <div className="select-none flex flex-col items-center bg-gray-50 rounded-md mt-2 mb-5 shadow-md w-full md:w-72 border">
               <img className=" object-cover cursor-pointer rounded-tr-md rounded-tl-md w-full h-64" src={post.image} alt="post" />
               <div className="bot-bar mt-0.5 bg-white rounded-bl-md rounded-br-md w-full">
                    <div className="title-location flex flex-col items-center">
                         <p className="font-heading antialiased text-lg text-black">{post.title}</p>
                         <p className="font-body text-xs text-gray-700">{post.location}</p>
                    </div>
                    <div className="votes-date flex w-full items-center justify-between pl-3 pr-3">
                         <div className="flex flex-col">
                              <div className="up flex flex-col items-center">
                                   <p className="text-blue-400">{post.upVotes}</p>
                                   <p className="select-none text-xl flex cursor-pointer hover:text-blue-400"><BiUpvote onClick={() => handleUpVote(post)}/></p>
                              </div>
                              <div className="down flex flex-col items-center">
                                   <p className="text-xl cursor-pointer hover:text-red-400"><BiDownvote onClick={() => handleDownVote(post)}/></p>
                                   <p className="select-none text-red-400">{post.downVotes}</p>
                              </div>
                         </div>
                         <div className="tag-container flex flex-row flex-wrap justify-end gap-2 w-3/4">
                         {
                              formattedTags.map((tag, index) => {
                                   return (
                                        <div key={index} className="select-none tag bg-blue-100 pl-1 pr-1 shadow-md rounded-sm hover:bg-blue-200 cursor-pointer">
                                             <p>{tag}</p>
                                        </div>
                                   )
                              })
                         }
                         </div>
                         
                    </div>
               </div>
          </div>
     )
}

export default Card;