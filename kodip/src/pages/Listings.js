import React from  'react';

import SearchBar from '../components/SearchBar/searchbar';
import PropertyListings from '../components/Listings/PropertyListing/PropertyListings';
import SideBar from '../components/MapPage_Components/sidebar/sidebar';


const Listings = ()=>{

  return (
    <div >
    <SideBar/>
    <PropertyListings/>

    </div>
  )
}
export default Listings;