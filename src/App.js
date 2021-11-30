import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const App = () => {
  // const emptyPost = { postId: '', title: '', date: '', image: '', location: '', upvVotes: '', downVotes: '', author: '', tags: ''}
  
  const [posts, setPosts] = useState([]);
  const [currentSession, setCurrentSession] = useState('');

  const getPosts = () => {
    axios.get("https://localeapi.azurewebsites.net/api/posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data)
      })
  }

  const handleUpVote = (post) => {
    axios.put("https://localeapi.azurewebsites.net/api/posts/" + post.postId, {...post, 'upVotes': post.upVotes + 1 })
      .then((response) => {
        getPosts()
        console.log(response.data)
      })
  }

  const handleDownVote = (post) => {
    axios.put("https://localeapi.azurewebsites.net/api/posts/" + post.postId, {...post, 'downVotes': post.downVotes - 1 })
      .then((response) => {
        getPosts()
        console.log(response.data)
      })
  }


  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Header />
      <SearchBar />
      <div className="container flex flex-wrap justify-between md:justify-around w-3/4 m-auto mt-10">
        {
          posts.map((post) => {
            return (
              <Card post={post} handleUpVote={handleUpVote} handleDownVote={handleDownVote} key={post.postId}/>
            )
          })
        }
      </div>
    </>
  )
}
export default App;
