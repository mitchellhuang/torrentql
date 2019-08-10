import React from 'react';

interface IInput extends React.HTMLProps<HTMLInputElement>  {
  label?: string;
  errors?: string[];
}

const Input: React.FunctionComponent<IInput> = ({
  id,
  label,
  type,
  errors,
  ...props
}) => (
  <div>
    { label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      type={type}
      {...props}
    />
    { errors && errors.map(error => <div key={error} className="error">{error}</div>)}
    <style jsx>{`
      div {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 10px;
      }
      .error {
        color: var(--error);
        margin-top: 10px;
      }
      .error::first-letter {
        text-transform: capitalize;
      }
    `}</style>
  </div>
);

export default Input;
