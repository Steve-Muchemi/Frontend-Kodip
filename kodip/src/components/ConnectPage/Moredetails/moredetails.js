import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../ComentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoins, faBed, faCar, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import { ReactBingmaps } from 'react-bingmaps';
import './styles.css';
import useOnSearch from '../../../hooks/useSearch';
import axios from 'axios';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

useEffect(()=>{
// static for now. 
const samplepost={
 _id: "662f4873d444dd00738fef29",
postId: "bdb55373-e744-4f65-9b86-202a4a889290",
title: "House for rent in Kitengela",
coordinates: [-1.286389,36.817223],
amenities: "Swimming pool, Garden , Garage",
additionalInfo: "I need a decent house that has a play ground for my family and kids.",
coins: 200,
rewardsCoins: true,
location: "Parking, Laundry, Balcony",
user: "662f3eaf08a9ccf9ba90cd36",
budget: "20,000"
  }
setPost(samplepost)
const usersample =[{ 
_id: "66367fbdf0f7589844436c88",
UserType: "general",
username: "User1",
password :"$2b$10$jpviI7CeGmnucLtCk0I02.AoFpTbeg0iMZApx0uddxyEbnPe6pz/2",
phone : 123445677,
email :"user1@gmail.com",
coins : 0

}]
setUserDetails(usersample);
},[])
useEffect(() => {
  /*
  axios.get(`http://localhost:3002/api/connect/getpost/${postId}`)
    .then(response => {
      setPost(response.data);
     

      axios.get(`http://localhost:3002/api/user/getuserbyid/${response.data[0].user}`)
        .then(userResponse => {
          setUserDetails(userResponse.data);

         
          setUserDetails(samplepost)
        
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
*/
    
}, [postId]);


if (!post || !userDetails) {
  return <div>Loading...</div>;
}
  return (
    <div className="post-details-container">
      <div className="post-details">
        <div className="post-header">
          <div className="user-profilex">
            <img src={userDetails.profilepic} alt="User Profile" className="profile-image" />
            <div className="user-details">
              <h3>{userDetails.username}</h3>
              <p>{post.location}</p>
            </div>
          </div>
          <div className="location-container">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            <p className="location">{post.location}</p>
          </div>
        </div>
        <div className="post-body">
          <h2>{post.title}</h2>
          <div className="amenities">
            <p> {post.amenities}</p>

            {post.budget && (
          <p className="amenities">Budget: {post.budget}</p>
        )}
          </div>
          <p className="additional-info">{post.additionalInfo}</p>
          {post.rewardsCoins && <p className="rewards"><FontAwesomeIcon icon={faCoins} /> ksh {post.coins}!</p>}
        </div>
        
        <hr />
        <div className="map-section">
          <h3>Location of the area I'm looking for a rental on the Map</h3>
          <ReactBingmaps
            bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
            center={[-1.286389,36.817223]} // Set the center of the map to post coordinates
            zoom={17} // Set zoom level (adjust as needed)
            className="bing-mapx" // Add CSS class for styling
          >
            <ReactBingmaps.Pushpin
              key={post.postId}
              location={[-1.286389,36.817223]} // Set the location of the pushpin to post coordinates
            
            />
          </ReactBingmaps>
        </div>
        <hr />
        <div className="comments-section">
          <h3>Comments</h3>
          <CommentList postId={postId} />
        </div>
        <hr />
        <div className="comment-form-section">
          <h3>Add a Comment</h3>
          <CommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
  
};

export default PostDetailsPage;
