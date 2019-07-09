import React from 'react';
import Markdown from '../lib/markdown';
import Main from '../layouts/Main';
import terms from '../legal/terms.md';

const Terms = () => (
  <Main title="Terms of Service">
    <div className="wrapper">
      <Markdown data={terms} />
      <style jsx>{`
        .wrapper {
          max-width: 768px;
        }
      `}</style>
    </div>
  </Main>
);

export default Terms;
