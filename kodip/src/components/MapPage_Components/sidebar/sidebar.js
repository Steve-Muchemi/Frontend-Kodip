import React, { useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import MessageApp from '../message/Envelope.js';
import { useSocketContext } from '../../../hooks/useSocketContext.js';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  
  const { onlineUsers, send, setMessages, messages, readnotification, openEnvelope, setOpenEnvelope } = useSocketContext();
  const locationPath = useLocation().pathname;

  //console.log('sidebar render');

  const handleClickEnvelope = (event) => {
    event.preventDefault();
    setOpenEnvelope(!openEnvelope);
  }

  const handleClickBuilding = (event) => {
    event.preventDefault();
    setMessages(messages === 'now' ? '' : 'now');
  }

  return (
    <>
      <div className='sidebar'>
        <div className='allIcons'>
          <Link to="/"> 
            <FontAwesomeIcon icon={faHouse} className='icons' />
          </Link>
          <Link to="/map"> 
            <FontAwesomeIcon icon={faMapLocationDot} 
             className={`icons ${locationPath == '/map' ? 'active' : ''}`} 
            
            />
          </Link>

          <FontAwesomeIcon 
            icon={faEnvelope} 
            className={`icons ${openEnvelope ? 'active' : ''}`} 
            onClick={handleClickEnvelope}
          />

          <Link to="/listings"> 
            <FontAwesomeIcon 
              icon={faBuilding} 
              className={`icons ${locationPath == '/listings' ? 'active' : ''}`} 
              
            />

          </Link>

          <Link to="/connect"> 
          <FontAwesomeIcon 
          icon={faTowerBroadcast }         
          className={`icons ${locationPath == '/connect' ? 'active' : ''}`} 
          /> </Link>
          
        </div>     
      </div>
      {openEnvelope && <MessageApp/>}
    </>
  );
};

export default SideBar;
