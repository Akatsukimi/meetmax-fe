"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import "./styleTipTap.css";
import toast from "react-hot-toast";
import { createPost } from "@/services/posts";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUp, SmileIcon, Video } from "lucide-react";

const PostEditor = () => {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState("public");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your post here...",
      }),
    ],
    content: ``,
    immediatelyRender: false,
  });

  const handlePost = async () => {
    try {
      const content = editor?.getText() ?? "";
      await createPost({ content, visibility });

      editor?.commands.clearContent();
      toast.success("Post created successfully");
      setOpen(false);
    } catch (error) {
      toast.error(`Create post failed: ${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger: Initial Input Box */}
      <DialogTrigger asChild>
        <div className="flex items-center p-4 bg-white border-gray-300 rounded-lg cursor-pointer">
          <Image
            src={avatar}
            alt="avatar"
            className="rounded-full mr-3"
            width={40}
            height={40}
          />
          <Input
            type="text"
            placeholder="What's happening?"
            readOnly
            className="flex-grow bg-secondary border-none outline-none cursor-pointer"
          />
        </div>
      </DialogTrigger>

      {/* Dialog Content: Create Post Modal */}
      <DialogContent className="max-w-lg w-full p-6 rounded-lg bg-white">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-secondary-foreground/70">
            Create a post
          </DialogTitle>

          <div className="!-mt-2.5 mr-10">
            <Select onValueChange={setVisibility}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Visible for" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visible for</SelectLabel>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="onlyMe">Only me</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>

        {/* Tiptap Editor */}
        <div className="bg-secondary rounded-lg p-3 min-h-[300px] max-h-[calc(100vh-400px)] overflow-y-scroll">
          <EditorContent editor={editor} className="h-full max-w-full" />
        </div>

        {/* Post Options */}
        <div className="flex justify-around mt-2 mb-4">
          <Button className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold">
            <Video />
            <span>Live Video</span>
          </Button>
          <Button className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold">
            <ImageUp />
            <span>Photo/Video</span>
          </Button>
          <Button className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold">
            <SmileIcon />
            <span>Feeling</span>
          </Button>
        </div>

        {/* Create post */}
        <Button
          onClick={handlePost}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
        >
          Post
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditor;
