import React from 'react';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';
import useLocalStorage from '../useLocalStorage';

const Footer = () => {
     const [currentUser, setCurrentUser] = useLocalStorage("currentUser");

     return(
          <footer className="flex justify-center items-center bg-red-500 rounded-b-md h-14 w-full sticky bottom-0 z-10 shadow-md transform rotate-180">
               { currentUser && <Link to="/newpost"><p className="text-gray-50 text-5xl cursor-pointer hover:text-gray-300"><CgAdd /></p></Link>}
          </footer>
     )
}

export default Footer;