import React, { useState, useRef, useEffect } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import axios from 'axios';
import './mapfile.css';
import './bingmap.css';
import PropertyForm from "../listproperty";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';

import useOnSearch from "../../../hooks/useSearch";
import { useSocketContext } from '../../../hooks/useSocketContext.js';

import { useParams, useNavigate } from 'react-router-dom';



function MapComponent() {
  const [infoboxLocation, setInfoboxLocation] = useState(null);
  const [infoboxVisible, setInfoboxVisible] = useState(false);
  const [pushpins, setPushpins] = useState([]);

  const searchInputRef = useRef(null);
  const {onSearch, setOnSearch, postCoordinates, setPostCoordinates} = useOnSearch() // fix: new property context maybe
  const [clickLocation, setClickLocation] = useState(null); // Fix: useState should be a function
  const [postModal,setPostModal] = useState(false);
  const { socket, selectedUser, setSelectedUser, openEnvelope, setOpenEnvelope } = useSocketContext();
  const [setUsersMatching, usersmatching] = useState([]);

  const navigate = useNavigate();
 
const handleModalOpen = (pin) =>{
  console.log('clicked the button message owner', pin.owner)
  //set to open
  //search for user
  // set user as selected
  socket.emit('search user', pin.owner)
  
}


const handleViewPhotos = (pin) =>{
  console.log('clicked handleviewphotos')
  //how to navigate the user to the root /listings/1 when this function is called?
  navigate(`/listings`);
}



useState(()=>{
socket.on('users matching search', (usersmatching)=>{
  console.log('usesmatching1', usersmatching)
    //setUsersMatching([...usersmatching])
    setSelectedUser(...usersmatching)
    //open message modal
    setOpenEnvelope(true)

  })
 
//set selected user as user matching
//
  
}, [usersmatching])



useState(()=>{
 
   
        //console.log(response.data)
       // setPushpins(response.data)
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
            location: [-1.223679, 36.999467],
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
            location: [-1.236389, 36.957223],
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
            location: [-1.246389, 36.907223],
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
            location: [-1.2521, 36.7919],
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
            location: [-1.2631, 36.8317],
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
            location: [-1.27167, 36.742194],
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
            location: [-1.2822, 36.8114],
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
            location: [-1.2995, 36.7633],
            infoboxOption: {
              title: "Luxury Ski Chalet",
              propertyType: "Ski Chalet"
            }
          }
        },
    
      ];
    
  let a = [];
      sampleListings.forEach((pin)=>{
  
        a.push({
          location: pin.pushpin.location,
          addHandler: "click",
          infoboxOption: { 
            title: '',
            description: `<div>
              <img src="${pin.images[0]}" alt="Image Alt Text" class='infoboximage' style="max-width: 100%; height: auto;" />
             
            </div>`,
  
           
            actions: [{
                label: 'Message',
                eventHandler: () => handleModalOpen(pin),
            }, {
                label: 'View Photos',
                eventHandler: ()=>{ handleViewPhotos(pin)},
            }]
            
  
          },
          pushPinOption: { color: 'black', title: pin.pushpin.infoboxOption.title },
        }, )
  
  
      }  )
      
  
      setPushpins(a)
  

    
  
  })






/*
useState(()=>{
axios.get('http://localhost:3002/api/property/get/all')
  .then(response=>{
      //console.log(response.data)
     // setPushpins(response.data)
  
let a = [];
    response.data.forEach((pin)=>{

      a.push({
        location: pin.pushpin.location,
        addHandler: "click",
        infoboxOption: { 
          title: '',
          description: `<div>
            <img src="${pin.images[0]}" alt="Image Alt Text" class='infoboximage' style="max-width: 100%; height: auto;" />
           
          </div>`,

         
          actions: [{
              label: 'Message',
              eventHandler: () => handleModalOpen(pin),
          }, {
              label: 'View Photos',
              eventHandler: ()=>{ handleViewPhotos(pin)},
          }]
          

        },
        pushPinOption: { color: 'black', title: pin.pushpin.infoboxOption.title },
      }, )


    }  )
    

    setPushpins(a)






  })
  .catch(error=>{
      console.log(error);
  })

})
 */ 



  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  useEffect(() => {
    // Sample coordinates for places in Nairobi
    const latitudeNairobi1 = -1.286389;
    const longitudeNairobi1 = 36.817223;     
  }, []);

  const latitudeNairobi2 = -1.2921;
  const longitudeNairobi2 = 36.8219;

  // Static pushpin data with infobox for Nairobi
  const image = 'https://images.unsplash.com/photo-1623298317883-6b70254edf31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  

//pull pins from the database.

   





  const handleMouseDown = (e) => {
    const latitude = e.latitude;
    const longitude = e.longitude;
  
    const holdTimer = setTimeout(() => {
      console.log('Hold click event triggered', { latitude, longitude });
      setClickLocation({ latitude, longitude });
      setPostCoordinates([latitude, longitude])
      setPostModal(true)
    }, 1000); // Hold duration set to 2 seconds (2000 milliseconds)
  
    const handleMouseUp = () => {
      clearTimeout(holdTimer);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const getLocation = {
    addHandler: 'mousedown',
    callback: handleMouseDown
  };




  useEffect(() => {
    // Update the center of the map when infoboxLocation changes
    if (infoboxLocation) {
      mapOptions.center = [infoboxLocation.latitude, infoboxLocation.longitude];
    }
  }, [infoboxLocation]);

  useEffect(() => {
    const handleSearch = async (onSearch) => {
      const searchQuery = onSearch.location;

      if (searchQuery.trim() !== "") {
        try {
          const response = await axios.get(
            `http://dev.virtualearth.net/REST/v1/Locations?q=${searchQuery}&key=${mapOptions.credentials}`
          );

          const locations = response.data.resourceSets[0]?.resources;

          if (locations && locations.length > 0) {
            const firstLocation = locations[0];
            const location = {
              latitude: firstLocation.point.coordinates[0],
              longitude: firstLocation.point.coordinates[1],
            };
            setInfoboxLocation(location);
            setInfoboxVisible(true);
          } else {
            alert("Location not found. Kindly check your spelling.");
          }
        } catch (error) {
          console.error("Error searching for location:", error);
        }
      } else {
        console.error("Please enter a valid search query.");
      }
    };

    if (onSearch.location) {
      handleSearch(onSearch);
    }
  }, [onSearch]);

  

  return (
    <div className='mapComponent'>
      <ReactBingmaps
        bingmapKey={mapOptions.credentials}
        center={infoboxLocation ? [infoboxLocation.latitude, infoboxLocation.longitude] : mapOptions.center}
        infoboxesWithPushPins={pushpins}
        style={{ width: "100%", height: "100%", position: 'absolute' }}
        
        getLocation={getLocation}

        



        
      />

      

{console.log(pushpins)}
{postModal && (
        <div className="post-property-modal">
         
            <span className="close-propertyform" onClick={() => setPostModal(false)}>&times;</span>
            <PropertyForm/>
        
        </div>
      )}
    </div>





  );
}

export default MapComponent;
