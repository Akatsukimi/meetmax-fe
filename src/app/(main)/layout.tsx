import Menubar from "@/components/shared/menubar";
import Navbar from "@/components/shared/nar-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex min-h-screen flex-col max-w-full w-full xl:max-w-[1440px] mx-auto'>
      <Navbar />
      <div className='mx-auto flex w-full grow'>
        <Menubar className='sticky top-[4.625rem] hidden h-full flex-none space-y-3 rounded-2xl bg-card px-3 py-2.5 sm:block lg:px-5 xl:w-60' />
        {children}
      </div>
      <Menubar className='sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden' />
    </main>
  );
};

export default MainLayout;
