import React from 'react';
import Color from 'color';
import colors from '../lib/colors';

const Global: React.FunctionComponent<{
  children: React.ReactNode
  backgroundColor?: Color;
}> = ({
  children,
  backgroundColor,
}) => (
  <>
    {children}
    <div id="modal-root" />
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        color: ${colors.black};
        background-color: ${backgroundColor || colors.white};
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
        color: ${colors.primary};
        text-decoration: none;
      }
      a:hover {
        color: ${colors.primary.darken(0.1)}
      }
      p {
        margin: 0;
        line-height: 1.4;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        padding: 15px;
        max-width: 1280px;
        flex: 1;
      }
      .wrapper-no-max-width {
        max-width: none;
      }
      @media(min-width: 768px) {
        .wrapper {
          margin: 0 auto;
          padding: 25px;
        }
      }
    `}</style>
  </>
);

export { Global as default };
