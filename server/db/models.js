import { Schema, model } from 'mongoose';

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

const menuSchema = new Schema({
	// "id": String,
	"name": String,
	"description": String,
	"price": Number,
	"currency": String,
	// "img":
	// {
	// 	data: Buffer,
	// 	contentType: String
	// },
});

const Menu = model("Menu", menuSchema);

const imgSchema = new Schema({
	"id": Number,
	"file": {
		"name": String,
		"data": Buffer,
		"size": Number,
		"encoding": String,
		"tempFilePath": String,
		"truncated": Boolean,
		"mimetype": String,
		"md5": String,
		"mv": []
	}
})

const Img = model("Img", imgSchema)

export { User, Order, Menu, Img };