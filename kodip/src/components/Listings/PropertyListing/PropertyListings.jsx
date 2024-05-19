import React, { useState, useEffect } from 'react';
import './PropertyListing.css';
import Modal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Imageapp from '../ImageApp/Imageapp';
import BingMapPin from '../BingMapPin/BingMapPin';
import RenderAmenities from '../RenderAmenities/RenderAmenities';
import ListingCard from '../ListingCard/ListingCard';
import PropertyModal from '../PropertyModal/PropertyModal';

const PropertyListing = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState([]);
  const [propertylistings, setPropertylistings] = useState([]);
  const navigate = useNavigate();
  const { propertyId } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3002/api/property/get/all')
      .then(response => {
        setPropertylistings(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


useEffect(()=>{

  const sampleListings = [
    {
      _id: "66323103e91c4e41b8260dd2",
      owner: "6614fba1f91c8f7a5ce45899",
      propertyType: "Studio Apartment",
      price: 18000,
      description: "These Luxurious villas are available for both rent and sale in the ser…",
      amenities: [],
      contactInfo: [],
      images: [
       "https://images.pexels.com/photos/6782426/pexels-photo-6782426.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6758779/pexels-photo-6758779.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7535056/pexels-photo-7535056.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6045326/pexels-photo-6045326.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6538937/pexels-photo-6538937.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6186826/pexels-photo-6186826.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [-1.1212871920545808, 36.88368422705076],
        infoboxOption: {
          title: "Kilimani Bedsitters",
          propertyType: "Bedsitter"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd3",
      owner: "6614fba1f91c8f7a5ce45898",
      propertyType: "Single Family Home",
      price: 20000,
      description: "Beautiful single-family home with spacious rooms and a large backyard.",
      amenities: ["Swimming Pool", "Garden", "Garage"],
      contactInfo: ["Email: example@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6782363/pexels-photo-6782363.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7031722/pexels-photo-7031722.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265835/pexels-photo-6265835.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533758/pexels-photo-7533758.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5824522/pexels-photo-5824522.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533762/pexels-photo-7533762.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [-1.293679, 36.819467],
        infoboxOption: {
          title: "Spacious Family Home",
          propertyType: "Single Family Home"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd4",
      owner: "6614fba1f91c8f7a5ce45897",
      propertyType: "Luxury Villa",
      price: 10000,
      description: "Luxurious villa with breathtaking views and modern amenities.",
      amenities: ["Swimming Pool", "Gym", "Home Theater", "Garden"],
      contactInfo: ["Email: example2@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6969830/pexels-photo-6969830.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265833/pexels-photo-6265833.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7534546/pexels-photo-7534546.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8082559/pexels-photo-8082559.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [-1.286389, 36.817223],
        infoboxOption: {
          title: "Luxury Villa with Pool",
          propertyType: "Luxury Villa"
        }
      }
    },
    
    {
      _id: "66323103e91c4e41b8260dd5",
      owner: "6614fba1f91c8f7a5ce45896",
      propertyType: "Beach House",
      price: 8000,
      description: "Stunning beach house with panoramic ocean views and direct beach access.",
      amenities: ["Private Beach Access", "Ocean View Terrace", "Outdoor Dining Area"],
      contactInfo: ["Email: beachhouse@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6969987/pexels-photo-6969987.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8960464/pexels-photo-8960464.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6758779/pexels-photo-6758779.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7535056/pexels-photo-7535056.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6045326/pexels-photo-6045326.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [-4.783052, 11.826675],
        infoboxOption: {
          title: "Luxury Beach House",
          propertyType: "Beach House"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd6",
      owner: "6614fba1f91c8f7a5ce45895",
      propertyType: "Mountain Cabin",
      price: 13000,
      description: "Cozy cabin nestled in the mountains with picturesque views and hiking trails nearby.",
      amenities: ["Fireplace", "Mountain View Deck", "Hiking Trails Access"],
      contactInfo: ["Email: mountaincabin@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/7031722/pexels-photo-7031722.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265835/pexels-photo-6265835.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533758/pexels-photo-7533758.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5824522/pexels-photo-5824522.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533762/pexels-photo-7533762.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [45.9041, 6.8183],
        infoboxOption: {
          title: "Secluded Mountain Cabin",
          propertyType: "Mountain Cabin"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd7",
      owner: "6614fba1f91c8f7a5ce45894",
      propertyType: "City Loft",
      price: 15000,
      description: "Modern loft apartment located in the heart of the city with access to trendy cafes and shops.",
      amenities: ["Open Floor Plan", "City View Balcony", "Gym Access"],
      contactInfo: ["Email: cityloft@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6782476/pexels-photo-6782476.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7031722/pexels-photo-7031722.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265835/pexels-photo-6265835.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533758/pexels-photo-7533758.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5824522/pexels-photo-5824522.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [40.7128, -74.0060],
        infoboxOption: {
          title: "Downtown City Loft",
          propertyType: "City Loft"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd8",
      owner: "6614fba1f91c8f7a5ce45893",
      propertyType: "Rural Farmhouse",
      price: 13000,
      description: "Charming farmhouse located in a serene rural setting, perfect for a peaceful getaway.",
      amenities: ["Farm Views", "Garden", "Bonfire Pit"],
      contactInfo: ["Email: farmhouse@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/7534546/pexels-photo-7534546.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8082559/pexels-photo-8082559.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6969830/pexels-photo-6969830.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265833/pexels-photo-6265833.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [51.5074, -0.1278],
        infoboxOption: {
          title: "Tranquil Rural Farmhouse",
          propertyType: "Rural Farmhouse"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dd9",
      owner: "6614fba1f91c8f7a5ce45892",
      propertyType: "Lakefront Cabin",
      price: 17000,
      description: "Quaint cabin situated by the lake, offering breathtaking views and water activities.",
      amenities: ["Lake Access", "Deck with Lake View", "Fishing Gear"],
      contactInfo: ["Email: lakecabin@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6758779/pexels-photo-6758779.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7535056/pexels-photo-7535056.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6045326/pexels-photo-6045326.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6538937/pexels-photo-6538937.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6186826/pexels-photo-6186826.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [45.4215, -75.6919],
        infoboxOption: {
          title: "Scenic Lakefront Cabin",
          propertyType: "Lakefront Cabin"
        }
      }
    },
    {
      _id: "66323103e91c4e41b8260dda",
      owner: "6614fba1f91c8f7a5ce45891",
      propertyType: "Ski Chalet",
      price: 9000,
      description: "Luxurious chalet nestled in the mountains, offering ski-in/ski-out access and stunning alpine views.",
      amenities: ["Ski Access", "Hot Tub", "Fireplace"],
      contactInfo: ["Email: skichalet@example.com", "Phone: 123-456-7890"],
      images: [
        "https://images.pexels.com/photos/6045328/pexels-photo-6045328.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6782476/pexels-photo-6782476.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7031722/pexels-photo-7031722.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6265835/pexels-photo-6265835.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7533758/pexels-photo-7533758.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      pushpin: {
        location: [47.3776, 8.4664],
        infoboxOption: {
          title: "Luxury Ski Chalet",
          propertyType: "Ski Chalet"
        }
      }
    },

  ];
  setPropertylistings(sampleListings);

},[])


  const handleLike = (index) => {
    const newLikedImages = [...likedImages];
    newLikedImages[index] = !newLikedImages[index];
    setLikedImages(newLikedImages);
  };

  const openModal = (listing) => {
    setSelectedImage(listing);
  };

  const closeModal = () => {
    setSelectedImage(null);
    navigate('/listings');
  };

  return (
    <div className='PropertyListingCss'>
      <div className='render-listings'>
        {propertylistings.map((listing, index) => (
          <ListingCard
            key={index}
            listing={listing}
            isLiked={likedImages[index]}
            onLike={() => handleLike(index)}
            onClick={() => openModal(listing)}
          />
        ))}
      </div>
      <PropertyModal
        isOpen={!!selectedImage}
        selectedImage={selectedImage}
        closeModal={closeModal}
        propertylistings={propertylistings}
        likedImages={likedImages}
        handleLike={handleLike}
        openModal={openModal}
      />
    </div>
  );
};

export default PropertyListing;
