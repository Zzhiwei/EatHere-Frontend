import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const height = 'h-16';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 ${height} z-10 w-screen bg-white shadow-lg`}
      />
      <div className={`${height}`}></div>
      {children}
    </>
  );
};

export default Layout;
