import { Metadata } from "next";

import AuthHeader from "@/components/auth/auth-header";
import AuthWrapper from "@/components/auth/auth-wrapper";

import VerifyForm from "./verify-form";

export const metadata: Metadata = {
  title: "Verify Email",
};

const VerifyPage = () => {
  return (
    <AuthWrapper>
      <AuthHeader
        title='Check your email'
        description="We've sent a link to your email address:"
        email='ahmed@gmail.com'
      />
      <VerifyForm />
    </AuthWrapper>
  );
};

export default VerifyPage;
