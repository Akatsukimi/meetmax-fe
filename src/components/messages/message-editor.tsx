'use client';

import { useRef, useState, useEffect, KeyboardEvent, FormEvent } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useOnClickOutside } from 'usehooks-ts';
import { useDropzone, FileRejection } from 'react-dropzone';
import { createMessage } from '@/services/conversations';
import { createGroupMessage } from '@/services/groups';
import { uploadFileMessage } from '@/services/upload';
import { useAuth } from '@/providers/auth-provider';
import { Attachment, GroupMessage, Message } from '@/lib/types';
import { FileType } from '@/lib/enum';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import Hint from '@/components/shared/hint';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import {
  CirclePlay,
  FileText,
  ImageUp,
  Link,
  SendHorizontal,
  Smile,
  X,
  XIcon,
} from 'lucide-react';

interface IMessageEditorProps {
  stateRelying: { isRelying: boolean; message: Message | GroupMessage | null };
  setStateReplying: (state: {
    isRelying: boolean;
    message: Message | GroupMessage | null;
  }) => void;
  sendTypingStatus: () => void;
  stateEditing: { isEditing: boolean; message: Message | GroupMessage | null };
  setStateEditing: (state: {
    isEditing: boolean;
    message: Message | GroupMessage | null;
  }) => void;
}

const MessageEditor = ({
  stateRelying,
  setStateReplying,
  sendTypingStatus,
  stateEditing,
  setStateEditing,
}: IMessageEditorProps) => {
  const { user } = useAuth();
  const params = useParams<{ conversationId: string; groupId: string }>();
  const pathname = usePathname();
  const emojiPickerRef = useRef(null);
  const { isEditing, message: messageEditing } = stateEditing;
  const { isRelying, message: messageReplying } = stateRelying;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
  });
  const createGroupMessageMutation = useMutation({
    mutationFn: createGroupMessage,
  });
  const uploadFileMessageMutation = useMutation({
    mutationFn: uploadFileMessage,
  });

  useEffect(() => {
    if (isEditing && messageEditing?.content) {
      setMessage(messageEditing.content);
    }
  }, [isEditing, messageEditing]);

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        const files: File[] = [];
        for (const item of items) {
          if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }
        if (files.length > 0) {
          uploadFileMessageMutation.mutate(
            {
              files,
              type: pathname.includes('conversations')
                ? FileType.MESSAGE
                : FileType.GROUP_MESSAGE,
            },
            {
              onSuccess: (newFiles) => {
                setAttachments((prev) => [...prev, ...newFiles]);
              },
              onError: (error) => {
                toast.error(`File upload failed: ${error}`);
              },
            },
          );
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('paste', handlePaste);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('paste', handlePaste);
      }
    };
  }, [pathname, uploadFileMessageMutation]);

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    if (pathname.includes('conversations')) {
      createMessageMutation.mutate({
        conversationId: params.conversationId,
        content: message,
        attachments,
      });
    }
    if (pathname.includes('groups')) {
      createGroupMessageMutation.mutate({
        groupId: params.groupId,
        content: message,
        attachments,
      });
    }

    setShowEmojiPicker(false);
    setAttachments([]);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleEmojiClick = (event: { emoji: string }) => {
    setMessage((prev) => prev + event.emoji);
    sendTypingStatus();
  };

  const handleClickOutside = () => {
    setShowEmojiPicker(false);
  };
  useOnClickOutside(emojiPickerRef, handleClickOutside);

  const handleDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (pathname.includes('conversations')) {
      uploadFileMessageMutation.mutate(
        {
          files: acceptedFiles,
          type: FileType.MESSAGE,
        },
        {
          onSuccess: (newFiles) => {
            setAttachments((prev) => [...prev, ...newFiles]);
          },
          onError: (error) => {
            toast.error(`File upload failed: ${error}`);
          },
        },
      );
    }
    if (pathname.includes('groups')) {
      uploadFileMessageMutation.mutate(
        {
          files: acceptedFiles,
          type: FileType.GROUP_MESSAGE,
        },
        {
          onSuccess: (newFiles) => {
            setAttachments((prev) => [...prev, ...newFiles]);
          },
          onError: (error) => {
            toast.error(`File upload failed: ${error}`);
          },
        },
      );
    }
  };

  const handleDropRejected = (fileRejections: FileRejection[]) => {
    const errors = fileRejections.map(({ file, errors }) => {
      return `${file.name} - ${errors
        .map((e: { message: string }) => e.message)
        .join(', ')}`;
    });
    toast.error(`File upload failed: ${errors.join(', ')}`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    multiple: true,
    noClick: true,
  });
  const {
    getRootProps: getRootPropsAsClick,
    getInputProps: getInputPropsAsClick,
  } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    multiple: true,
    noDrag: true,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="space-y-2">
      {isRelying && (
        <div className="flex items-center justify-between">
          <div className="flex items-start flex-col">
            <p className="text-base">
              Replying to{' '}
              {messageReplying?.author.id === user?.id
                ? 'yourself'
                : `${messageReplying?.author.username}`}
            </p>
            <p className="text-sm text-foreground/70">
              {messageReplying?.content}
            </p>
          </div>
          <Button
            variant="ghost"
            className="rounded-full"
            size="iconSm"
            onClick={() =>
              setStateReplying({ isRelying: false, message: null })
            }
          >
            <X />
          </Button>
        </div>
      )}
      {isEditing && (
        <div className="flex items-center justify-between">
          <p className="text-base">Edit message</p>
          <Button
            variant="ghost"
            className="rounded-full"
            size="iconSm"
            onClick={() => {
              setStateEditing({ isEditing: false, message: null });
              setMessage('');
            }}
          >
            <X />
          </Button>
        </div>
      )}
      {attachments.length > 0 && (
        <div className="relative p-2 flex items-center gap-2">
          <div className="relative flex w-[350px] sm:w-[400px] md:w-[550px] xl:w-[680px] overflow-x-auto gap-2 p-2">
            <Hint label="Upload another files" duration={0}>
              <Button
                {...getRootPropsAsClick()}
                variant="outline"
                className="flex items-center justify-center rounded-lg size-[52px] cursor-pointer"
              >
                <input {...getInputPropsAsClick()} className="hidden" />
                <ImageUp className="text-foreground/40" size={40} />
              </Button>
            </Hint>
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className={cn(
                  'relative h-[52px] w-[52px] flex-shrink-0 group',
                  attachment.mimetype.includes('application') && 'w-[104px]',
                )}
              >
                <Hint label="Remove image">
                  <button
                    onClick={() =>
                      setAttachments(attachments.filter((_, i) => i !== index))
                    }
                    className="hidden group-hover:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </Hint>
                {attachment.mimetype.includes('image') && (
                  <Image
                    src={attachment.url}
                    alt="uploaded"
                    fill
                    className="rounded-xl overflow-hidden border object-cover"
                  />
                )}
                {attachment.mimetype.includes('video') && (
                  <div className="relative h-full w-full">
                    <CirclePlay className="absolute top-0 z-10" />
                    <video
                      src={attachment.url}
                      controls
                      className="rounded-xl w-[52px] h-[52px] overflow-hidden border object-cover"
                    />
                  </div>
                )}
                {attachment.mimetype.includes('application') && (
                  <div className="flex items-center justify-center rounded-xl h-[52px] w-[104px] overflow-hidden border object-cover bg-accent px-1 gap-1">
                    <FileText size={32} />
                    <p className="text-xs truncate">{attachment.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div
          {...getRootProps()}
          className="flex items-center justify-between gap-5"
        >
          <div
            className={`relative flex-1 max-w-[633px] border border-dashed rounded-xl ${
              isDragActive ? 'border-primary' : 'border-transparent'
            }`}
          >
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center z-10">
              <Button
                {...getRootPropsAsClick()}
                variant="ghost"
                size="icon"
                type="button"
              >
                <input {...getInputPropsAsClick()} className="hidden" />
                <Link />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile />
              </Button>
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-full right-0 mb-2"
                >
                  <EmojiPicker
                    emojiStyle={EmojiStyle.FACEBOOK}
                    onEmojiClick={handleEmojiClick}
                  />
                </div>
              )}
            </div>
            <input {...getInputProps()} />
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                sendTypingStatus();
              }}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="Type a message..."
              className="flex-grow resize-none overflow-hidden min-h-[40px] max-h-[200px] my-2 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              rows={1}
              autoFocus
            />
          </div>
          <Button
            disabled={message.trim() === '' && attachments.length === 0}
            type="submit"
            size="icon"
            className="flex-shrink-0"
          >
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageEditor;
