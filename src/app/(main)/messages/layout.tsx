

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='bg-gray-50 p-7.5 rounded-t-2xl flex-1 xl:mr-7.5 mr-0'>{children}</div>
    </>
  );
};

export default layout;