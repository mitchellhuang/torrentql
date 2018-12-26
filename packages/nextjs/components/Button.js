import React from 'react';
import Link from 'next/link';

const Button = ({
  href,
  large,
  block,
  children,
  white,
}) => (
  <Link href={href}>
    <a>
      {children}
      <style jsx>{`
        a {
          display: ${block ? 'block' : 'inline-block'};
          color: ${white ? '#000' : '#fff'};
          background-color: ${white ? '#fff' : '#0076ff'};
          box-shadow: 0 5px 10px rgba(0,0,0,0.12);
          border-radius: 5px;
          padding: ${large ? '12.5px' : '10px'};
          outline: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        a:hover {
          transform: translateY(-1px);
          box-shadow: 0 7px 20px rgba(0,0,0,0.12);
        }
      `}</style>
    </a>
  </Link>
);

export default Button;
