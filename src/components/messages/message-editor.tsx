"use client";

import {useState} from "react";
import dynamic from "next/dynamic";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {EditorContent, useEditor} from "@tiptap/react";
import {Link, SendHorizontal, Smile} from "lucide-react";
import Emoji, {gitHubEmojis} from "@tiptap-pro/extension-emoji";

import "./styles.css";
import {Button} from "../ui/button";
import {useParams} from "next/navigation";
import {createMessage} from "@/services/conversations";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {ssr: false});

const MessageEditor = () => {
    const params = useParams<{ conversationId: string }>();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const CustomStarterKit = StarterKit.extend({
        addKeyboardShortcuts() {
            return {
                Enter: ({editor}) => {
                    const input = editor?.getText({blockSeparator: "\n"}) || "";
                    console.log("input message", input);
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
            CustomStarterKit.configure({bold: false, italic: false}),
            Placeholder.configure({placeholder: "Type something here..."}),
            Emoji.configure({emojis: gitHubEmojis, enableEmoticons: true}),
        ],
        autofocus: true,
    });

    const onSubmit = async () => {
        const input = editor?.getText({blockSeparator: "\n"}) || "";
        console.log("Submitted message:", input);
        await createMessage({conversationId: params.conversationId, content: input});
        setShowEmojiPicker(false);
        editor?.commands.clearContent();
    };

    const handleEmojiClick = (event, emojiObject) => {
        editor?.chain().focus().insertContent(event.emoji).run();
    };

    return (
        <div className='relative flex items-center gap-5'>
            <div className='absolute right-20 flex items-center z-10'>
                <Button variant='ghost' size='icon'>
                    <Link/>
                </Button>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <Smile/>
                </Button>
                {showEmojiPicker && (
                    <div className='absolute bottom-full right-0 mb-2'>
                        <EmojiPicker onEmojiClick={handleEmojiClick}/>
                    </div>
                )}
            </div>
            <div className='flex-1 max-w-[633px]'>
                <EditorContent editor={editor}/>
            </div>
            {editor?.getText({blockSeparator: "\n"}) === "" ? (
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
                    <SendHorizontal className='text-primary'/>
                </Button>
            )}
        </div>
    );
};

export default MessageEditor;
