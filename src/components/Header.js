import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdShareLocation } from 'react-icons/md';

const Header = () => {
     return (
          <header className="bg-red-500 shadow-lg flex justify-between sticky top-0 z-10">
               <div className="logo flex">
               <p className="text-3xl self-center text-gray-50 ml-3"><MdShareLocation /></p>
                    <Link to="/"><p className="text-gray-50 hover:text-gray-200 cursor-pointer text-6xl font-logo subpixel-antialiased ml-3">Locale</p></Link>
                    
               </div>
               
               <h3 onClick={ () => alert("test2")} className="text-3xl self-center text-gray-50 hover:text-gray-300 mr-3 cursor-pointer"><CgProfile /></h3>
               {/* <img className=" w-12 max-w-md max-h-12 self-center filter invert mr-4" src={profileIcon} alt="profile" /> */}
          </header>
     )
}

export default Header;