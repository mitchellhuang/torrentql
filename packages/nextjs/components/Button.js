import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const Button = ({
  href,
  block,
  white,
  animate,
  className,
  children,
  ...props
}) => {
  let btnClass = classNames('button', {
    'button--block': block,
    'button--outline': white,
    'button--animate': animate,
  });
  btnClass = className ? `${btnClass} ${className}` : btnClass;
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={btnClass} {...props}>
            {children}
          </a>
        </Link>
      ) : (
        <button type="button" className={btnClass} {...props}>
          {children}
        </button>
      )}
      <style jsx>{`
        .button {
          display: inline-block;
          padding: 10px;
          color: var(--white);
          background-color: var(--primary);
          border: 1px solid var(--primary);
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .button--block {
          display: block;
          width: 100%;
        }
        .button--outline {
          color: var(--primary);
          background-color: var(--white);
          border: 1px solid var(--primary);
        }
        .button--animate {
          box-shadow: 0 5px 10px rgba(0,0,0,0.12);
        }
        .button:hover {
        }
        .button--animate:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 20px rgba(0,0,0,0.12);
        }
      `}</style>
    </>
  );
};

export default Button;
