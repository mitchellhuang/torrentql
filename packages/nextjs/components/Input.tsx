import React from 'react';

interface IInput extends React.HTMLProps<HTMLInputElement>  {
  label?: string;
  small?: boolean;
  errors?: string[];
  noMargin?: boolean;
}

const Input: React.FunctionComponent<IInput> = ({
  id,
  label,
  type,
  small,
  errors,
  noMargin,
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
        margin-bottom: ${noMargin ? '0' : '15px'};
      }
      label {
        display: block;
        margin-bottom: 10px;
      }
      input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        outline: none;
        appearance: none;
      }
      input[type=text],
      input[type=password],
      input[type=email] {
        border: 1px solid var(--gray);
        border-radius: 3px;
        padding: 6px 10px;
        height: ${small ? '34px' : '38px'};
        line-height: 24px;
        vertical-align: middle;
        box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      }
      input[type=text]:focus,
      input[type=password]:focus,
      input[type=email]:focus {
        border-color: var(--primary);
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
