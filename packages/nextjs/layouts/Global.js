import React from 'react';

import 'normalize.css';

const Global = ({
  children,
}) => (
  <>
    {children}
    <style jsx global>{`
      :root {
        --primary: #138A36;
        --black: #111;
        --white: #fff;
      };
      body {
        font-family: system-ui;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        color: var(--black);
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        font-weight: 600;
      }
      h1 {
        font-size: 40px;
      }
      h2 {
        font-size: 36px;
      }
      a {
        color: var(--primary);
        text-decoration: none;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 15px;
        max-width: 1280px;
        flex: 1;
      }
      .wrapper-v {
        padding-top: 15px;
        padding-bottom: 15px;
      }
      @media(min-width: 768px) {
        .wrapper {
          margin: 0 auto;
          padding: 0 25px;
        }
        .wrapper-v {
          padding-top: 25px;
          padding-bottom: 25px;
        }
      }
    `}</style>
  </>
);

export default Global;
