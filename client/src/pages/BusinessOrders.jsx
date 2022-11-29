import axios from "axios";
import { useEffect, useState } from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import '../__style__/businessOrder.css';


const BusinessOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log('use effect called');
    axios.get('http://localhost:8080/api/orders')
      .then(async response => {
        setUserInfo(response.data);
        setOrders(
          response.data.map(order => order.orders.map(dish => `${dish.quantity} - ${dish.name}`))
        )
      })
      .catch(error => console.log(error))
  }, [refresh]);

  const completeOrder = event => {
    axios.delete(`http://localhost:8080/api/orders/${userInfo[event.target.id].id}`)
      .catch(error => console.log(error))
    setTimeout(() => setRefresh(!refresh), 500);
  };

  console.log(refresh);

  // return (
  //   <div className='container mt-4'>
  //     <table className="table table-striped">
  //       <thead>
  //         <tr>
  //           <th className="col-5">Order</th>
  //           <th>Time</th>
  //           <th>Client Name / Ref.</th>
  //         </tr>
  //       </thead>
  //       <tbody>

  //         {
  //           userInfo?.map((order, index) => (
  //             <tr key={index} >
  //               <th>
  //                 {
  //                   orders[index].map((dish, index) => <span key={index} > {dish} <br /> </span>)
  //                 }
  //               </th>
  //               <th>{order.date} <span> <br /> {order.time} </span></th>
  //               <th>{order.email} <span> <br /> {order.phone} <br /> </span> {order.address} </th>
  //             </tr>
  //           ))
  //         }
  //       </tbody>
  //     </table>
  //   </div>
  // );

  // <div className="card mb-3" style="max-width: 540px;">
  return (
    <div className="container">
      <div className="row">
        {
          userInfo?.map((order, index) => (
            <div className="col-6" key={index}>
              <div className="card mb-3 shadow-sm card-width" >
                <div className="row g-0">
                  <div className="col-md-2 image">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/554/006/large_2x/catering-food-service-fast-delivery-logistic-line-style-icon-free-vector.jpg" className="img-fluid rounded-start" alt="order_img" />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body pe-0">
                      <div className="row" >
                        <div className="col-4">
                          <h5 className="card-title">NEW ORDER</h5>
                          {orders[index].map((dish, index) => <span key={index} > {dish} <br /> </span>)}
                        </div>
                        <div className="col-4">
                          <h5 className="card-title">TIME</h5>
                          {order.date} <span> <br /> {order.time} </span>
                        </div>
                        <div className="col-4">
                          <h5 className="card-title">USER</h5>
                          {order.email} <span> <br /> {order.phone} <br /> </span> {order.address}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-2">
                        <button id={index} className="btn btn-outline-secondary me-3" onClick={(e) => completeOrder(e)} >Decline</button>
                        <button id={index} className="btn btn-outline-success" onClick={(e) => completeOrder(e)} >Complete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default withAuthenticationRequired(BusinessOrders, {
  onRedirecting: () => (<div>Loading....</div>)
});