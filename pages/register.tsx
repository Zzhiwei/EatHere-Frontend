import type { NextPage } from 'next';
import Head from 'next/head';
import { SignUpForm } from '../components/SignUpForm';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>EatHere</title>
        <meta name="description" content="Save your favourite eateries!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpForm />
    </>
  );
};

export default Register;
