"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  };

  return (
    <div className='p-10 bg-white shadow-2xl space-y-7.5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7.5'>
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className='w-full'>
                      <InputOTPSlot index={0} className='size-20 text-4xl' />
                      <InputOTPSlot index={1} className='size-20 text-4xl' />
                      <InputOTPSlot index={2} className='size-20 text-4xl' />
                      <InputOTPSlot index={3} className='size-20 text-4xl' />
                      <InputOTPSlot index={4} className='size-20 text-4xl' />
                      <InputOTPSlot index={5} className='size-20 text-4xl' />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
      <div className='flex gap-4 items-center justify-center'>
        Didn&apos;t receive an email?
        <button className='text-primary'>Resend</button>
      </div>
    </div>
  );
};

export default VerifyForm;
