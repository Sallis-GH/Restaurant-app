
// export const InputOptionComp = ({ value }) => <option value={value}>{value}</option>;

const Select = ({ handleChange, value, id }) => (
  <select id={id} className="form-select" onChange={handleChange}>
    {/* {value.map((category, i) => <InputOptionComp key={i} value={category} />)} */}
    {value.map((category, i) => <option key={i} value={category} > {category} </option>)}
  </select>
);

export default Select;