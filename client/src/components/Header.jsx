import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../__style__/header.css'
import { Cart4 } from 'react-bootstrap-icons';
import CartCard from './CartCard';


const Header = ({ cart, addRemoveQuantity, checkout }) => {
  let quantity = 0;
  let price = 0;

  if (cart.length) {
    quantity = cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  if (cart.length) {
    price = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  }

  return (
    <>
    <header className='sticky-top'>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid custom-width">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to='/'>
            <img src={logo} alt="logo" className='header-logo-mobile' />
          </Link>
          <div className="collapse navbar-collapse pt-3 pb-3" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link to='/'>
                  <img src={logo} alt="logo" className='header-logo' />
                </Link>
              </li>
            </ul>
          </div>
          <div className='d-flex align-item-center'>
            <button className="btn fs-2 mb-2 mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><Cart4 /></button>
            {quantity !== 0 && <p className='notification'> {quantity} </p>}
          </div>
        </div>
      </nav>
    </header>

      <div className="offcanvas offcanvas-end text-center p-4" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Your Cart:</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body border-bottom">
          {
            cart.map((item, i) => <CartCard key={i} item={item} addRemoveQuantity={addRemoveQuantity} />)
          }
        </div>
        <div className='row mt-3 mb-3'>
          <div className='col-8'>
            <h5 className="bold text-start ms-3"> Total (Incl. VAT)</h5>
          </div>
          <div className='col-4'>
            {cart.length && <h5 className="bold"> {price.toFixed(2)} {cart[0].currency} </h5>}
          </div>
        </div>
        <Link to='/checkout'><button className='btn btn-success' data-bs-dismiss="offcanvas" onClick={checkout} >Go to checkout!</button></Link>
      </div>
    </>
  )
}
 
export default Header;