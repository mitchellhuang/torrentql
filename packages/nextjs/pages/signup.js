import React from 'react';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';

const Signup = () => (
  <Main title="Signup - TorrentQL">
    <div className="wrapper">
      <h1>Signup for TorrentQL</h1>
      <SignupForm />
      <style jsx>{`
        h1 {
          margin-bottom: 15px;
        }
        .wrapper {
          max-width: 375px;
        }
      `}</style>
    </div>
  </Main>
);

export default Signup;
