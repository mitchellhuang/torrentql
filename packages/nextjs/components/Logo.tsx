import React from 'react';
import Link from 'next/link';
import logo from '../static/icon-left-font.png';
import logoAbove from '../static/icon-above-font.svg';

interface ILogo extends React.HTMLProps<HTMLAnchorElement> {
  link?: string;
}

export const Logo: React.FunctionComponent<ILogo> = ({
  link,
  ...props
}) => (
  <Link href={link ? link : '/'}>
    <a {...props}>
      <style jsx>{`
        a {
          display: inline-block;
          background: url(${logo}) no-repeat;
          background-position: -30px 50%;
          background-size: cover;
          width: 225px;
          height: 35px;
        }
      `}</style>
    </a>
  </Link>
);

export const LogoAbove: React.FunctionComponent<ILogo> = ({
  link,
  ...props
}) => (
  <Link href={link ? link : '/'}>
    <a {...props}>
      <style jsx>{`
        a {
          display: inline-block;
          background: url(${logoAbove}) no-repeat;
          background-position: 50% -50px;
          background-size: cover;
          width: 200px;
          height: 100px;
        }
      `}</style>
    </a>
  </Link>
);
