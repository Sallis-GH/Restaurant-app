import React from 'react'
import MenuCard from './MenuCard'

const MenuCardContainer = ({ menus, category }) => {

  return (
    <section className='container'>
      <div className='row'>
        <h1>{category}</h1>
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