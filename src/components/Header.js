import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdShareLocation } from 'react-icons/md';

const Header = () => {
     return (
          <header className="bg-red-500 shadow-lg flex justify-between">
               <div className="logo flex">
               <h2 className="text-3xl self-center text-gray-50 ml-3"><MdShareLocation /></h2>
                    <h2 className="text-gray-50 text-6xl font-logo subpixel-antialiased ml-3">Locale</h2>
                    
               </div>
               
               <h3 onClick={ () => alert("test2")} className="text-3xl self-center text-gray-50 mr-3 cursor-pointer"><CgProfile /></h3>
               {/* <img className=" w-12 max-w-md max-h-12 self-center filter invert mr-4" src={profileIcon} alt="profile" /> */}
          </header>
     )
}

export default Header;