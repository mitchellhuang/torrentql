import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface IButton extends React.HTMLProps<HTMLButtonElement & HTMLAnchorElement> {
  type?: any;
  href?: string;
  block?: boolean;
  outline?: boolean;
}

const Button: React.FunctionComponent<IButton> = ({
  children,
  href,
  block,
  outline,
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
          padding: 9px 10px;
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
        .button:hover {
          background-color: #1c71b9;
        }
        .button:disabled {
          background-color: #aaa;
          border-color: #aaa;
        }
        .button--block {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .button--outline {
          color: var(--primary);
          background-color: var(--white);
          border: 1px solid var(--primary);
        }
        .button--outline:hover {
          background-color: initial;
          border-color: #1c71b9;
          color: #1c71b9;
        }
      `}</style>
    </>
  );
};

export default Button;
