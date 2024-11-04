import PostFeed from "@/components/posts/PostFeed";

const FeedPage = () => {
  // const user = getSession();
  return (
    <div className="flex justify-between gap-7 w-full">
      <PostFeed className="w-[60%]" />

      <div className="flex-1 bg-slate-600">Suggestion</div>
    </div>
  );
};

export default FeedPage;
