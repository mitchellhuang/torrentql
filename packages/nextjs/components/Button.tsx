import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import colors from '../lib/colors';

interface IButton extends React.HTMLProps<HTMLButtonElement & HTMLAnchorElement> {
  type?: any;
  href?: string;
  block?: boolean;
  outline?: boolean;
  small?: boolean;
}

const Button: React.FunctionComponent<IButton> = ({
  children,
  href,
  block,
  outline,
  small,
  className,
  ...props
}) => {
  const btnClass = classNames('button', {
    'button--block': block,
    'button--outline': outline,
    [className as string]: className,
  });
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
          padding: ${small ? '7px 8px' : '9px 10px'};
          color: ${colors.white};
          background-color: ${colors.primary};
          border: 1px solid ${colors.primary};
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-size: ${small ? 14 : 16}px;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .button:hover {
          background-color: ${colors.primary.darken(0.1)};
        }
        .button:disabled {
          background-color: ${colors.primary.lighten(0.2)};
          border-color: ${colors.primary.lighten(0.2)};
        }
        .button--block {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .button--outline {
          color: ${colors.primary};
          background-color: ${colors.white};
          border: 1px solid ${colors.primary};
        }
        .button--outline:hover {
          background-color: initial;
          border-color: ${colors.primary.darken(0.1)};
          color: ${colors.primary.darken(0.1)};
        }
      `}</style>
    </>
  );
};

export default Button;
