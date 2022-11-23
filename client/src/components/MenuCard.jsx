import React from 'react'

const MenuCard = ({name, description, image}) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCard