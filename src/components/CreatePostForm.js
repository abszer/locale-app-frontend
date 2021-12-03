import React, { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../useLocalStorage';


const CreatePostForm = (params) => {

     const emptyBody = {title: '', image: '', location: '', author: '', tags: '' }

     const [imageURL, setImageURL] = useState("");
     const [imageFile, setImageFile] = useState();
     const [currentUser, setCurrentUser] = useLocalStorage("currentUser");
     const [body, setBody] = useState(emptyBody)

     const handleFileOnChange = (e) => {
          setImageFile(e.target.files['0']);
     }

     // need to add way to add "author" and image field to body
     const handlePostSubmit = (e) => {
          e.preventDefault();

     }

     const handleOnChange = (e) => {
          setBody({...body, [e.target.name]: e.target.value})
     }

     const handleImageUpload = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("file", imageFile);
          console.log(formData)

          axios.post("https://localhost:7047/upload", formData) // change this address for production
               .then((response) => {
                    console.log(response.data)
                    setImageURL("https://localhost:7047/upload/" + response.data)
               })
     }

     return(
          <>
           { imageURL && <img src={imageURL} alt="post" />}
          <div className="flex flex-col items-center bg-blue-100 h-64 w-96 shadow-lg rounded-xl">
               <h2 className="mt-5 text-2xl font-bold">Share your Locale!</h2>
               <form onSubmit={handlePostSubmit} className="flex flex-col items-center w-full pl-2 pr-2">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" className="text-center" placeholder="Amazing hiking trail" value={body.title} onChange={handleOnChange}/>
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" placeholder="San Antonio, TX" className="text-center" value={body.location} onChange={handleOnChange}/>
                    <label htmlFor="tags">Tags:</label>                         
                    <input type="text" name="tags" placeholder="Tags: separate tags with a semicolon (;)" className="w-full text-center" value={body.tags} onChange={handleOnChange}/>
                    <input type="hidden" name="author" value={currentUser}/>
                    {imageURL && <input type="submit" value="Create Post" className="mt-3 h-8 w-full rounded text-gray-50 bg-blue-400 hover:bg-blue-500 cursor-pointer"/>}
               </form>
               { !imageURL && <form onSubmit={handleImageUpload} className="flex w-full mt-5 select-none">
                    <input type="file" name="file" onChange={handleFileOnChange} className="text-sm ml-3"/>
                    <input type="submit" value="Upload" className="transition-all bg-blue-400 hover:bg-blue-500 text-gray-50 w-20 rounded-md shadow mr-4 cursor-pointer"/>
               </form> }
          </div>
          </>
     )
}

export default CreatePostForm;