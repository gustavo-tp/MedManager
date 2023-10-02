interface InputProps {
  label: string
  name: string
  cols: number
}

export default function Input({ cols, name, label }: InputProps) {
  return (
    <div className={`col-md-${cols}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={name}
        name={name}
        required
        minLength={3}
        onChange={() => null}
      />
      <div className="invalid-feedback">Por favor, insira um nome válido.</div>
    </div>
  )
}
