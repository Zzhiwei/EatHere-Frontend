import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const height = 'h-16';
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoginPage =
    router.asPath === '/login' || router.asPath === '/register';

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem('authToken'));
    setIsLoggedIn(isLoggedIn);
    if (isLoginPage && isLoggedIn) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 ${height} z-10 w-screen bg-white shadow-lg`}
      >
        {!isLoginPage && (
          <Container>
            <div className="flex h-16 items-center justify-end">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className=" h-12 w-32 rounded-md bg-text1 p-3 text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className=" h-12 w-32 rounded-md bg-amber-300 p-3  "
                >
                  Login
                </button>
              )}
            </div>
          </Container>
        )}
      </nav>
      <div className={`${height}`}></div>
      {children}
    </>
  );
};

export default Layout;
