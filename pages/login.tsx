import type { NextPage } from 'next';
import Head from 'next/head';
import { SignInForm } from '../components/SignInForm';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>EatHere</title>
        <meta name="description" content="Save your favourite eateries!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignInForm />
    </>
  );
};

export default Register;
