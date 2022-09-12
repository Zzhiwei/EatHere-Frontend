import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Eatery } from './EateryList';

interface Props {
  eatery: Eatery;
}

const priceMap = {
  CHEAP: 1,
  AVERAGE: 2,
  EXPENSIVE: 3,
};

export const EditEateryCard = ({ eatery }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const onSubmit = (data) => console.log({ data });
  const onSubmit = () => {};

  console.log({ errors });
  return (
    <div className=" rounded-lg bg-white px-10 py-12 shadow-lg">
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className=" w-10/12 border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
            type="text"
            placeholder="Name"
            {...register('Name', {
              required: 'This is required',
              minLength: { value: 3, message: 'minimum length is 3' },
              maxLength: { value: 99, message: 'maximum length is 99' },
            })}
          />
          {errors.Name && (
            <div className=" text-red-500">{errors.Name.message as string}</div>
          )}
        </div>
        <div>
          <input
            className=" w-10/12 border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
            type="text"
            placeholder="Address"
            {...register('Address', {
              required: 'This is required',
              minLength: { value: 3, message: 'minimum length is 3' },
              maxLength: { value: 99, message: 'maximum length is 99' },
            })}
          />
          {errors.Address && (
            <div className=" text-red-500">
              {errors.Address.message as string}
            </div>
          )}
        </div>
        <div className="">
          <select
            placeholder="Price?"
            className="w-52 border-b-2 pb-2 text-xl text-text1 outline-none"
            {...register('PriceRange', { required: 'This is required' })}
          >
            <option value=""></option>
            <option value="cheap">cheap</option>
            <option value="average">average</option>
            <option value="expensive">expensive</option>
          </select>
          {errors.PriceRange && (
            <div className=" text-red-500">
              {errors.PriceRange.message as string}
            </div>
          )}
        </div>

        <div className="flex gap-x-4">
          <input
            className="mt-5 h-14 w-40 cursor-pointer rounded-md bg-amber-300  p-3 hover:border-2 hover:border-gray-800"
            type="submit"
          />
          <button className="mt-5 h-14 w-40 rounded-md bg-text1 p-3 text-white hover:border-2 hover:border-amber-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
