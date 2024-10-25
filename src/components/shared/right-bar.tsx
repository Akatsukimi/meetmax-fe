import Friends from "./friends";
import Stories from "./stories";
import SearchFriend from "./search-friend";

interface RightBarProps {
  className?: string;
}

const RightBar = ({ className }: RightBarProps) => {
  return (
    <div className={className}>
      <SearchFriend />
      <Stories />
      <Friends />
    </div>
  );
};

export default RightBar;
