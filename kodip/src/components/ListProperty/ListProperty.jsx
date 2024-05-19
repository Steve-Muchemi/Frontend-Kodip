import React, { useState } from 'react';
import './ListProperty.css'
import { Link } from "react-router-dom";

export default function ListProperty(){
const [listPropertyModal, setlistPropertyModal] = useState(false)
const [hasListedProperties, setHasListedProperties] = useState(false)
    
const handleModalOpen = ()=>{

if (listPropertyModal == false){
  setlistPropertyModal(true)
} else{
  setlistPropertyModal(false)
 
}
}







return (
  <>
    <div>
{hasListedProperties && (
  <button className="nav-button-style"> <Link to="/manage"> Manage Property </Link></button>
)}
</div>



<div>
{!hasListedProperties && (

  <button onClick={handleModalOpen} className="nav-button-style">List Property</button>
)
}
 </div>     
    

 {listPropertyModal && !hasListedProperties && (
      <div className="">
        <div className="listPropertymodal-content">
          <span className="close" onClick={handleModalOpen}>&times;</span>
          <h4>Posting your in 3 easy steps:</h4>
          <ol>
            <li>Search on the map for your Property.</li>
            <li>Click and hold on the property for 1-2 seconds, then fill out your details in the popup.</li>
            <li>Click submit!</li>
            
          </ol>
          <>* Click here to learn more!</>
        </div>

        <div>
      
      
    </div>
      </div>

      
    )}
  </>
);

    
}