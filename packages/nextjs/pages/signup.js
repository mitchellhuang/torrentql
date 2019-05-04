import React from 'react';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';

const Signup = () => (
  <Main title="Sign up">
    <div className="wrapper">
      <div className="container">
        <h1>Sign up</h1>
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
    @media(min-width: 768px) {
      .wrapper {
        align-items: center;
        max-width: 350px;
        margin-top: 100px;
      }
    }
  `}</style>
  </Main>
);

export default Signup;
