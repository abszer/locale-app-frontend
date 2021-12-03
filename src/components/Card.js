import React, { useState, useEffect } from 'react'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import { GrMapLocation } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi'
import useLocalStorage from '../useLocalStorage';
import ImageModal from './ImageModal'


const Card = ({ post, handleUpVote, handleDownVote, handleImgOnClick }) => {
     const [ formattedTags, setFormattedTags ] = useState([]);
     const [ imageEnlarged, setImageEnlarged] = useState(false)
     const [ postTitleColor, setPostTitleColor ] = useState("")
     const [currentUser, setCurrentUser] = useLocalStorage("currentUser")

     // uses ' ; ' as a delimeter to separate tags into an array (max 6)
     const createFormattedTags = (tags) => {
          const tagArr = tags.split(';');
          if(tagArr.length < 5){
               setFormattedTags(tagArr);
          } else {
               setFormattedTags(tagArr.slice(0, 6));
          } 
     }

     // enlarges image and hides footer by calling handleImageOnClick in app.js
     const handleOnClick = () => {
          setImageEnlarged(!imageEnlarged)
          handleImgOnClick()
     }

     // depending on number of upvotes post title will either be green or red
     const determineTitleColor = (upVotes, downVotes) => {
          upVotes > Math.abs(downVotes) ? setPostTitleColor("text-green-400") : setPostTitleColor("text-red-400");
     }

     
     useEffect(() => {
          createFormattedTags(post.tags);
          determineTitleColor(post.upVotes, post.downVotes);

     }, [post.tags, post.upVotes, post.downVotes])

     return (
          // transform transition-all duration-300 hover:scale-105 hover:shadow-xl
          <div className="select-none flex flex-col items-center bg-gray-200 rounded-md mt-2 mb-5 shadow-md w-full md:w-72 border">
               <img onClick={handleOnClick} className="object-cover cursor-pointer rounded-tr-md  rounded-tl-md w-full h-64 mb-1" src={post.image} alt="post" />
               <div className="bot-bar mt-0.5 bg-white rounded-bl-md rounded-br-md w-full">
                    {(currentUser && currentUser == post.author) ? <h3 onClick={()=>{alert("this is where edit will go")}} className="flex flex-row-reverse relative right-2 top-2 -mb-2 cursor-pointer hover:text-gray-700">< FiEdit /></h3> : null}
                    <div className="title-location flex flex-col items-center pb-2 border-b w-3/4 m-auto">
                         <p className={"font-heading antialiased text-lg " + postTitleColor}>{post.title}</p>
                         <p className="flex justify-center items-center gap-2 font-body text-xs text-blue-700 hover:text-blue-900 cursor-pointer"><GrMapLocation />{post.location}</p>
                    </div>
                    <div className="votes-date flex w-full items-center justify-between pl-3 pr-3">
                         <div className="flex flex-col">
                              <div className="up flex flex-col items-center">
                                   <p className="text-blue-400">{post.upVotes}</p>
                                   <p className="select-none text-xl flex cursor-pointer shadow hover:text-blue-400"><BiUpvote onClick={() => handleUpVote(post)}/></p>
                              </div>
                              <div className="down flex flex-col items-center">
                                   <p className="text-xl cursor-pointer shadow hover:text-red-400"><BiDownvote onClick={() => handleDownVote(post)}/></p>
                                   <p className="select-none text-red-400">{post.downVotes}</p>
                              </div>
                         </div>
                         <div className="tag-container flex flex-row flex-wrap justify-end gap-2 w-3/4">
                         {
                              // display tags
                              formattedTags.map((tag, index) => {
                                   return (
                                        <div key={index} className="select-none tag bg-blue-100 pl-1 pr-1 shadow-md rounded-sm hover:bg-blue-200 cursor-pointer">
                                             <p>{tag}</p>
                                        </div>
                                   )
                              })
                         }

                         {/* Enlarged image modal activated onClick of image */}
                         {
                              imageEnlarged && <ImageModal image={post.image} handleOnClick={handleOnClick}/>
                         }

                         </div>
                         
                    </div>
               </div>
          </div>
     )
}

export default Card;