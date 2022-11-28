import axios from "axios";
import { useEffect, useState } from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';


const BusinessOrders = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders')
      .then(async response => setOrder(response))
      .catch(error => console.log(error))
  }, [])

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

          {/* {
          orders.map((order, index) => (
            <tr key={index} >
              <th>{order.order}</th>
              <th>{order.time}</th>
              <th>{order.name}</th>
            </tr>
          ))
        } */}
        </tbody>
      </table>
    </div>
  );
};

export default withAuthenticationRequired(BusinessOrders, {
  onRedirecting: () => (<div>Loading....</div>)
});