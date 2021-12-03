import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from '../useLocalStorage';


const CreatePostForm = (params) => {

     const emptyBody = {title: '', image: '', location: '', author: '', tags: '' }

     const [imageURL, setImageURL] = useState("");
     const [imageFile, setImageFile] = useState();
     const [currentUser, setCurrentUser] = useLocalStorage("currentUser");
     const [locationPlaceholder, setLocationPlaceholder] = useState("") // holds value of location but to set location in req body requires autocomplete drop down to be clicked
     const [suggestedLocation, setSuggestedLocation] = useState("")
     const [body, setBody] = useState(emptyBody)
     const [dropDownVisible, setDropDownVisible] = useState(false)

     useEffect(() => {
          setBody({...body, "author": currentUser});
     }, [currentUser])

     const handleFileOnChange = (e) => {
          setImageFile(e.target.files['0']);
     }

    
     // need to add way to add "author" and image field to body
     const handlePostSubmit = (e) => {
          e.preventDefault();
          
          axios.post("https://localeapi.azurewebsites.net/api/posts", body)
               .then((response) => {
                    console.log(response.data)
               })
               .catch((err) => {
                    console.log(err)
               });
          
          

     }

     const handleOnChange = (e) => {
          setBody({...body, [e.target.name]: e.target.value})
     }

     const handleLocationOnChange = (e) => {
          setLocationPlaceholder(e.target.value)

          const options = {
               method: 'GET',
               url: 'https://address-completion.p.rapidapi.com/v1/geocode/autocomplete',
               params: {text: locationPlaceholder, limit: '1', lang: 'en'},
               headers: {
                 'x-rapidapi-host': 'address-completion.p.rapidapi.com',
                 'x-rapidapi-key': '4d5a574ef8msh0077390e7368a25p1522f0jsnea4a0af1cc8a'
               }
          };

          // only make requests from the API if user types more than 2 characters because I'm cheap and poor
          if(locationPlaceholder.length > 2){
               axios.request(options).then(function (response) {
                    console.log(response.data);
                    setSuggestedLocation(response.data.features[0].properties.address_line1)
               }).catch(function (error) {
                    console.error(error);
               });
          }

     }

     const handleLocationOnKeyDown = (e) => {
          if(e.key == 'Backspace'){
               setDropDownVisible(false)
          }else if(e.key){
               setDropDownVisible(true)
          }
     }

     const handleLocationDropDownOnClick = () => {
          setLocationPlaceholder(suggestedLocation)
          setBody({...body, location: suggestedLocation})
          setDropDownVisible(false)
     }

     const handleImageUpload = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("file", imageFile);
          console.log(formData)

          axios.post("https://localeapi.azurewebsites.net/upload", formData) // CHANGE THIS FOR PRODUCTION
               .then((response) => {
                    console.log(response.data)
                    setImageURL("https://localeapi.azurewebsites.net/upload/" + response.data) // CHANGE THIS FOR PRODUCTION
                    setBody({...body, image: "https://localeapi.azurewebsites.net/upload/" + response.data}) // CHANGE THIS FOR PRODUCTION
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
                    <div onClick={handleLocationDropDownOnClick} className={"relative bg-white hover:bg-gray-200 w-full h-7 -mt-4 text-center rounded-b-md cursor-pointer " + (dropDownVisible ? "" : "hidden")}>
                         <p className="">{suggestedLocation}</p>
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