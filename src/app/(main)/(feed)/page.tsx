import PostFeed from "@/components/posts/PostFeed";
import Suggestion from "@/components/profile/Suggestion";

const FeedPage = () => {
  return (
    <div className="flex justify-between gap-7 w-full">
      <PostFeed className="flex-1" />
      <Suggestion className="w-1/3" />
    </div>
  );
};

export default FeedPage;
