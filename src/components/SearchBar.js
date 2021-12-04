import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ posts, setSearchResults}) => {

     const [searchIconVisible, setSearchIconVisible] = useState(true);
     const [searchQuery, setSearchQuery] = useState("")

     const searchIconOnKeyPress = (e) => {

          // SET VALUE BASED ON STATE ONCHANGE IN THE FUTURE
          
          if(e.key !== 'Backspace'){
               setSearchIconVisible(false);
          }else if(e.key === 'Backspace'  && searchQuery.length < 2){
               setSearchIconVisible(true)
               setSearchResults([])

          }
          // else if(e.key === 'Backspace'){
          //      setSearchIconVisible(true);
          // }
          
     }

     const handleSearchOnChange = (e) => {
          setSearchQuery(e.target.value)
          const matchedPosts = posts.map((post) => {
               if(post.tags.includes(searchQuery)){
                    return 1
               }
               // else if(post.title.toLowerCase().includes(searchQuery)){
               //      return 1
               // }
               else{
                    return 0
               }
          })
          setSearchResults(matchedPosts)
     }     

     return (
          // sticky top-20
          <div className="search-bar">
               <form autoComplete="off" onSubmit={null} className="search-bar flex justify-center mt-3 relative w-screen">
                    <FaSearch className={ !searchIconVisible ? "hidden" : "absolute top-1.5 left-1/4 text-gray-400"}/>
                    <input id="search" placeholder="Search by tag" onKeyDown={searchIconOnKeyPress} onChange={handleSearchOnChange} value={searchQuery} className="rounded-full border border-gray-200 shadow-md w-3/5 text-center focus:outline-none focus:ring-2 focus:ring-blue-400" type="text"/>
               </form>
          </div>
     )
}

export default SearchBar;