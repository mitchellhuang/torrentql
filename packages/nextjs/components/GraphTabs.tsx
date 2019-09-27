import React, { useState } from 'react';
import Link from 'next/link';

const GraphTabs = () => {
  const links = ['data-transfer-in', 'data-transfer-out', 'data-storage'];
  const [selected, setSelected] = useState();
  const content = links.map((key) => {
      const link = `/account/usage/${key}`;
      console.log(selected);
      const tab = `key ${key}`;
      return (
        <>
          <Link href={link} >
          <div className={tab} onClick={() => setSelected(key)}>
            <div>{key}</div>
          </div>
          </Link>
          <style jsx>{`
                .key {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #F7F8FA;
                  padding: 10px;
                  color: rgb(32, 126, 206);
                }
                @media(min-width: 767px) {
                  .${key} {
                    display: flex;
                    flex: 1;
                    color: rgb(32, 126, 206);
                  }
                  .key {
                    display: inline-flex;
                    width: 30%;
                  }
                  .key:hover {
                    background-color: lightblue;
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
