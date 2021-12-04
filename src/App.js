import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Footer from './components/Footer';
import useLocalStorage from './useLocalStorage';



const App = () => {
  // const emptyPost = { postId: '', title: '', date: '', image: '', location: '', upvVotes: '', downVotes: '', author: '', tags: ''}
  
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser");
  const [footerHidden, setFooterHidden] = useState(false);
  const [searchResults, setSearchResults] = useState([])

  
  // sends get request to api and stores data in "posts" state
  const getPosts = () => {
    axios.get("https://localeapi.azurewebsites.net/api/posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data)
      })
  }

  // sends put request to api and increments upvotes by 1
  const handleUpVote = (post) => {
    
    if(currentUser){
      axios.put("https://localeapi.azurewebsites.net/api/posts/" + post.postId, {...post, 'upVotes': post.upVotes + 1 })
      .then((response) => {
        getPosts()
        console.log(response.data)
      })
    }
    
  }

  // sends put request to api and decrements downvotes by 1
  const handleDownVote = (post) => {
    if(currentUser){
      axios.put("https://localeapi.azurewebsites.net/api/posts/" + post.postId, {...post, 'downVotes': post.downVotes - 1 })
      .then((response) => {
        getPosts()
        console.log(response.data)
      })
    }
    
  }

  //sends put request to server when edit is confirmed
  const handleEditOnSubmit = (e, postId, body) => {
    e.preventDefault();
    axios.put("https://localeapi.azurewebsites.net/api/posts/" + postId, body)
        .then((response) => {
          console.log(response)
          getPosts()
        })
        .catch((err) => {
          console.log(err)
        })
  }

  // deletes post but retains image on server
  const handlePostOnDelete = (postId) => {
    axios.delete("https://localeapi.azurewebsites.net/api/posts/" + postId)
    .then((response) => {
      console.log(response)
      getPosts()
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const handleImgOnClick = () => {
      setFooterHidden(!footerHidden)
  }


  useEffect(() => {

    getPosts()
    
  }, [])

  return (
    <>
      <Header />
      <SearchBar setSearchResults={setSearchResults} posts={posts} />
      <div className="container flex flex-wrap justify-between md:justify-around w-3/4 h-full m-auto mt-10">
        {
          posts.map((post, index) => {
            
            return (
              (searchResults[index] === 1 || searchResults.length === 0) &&
              <Card post={post} handleUpVote={handleUpVote} handleImgOnClick={handleImgOnClick} handleDownVote={handleDownVote} handleEditOnSubmit={handleEditOnSubmit} handlePostOnDelete={handlePostOnDelete} key={post.postId}/>
            )
          })
        }
      </div>
      {/* show footer if footerHidden is false */}
      { !footerHidden && <Footer /> }
    </>
  )
}
export default App;
