import logo from '../images/logo.png'
import background from '../images/image.jpg'
import mobilebg from '../images/mobilebg.jpg'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";

const Home = () => {

  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>

      {isDesktop ? <img className='homepage-bg' src={background} alt="" srcset="" /> : <img className='mobile-homepage-bg' src={mobilebg} alt="" srcset="" />}
      <figure className='homepage-logo-container pt-3'>
        <img className='homepage-logo mt-5' src={logo} alt="Logo" />
      </figure>
      <nav>
        <Link to='/menu' className='d-grid gap-2 col-6 mx-auto mb-2 mt-5 w-25 text-decoration-none'>
          <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> Menu </button>
        </Link>
        <Link to='/about' className='d-grid gap-2 col-6 mx-auto w-25 text-decoration-none'>
          <button type="button" className="btn btn-outline-dark btn-lg homepage--btn"> About </button>
        </Link>
      </nav>
    </>
  )
}

export default Home