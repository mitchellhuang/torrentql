import React from 'react';
import Error from './Error';
import colors from '../lib/colors';

interface IInput extends React.HTMLProps<HTMLInputElement>  {
  label?: string;
  small?: boolean;
  error?: string;
  noMargin?: boolean;
}

const Input: React.FunctionComponent<IInput> = ({
  label,
  type,
  small,
  error,
  noMargin,
  ...props
}) => (
  <div>
    {label && <label>{label}</label>}
    <input
      type={type}
      {...props}
    />
    {error && <Error className="mt-2">{error}</Error>}
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
        border: 1px solid ${colors.gray};
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
        border-color: ${colors.primary};
      }
    `}</style>
  </div>
);

export default Input;
