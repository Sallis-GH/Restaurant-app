import axios from "axios";
import { useEffect, useState } from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';


const BusinessOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders')
      .then(async response => {
        setUserInfo(response.data);
        setOrders(
          response.data.map(order => order.orders.map(dish => `${dish.quantity} - ${dish.name}`))
        )
      })
      .catch(error => console.log(error))
  }, [])

  console.log(orders, 'ORDER');
  console.log(userInfo, 'userInfo');

  return (
    <div className='container mt-4'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-8">Order</th>
            <th>Time</th>
            <th>Client Name / Ref.</th>
          </tr>
        </thead>
        <tbody>

          {
            userInfo?.map((order, index) => (
              <tr key={index} >
                <th>
                  {
                    orders[index].map((dish, index) => <span key={index} > {dish} <br /> </span>)
                  }
                </th>
                <th>{order.date} <span> <br /> {order.time} </span></th>
                <th>{order.email} <span> <br /> {order.phone} <br /> </span> {order.address} </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default withAuthenticationRequired(BusinessOrders, {
  onRedirecting: () => (<div>Loading....</div>)
});