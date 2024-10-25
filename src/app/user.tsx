"use client";

import { getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const User = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <br />
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default User;
