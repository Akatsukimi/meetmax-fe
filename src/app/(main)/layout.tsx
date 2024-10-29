import Navbar from "@/components/shared/nar-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='h-screen flex flex-col max-w-[1440px] mx-auto'>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
