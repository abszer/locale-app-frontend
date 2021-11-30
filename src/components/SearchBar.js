import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {

     const [searchIconVisible, setSearchIconVisible] = useState(true);

     const searchIconOnKeyPress = (e) => {

          // SET VALUE BASED ON STATE ONCHANGE IN THE FUTURE
          
          if(e.target.value){
               setSearchIconVisible(false);
          }else{
               setSearchIconVisible(true);
          }
     }

     return (
          <div className="search-bar">
               <form autoComplete="off" action="" className="search-bar flex justify-center mt-3 relative w-screen">
                    <FaSearch className={ !searchIconVisible ? "hidden" : "absolute top-1.5 left-1/4 text-gray-400"}/>
                    <input id="search" placeholder="" onKeyPress={searchIconOnKeyPress} className="rounded-full border border-gray-200 shadow-md w-3/5 text-center focus:outline-none focus:ring-2 focus:ring-blue-400" type="text"/>
               </form>
          </div>
     )
}

export default SearchBar;