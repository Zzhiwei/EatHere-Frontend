const Layout = ({ children }) => {
  const height = 'h-16';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 ${height} w-screen bg-white shadow-lg`}
      />
      <div className={`${height}`}></div>
      {children}
    </>
  );
};

export default Layout;
