import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const SignInForm = () => {
  const [name, setName] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onLogin = async (data: { username: string; password: string }) => {
    const { username, password } = data;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EATERY_API_ENDPOINT}/auth/login`,
        {
          username,
          password,
        }
      );
      if (res.data) {
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        router.push('/');
      }
    } catch (e) {
      if (e.response.status === 401) {
        return toast.error('Username or Password is incorrect');
      }
      alert('something wrong has occurred, please contact the admin');
    }
  };

  return (
    <div className="mt-32">
      <div className="mx-auto w-80  rounded-md bg-white p-10 shadow-lg">
        <form
          className="mb-5 flex flex-col gap-y-5"
          method="post"
          onSubmit={handleSubmit(onLogin)}
        >
          <h1 className="mb-5 flex justify-center text-2xl">Login</h1>
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
              })}
            />
            {errors.password && (
              <div className=" text-red-500">
                {errors.password.message as string}
              </div>
            )}
          </div>
          <input
            className="mx-auto mt-5 h-14 w-40 cursor-pointer rounded-md bg-amber-300  p-3 hover:border-2 hover:border-gray-800"
            type="submit"
            value="Login"
          />
        </form>
        <div className="flex justify-center">
          <Link href="/register">
            <a className=" underline">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
