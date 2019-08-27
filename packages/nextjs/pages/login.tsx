import React from 'react';
import Link from 'next/link';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';
import Card from '../components/Card';
import colors from '../lib/colors';

const Login = () => (
  <Main title="Log in" backgroundColor={colors.dashboardBg} noFooter>
    <div className="wrapper">
      <div className="login">
        <Card>
          <h1 className="mb-2">Log in</h1>
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
    </div>
    <style jsx>{`
      .helpers {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .login {
          margin: 0 auto;
          align-items: center;
          width: 350px;
          padding: 50px 0;
        }
        .helpers {
          text-align: center;
        }
      }
    `}</style>
  </Main>
);

export default Login;
