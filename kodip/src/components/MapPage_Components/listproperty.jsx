import React, { useState } from 'react';
import axios from 'axios';
import './PropertyForm.css';
import useOnSearch from "./../../hooks/useSearch";

const PropertyForm = () => {
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveInquiries, setReceiveInquiries] = useState(false);
  const [receiveAppInbox, setReceiveAppInbox] = useState(true);
  const [receiveMobileMessage, setReceiveMobileMessage] = useState(false);
  const [receiveWhatsapp, setReceiveWhatsapp] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [code, setCode] = useState('');
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const {postCoordinates, setPostCoordinates} = useOnSearch()
  const [pushpin, setPushpin] = useState({});

useState(()=>{ 
  setPushpin( {
      location : postCoordinates,
      infoboxOption: {
        title: '',
        description: '',
        propertyType: '',
      },
      
    })
}, [postCoordinates])
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
    formData.append('pushpin', pushpin);
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


  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log('file to add', files)
   
   // console.log('images curently present',images)
  //  console.log(typeof(images), 'images are, ')


    const concat = [...images, ...files]

    setImages(concat);
  };

  const addMoreImages = () =>{
    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = 'image/*';
    newInput.multiple = true;
    newInput.addEventListener('change', handleImageUpload);
    document.querySelector('.form-group2').appendChild(newInput);

  }

/*

  pushpin: {
    location: [Number, Number], // Latitude and longitude
    infoboxOption: {
      title: String,
      description: String,
      propertyType: String,
    },
*/

  return (
    <div className="property-form-container">
      <h2>Add Property Listing</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='post-property-form'>
          <div className='post-form-flex1'>
            <div className="form-group">
              <label htmlFor="propertyType">Property Type:</label>
              <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
                <option value="">Select</option>
                <option value="Studio Apartment">Studio Apartment</option>
                <option value="1 Bedroom">1 Bedroom</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

          </div>

          <div className='post-form-flex2'>
            


            <div className="toggle-more-description">
              <label htmlFor="showMoreDescription" >Show Property on Listings Page?</label>
              <input type="checkbox" id="showMoreDescription" checked={showMoreDescription} onChange={() => setShowMoreDescription(!showMoreDescription)} />
              
            </div>

            {showMoreDescription && (
              <div className="more-description">
                <div className="form-group">
                  <label htmlFor="propertyDescription">Description of the property:</label>
                  <textarea id="propertyDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="bedrooms">Bedrooms:</label>
                  <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="bathrooms">Bathrooms:</label>
                  <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="measurement">Measurement (sq ft):</label>
                  <input type="number" id="measurement" value={measurement} onChange={(e) => setMeasurement(e.target.value)} />
                </div>

                <div className="form-group2">
                  <label htmlFor="images">Property Photos:</label>
                  <input type="file" id="images" accept="image/*" onChange={handleImageUpload} multiple required />
                  
                  <button type="button" onClick={addMoreImages} style={{backgroundClolour:'lightgreen'}}>Add More Images </button>

                </div>
              </div>
            )}

            <button type="submit" className="add-photos-button" onChange={handleFormSubmit}>Add Property</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
