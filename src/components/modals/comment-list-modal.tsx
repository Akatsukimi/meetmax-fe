import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import { Comment } from "@/lib/types";
import { useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useCreateComment from "@/app/hooks/useCreateComment";
import useGetComments from "@/app/hooks/useGetComments";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CommentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const MAX_NESTING_LEVEL = 3; // Maximum nesting depth to show

const CommentItem = ({
  comment,
  replies,
  parentUsername,
  onReply,
  commentMap,
  depth = 1, // default depth is 1 for top-level comments
}: {
  comment: Comment;
  replies: Comment[];
  parentUsername?: string;
  onReply: (parentCommentId: string, username: string) => void;
  commentMap: Map<string, Comment[]>;
  depth: number;
}) => {
  return (
    <div className="flex flex-col">
      {/* Comment itself */}
      <div className="flex items-start gap-3 py-2">
        <Image
          src={comment.user.avatar || avatar}
          alt={comment.user.username}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-100 p-2 rounded-lg">
            <span className="font-semibold text-sm text-gray-800">
              {comment.user.username}
            </span>
            <p className="text-sm text-gray-700">
              {parentUsername ? (
                <span className="text-blue-500">@{parentUsername} </span>
              ) : (
                ""
              )}
              {comment.content}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>
              {formatDistanceToNow(comment.updatedAt, {
                addSuffix: true,
              }).replace("about ", "")}
            </span>
            <button
              className="text-primary hover:underline"
              onClick={() => onReply(comment.id, comment.user.username)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Display replies up to the max nesting level */}
      {depth < MAX_NESTING_LEVEL && replies.length > 0 && (
        <div className="ml-7">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={commentMap.get(reply.id) || []}
              parentUsername={comment.user.username} // Pass parent username to prefix replies
              onReply={onReply}
              commentMap={commentMap}
              depth={depth + 1} // Increment depth level for nested replies
            />
          ))}
        </div>
      )}

      {/* Not margin left (ml-7): display same column */}
      {depth >= MAX_NESTING_LEVEL && replies.length > 0 && (
        <div className="">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={commentMap.get(reply.id) || []}
              parentUsername={comment.user.username}
              onReply={onReply}
              commentMap={commentMap}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentListModal = ({
  isOpen,
  onClose,
  postId,
}: CommentListModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetComments(postId, null, isOpen);

  // Mutation for adding a new comment or reply
  const { mutateAsync: addCommentMutation, isPending } = useCreateComment(
    postId,
    {
      content: newComment.replace(/^@\w+\s*/, ""),
      parentCommentId: replyTo,
    }
  );

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addCommentMutation();
    }
    setNewComment("");
    setReplyTo(null);
  };

  const handleReplyClick = (parentCommentId: string, username: string) => {
    setReplyTo(parentCommentId);
    setNewComment(`@${username} `);
    inputRef.current?.focus();
  };

  // Organize comments with parent-child relationships
  const organizeComments = () => {
    const commentMap = new Map<string, Comment[]>();
    const topLevelComments: Comment[] = [];

    comments?.pages.forEach((page) => {
      page.data.forEach((comment) => {
        if (comment.parentCommentId) {
          if (!commentMap.has(comment.parentCommentId)) {
            commentMap.set(comment.parentCommentId, []);
          }
          commentMap.get(comment.parentCommentId)?.push(comment);
        } else {
          topLevelComments.push(comment);
        }
      });
    });

    return { topLevelComments, commentMap };
  };

  const { commentMap, topLevelComments } = organizeComments();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="max-h-[450px] overflow-y-auto py-2">
          <div className="space-y-3 mr-2.5">
            {topLevelComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={commentMap.get(comment.id) || []}
                onReply={handleReplyClick}
                commentMap={commentMap}
                depth={1}
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex mt-4">
              <Button
                className="h-fit border-none"
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "View more comments"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <Image
            src={avatar}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full aspect-[1/1] w-10 h-10"
          />
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => {
              const value = e.target.value;
              setNewComment(value);

              // If there's no "@username" at the start, reset replyTo
              if (!/^@\w+\s/.test(value)) {
                setReplyTo(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
            className="flex-1"
            ref={inputRef}
          />
          <div className="flex justify-end">
            <Button
              className="rounded-full p-2 h-10 w-10"
              variant="default"
              onClick={handleAddComment}
              disabled={isPending}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentListModal;
