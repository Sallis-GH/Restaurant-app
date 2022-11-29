import React from 'react'
import { Link } from 'react-router-dom'
import pizzagif from '../images/sleepingpizza.gif'

const NoPage = () => {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <img className="gif" src={pizzagif} alt="pizza gif" />
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
        <p class="lead">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to='/'>
          <button class="btn btn-outline-success">Go Back Home</button>
        </Link>
      </div>
    </div>
  )
}

export default NoPage