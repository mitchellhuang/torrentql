import React from 'react';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { render } from 'react-dom';



/*
    renders:

    <h1>Hello world!</h1>
 */
const Downloads = () => (
  <Dashboard title="Downloads" noFooter>
    <div>
      Downloads.
    </div>
  </Dashboard>
  render(<Markdown># Hello world!</Markdown>, document.body);
);

export default withAuth(Downloads);
