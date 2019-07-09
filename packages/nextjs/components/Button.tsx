import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface IButton extends React.HTMLProps<HTMLButtonElement & HTMLAnchorElement> {
  type?: any;
  href?: string;
  block?: boolean;
  white?: boolean;
  animate?: boolean;
}

const Button: React.StatelessComponent<IButton> = ({
  children,
  href,
  block,
  white,
  animate,
  className,
  ...props
}) => {
  const btnClass = classNames('button', {
    'button--block': block,
    'button--outline': white,
    'button--animate': animate,
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
        .button--animate {
          box-shadow: 0 5px 10px rgba(0,0,0,0.12);
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
