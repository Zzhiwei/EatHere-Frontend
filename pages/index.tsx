import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { EateryList } from '../components/EateryList';

const Home: NextPage = () => {
  return <EateryList />;
};

export default Home;
