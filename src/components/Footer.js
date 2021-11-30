import React from 'react';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';

const Footer = () => {
     return(
          <footer className="flex justify-center items-center bg-red-500 h-14 w-full sticky bottom-0 shadow-lg z-10">
               <Link to="/newpost"><p className="text-gray-50 text-6xl cursor-pointer hover:text-gray-300"><CgAdd /></p></Link>
          </footer>
     )
}

export default Footer;