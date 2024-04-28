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
  navigate(`/listings/1`);
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
