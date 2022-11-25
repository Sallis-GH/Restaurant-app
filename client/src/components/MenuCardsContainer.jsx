import React, { useState } from 'react'
import { useEffect } from 'react'
import MenuCard from './MenuCard'

const MenuCardContainer = ({ menus, category }) => {

  const [cart, setCart] = useState([])

  const getProductData = (obj) => {
    if (obj.quantity < 1) {
      return;
    }
    const newCart = cart
    const findIndex = newCart.findIndex(item => item.name === obj.name)
    if (findIndex < 0) {
      newCart.push(obj)
    } else {
      newCart[findIndex].quantity += obj.quantity;
    }
    setCart(newCart)
    console.log(cart);
  }

  return (
    <section className='container'>
      <div className='row d-flex justify-content-between'>
        <h1 className='border-bottom text-left'>{category}</h1>
        <div className='mt-4'></div>
        {menus?.map((item, index) => (
          <MenuCard key={index}
            name={item.name}
            description={item.description}
            image={item.image?.fields.file.url}
            price={item.price}
            currency={item.currency}
            getProductData={getProductData}
          />))}
      </div>
    </section>
  )
}

export default MenuCardContainer