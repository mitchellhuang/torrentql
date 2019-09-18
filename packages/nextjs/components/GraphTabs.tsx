import React, { useState } from 'react';
import Link from 'next/link';

const GraphTabs = () => {
  const links = ['data-transfer-in', 'data-transfer-out', 'data-storage'];
  const [selected, setSelected] = useState();
  const content = links.map((key) => {
      const link = `/account/usage/${key}`;
      console.log(selected);
      // onClick={() => setSelected(key)}
      const tab = `key ${key}`
      return (
        <>
          <Link href={link} >
          <button className={tab} onClick={() => setSelected(key)}>
            <div>{key}</div>
          </button>
          </Link>
          <style jsx>{`
              .${key} {
                display: flex;
                flex: 1;
                color: rgb(32, 126, 206);
              }
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
