import PostFeed from "../posts/PostFeed";
import ProfileIntro from "./ProfileIntro";
import Suggestion from "./Suggestion";

export default function ProfileContent() {
  return (
    <div className="mt-8 p-7.5 grid gap-6 md:grid-cols-[300px_1fr_300px] bg-muted rounded-lg">
      <ProfileIntro />
      <PostFeed />
      <Suggestion />
    </div>
  );
}
