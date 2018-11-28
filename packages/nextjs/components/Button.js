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
          background-color: #0076ff;
          box-shadow: 0 1px 14px 0 rgba(0,118,255,0.39);
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
          background-color: rgba(0,118,255,0.9);
        }
      `}</style>
    </a>
  </Link>
);

export default Button;
