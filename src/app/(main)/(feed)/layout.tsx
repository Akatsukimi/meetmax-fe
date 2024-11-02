const FeedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-gray-50 p-7.5 min-h-screen overflow-y-auto rounded-t-2xl flex-1 flex gap-x-7.5 custom-scrollbar'>
      {children}
    </div>
  );
};

export default FeedLayout;
