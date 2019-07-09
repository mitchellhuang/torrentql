import Markdown from 'markdown-to-jsx';
import React from 'react';
// @ts-ignore
import terms from './terms.md';

const termsAndConditions = () => (
  <div id="terms">
    <Markdown children={terms} />
    <style jsx>{`
      #terms {
        padding: 10px 30px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol"
      }
    `}</style>
  </div>
);

export default termsAndConditions;
