import { useState, useEffect, useContext } from 'react'
import MenuCardsContainer from '../components/MenuCardsContainer';
import OrderContext from '../context/OrderContext';

const Menu = () => {
  const { order, setOrder } = useContext(OrderContext);
  const [menus, setMenus] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then(data => data.json())
      .then(data => setMenus(data))
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
  const topFunction = () => {
    window.scrollTo(0, 0)
  }

  return (
    <main>
      <div className='col-12 '>
        <MenuCardsContainer menus={starters} category={starters?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={sides} category={sides?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={pizzas} category={pizzas?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={desserts} category={desserts?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={drinks} category={drinks?.[0].fields.category} getProductData={getProductData} />
      </div>
      <button onClick={topFunction} title="Go to top" className='fs-2 sticky-bottom'>^</button>
    </main>
  )
}

export default Menu