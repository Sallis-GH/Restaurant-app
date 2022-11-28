import '../__style__/AddMenu.css'
import { useState, useRef } from 'react'
import InputOptionComp from '../components/InputOptionComp'
import IngredientInput from '../components/IngredientInput'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';


const categories = ['starters', 'sides', 'pizza', 'drinks', 'dessert']
const curr = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD',
	'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD',
	'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD',
	'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ',
	'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD',
	'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD',
	'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR',
	'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP',
	'PKR', 'PLN', 'PYG', 'QAR', 'QUN', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD',
	'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
	'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF',
	'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL']


const AddMenu = () => {


	const [formValues, setFormValues] = useState({});
	const [ingredientsFormValues, setIngredientsFormValues] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [image, setImage] = useState(null);
	const inputRef = useRef();

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
	};

	const handleImgChange = (e) => {
		setImage(e.target.files[0])
	};

	const ingredientsHandleChange = (e, index) => {
		const values = [...ingredientsFormValues];
		values[index].value = e.target.value;
		setIngredientsFormValues(values);
	};

	const ingredientsHandleAddField = (e) => {
		e.preventDefault();
		const values = [...ingredientsFormValues];
		values.push({
			label: inputRef.current.value || "label",
			value: "",
		});
		setIngredientsFormValues(values);
		setToggle(false);
	};

	const ingredientsHandleDeleteField = (e, index) => {
		const values = [...ingredientsFormValues];
		values.splice(index, 1);
		setIngredientsFormValues(values);
	};

	const addBtnClick = (e) => {
		e.preventDefault();
		setToggle(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const img = new FormData();

		img.append('img', image);


		const ingredients = ingredientsFormValues.reduce((res, ing) => {
			return { ...res, [(ing.label).toLowerCase()]: ing.value }
		}, {})

		const product = {
			...formValues,
			img,
			ingredients: { ...ingredients },
		}
		product.ingredients = ingredients

		// axios.post('http://localhost:8080/api/menu/newDish', product)
		// .then(function (response) {
		//   console.log(response, 'response');
		// })
		// .catch(function (error) {
		//   console.log(error, 'error');
		// });

	};

	return (
		<div className="p-2 bg-secondary bg-opacity-10 ">
			<form className="addMenu__form mx-auto my-5 p-3 border rounded bg-warning bg-opacity-25 shadow" onSubmit={handleSubmit} >

				<h2>Add product</h2>

				<div className="mb-3">
					<label className="form-label" htmlFor="name">Name</label>
					<input
						type="text" className="form-control"
						id="name"
						value={formValues.name || ""}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="category">Category</label>
					<select id="category" className="form-select" onChange={handleChange}>
						{categories.map((category, i) => <InputOptionComp key={i} value={category} />)}
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="price">Price</label>
					<input
						type="number" className="form-control"
						id="price"
						value={formValues.price || ""}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="currency">Currency</label>
					<select id="currency" className="form-select" onChange={handleChange}>
						{curr.map((currency, i) => <InputOptionComp key={i} value={currency} />)}
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="description">Description</label>
					<textarea className="form-control" id='description' onChange={handleChange}></textarea>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="img">Choose image:</label>
					<input type="file" className="form-control" id='img' onChange={handleImgChange} accept="" />
				</div>

				<section className="mt-4 p-4  rounded">
					<h3>Add ingredients</h3>
					{ingredientsFormValues.map((obj, index) => (
						<IngredientInput
							key={index}
							objValue={obj}
							onChange={ingredientsHandleChange}
							index={index}
							deleteField={ingredientsHandleDeleteField}
						/>))}
					{!toggle ? (
						<div className="d-flex justify-content-center mt-4">
							<button className="btn btn-dark w-75" onClick={addBtnClick}>
								Add new
							</button>
						</div>
					) : (
						<div className="d-flex justify-content-center">
							<input type="text" className="form-control" placeholder="ingredient" ref={inputRef} />
							<button className="btn btn-outline-secondary w-50" onClick={ingredientsHandleAddField}>
								Add
							</button>
						</div>
					)}
				</section>
				<button type="submit" className="submit-btn btn btn-danger w-100">
					Submit
				</button>
			</form>
		</div>
	);

}

export default withAuthenticationRequired(AddMenu, {
	onRedirecting: () => (<div>Loading....</div>)
});
