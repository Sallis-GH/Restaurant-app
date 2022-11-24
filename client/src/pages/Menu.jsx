import React from 'react'
import { useState, useEffect  } from 'react'
import { useOutletContext } from 'react-router-dom';
import MenuCardsContainer from '../components/MenuCardsContainer';

const Menu = ({test}) => {
  const [menus, setMenus] = useState();
  const [cart, setCart] = useOutletContext()

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

  return (
    <>
      <MenuCardsContainer menus={starters} category={starters?.[0].category} cart={cart} setCart={setCart} />
      <MenuCardsContainer menus={sides} category={sides?.[0].category} cart={cart} setCart={setCart} />
      <MenuCardsContainer menus={pizzas} category={pizzas?.[0].category} cart={cart} setCart={setCart} />
      <MenuCardsContainer menus={desserts} category={desserts?.[0].category} cart={cart} setCart={setCart} />
      <MenuCardsContainer menus={drinks} category={drinks?.[0].category} cart={cart} setCart={setCart} />
    </>
  )
}

export default Menu