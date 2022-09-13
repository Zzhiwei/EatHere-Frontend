import axios from 'axios';
import { useEffect, useState } from 'react';
import { Eatery } from '../EateryList';

export const useFetchEateries = () => {
  const [eateries, setEateries] = useState<Eatery[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchList = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/all`
      );
      if (!ignore) {
        setEateries(res.data);
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
  };
};
