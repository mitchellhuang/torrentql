import React from 'react';
import classNames from 'classnames';

interface IInput extends React.HTMLProps<HTMLInputElement>  {
  label?: string;
  errors?: string[];
}

const Input: React.FunctionComponent<IInput> = ({
  id,
  label,
  type,
  className,
  errors,
  ...props
}) => (
  <div>
    { label ? <label htmlFor={id}>{label}</label> : null}
    <input
      id={id}
      type={type}
      className={classNames('input', {
        'input--text': ['text', 'password'].includes(type),
        'input--file': type === 'file',
        [className as string]: className,
      })}
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
      .input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        outline: none;
        appearance: none;
      }
      .input--text {
        border: 1px solid var(--gray);
        border-radius: 3px;
        padding: 10px;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      }
      .input--text:focus {
        border: 1px solid var(--primary);
      }
      .input--file {
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
