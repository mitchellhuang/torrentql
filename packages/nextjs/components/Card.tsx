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
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 15px;
      }
    `}</style>
  </div>
);

export default Card;
