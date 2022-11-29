const CheckoutDisplayCard = ({name, price, currency, quantity}) => {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
    <div>
      <h6 className="my-0">{name}</h6>
    </div>
    <span className="text-muted">{price * quantity} {currency}</span>
  </li>
  )
}

export default CheckoutDisplayCard