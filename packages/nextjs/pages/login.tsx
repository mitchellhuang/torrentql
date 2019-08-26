import React from 'react';
import Link from 'next/link';
import Dashboard from '../layouts/Dashboard';
import LoginForm from '../forms/LoginForm';
import Card from '../components/Card';

const Login = () => (
  <Dashboard title="Log in" noNavBarItems noFooter homeLink>
    <div className="login">
      <Card title="Log in">
        <LoginForm />
      </Card>
      <div className="helpers">
        <div>
          Forgot your password? <Link href="/reset_password"><a>Reset</a></Link>
        </div>
        <div className="mt-2">
          Need an account? <Link href="/signup"><a>Sign up</a></Link>
        </div>
      </div>
    </div>
    <style jsx>{`
      .helpers {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .login {
          margin: 0 auto;
          align-items: center;
          max-width: 350px;
          padding: 50px 0;
        }
        .helpers {
          text-align: center;
        }
      }
    `}</style>
  </Dashboard>
);

export default Login;
