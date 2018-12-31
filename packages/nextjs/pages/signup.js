import React from 'react';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';

const Signup = () => (
  <Main title="Signup - TorrentQL">
    <div className="container">
      <h1>Signup for TorrentQL</h1>
      <SignupForm />
      <style jsx>{`
        .container {
          max-width: 375px;
          margin: 0 auto;
          margin-top: 50px;
        }
      `}</style>
    </div>
  </Main>
);

export default Signup;
