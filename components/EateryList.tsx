import React, { Fragment } from 'react';
import { EateryCard } from './EateryCard';
import { EditEateryCard } from './EditEateryCard';

export interface Eatery {
  name: string;
  address: string;
  priceRange: PriceRange;
}

enum PriceRange {
  CHEAP = 'CHEAP',
  AVERAGE = 'AVERAGE',
  EXPENSIVE = 'EXPENSIVE',
}

const eateries: Eatery[] = [
  {
    name: 'Geylang Laksa Prawn Noodles (Sims Drive) 1',
    address: '45 Sims Dr, #01-150, Singapore 380045',
    priceRange: PriceRange.EXPENSIVE,
  },
  {
    name: 'Geylang Laksa Prawn Noodles (Sims Drive) 2',
    address: '45 Sims Dr, #01-150, Singapore 380045',
    priceRange: PriceRange.EXPENSIVE,
  },
  {
    name: 'Geylang Laksa Prawn Noodles (Sims Drive) 3',
    address: '45 Sims Dr, #01-150, Singapore 380045',
    priceRange: PriceRange.EXPENSIVE,
  },
  {
    name: 'Geylang Laksa Prawn Noodles (Sims Drive) 4',
    address: '45 Sims Dr, #01-150, Singapore 380045',
    priceRange: PriceRange.EXPENSIVE,
  },
  {
    name: 'Geylang Laksa Prawn Noodles (Sims Drive) 5',
    address: '45 Sims Dr, #01-150, Singapore 380045',
    priceRange: PriceRange.EXPENSIVE,
  },
];

export const EateryList = () => {
  return (
    <div className="mb-10 flex flex-col gap-y-5">
      <EditEateryCard eatery={eateries[0]} />
      {eateries.map((eatery) => (
        <Fragment key={eatery.name + eatery.address}>
          <EateryCard eatery={eatery} />
        </Fragment>
      ))}
    </div>
  );
};
