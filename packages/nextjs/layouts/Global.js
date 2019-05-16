import React from 'react';

const Global = ({
  children,
}) => (
  <>
    {children}
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
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
        color: #138A36;
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
