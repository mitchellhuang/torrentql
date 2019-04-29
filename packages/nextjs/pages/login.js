import React from 'react';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Main title="Login - TorrentQL">
    <div className="wrapper">
      <div className="container">
        <h1>Login to TQL</h1>
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

export default Login;
