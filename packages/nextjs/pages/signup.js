import React from 'react';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';

const Signup = () => (
  <Main title="Signup - TorrentQL">
    <div className="wrapper">
      <div className="container">
        <h1>Signup for TQL</h1>
        <SignupForm />
      </div>
    </div>
    <style jsx>{`
    h1 {
      margin-bottom: 15px;
    }
    .container {
      width: 100%;
    }
    .wrapper {
      justify-content: center;
    }
    @media(min-width: 768px) {
      .wrapper {
        justify-content: flex-start;
        align-items: center;
        max-width: 375px;
        margin-top: 100px;
      }
    }
  `}</style>
  </Main>
);

export default Signup;
