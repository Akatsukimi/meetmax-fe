import { Metadata } from "next";

import AuthHeader from "@/components/auth/auth-header";
import AuthWrapper from "@/components/auth/auth-wrapper";

import ResetForm from "./reset-form";
import AuthRedirect from "@/components/auth/auth-redirect";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPage = () => {
  return (
    <AuthWrapper>
      <AuthHeader
        title='Forgot password?'
        description='Enter your details to receive a rest link'
      />
      <div className='p-10 bg-white shadow-2xl space-y-7.5'>
        <ResetForm />
        <AuthRedirect redirectTo='/login' linkText='Back to Sign In' />
      </div>
    </AuthWrapper>
  );
};

export default ResetPage;
