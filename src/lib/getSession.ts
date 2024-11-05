import { cache } from "react";
import { cookies } from "next/headers";

import { User } from "@/lib/types";

export default cache((): User | null => {
  const userCookie = cookies().get("user")?.value;
  return userCookie ? (JSON.parse(userCookie) as User) : null;
});
