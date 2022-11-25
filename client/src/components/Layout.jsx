import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout = () => {
  const [cart, setCart] = useState([]);

  const addCart = async () => {
    // mock cart
    setCart([{ name: 'Magherita', price: 100, currency: "SEK", quantity: 2 }, { name: 'Marinara', price: 80, currency: "SEK", quantity: 1 }, { name: 'Choco Cake', price: 80, currency: "SEK", quantity: 2 }]);
  };

  const deleteItem = (event, item) => {
    const index = cart.findIndex(cart => cart.name === item.name && cart.price === item.price && cart.quantity === item.quantity)
    const newItem = cart;
    if (event.target.id === 'add') {
      newItem[index].quantity += 1;
    }
    if (event.target.id === 'delete') {
      newItem[index].quantity === 1 ? newItem.splice(index, 1) : newItem[index].quantity -= 1;
    }
    console.log(newItem, 'NEW ITEM');
    setCart([...newItem]);
  };

  const checkout = () => {
    console.log('checkout');
  }

  return (
    <>
      <Header cart={cart} deleteItem={deleteItem} checkout={checkout} />
      <Outlet />
    </>
  )
}

export default Layout