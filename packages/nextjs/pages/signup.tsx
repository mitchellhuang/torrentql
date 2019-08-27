import React from 'react';
import Link from 'next/link';
import Main from '../layouts/Main';
import SignupForm from '../forms/SignupForm';
import Card from '../components/Card';
import colors from '../lib/colors';

const Signup = () => (
  <Main title="Sign up" backgroundColor={colors.dashboardBg} noFooter>
    <div className="wrapper">
      <div className="signup">
        <Card>
          <h1 className="mb-2">Sign up</h1>
          <SignupForm />
        </Card>
        <div className="helpers">
          <div>
            Have an account? <Link href="/login"><a>Log in</a></Link>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .helpers {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .signup {
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

export default Signup;
