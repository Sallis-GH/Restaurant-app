import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
	firstName: { type: String, required: true, },
	lastName: { type: String, required: true, },
	// email: { type: String, required: true, },
	// password: {type: String, min: 6,required: true, },
	isAdmin: { type: Boolean, required: false, default: false, },
	id: { type: String, },
});
const User = model("Users", UserSchema);

const OrderSchema = new Schema({
	address: { type: String, required: true, },
	orders: [String],
	id: { type: String, },
});
const Order = model("Orders", OrderSchema);


  
  
  export { User, Order };