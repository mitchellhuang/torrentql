import React from 'react';
import classNames from 'classnames';

const Input = ({
  id,
  label,
  type,
  className,
  ...props
}) => {
  let inputClass = classNames('input', {
    'input--text': ['text', 'password'].includes(type),
    'input--file': type === 'file',
  });
  inputClass = className ? `${inputClass} ${className}` : inputClass;
  return (
    <div>
      { label ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} type={type} className={inputClass} {...props} />
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
        }
        .input--text {
          border: 1px solid #999;
          border-radius: 3px;
          padding: 10px;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }
        .input--text:focus {
          border: 1px solid var(--primary);
        }
        .input--file {
        }
      `}</style>
    </div>
  );
};

export default Input;
