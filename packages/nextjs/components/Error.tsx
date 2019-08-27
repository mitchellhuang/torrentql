import React from 'react';
import colors from '../lib/colors';

type IError = React.HTMLProps<HTMLDivElement>;

const Error: React.FunctionComponent<IError> = ({
  children,
  ...props
}) => {
  return children && (
    <div {...props}>
      {children}
      <style jsx>{`
        div {
          color: ${colors.error};
        }
        div::first-letter {
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};

export default Error;
