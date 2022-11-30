import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import React from "react";
import '../__style__/home.css';
import { useAuth0 } from '@auth0/auth0-react';
import Carousel from '../components/Carousel';


const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Carousel />
      <div className=' d-flex justify-content-center button-container'>
        <nav className='btn-menu w-100 p-2 rounded mx-5 shadow'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img className='homepage-logo mb-4' src={logo} alt="Logo" />
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
          </div>
        </nav>
      </div>
    </>
  )
}

export default Home;