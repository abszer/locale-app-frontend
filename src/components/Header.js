import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdShareLocation } from 'react-icons/md';

const Header = () => {

     const [ profileIconClicked, setProfileIconClicked ] = useState(false);
     const [ currentUser, setCurrentUser ] = useState('') 
     // in the future have this passed down as a prop ^^^ (currentSession)

     const handleProfileIconClicked = () => {
          setProfileIconClicked(!profileIconClicked);
     }

     return (
          <header className="bg-red-500 shadow-lg flex justify-between sticky h-16 top-0 z-10">
               <div className="logo flex">
               <p className="text-3xl self-center text-gray-50 ml-3"><MdShareLocation /></p>
                    <Link to="/"><p className="text-gray-50 hover:text-gray-200 cursor-pointer text-6xl font-logo subpixel-antialiased ml-3">Locale</p></Link>
                    
               </div>
               <h3 onClick={handleProfileIconClicked} className="text-3xl self-center text-gray-50 hover:text-gray-300 mr-3 cursor-pointer"><CgProfile /></h3>
               
               {/* this menu appears when a user is not logged in */}
               <div className={ profileIconClicked && !currentUser ? "flex flex-col justify-around items-center login-signup h-44 w-40 bg-gray-50 absolute top-16 right-3 rounded-md shadow-md" : "hidden"}>
                    <button className="select-none bg-blue-400 hover:bg-blue-500 text-lg text-white font-bold w-3/4 h-1/5 rounded-md"><Link to="login">Sign In</Link></button>
                   <button className="select-none bg-blue-400 hover:bg-blue-500 text-lg text-white font-bold w-3/4 h-1/5 rounded-md"> <Link to="signup">Sign Up</Link></button>
               </div>

               {/* this menu will appear when a user is logged in */}
               <div className={ profileIconClicked && currentUser ? "flex flex-col justify-around items-center login-signup h-44 w-40 bg-gray-50 absolute top-16 right-3 rounded-md shadow-md" : "hidden"}>
                    <button className="">Log In</button>
                    <button>Sign Up</button>
               </div>
          </header>
     )
}

export default Header;