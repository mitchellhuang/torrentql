import React from 'react';
import Link from 'next/link';
import withAuth from '../lib/withAuth';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';

const Signup = () => (
  <Main title="Sign up" noFooter>
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h1>Sign up</h1>
        </div>
        <SignupForm />
        <div className="helper">
          Have an account? <Link href="/login"><a>Log in</a></Link>
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

export default withAuth(Signup);
