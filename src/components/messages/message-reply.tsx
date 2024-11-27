import { GroupMessage, Message, User } from '@/lib/types';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface IMessageReplyProps {
  messageReplying: Message | GroupMessage;
  setStateReplying: (state: {
    isRelying: boolean;
    message: Message | GroupMessage | null;
  }) => void;
  user: User | null;
}

const MessageReply = ({
  messageReplying,
  setStateReplying,
  user,
}: IMessageReplyProps) => {
  const getReplyPreview = (messageReplying: Message | GroupMessage) => {
    if (messageReplying.content) {
      return messageReplying.content.length > 60
        ? messageReplying.content.slice(0, 60) + '...'
        : messageReplying.content;
    } else if (messageReplying.attachments.length > 0) {
      const mimeType = messageReplying.attachments[0].mimetype;
      if (mimeType.startsWith('image')) {
        return 'Image';
      } else if (mimeType.startsWith('video')) {
        return 'Video';
      } else {
        return 'Attachment';
      }
    }
    return '';
  };
  const replyPreview = getReplyPreview(messageReplying);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start flex-col">
        <p className="text-base">
          Replying to{' '}
          {messageReplying.author.id === user?.id
            ? 'yourself'
            : `${messageReplying.author.username}`}
        </p>
        <p className="text-sm text-foreground/70">{replyPreview}</p>
      </div>
      <Button
        variant="ghost"
        className="rounded-full"
        size="iconSm"
        onClick={() => setStateReplying({ isRelying: false, message: null })}
      >
        <X />
      </Button>
    </div>
  );
};

export default MessageReply;
