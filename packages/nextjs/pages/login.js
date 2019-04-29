import React from 'react';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Main title="Login - TorrentQL">
    <div className="wrapper">
      <h1>Login to TorrentQL</h1>
      <LoginForm />
      <style jsx>{`
        h1 {
          margin-bottom: 15px;
        }
        .container {
          max-width: 375px;
          margin-top: 50px;
        }
      `}</style>
    </div>
  </Main>
);

export default Login;
