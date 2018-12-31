import React from 'react';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Main title="Login - TorrentQL">
    <div className="container">
      <h1>Login to TorrentQL</h1>
      <LoginForm />
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

export default Login;
