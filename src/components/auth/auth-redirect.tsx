import Link from "next/link";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

interface AuthRedirectProps {
  text?: string;
  redirectTo: string;
  linkText: string;
}

const AuthRedirect = ({ text, redirectTo, linkText }: AuthRedirectProps) => {
  return (
    <div className='flex gap-4 items-center justify-center'>
      {text}
      <Button size='sm' variant='link' asChild className='p-0 font-medium'>
        <Link href={`${redirectTo}`} className='text-md'>
          {!text && <ChevronLeft />}
          {linkText}
        </Link>
      </Button>
    </div>
  );
};

export default AuthRedirect;
