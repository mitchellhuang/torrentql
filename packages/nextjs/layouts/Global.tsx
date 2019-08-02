import React from 'react';

const primary = '#207ECE';
const secondary = '#2752BE';
const blueGray = '#526780';

const Global: React.FunctionComponent<{
  children: React.ReactNode
  backgroundColor?: string;
}> = ({
  children,
  backgroundColor,
}) => (
  <>
    {children}
    <div id="modal-root" />
    <style jsx global>{`
      :root {
        --primary: ${primary};
        --secondary: ${secondary};
        --buttonHover: #E8E8E8;
        --black: #111;
        --white: #FFF;
        --gray: #999;
        --toolBarGray: #EEE;
        --green: #6ECF85;
        --lightGreen: #E1F7EC;
        --lightGray: #F5F5F5;
        --darkGray: #696969;
        --dashboardBg: #F5F5F5;
        --error: #FF0000;
        --blueGray: ${blueGray};
        --darkBlue: #152D4B;
        --darkDarkBlue: #10243C;
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
        padding: 15px;
        max-width: 1280px;
        flex: 1;
      }
      @media(min-width: 768px) {
        .wrapper {
          margin: 0 auto;
          padding: 15px 25px;
        }
      }
    `}</style>
  </>
);

export { Global as default, primary, secondary, blueGray };
