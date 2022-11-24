import React from 'react'
import MenuCard from './MenuCard'

const MenuCardContainer = ({ menus, category, cart, setCart }) => {

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
          />))}
      </div>
    </section>
  )
}

export default MenuCardContainer