import React from 'react'
import { useState, useEffect  } from 'react'
import MenuCardsContainer from '../components/MenuCardsContainer';

const Menu = () => {
  const [menus, setMenus] = useState();
  
  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(data => data.json())
      .then(data => {
        setMenus(data)
      })
  }, [])
  
  const starters = menus?.filter(item => item?.category.toLowerCase() === 'starter')
  const sides = menus?.filter(item => item?.category.toLowerCase() === 'sides')
  const pizzas = menus?.filter(item => item?.category.toLowerCase() === 'pizza')
  const drinks = menus?.filter(item => item?.category.toLowerCase() === 'drink')
  const desserts = menus?.filter(item => item?.category.toLowerCase() === 'dessert')

  console.log(drinks)
  return (
    <>
      <MenuCardsContainer menus={starters} category={starters?.[0].category} />
      <MenuCardsContainer menus={sides} category={sides?.[0].category} />
      <MenuCardsContainer menus={pizzas} category={pizzas?.[0].category} />
      <MenuCardsContainer menus={desserts} category={desserts?.[0].category} />
      <MenuCardsContainer menus={drinks} category={drinks?.[0].category} />
    </>
  )
}

export default Menu