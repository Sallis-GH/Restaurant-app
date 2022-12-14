import '../__style__/AddMenu.css'
import { useState, useRef } from 'react'
import Select from '../components/Select'
import IngredientInput from '../components/IngredientInput'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import axios from 'axios';
import Menu from './Menu';
const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8080'


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
console.log(formValues);
	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.id]: e.target.value });
		console.log(formValues);
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

		const ingredients = ingredientsFormValues.reduce((res, ing) => {
			return { ...res, [(ing.label).toLowerCase()]: ing.value }
		}, {})

		const product = {
			...formValues,
			ingredients: { ...ingredients },
		}
		product.ingredients = ingredients

		let data = new FormData();
		data.append('file', image);
		data.append('body', JSON.stringify(product));

		axios.post(`${url}/api/menu/newDish`, data, {
			headers: {
				'accept': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
			}
		});
		setFormValues({});
		setIngredientsFormValues([]);
		setImage(null);
		console.log("I have submited");
	};
	
	return (
		<div className='d-md-flex'>
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
						<Select handleChange={handleChange} value={categories} id={'category'} />
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
						<Select handleChange={handleChange} value={curr} id={'currency'} />
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="description">Description</label>
						<textarea className="form-control" id='description' value={formValues.description || ""} onChange={handleChange}></textarea>
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
			<div className="p-2 bg-secondary bg-opacity-10">
				<Menu isAddMenu={'true'}/>
			</div>
		</div>
	);
}

export default withAuthenticationRequired(AddMenu, {
	onRedirecting: () => (<div>Loading....</div>)
});
