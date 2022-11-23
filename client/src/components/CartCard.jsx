import "../__style__/cartCard.css";

const CartCard = ({ cart, deleteItem }) => {
  return (
    cart.map((item, index) => (
      <div className="card m-3 shadow-lg p-3 mb-3 bg-body rounded">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <h5 className="card-title">{item.name}</h5>
              <h5 className="card-title">{item.price * item.quantity} {item.currency}</h5>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-center">
              <h5 className="me-3">{item.quantity}</h5>
              <button className="del-item-cart" onClick={event => deleteItem(event)}> - </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )
};

export default CartCard;