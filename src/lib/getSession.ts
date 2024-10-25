import { cache } from "react";
import { cookies } from "next/headers";

export default cache(() => cookies().get("user")?.value);
