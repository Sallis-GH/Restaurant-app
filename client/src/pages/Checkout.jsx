import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal';
import { useState, useContext } from 'react';
import OrderContext from '../context/OrderContext';
import '../__style__/checkout.css';
import CheckoutDisplayCard from '../components/CheckoutDisplayCard';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { order, setOrder } = useContext(OrderContext);
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitFinalOrder = {
      time: new Date().toLocaleDateString(), // 5/12/2020
      date: new Date().toLocaleTimeString(), // 6:50:21 PM
      ...formValues,
      orders: [...order]
    }

    axios.post('http://localhost:8080/api/orders/neworder', submitFinalOrder)
      .then(function (response) {
        console.log(response, 'response');
        navigate('/thankyou');
        setOrder([])
      })
      .catch(function (error) {
        console.log(error, 'error');
      });
    console.log(submitFinalOrder);
  }

  return (
    <div className="checkout-container px-4 my-4">
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="txt-orange">Products in your cart</span>
            <span className="badge bg-orange rounded-pill">{order.reduce((res, product) => res + product.quantity, 0)}</span>
          </h4>
          <ul className="list-group mb-3">
            {order.map((p, i) => <CheckoutDisplayCard key={i} name={p.name} price={p.price} currency={p.currency} quantity={p.quantity} />)}
            <li className="list-group-item d-flex justify-content-between text-blue">
              <span>Total {order[0].currency}</span>
              <strong>{order.reduce((res, p) => { return res + (p.price + p.quantity) }, 0)} {order[0].currency}</strong>
            </li>
          </ul>
        </div>

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 text-blue">Billing address</h4>
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label text-blue">First name</label>
                <input type="text" className="form-control" id="firstName" onChange={handleChange} placeholder="" required="" />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label text-blue">Last name</label>
                <input type="text" className="form-control" id="lastName" onChange={handleChange} placeholder="" required="" />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="phone" className="form-label text-blue">Phone Number</label>
                <input type="tel" className="form-control" id="phone" onChange={handleChange} placeholder="Ex: 071-234-5678" required="" />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label text-blue">Email </label>
                <input type="email" className="form-control" id="email" onChange={handleChange} placeholder="you@example.com" required="" />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label text-blue">Address</label>
                <input type="text" className="form-control" id="address" onChange={handleChange} placeholder="1234 Main St" required="" />
                <div className="invalid-feedback">
                  Please enter your address.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3 text-blue">Payment</h4>

            <div className="my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                <label className="form-check-label text-blue" htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                <label className="form-check-label text-blue" htmlFor="debit">Debit card</label>
              </div>
              <div className="form-check">
                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                <label className="form-check-label text-blue" htmlFor="paypal">PayPal</label>
              </div>
            </div>

            <div className="row gy-3">
              <div className="col-md-6">
                <label htmlFor="cc-name" className="form-label text-blue">Name on card</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="cc-number" className="form-label text-blue">Credit card number</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="cc-expiration" className="form-label text-blue">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="cc-cvv" className="form-label text-blue">CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>

            <hr className="my-4" />
            <Link to='/thankyou'>
              <Modal />
              {/* <button onclick={loading} className="w-100 btn btn-primary btn-lg" variant="success" type="submit">Place Order</button> */}
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout;