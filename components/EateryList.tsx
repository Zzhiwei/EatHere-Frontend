import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { forwardRef, Fragment, useState } from 'react';

import { EateryCard } from './EateryCard';
import { EateryForm } from './EditEateryCard';
import { useFetchEateries } from './hooks/useFetchEateries';

export const EateryList = () => {
  const [editingIndex, setEditingIndex] = useState<null | number>();
  const [isAdding, setIsAdding] = useState(false);
  const { eateries, setEateries } = useFetchEateries();

  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const createEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/create`,
        eatery
      );
      if (res.data) {
        setEateries([res.data, ...eateries]);
      }
      setIsAdding(false);
      setSnackBarMessage('Added a new eatery!');
      setOpen(true);
    } catch {
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  const updateEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/update/${eatery._id}`,
        eatery
      );
      if (res.data) {
        const copy = [...eateries];
        copy.splice(Number(editingIndex), 1, res.data);
        setEateries(copy);
      }
      setEditingIndex(null);
      setSnackBarMessage('Updated eatery information!');
      setOpen(true);
    } catch {
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  const deleteEatery = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/delete/${id}`
      );
      setEateries(eateries.filter((e) => e._id !== id));
      setSnackBarMessage('Deleted eatery!');
      setOpen(true);
    } catch {
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <div className="container mt-5">
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
            <Fragment key={eatery._id}>
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
                  onDelete={() => deleteEatery(eatery._id)}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  );
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
