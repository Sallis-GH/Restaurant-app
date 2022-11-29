export default function IngredientInput({ objValue, onChange, index, deleteField }) {
  const { label, value } = objValue;
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={label} >{label}</label>
      <div className="d-flex">
        <input
          type="number"
          id={label}
          className="form-control"
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
        <span className="mx-1 pt-2">gr.</span>
        <div className="btn btn-danger" onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
}