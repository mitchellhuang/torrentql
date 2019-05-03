import React from 'react';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Main title="Log in">
    <div className="wrapper">
      <div className="container">
        <h1>Log in to TQL</h1>
        <LoginForm />
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
        margin-top: 75px;
      }
    }
  `}</style>
  </Main>
);

export default Login;
