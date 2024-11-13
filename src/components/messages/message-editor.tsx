"use client";

import { useRef, useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import { Link, SendHorizontal, Smile, X } from "lucide-react";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { Plugin, PluginKey } from "prosemirror-state";

import "./styles.css";
import { Button } from "../ui/button";
import { useParams, usePathname } from "next/navigation";
import { createMessage } from "@/services/conversations";
import { useMutation } from "@tanstack/react-query";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useOnClickOutside } from "usehooks-ts";
import { GroupMessage, Message } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { createGroupMessage } from "@/services/groups";

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
  const createMessageMutation = useMutation({
    mutationFn: createMessage,
  });
  const createGroupMessageMutation = useMutation({
    mutationFn: createGroupMessage,
  });

  const setEditorContent = (content: string) => {
    editor?.commands.setContent(content);
  };

  useEffect(() => {
    if (isEditing && messageEditing?.content) {
      setEditorContent(messageEditing.content);
    }
  }, [isEditing, messageEditing]);

  const CustomStarterKit = StarterKit.extend({
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          const input = editor?.getText({ blockSeparator: "\n" }) || "";
          if (pathname.includes("conversations")) {
            console.log("submit conversation");
            createMessageMutation.mutate({
              conversationId: params.conversationId,
              content: input,
            });
          } else {
            createGroupMessageMutation.mutate({
              groupId: params.groupId,
              content: input,
            });
          }
          setShowEmojiPicker(false);
          editor?.commands.clearContent();
          return true;
        },
        "Shift-Enter": () => {
          this.editor.commands.enter();
          return true;
        },
      };
    },
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("sendTypingStatus"),
          props: {
            handleKeyDown: () => {
              sendTypingStatus();
              return false;
            },
          },
        }),
      ];
    },
  });

  const editor = useEditor({
    extensions: [
      CustomStarterKit.configure({ bold: false, italic: false }),
      Placeholder.configure({ placeholder: "Type something here..." }),
      Emoji.configure({ emojis: gitHubEmojis, enableEmoticons: true }),
    ],
    autofocus: true,
  });

  const onSubmit = async () => {
    const input = editor?.getText({ blockSeparator: "\n" }) || "";
    if (pathname.includes("conversations")) {
      createMessageMutation.mutate({
        conversationId: params.conversationId,
        content: input,
      });
    } else {
      createGroupMessageMutation.mutate({
        groupId: params.groupId,
        content: input,
      });
    }
    setShowEmojiPicker(false);
    editor?.commands.clearContent();
  };

  const handleEmojiClick = (event: { emoji: Content }) => {
    editor?.chain().focus().insertContent(event.emoji).run();
  };

  const handleClickOutside = () => {
    setShowEmojiPicker(false);
  };
  useOnClickOutside(emojiPickerRef, handleClickOutside);

  return (
    <div className='space-y-2'>
      {isRelying && (
        <div className='flex items-center justify-between'>
          <div className='flex items-start flex-col'>
            <p className='text-base'>
              Replying to{" "}
              {messageReplying?.author.id === user?.id
                ? "yourself"
                : `${messageReplying?.author.username}`}
            </p>
            <p className='text-sm text-foreground/70'>
              {messageReplying?.content}
            </p>
          </div>
          <Button
            variant='ghost'
            className='rounded-full'
            size='iconSm'
            onClick={() =>
              setStateReplying({ isRelying: false, message: null })
            }
          >
            <X />
          </Button>
        </div>
      )}
      {isEditing && (
        <div className='flex items-center justify-between'>
          <p className='text-base'>Edit message</p>
          <Button
            variant='ghost'
            className='rounded-full'
            size='iconSm'
            onClick={() => {
              setStateEditing({ isEditing: false, message: null });
              editor?.commands.clearContent();
            }}
          >
            <X />
          </Button>
        </div>
      )}
      <div className=' flex items-center gap-5'>
        <div className='relative flex-1 max-w-[633px]'>
          <div className='absolute right-3 top-1.5 flex items-center z-10'>
            <Button variant='ghost' size='icon'>
              <Link />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile />
            </Button>
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className='absolute bottom-full right-0 mb-2'
              >
                <EmojiPicker
                  emojiStyle={EmojiStyle.FACEBOOK}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
          </div>
          <EditorContent editor={editor} />
        </div>
        {editor?.getText({ blockSeparator: "\n" }) === "" ? (
          <Button
            onClick={() => {
              editor?.chain().focus().setEmoji("fire").run();
              onSubmit();
            }}
            variant='ghost'
            size='icon'
            className='p-3 size-12 text-2xl'
          >
            🔥
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            variant='ghost'
            className='bg-primary/10 p-4 size-12'
          >
            <SendHorizontal className='text-primary' />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageEditor;
