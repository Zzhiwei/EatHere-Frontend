import type { NextPage } from 'next';
import { EateryList } from '../components/EateryList';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EatHere</title>
        <meta name="description" content="Save your favourite eateries!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EateryList />
    </>
  );
};

export default Home;
