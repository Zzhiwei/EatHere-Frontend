import axios from 'axios';
import { time } from 'console';
import { useEffect, useState } from 'react';

import { Eatery } from '../EateryList';

export const useFetchEateries = () => {
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeTaken, setTimeTaken] = useState<number>();

  useEffect(() => {
    let ignore = false;

    const fetchList = async () => {
      const start = Date.now();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/all`
      );
      const end = Date.now();

      if (!ignore) {
        setEateries(res.data);
        setLoading(false);
        setTimeTaken(end - start);
      }
    };

    fetchList();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    eateries,
    setEateries,
    loading,
    timeTaken,
  };
};
