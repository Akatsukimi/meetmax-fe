import RightBar from '@/components/shared/right-bar';
import React from 'react';

const FeedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='bg-gray-50 p-7.5 rounded-t-2xl flex-1'>{children}</div>
      <RightBar className='sticky top-[4.625rem] hidden h-full xl:flex flex-col rounded-2xl bg-card px-5 gap-7.5 py-1 lg:px-5 xl:w-80' />
    </>
  );
};

export default FeedLayout;