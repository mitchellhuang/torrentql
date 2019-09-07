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
                display: inline-flex;
                padding: 10px;
                background-color: #F7F8FA;
                color: rgb(32, 126, 206);

                }
                .key:hover {
                  background-color: lightblue;
                }
                @media(max-width: 767px) {
                  .key {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                  }
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
