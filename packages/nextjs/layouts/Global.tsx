import React from 'react';

const primary = '#207ECE';
const secondary = '#2752BE';

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
        --button-hover: #E8E8E8;
        --black: #111;
        --light-black: #1A1F36;
        --white: #FFF;
        --gray: #999;
        --toolbar-gray: #EEE;
        --green: #6ECF85;
        --light-green: #E1F7EC;
        --light-gray: #F5F5F5;
        --dark-gray: #696969;
        --dashboard-bg: #E3E8EE;
        --error: #FF0000;
        --blue-gray: #526780;
        --dark-blue: #152D4B;
        --dark-dark-blue: #10243C;
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
      a:hover {
        color: #1C71B9;
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

export { Global as default, primary, secondary };
