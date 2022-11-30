import { useState, useRef, useContext } from 'react'
import '../__style__/menucardcontainer.css'
import RefetchAfterDeleteContext from '../context/RefetchAfterDeleteContext';
import axios from 'axios';


const MenuCard = ({ name, description, image, price, currency, getProductData, id ,isAddMenu }) => {
  // console.log(id);

  const quantityRef = useRef(0);
  const [quantity, setQuantity] = useState(0)
  const { setIsDeleted } = useContext(RefetchAfterDeleteContext);

  const handleGetProductData = (obj) => {
    getProductData(obj);
  }

  const deleteMenuProduct = () => {
    axios.delete(`http://localhost:8080/api/menu/${id}`)
    .then(function (response) {
      console.log(response, 'response');
      setTimeout(() => setIsDeleted(current => !current), 500);
    })
      .catch(error => console.log(error))
  };

  const onDelete = (e) => {
    console.log(e);
    // deleteMenuProduct()
  }

  if (!image) {
    return (
      <div className="card ms-2 mb-2 card-container shadow-sm">
        {!isAddMenu ? '' : 
              <div className=' position-absolute end-0 bg-light'>
                <button title="Delete" className='btn bg-white' onClick={onDelete}>❌</button>
              </div>}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"><small className="text-muted">Price: {price.toFixed(2)} {currency}</small></p>
          {isAddMenu ? '' : <div className='row'>
            <div className='col-6 col-lg-4'>
              <button onClick={() => handleGetProductData({ name, price: +price, currency, quantity: +quantityRef.current.textContent })} type="button" className="btn btn-outline-secondary add-to-cart--btn">Add to cart</button>
            </div>
            <div className='col-6 col-lg-4'>
              <div className="input-group mb-3">
                <button onClick={() => quantity ? setQuantity(quantity - 1) : null} type="button" className="btn btn-outline-success border border-3 border-end-0 border-success ">-</button>
                <span className='quantity-text fs-4 border-top border-bottom border-3 px-2 border-success quantity-text' ref={quantityRef}>{quantity}</span>
                <button onClick={() => quantity < 10 ? setQuantity(quantity + 1) : null} type="button" className="btn btn-outline-success border border-3 border-start-0 border-success ">+</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }

  return (

    <div className={`card  d-flex justify-content-center shadow-sm ${isAddMenu ? 'mb-3 col-12 col-lg-6 addmenu-resize' : 'mb-3 ms-2 card-container col-12 col-lg-8 '}`}>
      <div className="row d-flex">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img src={image} className={` rounded-5 shadow my-3  ${isAddMenu ? 'card-image-resize w-100' : 'card-image w-75'}`} alt={name} />
        </div>
        <div className="col-md-7 position-relative">
            {!isAddMenu ? '' : 
              <div className=' position-absolute end-0 bg-light'>
                <button title="Delete" className='btn bg-white' onClick={onDelete}>❌</button>
              </div>}
          <div className="card-body">
            <h5 className={`card-title ${isAddMenu ? 'h6' : ''}`}>{name}</h5>
            <p className={`card-title ${isAddMenu ? 'small' : ''}`}>{description}</p>
            <p className={`card-title ${isAddMenu ? 'small' : ''}`}><small className="text-muted">Price: {price.toFixed(2)} {currency}</small></p>
            {isAddMenu ? '' : <div className='column'>
              <div className='col-6 col-md-12 align-content-center'>
                <button onClick={() => handleGetProductData({ name, price: +price, currency, quantity: +quantityRef.current.textContent })} type="button" className="btn btn-outline-secondary add-to-cart--btn">Add to cart</button>
              </div>
              <div className='col-6 col-md-10 col-lg-6'>
                <div className="input-group mb-3 mt-2">
                  <button onClick={() => quantity ? setQuantity(quantity - 1) : null} type="button" className="btn btn-outline-success border border-3 border-end-0 border-success w-25 justify-content-center ">-</button>
                  <span className='quantity-text fs-4 border-top border-bottom border-3 px-2 border-success w-25 justify-content-center' ref={quantityRef}>{quantity}</span>
                  <button onClick={() => quantity < 10 ? setQuantity(quantity + 1) : null} type="button" className="btn btn-outline-success border border-3 border-start-0 border-success w-25 justify-content-center ">+</button>
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