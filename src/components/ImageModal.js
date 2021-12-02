import React from 'react'


const ImageModal = ({ image, handleOnClick }) => {
     return (
          <>
          <div onClick={handleOnClick} className="bg-opacity-80 bg-gray-700 fixed top-14 left-0 w-screen h-screen"></div>
          <div className="w-screen fixed top-36 left-0 flex flex-col justify-center m-auto md:items-center md:top-14">
               <div onClick={handleOnClick} className="md:w-screen md:flex md:justify-center">
                    <img src={image} onClick={handleOnClick} alt="image-in-modal" className="md:auto md:h-screen border-t-8 border-b-8 cursor-pointer shadow-2xl" />
               </div>  
          </div>
          </> 
     )
}

export default ImageModal;