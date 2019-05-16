import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css'; // eslint-disable-line

const getButtonStyle = ({
  block,
  white,
  animate,
}) => css.resolve`
  .button {
    display: ${block ? 'block' : 'inline-block'};
    width: ${block ? '100%' : null};
    padding: 10px;
    color: ${white ? '#000' : '#fff'};
    background-color: ${white ? '#fff' : '#138A36'};
    box-shadow: ${animate ? '0 5px 10px rgba(0,0,0,0.12)' : null};
    border: 0;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-weight: 600;
    transition: all 0.15s ease;
  }
  .button:hover {
    transform: ${animate ? 'translateY(-1px)' : null};
    box-shadow: ${animate ? '0 7px 20px rgba(0,0,0,0.12)' : null};
    background-color: ${animate ? null : '#15993C'};
  }
`;

const Button = ({
  href,
  block,
  white,
  animate,
  children,
  ...props
}) => {
  const { className, styles } = getButtonStyle({
    block,
    white,
    animate,
  });
  if (href) {
    return (
      <Link href={href}>
        <a className={`${className} button`} {...props}>
          {children}
          {styles}
        </a>
      </Link>
    );
  }
  return (
    <button type="button" className={`${className} button`} {...props}>
      {children}
      {styles}
    </button>
  );
};

export default Button;
