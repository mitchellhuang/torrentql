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
        border: 1px solid #ddd;
        padding: 15px;
        margin: 0 -15px;
      }
      @media(min-width: 768px) {
        margin: 0;
        border-radius: 5px;
      }
    `}</style>
  </div>
);

export default Card;
