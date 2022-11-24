import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../__style__/header.css'
import { Cart4 } from 'react-bootstrap-icons';
import CartCard from './CartCard';


const Header = ({ cart, deleteItem }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to='/'>
            <img src={logo} alt="logo" className='header-logo-mobile' />
          </Link>
          <div className="collapse navbar-collapse pt-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link to='/'>
                  <img src={logo} alt="logo" className='header-logo' />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">Link</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {/* todo  */}

            <button className="btn fs-2 mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><Cart4 /></button>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end text-center" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Your Cart:</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <CartCard cart={cart} deleteItem={deleteItem} />
        </div>
      </div>
    </>

  )
}

export default Header