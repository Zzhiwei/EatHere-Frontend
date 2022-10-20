import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Container from '@mui/material/Container';
import axios from 'axios';
import { forwardRef, Fragment, useState } from 'react';
import { toast } from 'react-toastify';

import { EateryCard } from './EateryCard';
import { EateryForm } from './EditForm';
import { useFetchEateries } from './hooks/useFetchEateries';

export const EateryList = () => {
  const [editingIndex, setEditingIndex] = useState<null | number>();
  const [isAdding, setIsAdding] = useState(false);
  const { eateries, setEateries } = useFetchEateries();

  const createEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/create`,
        {
          ...eatery,
          userId: localStorage.getItem('userId'),
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('authToken')}` || '',
          },
        }
      );
      if (res.data) {
        setEateries([res.data, ...eateries]);
      }

      setIsAdding(false);
      toast.success('Added a new eatery!');
    } catch (e: any) {
      console.log({ e });
      if (e.response?.status === 401) {
        return toast.error('Please login to create a new post');
      }
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  const updateEatery = async (eatery: Eatery) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/update/${eatery._id}`,
        eatery,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('authToken')}` || '',
          },
        }
      );
      if (res.data) {
        const copy = [...eateries];
        copy.splice(Number(editingIndex), 1, res.data);
        setEateries(copy);
      }
      setEditingIndex(null);
      toast.success('Updated eatery information!');
    } catch (e: any) {
      if (e.response?.status === 401) {
        return toast.error('Please login to edit a post');
      }
      alert('Oops! Something has gone wrong, Please try again.');
    }
  };

  const deleteEatery = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/eatery/delete/${id}`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('authToken')}` || '',
          },
        }
      );

      setEateries(eateries.filter((e) => e._id !== id));
      toast.success('Deleted eatery!');
    } catch (e: any) {
      if (e.response.status === 403) {
        toast.error('only admins can delete posts');
      } else if (e.response.status === 401) {
        toast.error('please login as admin to delete post');
      }
    }
  };

  return (
    <Container maxWidth="md">
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

type SubmitData = Eatery & {
  userId?: string;
  authToken?: string;
};

export enum PriceRange {
  CHEAP = 'CHEAP',
  AVERAGE = 'AVERAGE',
  EXPENSIVE = 'EXPENSIVE',
}
