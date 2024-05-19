import React, {useEffect} from 'react';
import './thirdrow.css';

function Thirdrow(){

    const ProfilePicUrl = 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600';

    const photoGallery = ["https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600", 
    "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600"
]

const reviews = [
    "Smooth home sale, thanks to our proactive realtor!",
    "Found our dream home with the perfect real estate agent.",
    "Top-notch service, sold our house faster than expected!",
    "Knowledgeable and reliable realtor, highly recommend.",
    "Incredible negotiation skills, got us a fantastic deal!",
    "Responsive and helpful throughout the entire process.",
    "First-time homebuyers, and our realtor made it a breeze.",
    "Efficient and professional service, exceeded expectations.",
    "Impressed by our realtor's market expertise and guidance.",
    "Timely communication, felt confident in every decision."
  ];


    return (
        
        <div className="user-profile">
          <div className="profile-header">
            <img
              className="profile-picture"
              src= {ProfilePicUrl}
              alt="User Profile"
            />
            <h4 className="profile-name">Leslie Alexander</h4>
            <h4>⭐⭐⭐⭐⭐</h4>
          </div>
    
          <div className="photo-gallery">

            {photoGallery.map((photo, index)=>(

            <div key={index} className={`photo ${index === 3 ? 'view-more': ''}` }>
              <img key={index} src={photo} alt={"Photo ${index + 1}"} />

              { index === 3 && (
                <div className= "overlay">
                    <a href="/view-more"> View More</a>
                </div>
              )}
            </div>
            
            ))}
          </div>

            <div className='reviews'>
            <h4> User Reviews </h4>

            { reviews.map((review, index) => (
               <li key={index}> {review}</li>
            ))
             }
                
            </div>


          
           
    
            

           
        </div>
      );
}

export default Thirdrow;