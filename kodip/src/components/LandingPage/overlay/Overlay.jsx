import React from 'react';
import "./overlay.css";
import useOverlay from '../../../hooks/useOverlay';

const Overlay = ({setDisplay}) => {
    const {overlay} = useOverlay();
  return (
    <div className={!overlay ? "none" : 'overlay'}></div>
  )
}

export default Overlay