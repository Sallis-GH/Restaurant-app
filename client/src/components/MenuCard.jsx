import { useState, useRef } from 'react'
import '../__style__/menucardcontainer.css'

const MenuCard = ({ name, description, image, price, currency, getProductData }) => {

  const quantityRef = useRef(0);
  const [quantity, setQuantity] = useState(0)

  const handleGetProductData = (obj) => {
    getProductData(obj);
  }

  if (!image) {
    return (
      <div className="card ms-2 mb-2 card-container shadow-sm custom-border">
        <div className="card-body">
          <h5 className="card-title paragraph-Text">{name}</h5>
          <p className="card-text paragraph-Text"><small className="text-muted">Price: {price.toFixed(2)}{currency}</small></p>
          <div className='row'>
            <div className='col-6 col-lg-4'>
              <button onClick={() => handleGetProductData({ name, price: +price, currency, quantity: +quantityRef.current.textContent })} type="button" className="btn add-to-cart--btn">Add to cart</button>
            </div>
            <div className='col-6 col-lg-4'>
              <div className="input-group mb-3">
                <button onClick={() => quantity ? setQuantity(quantity - 1) : null} type="button" className="btn btn-count border border-3 border-end-0 border-success custom-border">-</button>
                <span className='quantity-text fs-4 border-top border-bottom border-3 px-2 border-success quantity-text custom-border' ref={quantityRef}>{quantity}</span>
                <button onClick={() => quantity < 10 ? setQuantity(quantity + 1) : null} type="button" className="btn btn-count border border-3 border-start-0 border-success custom-border">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="card card-container mb-3 col-12 col-lg-8 ms-2 d-flex justify-content-center shadow-sm custom-border">
      <div className="row d-flex">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img src={image} className="card-image w-75 rounded-5 shadow mt-3" alt={name} />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title paragraph-Text">{name}</h5>
            <p className="card-text paragraph-Text">{description}</p>
            <p className="card-text"><small className="text-muted paragraph-Text">Price: {price.toFixed(2)} {currency}</small></p>
            <div className='column'>
              <div className='col-6 col-md-12 align-content-center'>
                <button onClick={() => handleGetProductData({ name, price: +price, currency, quantity: +quantityRef.current.textContent })} type="button" className="btn add-to-cart--btn">Add to cart</button>
              </div>
              <div className='col-6 col-md-10 col-lg-6'>
                <div className="input-group mb-3 mt-2">
                  <button onClick={() => quantity ? setQuantity(quantity - 1) : null} type="button" className="btn add-to-cart--btn border border-3 border-end-0 border custom-border sw-25 text-blue justify-content-center">-</button>
                  <span className='quantity-text fs-4 border-top border-bottom border-3 px-2 custom-border w-25 justify-content-center' ref={quantityRef}>{quantity}</span>
                  <button onClick={() => quantity < 10 ? setQuantity(quantity + 1) : null} type="button" className="btn add-to-cart--btn border border-3 border-start-0 custom-border text-blue w-25 justify-content-center ">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCard