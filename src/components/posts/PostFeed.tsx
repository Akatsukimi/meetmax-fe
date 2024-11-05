import { cn } from "@/lib/utils";
import PostEditor from "./PostEditor";
import PostList from "./PostList";

const PostFeed = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <PostEditor />

      <PostList />
    </div>
  );
};

export default PostFeed;
