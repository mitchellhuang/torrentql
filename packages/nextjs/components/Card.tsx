import React from 'react';
import colors from '../lib/colors';

export interface ICard extends React.HTMLProps<HTMLDivElement> {
   title?: string;
}

const Card: React.FunctionComponent<ICard> = ({
  children,
  title,
  ...props
}) => (
  <div {...props}>
    {title && <h3 className="mb-3">{title}</h3>}
    {children}
    <style jsx>{`
      div {
        background-color: ${colors.white};
        border-top: 1px solid ${colors.border};
        border-bottom: 1px solid ${colors.border};
        padding: 15px;
        margin: 0 -15px;
        box-shadow: 0 1px 4px 0 ${colors.boxShadow};
      }
      @media(min-width: 768px) {
        div {
          margin: 0;
          border-left: 1px solid ${colors.border};
          border-right: 1px solid ${colors.border};
          border-radius: 5px;
        }
      }
    `}</style>
  </div>
);

export default Card;
