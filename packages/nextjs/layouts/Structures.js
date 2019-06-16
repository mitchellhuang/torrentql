import React from 'react';

const height = '27px';

const Row = ({
  children,
}) => (
  <div className="row">
    {children}
    <style jsx>{`
      .row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: ${height};
        justify-content: flex-end;
      }
    `}</style>
  </div>
);


const Col = ({
  children, className,
}) => (
  <div className={className ? `column ${className}` : 'column'}>
    <span>
      {children}
    </span>
    <style jsx>{`
      .column {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        border-color: var(--gray);
        border-style: solid;
        height: ${height};
        justify-content: center;
        border-width: 1px 1px 0 ${className === 'torrent-name' ? '1px' : '0'};
      }
      span {
        margin: 5px;
      }
      .torrent-name {
        width: 100%;
      }
    `}</style>
  </div>
);

export { Row, Col };
