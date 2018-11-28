import React from 'react';
import Link from 'next/link';

const Button = ({
  href,
  large,
  block,
  children,
}) => (
  <Link href={href}>
    <a>
      {children}
      <style jsx>{`
        a {
          display: ${block ? 'block' : 'inline-block'};
          color: #fff;
          background-color: #000;
          border: none;
          border-radius: 5px;
          padding: ${large ? '12.5px' : '10px'};
          font-weight: 600;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
        }
        a:hover {
          background-color: #111;
        }
      `}</style>
    </a>
  </Link>
);

export default Button;
