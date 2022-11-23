import React from 'react'
import MenuCard from './MenuCard'

const MenuCards = ({ menus }) => {

  return (
    <>
      {menus?.map((item, index) =>(
         <MenuCard key={index}
         name={item.name}
         description={item.description}
         image={item.image?.fields.file.url}  
        />))}
    </>
  )
}

export default MenuCards