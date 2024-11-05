"use client";

import { useContext, useRef, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import { Link, SendHorizontal, Smile, X } from "lucide-react";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";

import "./styles.css";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { createMessage } from "@/services/conversations";
import { useMutation } from "@tanstack/react-query";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useOnClickOutside } from "usehooks-ts";
import { Message } from "@/lib/types";
import { AuthContext } from "@/providers/auth-provider";

interface IMessageEditorProps {
  stateEditing: { isEditing: boolean; message: Message | null };
  setStateEditing: (state: {
    isEditing: boolean;
    message: Message | null;
  }) => void;
}

const MessageEditor = ({
  stateEditing,
  setStateEditing,
}: IMessageEditorProps) => {
  const { user } = useContext(AuthContext);
  const params = useParams<{ conversationId: string }>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { isEditing, message } = stateEditing;
  console.log("message editor", message);
  const mutation = useMutation({
    mutationFn: createMessage,
  });
  const emojiPickerRef = useRef(null);

  const CustomStarterKit = StarterKit.extend({
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          const input = editor?.getText({ blockSeparator: "\n" }) || "";
          mutation.mutate({
            conversationId: params.conversationId,
            content: input,
          });
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
    console.log("Submitted message:", input);
    // await createMessage({conversationId: params.conversationId, content: input});
    mutation.mutate({ conversationId: params.conversationId, content: input });
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
    <div className="space-y-2">
      {isEditing && (
        <div className="flex items-center justify-between">
          <div className="flex items-start flex-col">
            <p className="text-base">
              Replying to{" "}
              {message?.author.id === user?.id
                ? "yourself"
                : `${message?.author.username}`}
            </p>
            <p className="text-sm text-foreground/70">{message?.content}</p>
          </div>
          <Button
            variant="ghost"
            className="rounded-full"
            size="iconSm"
            onClick={() => setStateEditing({ isEditing: false, message: null })}
          >
            <X />
          </Button>
        </div>
      )}
      <div className=" flex items-center gap-5">
        <div className="relative flex-1 max-w-[633px]">
          <div className="absolute right-3 top-1.5 flex items-center z-10">
            <Button variant="ghost" size="icon">
              <Link />
            </Button>
            <Button
              variant="ghost"
              size="icon"
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
          <EditorContent editor={editor} />
        </div>
        {editor?.getText({ blockSeparator: "\n" }) === "" ? (
          <Button
            onClick={() => {
              editor?.chain().focus().setEmoji("fire").run();
              onSubmit();
            }}
            variant="ghost"
            size="icon"
            className="p-3 size-12 text-2xl"
          >
            🔥
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            variant="ghost"
            className="bg-primary/10 p-4 size-12"
          >
            <SendHorizontal className="text-primary" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageEditor;
