
export const InputOptionComp = ({ value }) => <option value={value}>{value}</option>;

const Select = ({ value, handleChange }) => (
  <select id="category" className="form-select" onChange={handleChange}>
    {value.map((category, i) => <InputOptionComp key={i} value={category} />)}
  </select>
);

export default Select;