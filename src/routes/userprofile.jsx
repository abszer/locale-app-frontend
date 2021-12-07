import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { MdShareLocation } from 'react-icons/md';
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import Header from '../components/Header';
import Card from '../components/Card';

const UserProfile = () => {
     const location = useLocation()
     const { selectedUserProfile } = location.state
     const [ userPosts, setUserPosts ] = useState([])

     useEffect(() => {
          // placeholder
     }, [])

     return (
          <>
          <Header />
          <div class="flex profile-info bg-white rounded-xl w-3/5 mt-10 m-auto shadow-lg">
               <div className="avatar-username flex flex-col w-1/6 m-5">
                    <i className="text-7xl text-blue-400 transform scale-110"><FaUserCircle /></i>
                    <h3 className="text-xl mt-3">{selectedUserProfile}</h3>
               </div>
              
               <div className="flex justify-evenly w-full">
                    <div className="flex flex-col items-center">
                         <p className="text-5xl text-red-400"><MdShareLocation /></p>
                         <p className="mt-3">400</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                         <p className="text-4xl text-blue-500"><BiUpvote /></p>
                         <p className="mt-3">400</p>
                    </div>

                    <div className="flex flex-col items-center">
                         <p className="text-4xl text-red-500"><BiDownvote /></p>
                         <p className="mt-3">400</p>
                    </div>
               </div>
          </div>

          <div className="photo-container lg:w-3/5">
               {

               }
          </div>
          </>
     )
}

export default UserProfile; 