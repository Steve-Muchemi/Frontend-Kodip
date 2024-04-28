import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import './styles.css';
import SideBar from '../MapPage_Components/sidebar/sidebar';
import useOnSearch from '../../hooks/useSearch';
import axios from 'axios';





const PostListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {samplePosts, setsamplePosts} = useOnSearch()

useEffect(()=>{
//axios here to do the get
axios.get('http://localhost:3002/api/connect/getallposts')
.then(response=>{
console.log(response.data)
setsamplePosts(response.data)
})
.catch(error=>{
console.log(error);
})

  

},[])

/*
function for finding with id
axios.get(`http://localhost:3002/api/connect/getpost/${postId}`)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
*/



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = samplePosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-list-container">
      <SideBar/>
      
      <h1>Local Connect</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <FontAwesomeIcon
          icon={faTimes}
          className="clear-button"
          onClick={() => setSearchTerm('')}
        />
      </div>
      <div className="post-list">
        {filteredPosts.map(post => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
      <Link to="/connect" className="add-post-button">
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Post</span>
      </Link>
    </div>
  );
};

export default PostListPage;
