import Link from "next/link";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/assets/logo.png";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <header className='bg-background/40 backdrop-blur-md shadow-sm py-5 px-7.5 flex items-center justify-between sticky top-0 z-50'>
        <Link href='/login' className='inline-flex gap-2.5'>
          <Image
            src={Logo}
            width={26}
            height={26}
            alt='logo'
            className='object-cover'
          />
          <h1 className='font-bold'>Meetmax</h1>
        </Link>
        <Select defaultValue='english'>
          <SelectTrigger className='w-[154px] shadow-sm'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='vietnamese'>Vietnamese</SelectItem>
            <SelectItem value='english'>English</SelectItem>
          </SelectContent>
        </Select>
      </header>
      <div>{children}</div>
    </main>
  );
};

export default layout;
