import React from 'react';

import "./layout.css";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import Overlay from '../overlay/Overlay';

const Layout = () => {
  return (
    <div className='layout'>
      <Overlay />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout