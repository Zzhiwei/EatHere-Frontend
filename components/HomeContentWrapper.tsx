import { Container, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { EateryList } from './EateryList';
import { WeatherList } from './WeatherList';

export const HomeContentWrapper = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container maxWidth="md">
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{
              borderBottom: '0px',
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Eateries" {...a11yProps(0)} />
            <Tab label="Weather" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <EateryList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WeatherList />
        </TabPanel>
      </div>
    </Container>
  );
};

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};
