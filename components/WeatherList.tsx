import { CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

interface Weather {
  area: string;
  forecast: string;
}

export const WeatherList = () => {
  const [data, setData] = useState<Weather[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [area, setArea] = useState<'EAST' | 'WEST'>('EAST');

  const handleAreaChange = (e) => {
    console.log(e.target.value);
    setArea(e.target.value);
  };

  const onRefresh = async () => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok');
      }, 300);
    });
    const weatherData = await axios.get(
      `${process.env.NEXT_PUBLIC_WEATHER_LAMBDA_ENDPOINT}?area=${area}` ||
        'error'
    );

    sessionStorage.setItem('weatherData', JSON.stringify(weatherData.data));
    setData(weatherData.data);
    setLoading(false);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('weatherData');
    if (storedData) {
      return setData(JSON.parse(storedData));
    }
    let ignore = false;

    const fetchData = async () => {
      const weatherData = await axios.get(
        process.env.NEXT_PUBLIC_WEATHER_LAMBDA_ENDPOINT || 'error'
      );

      if (!ignore) {
        sessionStorage.setItem('weatherData', JSON.stringify(weatherData.data));
        setData(weatherData.data);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <Container>
      <div className="mt-5 flex items-center justify-center">
        <select
          name="area"
          value={area}
          onChange={handleAreaChange}
          className="mr-2 h-14 rounded-md p-4"
        >
          <option value="EAST">East</option>
          <option value="WEST">West</option>
        </select>
        <button
          onClick={onRefresh}
          className=" h-14 w-40 rounded-md bg-amber-300 p-3  hover:border-2 hover:border-text1"
        >
          Get Weather Data
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center text-xl">
          <CircularProgress className="mt-10" />
        </div>
      ) : (
        <div className="my-10 flex flex-col gap-y-2">
          {data &&
            data.map(({ area, forecast }) => (
              <Fragment key={area + forecast}>
                <WeatherCard area={area} forecast={forecast} />
              </Fragment>
            ))}
        </div>
      )}
    </Container>
  );
};

const WeatherCard = ({
  area,
  forecast,
}: {
  area: string;
  forecast: string;
}) => {
  return (
    <div className="rounded-lg bg-white px-10 py-6 shadow-lg">
      {area}: <span className="ml-5 underline">{forecast}</span>
    </div>
  );
};
