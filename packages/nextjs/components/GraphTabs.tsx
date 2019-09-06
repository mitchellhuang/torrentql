import React from 'react';
import Link from 'next/link';

const GraphTabs = () => {
  const links = ['data-transfer-in', 'data-transfer-out', 'data-storage'];
  const content = links.map((key) => {
      const link = `/account/usage/${key}`;
      return (
        <>
          <Link href={link}><div className="key">{key}</div></Link>
          <style jsx>{`
              .key {
                background-color: lightgray;
                flex: 1;
                justify-content: center;
                align-items: center;
                border: 1px solid black;
              }
              .key:hover {
                background-color: white;
              }
          `}
          </style>
        </>
      );
    },
  );
  return (
    <>
    {content}
    </>
  );
};

export default (GraphTabs);
