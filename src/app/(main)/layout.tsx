import Menubar from "@/components/shared/menubar";
import Navbar from "@/components/shared/nar-bar";
import RightBar from "@/components/shared/right-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='mx-auto flex w-full grow'>
        <Menubar className='sticky top-[4.625rem] hidden h-full flex-none space-y-3 rounded-2xl bg-card px-3 py-2.5 sm:block lg:px-5 xl:w-60' />
        <div className='bg-gray-50 p-7.5 rounded-t-2xl flex-1'>{children}</div>
        <RightBar className='sticky top-[4.625rem] hidden h-full xl:flex flex-col rounded-2xl bg-card px-5 gap-7.5 py-1 lg:px-5 xl:w-80' />
      </div>
      <Menubar className='sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden' />
    </main>
  );
};

export default MainLayout;
