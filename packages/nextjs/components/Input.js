import React from 'react';

const Input = ({
  id,
  label,
  ...props
}) => (
  <div>
    <label htmlFor={id}>
      {label}
    </label>
    <input id={id} {...props} />
    <style jsx>{`
      div {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
      }
      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #777;
        border-radius: 3px;
        padding: 5px 10px;
        height: 38px;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      }
      input:focus {
        border: 1px solid #0076ff;
        outline: none;
      }
    `}</style>
  </div>
);

export default Input;
