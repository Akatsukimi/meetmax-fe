import { z } from "zod";
import { FC } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGroup } from "@/services/groups";

const createGroupFormSchema = z.object({
  users: z.array(
    z.string().min(1, {
      message: "User must be at least 1 character long",
    })
  ),
  title: z.string().min(1, {
    message: "Title must be at least 1 character long",
  }),
});

type CreateGroupFormProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateGroupForm: FC<CreateGroupFormProps> = ({ setIsOpen }) => {
  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      users: [""],
      title: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users" as const,
  });

  const mutation = useMutation({
    mutationFn: createGroup,
    onError: ({ response }: { response: { data: { message: string } } }) => {
      toast.error(response.data.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`users.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="flex items-center gap-5">
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="text-slate-900"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    X
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="button" onClick={() => append("")}>
          Add Username
        </Button>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="message"
                  className="text-slate-900"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create group
        </Button>
      </form>
    </Form>
  );
};

export default CreateGroupForm;
