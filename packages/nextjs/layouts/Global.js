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
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        font-weight: 600;
      }
      a {
        text-decoration: none;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        padding: 15px;
        max-width: 1280px;
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
