import React from 'react';

const Global = ({
  children,
  backgroundColor,
}) => (
  <>
    {children}
    <div id="modal-root" />
    <style jsx global>{`
      :root {
        --primary: #51A4FB;
        --black: #111;
        --white: #FFF;
        --gray: #999;
        --lightGray: #EEE;
        --error: #FF0000;
      };
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        color: var(--black);
        background-color: ${backgroundColor || 'var(--white)'};
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
      h3 {
        font-size: 24px;
      }
      h4 {
        font-size: 20px;
      }
      h5 {
        font-size: 14px;
        color: #888;
        text-transform: uppercase;
      }
      a {
        color: var(--primary);
        text-decoration: none;
      }
      p {
        margin: 0;
        line-height: 1.4;
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
        }
      }
    `}</style>
  </>
);

export default Global;
