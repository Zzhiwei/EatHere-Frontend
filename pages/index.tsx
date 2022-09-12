import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../mui-config/Link';
import { EateryList } from '../components/EateryList';

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <div className="mt-5">
        <EateryList />
      </div>
    </Container>
  );
};

export default Home;
