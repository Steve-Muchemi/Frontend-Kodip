import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PostCard from '../postCard/PostCard';
import './styles.css';
import SideBar from '../../MapPage_Components/sidebar/sidebar';
import useOnSearch from '../../../hooks/useSearch';
import axios from 'axios';

const PostListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {samplePosts, setsamplePosts} = useOnSearch()
useEffect(()=>{
//axios here to do the get
axios.get('http://localhost:3002/api/connect/getallposts')
.then(response=>{
setsamplePosts(response.data)
})
.catch(error=>{
//error handling?
})

const samplepost = [
  {
    _id: "662f4873d444dd00738fef29",
    postId: "bdb55373-e744-4f65-9b86-202a4a889290",
    title: "House for rent in Kitengela",
    coordinates: [1, 2],
    amenities: "Swimming pool, Garden, Garage",
    additionalInfo: "I need a decent house that has a playground for my family and kids.",
    coins: 100,
    rewardsCoins: true,
    location: "Parking, Laundry, Balcony",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "20,000"
  },
  {
    _id: "662f4873d444dd00738fef2a",
    postId: "e8a4d11d-37e4-4eeb-8440-4768c4570b62",
    title: "Spacious Apartment in Nairobi CBD",
    coordinates: [3, 4],
    amenities: "Gym, Security System, High-speed Internet/Wi-Fi",
    additionalInfo: "Looking for a spacious apartment close to work with good security features.",
    coins: 150,
    rewardsCoins: true,
    location: "Elevator/Lift, Smart Home Features",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "30,000"
  },
  {
    _id: "662f4873d444dd00738fef2b",
    postId: "a6b0a2c2-7a20-42b2-991e-4f8a43e951db",
    title: "Modern Villa for Sale in Runda",
    coordinates: [5, 6],
    amenities: "Borehole, Furnished, Pet-friendly Policies",
    additionalInfo: "Interested in buying a modern villa with a garden and borehole.",
    coins: 200,
    rewardsCoins: true,
    location: "Staff Quarters, Swimming Pool, Garden",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "5,000,000"
  },
  {
    _id: "662f4873d444dd00738fef2c",
    postId: "e4c088b3-993a-45c7-8b0b-7eae9bf2f69d",
    title: "Duplex for Rent in Westlands",
    coordinates: [7, 8],
    amenities: "Parking, Gym, Security System",
    additionalInfo: "Looking for a duplex with modern amenities and parking space.",
    coins: 120,
    rewardsCoins: true,
    location: "Balcony, Laundry, Aircon",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "40,000"
  },
  {
    _id: "662f4873d444dd00738fef2d",
    postId: "f8ae154d-62e8-4047-9d72-605cf9d6258c",
    title: "Vacant Land for Sale in Karen",
    coordinates: [9, 10],
    amenities: "Borehole, Security System, Smart Home Features",
    additionalInfo: "Interested in buying vacant land with good security and modern amenities.",
    coins: 180,
    rewardsCoins: true,
    location: "Garden, Staff Quarters, Swimming Pool",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "10,000,000"
  },
  {
    _id: "662f4873d444dd00738fef2e",
    postId: "d2ff258b-9f6c-45cb-8b39-fc9dd2eb37bf",
    title: "Furnished Apartment for Short Term Rent in Lavington",
    coordinates: [11, 12],
    amenities: "High-speed Internet/Wi-Fi, Laundry Facilities, Smart Home Features",
    additionalInfo: "Looking for a furnished apartment for a short-term stay with modern amenities.",
    coins: 90,
    rewardsCoins: true,
    location: "Wheelchair Accessibility, Gym, Balcony",
    user: "662f3eaf08a9ccf9ba90cd36",
    budget: "15,000"
  }
];
setsamplePosts(samplepost)
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
      <h3 style={{margin:'10px'}}>Get Help from Locals!</h3>     
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
