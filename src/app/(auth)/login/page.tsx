import { Metadata } from "next";

import Social from "@/components/auth/social";
import AuthHeader from "@/components/auth/auth-header";
import AuthWrapper from "@/components/auth/auth-wrapper";
import OrSeparator from "@/components/auth/or-separator";

import LoginForm from "./login-form";
import AuthRedirect from "@/components/auth/auth-redirect";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <AuthWrapper>
      <AuthHeader
        title='Login'
        description="Welcome back, you've been missed!"
      />
      <div className='p-10 bg-white shadow-2xl space-y-7.5'>
        <Social />
        <OrSeparator />
        <LoginForm />
        <AuthRedirect
          text="You haven't any account?"
          redirectTo='/signup'
          linkText='Sign Up'
        />
      </div>
    </AuthWrapper>
  );
};

export default LoginPage;
