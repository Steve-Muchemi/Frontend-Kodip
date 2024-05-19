import React, { useState } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import axios, { all } from 'axios';


function MapComponent(prop) {
  const [infoboxLocation, setInfoboxLocation] = useState(null);
  const [infoboxVisible, setInfoboxVisible] = useState(false);
  const [pushPins, setPushPins] = useState([]);
  const [getemail, setGetEmail] = useState();

  



        
       
        const email = item.email
        const image = item.imageUrls
        const { location, infoboxOption } = item.pushpin;
        
        
        const pushpin2 = {
          "location":location, 
          "addHandler":"mouseover",
          "infoboxAddHandler": {"type" : "click", callback: createPinClickHandler() }, //on click the pushpin, infobox shown
          "infoboxOption": { 
            
            description: `<div>
            
            <img src = "${image}" alt="Image Alt Text" style="max-width: 100%; height: auto;" />
            <p>Message owners</p>
            <p>View photos</p>
          </div>`,
          },
          "pushPinOption":{ color: 'brown', description: 'PushPin' },
        }
      
      pushPins.push(pushpin2)     
   




function createPinClickHandler() {
    
}


  
  


  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReactBingmaps
        bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
        center={mapOptions.center}
        infoboxesWithPushPins = {pushPins}
      />
    
       
     
    </div>
  );
}

export default MapComponent;
