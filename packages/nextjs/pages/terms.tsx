import React from 'react';
import Markdown from 'markdown-to-jsx';
// @ts-ignore
import terms from './legal/terms.md';

const Terms = () => (
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

export default Terms;
