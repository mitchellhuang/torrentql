import React from 'react';
import Link from 'next/link';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Main title="Log in" noFooter>
    <div className="wrapper wrapper-v">
      <div className="container">
        <div className="header">
          <h1>Log in</h1>
        </div>
        <LoginForm />
        <div className="helper">
          Forgot your password? <Link href="/reset_password"><a>Reset</a></Link>
        </div>
        <div className="helper">
          Need an account? <Link href="/signup"><a>Sign up</a></Link>
        </div>
      </div>
    </div>
    <style jsx>{`
      .header {
        margin-bottom: 15px;
      }
      .container {
        width: 100%;
      }
      .helper {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .wrapper {
          align-items: center;
          max-width: 350px;
          padding: 75px 0;
        }
        .helper {
          text-align: center;
        }
      }
    `}</style>
  </Main>
);

export default Login;
