import { useState, useEffect, useContext } from 'react'
import MenuCardsContainer from '../components/MenuCardsContainer';
import OrderContext from '../context/OrderContext';
const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8080'
console.log(process.env.REACT_APP_BASE_URL)

const Menu = () => {
  const { order, setOrder } = useContext(OrderContext);
  const [menus, setMenus] = useState();

  useEffect(() => {
    fetch(`${url}/api/menu`)
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
      <div className='col-12'>
        <MenuCardsContainer menus={starters} category={starters?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={sides} category={sides?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={pizzas} category={pizzas?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={desserts} category={desserts?.[0].fields.category} getProductData={getProductData} />
        <MenuCardsContainer menus={drinks} category={drinks?.[0].fields.category} getProductData={getProductData} />
      </div>
      <div className='position-sticky bottom-0 end-0'>
        <button onClick={topFunction} title="Go to top" className='btn btn-outline-success fs-2 position-absolute bottom-0 end-0 mx-1
        mb-1 bg-light'>^</button>
      </div>
    </main>
  )
}

export default Menu