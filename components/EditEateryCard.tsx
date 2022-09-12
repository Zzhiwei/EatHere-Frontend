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
  const onSubmit = (data) => console.log({ data });

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

const MoneyBagIcon = () => (
  <svg
    width="24"
    height="28"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.44 1.385C13.77 1.765 14.33 1.835 14.74 1.545C15.54 0.975002 16.58 1.835 16.17 2.715L13.75 5.485H9.88L7.44 2.685C7.03 1.795 8.07 0.935002 8.87 1.505L8.94 1.555C9.35 1.845 9.91 1.765 10.23 1.385L11.1 0.345002C11.1896 0.23698 11.3019 0.150039 11.429 0.0903658C11.556 0.030693 11.6946 -0.000244141 11.835 -0.000244141C11.9754 -0.000244141 12.114 0.030693 12.241 0.0903658C12.3681 0.150039 12.4804 0.23698 12.57 0.345002L13.44 1.385ZM0 19.225C0 12.685 5.3 7.385 11.84 7.385C18.38 7.385 23.68 12.685 23.67 19.225C23.67 24.055 19.75 27.975 14.92 27.975H8.75C3.92 27.975 0 24.055 0 19.225V19.225Z"
      fill="#F3C07B"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.12 5.465H13.56C14.17 5.465 14.67 5.965 14.67 6.575C14.67 7.185 14.17 7.685 13.56 7.685H10.12C9.50999 7.685 9.00999 7.185 9.00999 6.575C9.00999 5.965 9.50999 5.465 10.12 5.465V5.465ZM11.84 17.345H11.91C13.41 17.385 14.61 18.605 14.61 20.105C14.61 21.385 13.74 22.455 12.56 22.775V23.895C12.56 24.295 12.24 24.615 11.84 24.615C11.44 24.615 11.12 24.295 11.12 23.895V22.775C10.5324 22.617 10.0132 22.2699 9.64269 21.7873C9.27215 21.3047 9.07088 20.7134 9.06999 20.105C9.06999 19.705 9.38999 19.385 9.78999 19.385C10.19 19.385 10.51 19.705 10.51 20.105C10.51 20.845 11.1 21.435 11.83 21.435C12.56 21.435 13.16 20.835 13.16 20.105C13.16 19.375 12.56 18.775 11.83 18.775H11.76C11.0406 18.7555 10.3572 18.4563 9.85489 17.9409C9.3526 17.4255 9.07103 16.7346 9.06999 16.015C9.06999 14.735 9.93999 13.665 11.12 13.345V12.225C11.12 11.825 11.44 11.505 11.84 11.505C12.24 11.505 12.56 11.825 12.56 12.225V13.345C13.74 13.665 14.61 14.735 14.61 16.015C14.61 16.415 14.29 16.735 13.89 16.735C13.49 16.735 13.17 16.415 13.17 16.015C13.17 15.285 12.57 14.685 11.84 14.685C11.11 14.685 10.51 15.285 10.51 16.015C10.51 16.745 11.11 17.345 11.84 17.345V17.345Z"
      fill="#8C5543"
    />
  </svg>
);

const EditIcon = () => (
  <div className="group cursor-pointer">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.8063 9.25125C24.2788 8.77875 24.5388 8.15125 24.5388 7.48375C24.5388 6.81625 24.2788 6.18875 23.8063 5.71625L21.8237 3.73375C21.3512 3.26125 20.7238 3.00125 20.0563 3.00125C19.3888 3.00125 18.7612 3.26125 18.29 3.7325L5 16.9813V22.5H10.5163L23.8063 9.25125ZM20.0563 5.50125L22.04 7.4825L20.0525 9.4625L18.07 7.48125L20.0563 5.50125ZM7.5 20V18.0188L16.3 9.24625L18.2825 11.2288L9.48375 20H7.5ZM5 25H25V27.5H5V25Z"
        fill="black"
        className="opacity-20 group-hover:opacity-100"
      />
    </svg>
  </div>
);

const DeleteIcon = () => (
  <div className="group cursor-pointer">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 5C8.75 4.33696 9.01339 3.70107 9.48223 3.23223C9.95107 2.76339 10.587 2.5 11.25 2.5H18.75C19.413 2.5 20.0489 2.76339 20.5178 3.23223C20.9866 3.70107 21.25 4.33696 21.25 5V7.5H26.25C26.5815 7.5 26.8995 7.6317 27.1339 7.86612C27.3683 8.10054 27.5 8.41848 27.5 8.75C27.5 9.08152 27.3683 9.39946 27.1339 9.63388C26.8995 9.8683 26.5815 10 26.25 10H24.9137L23.83 25.1775C23.7851 25.8082 23.5029 26.3985 23.0401 26.8295C22.5774 27.2604 21.9686 27.5 21.3363 27.5H8.6625C8.03017 27.5 7.42133 27.2604 6.95861 26.8295C6.49588 26.3985 6.21365 25.8082 6.16875 25.1775L5.0875 10H3.75C3.41848 10 3.10054 9.8683 2.86612 9.63388C2.6317 9.39946 2.5 9.08152 2.5 8.75C2.5 8.41848 2.6317 8.10054 2.86612 7.86612C3.10054 7.6317 3.41848 7.5 3.75 7.5H8.75V5ZM11.25 7.5H18.75V5H11.25V7.5ZM7.5925 10L8.66375 25H21.3375L22.4088 10H7.5925Z"
        fill="#342D61"
        className="opacity-20 group-hover:opacity-100"
      />
    </svg>
  </div>
);
