import React from 'react'
import Header from '../components/Header';
import CreatePostForm from '../components/CreatePostForm';


const NewPost = (params) => {
     return (
          <>
          <Header />
          <div className="container flex flex-col items-center w-3/4 m-auto mt-5">
               <CreatePostForm />  
          </div>
          
          </>
     )
}

export default NewPost;