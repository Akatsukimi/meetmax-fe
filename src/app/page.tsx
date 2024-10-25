import User from "./user";
import getSession from "@/lib/getSession";

export default function Home() {
  const user = getSession();
  return (
    <div>
      <p>
        Home
        {user}
      </p>
      <User />
    </div>
  );
}
