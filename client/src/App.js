import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import About from './pages/About';
import NoPage from './pages/NoPage';
import Menu from './pages/Menu';
import AddMenu from './pages/AddMenu';
import Checkout from './pages/Checkout';
import ThankYou from './pages/Thankyou';
import { OrderProvider } from './context/OrderContext';
import BusinessOrders from './pages/BusinessOrders';
import BusinessLogin from './pages/BusinessLogin';
import { RefetchAfterDeleteProvider } from './context/RefetchAfterDeleteContext';

function App() {

  return (
    <RefetchAfterDeleteProvider>
    <OrderProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Layout />}>
          <Route path='about' element={<About />} />
          <Route path='menu' element={<Menu />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='thankyou' element={<ThankYou />} />

          {/* PROTECT ROUTE */}
          <Route path="business/login" element={<BusinessLogin />} />
          <Route path="/business/addmenu" element={<AddMenu />} />
          <Route path="business/orders" element={<BusinessOrders />} />
        </Route>
        <Route path='*' element={<NoPage />} />d
      </Routes>
    </OrderProvider>
    </RefetchAfterDeleteProvider>
  );
}

export default App;
