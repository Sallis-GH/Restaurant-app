import { useState, useRef, useContext } from 'react'
import '../__style__/menucardcontainer.css'
import RefetchAfterDeleteContext from '../context/RefetchAfterDeleteContext';
import axios from 'axios';
const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8080'


const MenuCard = ({ name, description, image, price, currency, getProductData, id ,isAddMenu }) => {

  const quantityRef = useRef(0);
  const [quantity, setQuantity] = useState(0)
  const { setIsDeleted } = useContext(RefetchAfterDeleteContext);

  const handleGetProductData = (obj) => {
    getProductData(obj);
  }

  const deleteMenuProduct = () => {
    axios.delete(`${url}/api/menu/${id}`)
    .then(function (response) {
      console.log(response, 'response');
      setIsDeleted(current => !current);
    })
      .catch(error => console.log(error))
  };

  const onDelete = (e) => {
    console.log(e);
    deleteMenuProduct()
  }

  if (!image) {
    return (
      <div className="card ms-2 mb-2 card-container shadow-sm custom-border">
        {!isAddMenu ? '' : 
              <div className=' position-absolute bottom-0 end-0 bg-transparent'>
                <button title="Delete" className='btn bg-white' onClick={onDelete}>❌</button>
              </div>}
        <div className="card-body">
          <h5 className="card-title heading-Text">{name}</h5>
          <p className="card-text paragraph-Text"><small className="text-muted">Price: {price.toFixed(2)} {currency}</small></p>
          {isAddMenu ? '' : <div className='row'>

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
          </div>}
        </div>
      </div>
    )
  }

  return (
    <div className={`card  d-flex justify-content-center shadow-sm custom-border ${isAddMenu ? 'mb-3 col-12 col-lg-6 addmenu-resize' : 'mb-3 ms-2 card-container col-12 col-lg-8 '}`}>
      <div className="row d-flex">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img src={image} className={` rounded-5 shadow my-3  ${isAddMenu ? 'card-image-resize w-100' : 'card-image w-75'}`} alt={name} />
        </div>
        <div className="col-md-7 position-relative">
            {!isAddMenu ? '' : 
              <div className=' position-absolute bottom-0 end-0 bg-transparent'>
                <button title="Delete" className='btn bg-white' onClick={onDelete}>❌</button>
              </div>}
          <div className="card-body">

            <h5 className={`card-title heading-Text ${isAddMenu ? 'h6' : ''}`}>{name}</h5>
            <p className={`card-title paragraph-Text ${isAddMenu ? 'small' : ''}`}>{description}</p>
            <p className={`card-title ${isAddMenu ? 'small' : ''}`}><small className="text-muted">Price: {price.toFixed(2)} {currency}</small></p>
            {isAddMenu ? '' : <div className='column'>

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
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCard