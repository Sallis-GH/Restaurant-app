import logo from '../images/logo.png'
// import background from '../images/image.jpg'
// import mobilebg from '../images/mobilebg.jpg'
import { Link } from 'react-router-dom'
import React from "react";
import '../__style__/home.css';
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
  const { isAuthenticated } = useAuth0();


  return (
    <>
      <figure className='homepage-logo-container pt-3'>
        <img className='homepage-logo mt-5' src={logo} alt="Logo" />
      </figure>
      <div className=' d-flex justify-content-center fork-img'>
        <nav className='btn-menu border py-5 rounded mx-5 shadow w-50'>
          <Link to='/menu' className='d-grid gap-2 col-6 mx-auto mb-2 text-decoration-none'>
            <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> Menu </button>
          </Link>
          <Link to='/about' className='d-grid gap-2 col-6 mx-auto text-decoration-none'>
            <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> About </button>
          </Link>
          {
            isAuthenticated &&
            <>
              <Link to='/business/AddMenu' className='d-grid gap-2 col-6 mx-auto text-decoration-none mt-2'>
                <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> Edit Menu </button>
              </Link>
              <Link to='/business/orders' className='d-grid gap-2 col-6 mx-auto text-decoration-none mt-2'>
                <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> Orders Page </button>
              </Link>
            </>
          }
        </nav>
      </div>
    </>
  )
}

export default Home