import React from 'react';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';
import terms from '../legal/terms.md';

const Terms = () => (
<Main title="Terms and Services" noFooter>
  <div id="terms">
    <Markdown children={terms} />
    <style jsx>{`
      
    `}</style>
  </div>
</Main>
);

export default Terms;
