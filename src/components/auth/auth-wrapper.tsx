import React from "react";

const AuthWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex h-screen items-center justify-center p-6'>
      <div className='w-full space-y-10 overflow-y-auto sm:w-1/2 md:w-2/3 lg:w-[580px]'>
        <div className='space-y-7.5'>{children}</div>
      </div>
    </main>
  );
};

export default AuthWrapper;
