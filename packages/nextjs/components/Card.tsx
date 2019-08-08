import React from 'react';

interface ICard extends React.HTMLProps<HTMLDivElement> {
   title?: string;
   noBorder?: boolean;
}

const Card: React.FunctionComponent<ICard> = ({
  children,
  title,
  noBorder,
  ...props
}) => (
  <div {...props} className="card">
    {title && <h3 className="mb-3">{title}</h3>}
    {children}
    <style jsx>{`
      .card {
        background-color: var(--white);
        border-radius: 5px;
        padding: 15px;
        ${!noBorder && 'border: 1px solid var(--lightGray);'}
      }
    `}</style>
  </div>
);

export default Card;
