import Menubar from "@/components/shared/menubar";
import RightBar from "@/components/shared/right-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className='mx-auto gap-4 flex w-full flex-grow'>
        <Menubar className='sticky top-[4.625rem] hidden h-full flex-none space-y-3 rounded-2xl bg-card py-2.5 sm:block xl:w-48' />
        <div className='bg-gray-50 p-7.5 rounded-t-2xl flex-1'>{children}</div>
        <RightBar className='sticky top-[4.625rem] hidden h-full xl:flex flex-col rounded-2xl bg-card px-5 gap-7.5 py-1 lg:px-5 xl:w-80' />
      </div>
      <Menubar className='sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden' />
    </>
  );
};

export default MainLayout;
