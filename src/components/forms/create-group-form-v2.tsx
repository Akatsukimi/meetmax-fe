'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().optional(),
  users: z.array(z.string()).min(1, 'At least one user is required'),
});

type FormValues = z.infer<typeof formSchema>;

// Mock users array
const mockUsers = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'David Lee',
  'Emma Watson',
  'Frank Ocean',
  'Grace Kelly',
  'Henry Ford',
  'Ivy Chen',
  'Jack Black',
];

export default function InputWithUsersAndTitle() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      users: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = mockUsers.filter((user) =>
        user.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!form.getValues().users.includes(suggestion)) {
      append(suggestion);
    }
    setInputValue('');
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="users"
          render={() => (
            <FormItem>
              <FormLabel>Users</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {fields.map((item, index) => (
                      <Badge
                        key={item.id}
                        variant="secondary"
                        className="text-sm"
                      >
                        {Object.entries(item)
                          .filter(
                            ([key, val]) =>
                              key !== 'id' && typeof val === 'string',
                          )
                          .map(([, val]) => val)
                          .join('')}
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-1 hover:text-destructive focus:outline-none"
                        >
                          <X size={14} />
                          <span className="sr-only">Remove user</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      icon={Search}
                      placeholder="Search users"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    {suggestions.length > 0 && (
                      <ul
                        ref={suggestionsRef}
                        className="absolute z-10 w-full bg-popover text-popover-foreground border rounded-md shadow-md max-h-60 overflow-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-muted cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title (optional)" {...field} />
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
}
