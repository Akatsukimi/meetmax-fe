import Menubar from "@/components/shared/menubar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-grow gap-4 px-7.5 overflow-hidden'>
      <Menubar className='sticky top-[4.625rem] hidden h-full flex-none space-y-3 rounded-2xl bg-card py-2.5 sm:block xl:w-48' />
      <div className='bg-gray-50 p-7.5 h-full rounded-t-2xl flex-1'>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
