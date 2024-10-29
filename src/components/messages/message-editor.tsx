"use client";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { Link, SendHorizontal, Smile } from "lucide-react";

import "./styles.css";
import { Button } from "../ui/button";

const MessageEditor = () => {
  const CustomStarterKit = StarterKit.extend({
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          const input =
            editor?.getText({
              blockSeparator: "\n",
            }) || "";
          console.log("input message", input);
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
      Placeholder.configure({
        placeholder: "Type something here...",
      }),
    ],
    autofocus: true,
  });

  const onSubmit = async () => {
    const input =
      editor?.getText({
        blockSeparator: "\n",
      }) || "";
    console.log("input message", input);
    editor?.commands.clearContent();
  };

  return (
    <div className='relative flex items-center gap-5'>
      <div className='absolute right-20 flex items-center z-10'>
        <Button variant='ghost' size='icon'>
          <Link />
        </Button>
        <Button variant='ghost' size='icon'>
          <Smile />
        </Button>
      </div>
      <div className='flex-1 max-w-[633px]'>
        <EditorContent editor={editor} />
      </div>
      <Button
        onClick={onSubmit}
        variant='ghost'
        className='bg-primary/10 p-4 size-12'
      >
        <SendHorizontal className='text-primary' />
      </Button>
    </div>
  );
};

export default MessageEditor;
