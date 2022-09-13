import { useForm } from 'react-hook-form';

import { Eatery, PriceRange } from './EateryList';

interface Props {
  eatery?: Eatery;
  cancelEdit: () => void;
  onSubmit: (eatery: Eatery) => void;
}

export const EateryForm = ({ eatery, cancelEdit, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: eatery?.name || '',
      address: eatery?.address || '',
      priceRange: eatery?.priceRange || '',
    },
  });

  const onFormSubmit = (data: {
    name: string;
    address: string;
    priceRange: string;
  }) => {
    const newData = { ...data, _id: eatery?._id };
    onSubmit(newData as Eatery);
  };

  return (
    <div className=" rounded-lg bg-white px-10 py-12 shadow-lg">
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div>
          <input
            className=" w-10/12 border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 3, message: 'minimum length is 3' },
              maxLength: { value: 99, message: 'maximum length is 99' },
            })}
          />
          {errors.name && (
            <div className=" text-red-500">{errors.name.message as string}</div>
          )}
        </div>
        <div>
          <input
            className=" w-10/12 border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
            type="text"
            placeholder="Address"
            {...register('address', {
              required: 'This is required',
              minLength: { value: 3, message: 'minimum length is 3' },
              maxLength: { value: 99, message: 'maximum length is 99' },
            })}
          />
          {errors.address && (
            <div className=" text-red-500">
              {errors.address.message as string}
            </div>
          )}
        </div>
        <div className="">
          <select
            placeholder="Price?"
            className="w-52 border-b-2 pb-2 text-xl text-text1 outline-none"
            {...register('priceRange', { required: 'This is required' })}
          >
            {/* <option value=""></option> */}
            <option value="" disabled selected>
              Price Range?
            </option>
            <option value={PriceRange.CHEAP}>cheap</option>
            <option value={PriceRange.AVERAGE}>average</option>
            <option value={PriceRange.EXPENSIVE}>expensive</option>
          </select>
          {errors.priceRange && (
            <div className=" text-red-500">
              {errors.priceRange.message as string}
            </div>
          )}
        </div>

        <div className="flex gap-x-4">
          <input
            className="mt-5 h-14 w-40 cursor-pointer rounded-md bg-amber-300  p-3 hover:border-2 hover:border-gray-800"
            type="submit"
          />
          <button
            onClick={cancelEdit}
            className="mt-5 h-14 w-40 rounded-md bg-text1 p-3 text-white hover:border-2 hover:border-amber-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
