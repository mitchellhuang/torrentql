import React from 'react';
import Markdown from '../lib/markdown';
import Main from '../layouts/Main';
import privacy from '../legal/privacy.md';

const Privacy = () => (
  <Main title="Privacy Policy">
    <div className="wrapper">
      <Markdown data={privacy} />
      <style jsx>{`
        .wrapper {
          max-width: 768px;
        }
      `}</style>
    </div>
  </Main>
);

export default Privacy;
