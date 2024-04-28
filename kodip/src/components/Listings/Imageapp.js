import React, {useState} from 'react';
import styles from './Imageapp.module.css';
import Modal from 'react-modal';

function Imageapp ({selected}) {

	const [selectedImage, setSelectedImage] = useState(null);


	function openImage (selected) {

		setSelectedImage(selected);

	}

const closeModal = () => {
	setSelectedImage(null);
};








	return (

<div className = {styles.Imageapp}>


    <div className={styles.Modalimages}>
        <img src={selected[0]} alt={selected.title} className={styles.imagepop1} 

        onClick = {() => openImage(selected[0])}

        />
        <h4 className={styles.text}>Click for full-size image </h4>


        <div className={styles.imagepopgroup}>
            {console.log('what is selected', selected)}

        {
            
            selected.map((item, index)=>(
                <img key={index} src={item} alt={`Image ${index + 1}`} className={styles.imagepop2} onClick = {() => openImage(selected[index])}/>
            ))
        }

       
   </div>

   <Modal
    isOpen = {selectedImage !==null}
    onRequestClose = {closeModal}
    contentLabel = "image Modal"
    className= {styles.selectimageModal}
    >
    <img src={selectedImage} alt={selected.title} className={styles.selectmodal}/>
    <button className={styles.closeselected} onClick= {closeModal}> Close </button> 

    </Modal>
    </div>


</div>
		)};

export default Imageapp;