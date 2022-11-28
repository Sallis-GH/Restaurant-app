import { useEffect, useState, useContext} from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import OrderContext from '../context/OrderContext';

const Layout = () => {
  const { order, setOrder } = useContext(OrderContext);
  // console.log(order, "FROM THE LAYOUT");
  const [cart, setCart] = useState([]);

  useEffect(()=> {
    setCart([...order]);
    return
  },[order])

  const addRemoveQuantity = (e, item) => {
    const index = cart.findIndex(product => product.name === item.name && product.price === item.price && product.quantity === item.quantity)
    const updateCart = [...cart];
    if (e.target.id === 'add') {
      updateCart[index].quantity += 1;
    }
 
    // delete operation have a BUG
    if (e.target.id === 'delete') {
      updateCart[index].quantity === 1 ? updateCart.splice(index, 1) : updateCart[index].quantity -= 1; // delete operation have a BUG
    }

    // console.log(updateCart, 'NEW ITEM');
    setCart([...updateCart]);
    setOrder([...updateCart])
  };

  const checkout = () => {
    console.log('checkout');
  }

  return (
    <>
      <Header cart={cart} addRemoveQuantity={addRemoveQuantity} checkout={checkout} />
      <Outlet />
    </>
  )
}

export default Layout