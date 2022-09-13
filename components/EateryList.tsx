import { Container } from '@mui/system';
import axios from 'axios';
import { copyFile } from 'fs/promises';
import React, { Fragment, useEffect, useState } from 'react';
import { EateryCard } from './EateryCard';
import { EateryForm } from './EditEateryCard';

export interface Eatery {
  name: string;
  address: string;
  priceRange: PriceRange;
  _id: string;
}

export enum PriceRange {
  CHEAP = 'CHEAP',
  AVERAGE = 'AVERAGE',
  EXPENSIVE = 'EXPENSIVE',
}

const API_ENDPOINT = 'http://localhost:8080';

export const EateryList = () => {
  const [editingIndex, setEditingIndex] = useState<null | number>();
  const [isAdding, setIsAdding] = useState(false);
  const [eateries, setEateries] = useState<Eatery[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchList = async () => {
      const res = await axios.get(`${API_ENDPOINT}/eatery/all`);
      if (!ignore) {
        setEateries(res.data);
      }
    };

    fetchList();

    return () => {
      ignore = true;
    };
  }, []);

  const createEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/eatery/create`, eatery);
      if (res.data) {
        setEateries([res.data, ...eateries]);
      }
      setIsAdding(false);
    } catch {
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  const updateEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/eatery/update/${eatery._id}`,
        eatery
      );
      if (res.data && editingIndex) {
        const copy = [...eateries];
        copy.splice(editingIndex, 1, res.data);
        setEateries(copy);
      }
      setEditingIndex(null);
    } catch {
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <div className="mt-5">
        {isAdding ? (
          <EateryForm
            onSubmit={createEatery}
            cancelEdit={() => setIsAdding(false)}
          />
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className=" mt-5 h-14 w-40 rounded-md bg-amber-300 p-3  hover:border-2 hover:border-text1"
            >
              Add Eatery
            </button>
          </div>
        )}
        <div className="my-10 flex flex-col gap-y-5">
          {eateries.map((eatery, index) => (
            <Fragment key={eatery.name + eatery.address}>
              {editingIndex === index ? (
                <EateryForm
                  onSubmit={updateEatery}
                  eatery={eatery}
                  cancelEdit={() => setEditingIndex(undefined)}
                />
              ) : (
                <EateryCard
                  eatery={eatery}
                  edit={() => setEditingIndex(index)}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  );
};
