import React from 'react'
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <h1>Header</h1>
    <Outlet />
    <h1>Footer</h1>
    </>
  )
}

export default Layout