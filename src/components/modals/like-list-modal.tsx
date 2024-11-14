import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUsersLikedPost } from "@/services/posts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import { LikedPostUser } from "@/lib/types";
import { QueryKeyFeed } from "@/lib/enum";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface LikeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const LikeListModal = ({ isOpen, onClose, postId }: LikeListModalProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QueryKeyFeed.UsersLikedPost, postId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getUsersLikedPost(
          postId,
          pageParam as number,
          10
        );
        return response;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
      },
      initialPageParam: 1,
      enabled: isOpen,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users liked post</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.data.map((like: LikedPostUser) => (
                <div key={like.userId} className="flex items-center gap-4 p-2">
                  <Image
                    src={like.avatar || avatar}
                    alt={like.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{like.username}</span>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Add Friend
                  </Button>
                </div>
              ))}
            </div>
          ))}
          <div ref={ref} className="h-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikeListModal;
