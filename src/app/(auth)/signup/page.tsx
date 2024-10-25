import { Metadata } from "next";

import Social from "@/components/auth/social";
import AuthHeader from "@/components/auth/auth-header";
import AuthWrapper from "@/components/auth/auth-wrapper";
import OrSeparator from "@/components/auth/or-separator";

import SignupForm from "./signup-form";
import AuthRedirect from "@/components/auth/auth-redirect";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignupPage = () => {
  return (
    <AuthWrapper>
      <AuthHeader
        title='Getting Started'
        description='Create an account to continue and connect with the people.'
      />
      <div className='p-10 bg-white shadow-2xl space-y-7.5'>
        <Social />
        <OrSeparator />
        <SignupForm />
        <AuthRedirect
          text='Already have an account?'
          redirectTo='/login'
          linkText='Login'
        />
      </div>
    </AuthWrapper>
  );
};

export default SignupPage;
