import HeaderBar from "@/components/shared/header-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex flex-col max-w-[1440px] mx-auto">
      <HeaderBar />
      {children}
    </div>
  );
};

export default MainLayout;
