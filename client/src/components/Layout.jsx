import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout = () => {
  const [cart, setCart] = useState()


  return (
    <>
    <Header />
    <Outlet context={[cart, setCart]}/>
    </>
  )
}

export default Layout