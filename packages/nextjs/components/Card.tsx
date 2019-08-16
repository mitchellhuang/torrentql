import React from 'react';

interface ICard extends React.HTMLProps<HTMLDivElement> {
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
        background-color: var(--white);
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 15px;
        margin: 0 -15px;
      }
      @media(min-width: 768px) {
        div {
          margin: 0;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          border-radius: 5px;
        }
      }
    `}</style>
  </div>
);

export default Card;
