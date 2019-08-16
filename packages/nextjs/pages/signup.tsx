import React from 'react';
import Link from 'next/link';
import Dashboard from '../layouts/Dashboard';
import SignupForm from '../forms/SignupForm';
import Card from '../components/Card';

const Signup = () => (
  <Dashboard title="Sign up" noNavBarItems noFooter>
    <div className="signup">
      <Card>
        <div className="header">
          <h1>Sign up</h1>
        </div>
        <SignupForm />
      </Card>
      <div className="helpers">
        <div>
          Have an account? <Link href="/login"><a>Log in</a></Link>
        </div>
      </div>
    </div>
    <style jsx>{`
      .header {
        margin-bottom: 10px;
      }
      .helpers {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .signup {
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

export default Signup;
