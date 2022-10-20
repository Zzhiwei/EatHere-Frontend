import type { NextPage } from 'next';
import { EateryList } from '../components/EateryList';
import Head from 'next/head';
import { SignInForm } from '../components/SignInForm';
import { HomeContentWrapper } from '../components/HomeContentWrapper';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EatHere</title>
        <meta name="description" content="Save your favourite eateries!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContentWrapper />
    </>
  );
};

export default Home;
