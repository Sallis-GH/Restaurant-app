import { useState, useEffect, useContext } from 'react'
import MenuCardsContainer from '../components/MenuCardsContainer';
import OrderContext from '../context/OrderContext';

const Menu = () => {
  const { order , setOrder } = useContext(OrderContext);
  const [menus, setMenus] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setMenus(data)
      })
  }, [])
  
  const starters = menus?.filter(item => item?.fields.category.toLowerCase() === 'starter')
  const sides = menus?.filter(item => item?.fields.category.toLowerCase() === 'sides')
  const pizzas = menus?.filter(item => item?.fields.category.toLowerCase() === 'pizza')
  const drinks = menus?.filter(item => item?.fields.category.toLowerCase() === 'drink')
  const desserts = menus?.filter(item => item?.fields.category.toLowerCase() === 'dessert')
 
  const getProductData = (product) => {
    const findProductIndex = order.findIndex(orderItem => orderItem.name === product.name)
    if (product.quantity < 1) {
      return;
    }
    if (findProductIndex === -1) {
      setOrder(prevorder => [...prevorder, product])
    } else {
      setOrder(prevorder => {
        prevorder[findProductIndex].quantity += product.quantity
        return [...prevorder]
      })
    }
  }

  return (
    <>
      <MenuCardsContainer menus={starters} category={starters?.[0].category} getProductData={getProductData}/>
      <MenuCardsContainer menus={sides} category={sides?.[0].category} getProductData={getProductData}/>
      <MenuCardsContainer menus={pizzas} category={pizzas?.[0].category} getProductData={getProductData}/>
      <MenuCardsContainer menus={desserts} category={desserts?.[0].category} getProductData={getProductData}/>
      <MenuCardsContainer menus={drinks} category={drinks?.[0].category} getProductData={getProductData}/>
    </>
  )
}

export default Menu