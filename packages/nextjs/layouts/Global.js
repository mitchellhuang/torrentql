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
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        font-weight: 600;
      }
      h1 {
        font-size: 36px;
      }
      a {
        color: #0366d6;
        text-decoration: none;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        padding: 15px;
        max-width: 1280px;
        flex: 1;
      }
      @media(min-width: 768px) {
        .wrapper {
          margin: 0 auto;
        }
      }
      @media(min-width: 1280px) {
        .wrapper {
          padding-left: 0;
          padding-right: 0;
        }
      }
    `}</style>
  </>
);

export default Global;
