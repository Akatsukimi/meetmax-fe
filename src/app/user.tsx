"use client";

import { useAuth } from "@/providers/auth-provider";
import { getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const User = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
  });
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <br />
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default User;
