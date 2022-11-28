import axios from "axios";
import { useEffect, useState } from "react";

const BusinessOrders = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders')
      .then(async response => setOrder(response))
      .catch(error => console.log(error))
  }, [])

  console.log(order, 'porcodio');
  return (
    <div className='container'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-8">Order</th>
            <th>Time</th>
            <th>Client Name</th>
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

export default BusinessOrders;