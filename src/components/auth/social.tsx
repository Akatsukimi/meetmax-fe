"use client";

import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    console.log("🚀 ~ onClick ~ provider:", provider);
  };
  return (
    <div className='flex items-center gap-4 w-full flex-wrap xl:flex-nowrap'>
      <Button
        size='lg'
        className='flex-1 bg-gray-50 dark:bg-gray-600'
        variant='outline'
        onClick={() => onClick("google")}
      >
        <FaGoogle className='w-5 h-5 mr-6'></FaGoogle>
        Log in with Google
      </Button>
      <Button
        size='lg'
        className='flex-1 bg-gray-50 dark:bg-gray-600'
        variant='outline'
        onClick={() => onClick("github")}
      >
        <FaGithub className='w-5 h-5 mr-6'></FaGithub>
        Log in with Github
      </Button>
    </div>
  );
};

export default Social;
