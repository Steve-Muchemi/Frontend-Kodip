import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyForm.css';
import useOnSearch from "./../../hooks/useSearch";

const PropertyForm = () => {
  const [slide, setSlide] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState([]);
  const {postCoordinates, setPostCoordinates} = useOnSearch();
  const [pushpin, setPushpin] = useState({});
  const [title, setTitle] = useState('')

  const [priceError, setPriceError] = useState('');


 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveInquiries, setReceiveInquiries] = useState(false);
  const [receiveAppInbox, setReceiveAppInbox] = useState(true);
  const [receiveMobileMessage, setReceiveMobileMessage] = useState(false);
  const [receiveWhatsapp, setReceiveWhatsapp] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [code, setCode] = useState('');

  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [measurement, setMeasurement] = useState('');

  const [images, setImages] = useState([]);
  const [locationString, setLocationString] = useState('');



useEffect(() => {
  if (postCoordinates.length === 2) {
    const [latitude, longitude] = postCoordinates;
    getLocationName(latitude, longitude);
  }
}, [postCoordinates]);


const getLocationName = async (latitude, longitude) => {
  const apiKey = "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"// Replace with your actual Bing Maps API Key
  try {
    const response = await axios.get(`http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${apiKey}`);
    const resources = response.data.resourceSets[0]?.resources;
    if (resources && resources.length > 0) {
      const locationName = resources[0].address.formattedAddress;
      setLocationString(locationName);
      console.log(locationName, 'name of location')
    } else {
      setLocationString("Unknown location");
    }
  } catch (error) {
    console.error("Error fetching location name:", error);
    setLocationString("Error fetching location");
  }
};


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(pushpin, 'pushpin')//this is showing the price of 3000 
    

    
    
    const formData = new FormData();
    formData.append('owner', localStorage.userid);
    formData.append('propertyType', propertyType);
    formData.append('price', price);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('measurement', measurement);
    formData.append('description', description);
    formData.append('description', description);
    formData.append('locationString', locationString);
    images.forEach((image) => {
      formData.append('images', image);
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post('http://localhost:3002/api/property/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setPropertyType('');
    setPrice('');
    setPhoneNumber('');
    setReceiveInquiries(false);
    setReceiveAppInbox(true);
    setReceiveMobileMessage(false);
    setReceiveWhatsapp(false);
    setReceiveEmail(false);
    setCode('');
    setShowMoreDescription(false);
    setBedrooms('');
    setBathrooms('');
    setMeasurement('');
    setDescription('');
    setPushpin('');
    
  };




  const addMoreImages = () =>{
    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = 'image/*';
    newInput.multiple = true;
    newInput.addEventListener('change', handleImageUpload);
    document.querySelector('.form-group2').appendChild(newInput);

  }





  const maxTitleLength = 60; //avoid long titles
  const amenitiesList = [
    "Aircon",
    "Backup Generator",
    "Balcony",
    "Gym",
    "Parking",
    "Staff Quarters",
    "Garden",
    "Swimming Pool",
    "Borehole",
    "Furnished",
    "High-speed Internet/Wi-Fi",
    "Security System",
    "Elevator/Lift",
    "Pet-friendly Policies",
    "Laundry Facilities",
    "Wheelchair Accessibility",
    "Community/Recreation Room",
    "On-site Maintenance",
    "Smart Home Features", 
    "Playground",
  
  ];




  const goToNextSlide = () => {
    setSlide(slide + 1);
  };

  const goToPrevSlide = () => {
    setSlide(slide - 1);
  };

  const handleAmenityClick = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(item => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxTitleLength) {
      setTitle(value);
    }
  };
  
  const remainingCharacters = maxTitleLength - title.length;
  const isTitleValid = title.length <= maxTitleLength;

  



  


  
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);

    if (!/^\d*$/.test(value)) {
      setPriceError('Numbers only, please');
    } else if (value < 1000 || value > 1000000) {
      setPriceError('no way your rent is that low');
    } else {
      setPriceError('');
    }
  };

  const isFormValid = () => {
    return priceError === '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Form submission logic
    } else {
      // Display error messages or handle invalid form
    }
  };



  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log('file to add', files)
   
   // console.log('images curently present',images)
  //  console.log(typeof(images), 'images are, ')


    const concat = [...images, ...files]

    setImages(concat);
  };











  return (
    <div className="property-form-container">
      <h2>Add Property Listing</h2>
      <form onSubmit={handleFormSubmit}>
        {slide === 1 && (
          <div className='slide'>

            <div className="form-group">
            <label htmlFor="title">Title of Listing :</label>
          <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}               
              maxLength={maxTitleLength}
              className={!isTitleValid ? 'invalid' : ''}
              required 
           />


              <label htmlFor="propertyType">Property Type:</label>
              <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
                <option value="">Select</option>
                <option value="Studio Apartment">Single Room</option>                
                <option value="Studio Apartment">Studio Apartment</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="Studio Apartment">2 Bedroom</option>
                <option value="1 Bedroom">3 Bedroom</option>
                <option value="1 Bedroom">4+ Bedroom</option>                
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="text" id="price" 
              value={price} 
              onChange={handlePriceChange} 
 
              required 
              />
              {priceError && <span className="error-message" style={{ color: 'red', fontSize: '14px', fontStyle: 'italic', marginTop: '5px' }}>{priceError}</span>}
      
            </div>

            <div class="prev-next">
                
               
                <button type="button" className="next-button" onClick={goToNextSlide}>Next</button>
                </div>
          </div>
        )}

        {slide === 2 && (
          <div className='slide'>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="amenities-container">
              <label>Amenities:</label>

              <div className="amenities">
      {amenitiesList.map((amenity) => (
        <button
          key={amenity}
          className={amenities.includes(amenity) ? "selected" : ""}
          onClick={() => handleAmenityClick(amenity)}
        >
          {amenity}
        </button>
      ))}
    </div>

            </div>


           


            <div className="button-group">
            <div class="prev-next">
                
                <button type="button" className="prev-button" onClick={goToPrevSlide}>Previous</button>
                <button type="button" className="next-button" onClick={goToNextSlide}>Next</button>
                </div>
             
              
            </div>
          </div>
        )}

          {slide === 3 && (
            <div className='slide'>


            <div className="form-group2">
                  <label htmlFor="images">Add photos:</label>
                  <input type="file" id="images" accept="image/*" onChange={handleImageUpload} multiple required />
                  
                 

                </div>
                <button type="button" className="add-images" onClick={addMoreImages} style={{backgroundClolour:'lightgreen'}}>Add More Images </button>

              <div class="prev-next">
                
                <button type="button" className="prev-button" onClick={goToPrevSlide}>Previous</button>
                <button type="button" className="next-button" onClick={goToNextSlide}>Next</button>
                </div>
   
             
                
           </div>
            )}
          {slide === 4 && (
            <div className='slide'>
              <div>
              submit your property?
              </div>
              <button type="submit" className="add-property"  >Add Property</button>
               

               {/*an animaton here to confirm to the user the property has been sumbitted
               like a loading 
               */}
             
             <div class="prev-next">
                
                <button type="button" className="prev-button" onClick={goToPrevSlide}>Previous</button>
               
                </div>
              
           </div>
            )}



        
      </form>
    </div>
  );
};

export default PropertyForm;


          