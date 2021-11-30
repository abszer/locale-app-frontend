import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const App = () => {
  // const emptyPost = { postId: '', title: '', date: '', image: '', location: '', upvVotes: '', downVotes: '', author: '', tags: ''}
  
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    axios.get("https://localeapi.azurewebsites.net/api/posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data)
      })
  }, [])

  return (
    <>
      <Header />
      <SearchBar />
      <div className="container flex flex-wrap justify-between w-3/4 m-auto mt-10">
        {
          posts.map((post) => {
            return (
              <Card post={post} key={post.postId}/>
            )
          })
        }
      </div>
    </>
  )
}
export default App;
