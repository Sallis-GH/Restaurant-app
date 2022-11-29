import "../__style__/cartCard.css";
import { Trash3 } from 'react-bootstrap-icons';


const CartCard = ({ item, addRemoveQuantity }) => {
  return (
    <div className="card shadow p-3 pb-1 mb-3 rounded">
      <div className="row">
        <div className="col-8 text-start">
          <h5 className="card-title text-success">{item.name}</h5>
          <p className="card-title">{item.price.toFixed(2)} {item.currency}</p>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center ctm-border">
          <button className="del-item-cart pb-2" id="delete" onClick={e => addRemoveQuantity(e, item)}> {item.quantity === 1 ? <Trash3 className="fs-6" id='delete' /> : '-'} </button>
          <h5 className="mx-2">{item.quantity}</h5>
          <button className="del-item-cart pb-2" id="add" onClick={e => addRemoveQuantity(e, item)}> + </button>
        </div>
      </div>
    </div>
  )
};

export default CartCard;