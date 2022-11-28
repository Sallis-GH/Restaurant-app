import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import About from './pages/About';
import NoPage from './pages/NoPage';
import Menu from './pages/Menu';
import AddMenu from './pages/AddMenu';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import ThankYou from './pages/Thankyou';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route index element={<Home />} />

        <Route path='/business-login/addmenu' element={<AddMenu />} />

        <Route path='/' element={<Layout />}>
          <Route path='about' element={<About />} />
          <Route path='menu' element={<Menu />} />
          <Route path='order' element={<Order />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='thankyou' element={<ThankYou />} />
        </Route>
          <Route path='*' element={<NoPage />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;
