import { useState, useEffect, useContext } from 'react'
import MenuCardsContainer from '../components/MenuCardsContainer';
import OrderContext from '../context/OrderContext';

const Menu = ({isAddMenu}) => {
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

  return menus && (
    <main className='mb-3'>
      <div className='col-12 container'>
        <MenuCardsContainer menus={starters} category={starters?.[0].fields.category} getProductData={getProductData} isAddMenu={isAddMenu}/>
        <MenuCardsContainer menus={sides} category={sides?.[0].fields.category} getProductData={getProductData} isAddMenu={isAddMenu}/>
        <MenuCardsContainer menus={pizzas} category={pizzas?.[0].fields.category} getProductData={getProductData} isAddMenu={isAddMenu}/>
        <MenuCardsContainer menus={desserts} category={desserts?.[0].fields.category} getProductData={getProductData} isAddMenu={isAddMenu}/>
        <MenuCardsContainer menus={drinks} category={drinks?.[0].fields.category} getProductData={getProductData} isAddMenu={isAddMenu}/>
      </div>
      <div className='position-sticky bottom-0 end-0'>
        <button onClick={topFunction} title="Go to top" className='btn btn-outline-success position-absolute bottom-0 end-0 me-3
        mb-3 bg-light pb-0'>^</button>
      </div>
    </main>
  )
}

export default Menu