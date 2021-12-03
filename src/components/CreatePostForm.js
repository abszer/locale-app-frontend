import React, { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../useLocalStorage';


const CreatePostForm = (params) => {

     const emptyBody = {title: '', image: '', location: '', author: '', tags: '' }

     const [imageURL, setImageURL] = useState("");
     const [imageFile, setImageFile] = useState();
     const [currentUser, setCurrentUser] = useLocalStorage("currentUser");
     const [locationPlaceholder, setLocationPlaceholder] = useState() // holds value of location but to set location in req body requires autocomplete drop down to be clicked
     const [body, setBody] = useState(emptyBody)
     const [dropDownVisible, setDropDownVisible] = useState(false)

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

     const handleLocationOnChange = (e) => {
          setLocationPlaceholder(e.target.value)
     }

     const handleLocationOnKeyDown = (e) => {
          if(e.key == 'Backspace'){
               setDropDownVisible(false)
          }else if(e.key){
               setDropDownVisible(true)
          }
     }

     const handleLocationDropDownOnClick = () => {
          
     }

     const handleImageUpload = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("file", imageFile);
          console.log(formData)

          axios.post("https://localhost:7047/upload", formData) // CHANGE THIS FOR PRODUCTION
               .then((response) => {
                    console.log(response.data)
                    setImageURL("https://localhost:7047/upload/" + response.data) // CHANGE THIS FOR PRODUCTION
                    setBody({...body, image: "https://localhost:7047/upload/" + response.data}) // CHANGE THIS FOR PRODUCTION
               })
     }

     return(
          <>
           { imageURL && <img src={imageURL} alt="post" />}
          <div className="flex flex-col items-center bg-blue-100 h-80 w-96 shadow-lg rounded-xl pb-5">
               <h2 className="mt-5 text-2xl font-bold">Share your Locale!</h2>
               <h4 className="text-sm font-body">Post a spot worth sharing.</h4>
               <form autoComplete="off" onSubmit={handlePostSubmit} className="flex flex-col items-center h-60 justify-evenly w-full pl-2 pr-2">
                    
                    <input type="text" name="title" className="text-center w-full h-7 rounded-md" placeholder="Title: Amazing hiking trail" value={body.title} onChange={handleOnChange}/>
                    
                    <input type="text" name="location" placeholder="Locatation: San Antonio, TX" className="text-center w-full h-7 rounded-md" value={locationPlaceholder} onChange={handleLocationOnChange} onKeyDown={(e)=>{handleLocationOnKeyDown(e)}}/>
                    <div onClick={null} className={"relative bg-gray-50 hover:bg-gray-200 w-full h-7 -mt-4 text-center rounded-b-md cursor-pointer " + (dropDownVisible ? "" : "hidden")}>
                         <p className="">test</p>
                    </div>                    
                    <input type="text" name="tags" placeholder="Tags (;): sunny;outdoors;texas" className="w-full text-center h-7 rounded-md" value={body.tags} onChange={handleOnChange}/>
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