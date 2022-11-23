import { Link } from 'react-router-dom'
import '../__style__/menucardcontainer.css'

const MenuCard = ({ name, description, image, price, currency }) => {
  
  
  
  if(!image) {
    return (
      <div className='col-12 col-md-6 w-50'>
      <div className="card mb-3 card-container">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text"><small>{description}</small></p>
              <Link to="/menu" className="btn btn-primary align-item-center">add to cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  
  
  return (
    <div className='col-12 col-md-6'>
      <div className="card mb-3 card-container">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start d-flex card-image" alt="dish_image" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text"><small>{description}</small></p>
              <h3 className='mb-3'>Price: {price} {currency}</h3>
              <Link to="/menu" className="btn btn-primary align-item-center">add to cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCard