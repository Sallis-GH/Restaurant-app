import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout = () => {
  const [cart, setCart] = useState([]);

  const deleteItem = (item) => {
    console.log(item, 'ITEM DELETED');
  };

  return (
    <>
      <Header cart={cart} deleteItem={deleteItem} />
      <Outlet />
    </>
  )
}

export default Layout