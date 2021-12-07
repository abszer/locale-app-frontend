import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router';
import { FaAndroid, FaUserCircle } from 'react-icons/fa';
import { MdShareLocation } from 'react-icons/md';
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import Header from '../components/Header';
import Card from '../components/Card';

const UserProfile = () => {
     const location = useLocation()
     const { selectedUserProfile } = location.state
     const [ posts, setPosts ] = useState([])
     const [ totalUpVotes, setTotalUpVotes ] = useState(0)
     const [ totalDownVotes, setTotalDownVotes ] = useState(0)
     const [ totalPosts, setTotalPosts ] = useState(0)
     
     
     
     const setData = (posts) => {
          
          let totalPostsVar = 0;
          let totalUpVotesVar = 0;
          let totalDownVotesVar = 0;
          
          console.log('testss')
          for(const post of posts){
               if(post.author === selectedUserProfile){
                    totalDownVotesVar += post.downVotes;
                    totalUpVotesVar += post.upVotes;
                    totalPostsVar += 1;
               }
               console.log("not author")
          }
          console.log(totalDownVotesVar, totalUpVotesVar, totalDownVotesVar)
          
          setTimeout(() => {
               setTotalPosts(totalPostsVar)
               setTotalUpVotes(totalUpVotesVar)
               setTotalDownVotes(totalDownVotesVar)
          },100)
          
     }
     
     useEffect(() => {
          axios.get("https://localeapi.azurewebsites.net/api/posts")
          .then((response) => {
               console.log(response.data);
               setPosts(response.data)
               
          });
          
     }, [])
     
     return (
          <>
          <Header />
          <div className="flex profile-info bg-white rounded-xl w-11/12 lg:w-3/5 mt-10 m-auto shadow-lg">
          <div className="avatar-username flex flex-col items-center w-1/6 m-5">
          <i className="text-7xl text-blue-400 transform scale-110"><FaUserCircle /></i>
          <h3 className="text-xl mt-3">{selectedUserProfile}</h3>
          </div>
          
          <div className="flex justify-evenly items-center w-full">
          <div className="flex flex-col items-center">
          <p className="text-5xl text-red-400"><MdShareLocation /></p>
          <p className="mt-2 pb-1">{totalPosts}</p>
          </div>
          
          <div className="flex flex-col items-center">
          <p className="text-4xl text-blue-500"><BiUpvote /></p>
          <p className="mt-3">{totalUpVotes}</p>
          </div>
          
          <div className="flex flex-col items-center">
          <p className="text-4xl text-red-500"><BiDownvote /></p>
          <p className="mt-3">{totalDownVotes}</p>
          </div>
          </div>
          </div>
          
          <div className="photo-container flex flex-row flex-wrap gap-2 justify-around items-center w-2/3 lg:w-4/5 m-auto mt-14">
          {setData(posts)}
          {
               posts.map((post) => {
                    
                    return (
                         post.author === selectedUserProfile 
                         &&
                         <Card post={post} handleUpVote={null} handleImgOnClick={null} handleDownVote={null} handleEditOnSubmit={null} handlePostOnDelete={null} key={post.postId} />
                         )
                    })
          }
               </div>
               </>
               )
          }
          
          export default UserProfile; 