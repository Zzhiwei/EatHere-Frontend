import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const SignUpForm = () => {
  const [name, setName] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: '',
      role: 'USER',
    },
  });

  const onSignUp = async (data: {
    name: string;
    username: string;
    password: string;
    role: 'ADMIN' | 'USER';
  }) => {
    try {
      const { name, username, password, role } = data;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/auth/register`,
        {
          name,
          username,
          password,
          role,
        }
      );
      if (res.data) {
        router.push('/login');
      }
    } catch (e) {
      toast.error('Username has already been taken');
    }
  };

  return (
    <div className="mt-32">
      <div className="mx-auto w-80  rounded-md bg-white p-10 shadow-lg">
        <form
          className="mb-5 flex flex-col gap-y-5"
          method="post"
          onSubmit={handleSubmit(onSignUp)}
        >
          <h1 className="mb-5 flex justify-center text-2xl">Sign Up</h1>
          <div>
            <input
              className="  border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
              type="text"
              placeholder="Full Name"
              {...register('name', {
                required: 'This is required',
              })}
            />
            {errors.name && (
              <div className=" text-red-500">
                {errors.name.message as string}
              </div>
            )}
          </div>
          <div>
            <input
              className=" border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'This is required',
              })}
            />
            {errors.username && (
              <div className=" text-red-500">
                {errors.username.message as string}
              </div>
            )}
          </div>
          <div>
            <input
              className=" border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'This is required',
                minLength: { value: 6, message: 'minimum length is 6' },
              })}
            />
            {errors.password && (
              <div className=" text-red-500">
                {errors.password.message as string}
              </div>
            )}
          </div>
          <div>
            <div>Choose your role: </div>
            <select
              {...register('role')}
              className="mt-3 border-b-2 pb-2 pl-1 text-xl text-text1 outline-none"
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
          <input
            className="mx-auto mt-5 h-14 w-40 cursor-pointer rounded-md bg-amber-300  p-3 hover:border-2 hover:border-gray-800"
            type="submit"
            value="Sign Up"
          />
        </form>
        <div className="flex justify-center">
          <Link href="/login">
            <a className=" underline">Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
