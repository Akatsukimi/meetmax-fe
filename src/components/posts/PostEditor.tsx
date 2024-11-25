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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, ImageUp, Loader, SmileIcon, Video, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Attachment } from "@/lib/types";
import { uploadFile } from "@/services/upload";
import { FileType, Visibility } from "@/lib/enum";
import useCreatePost from "@/app/hooks/useCreatePost";
import AttachmentGallery from "./AttachmentGallery";
import { useAuth } from "@/providers/auth-provider";

const PostEditor = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<Visibility>();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loadingAttachments, setLoadingAttachments] = useState(false);
  const createPostMutation = useCreatePost();

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
    if (editor?.isEmpty && attachments.length === 0) {
      toast.error("Post must have content or attachments");
      return;
    }

    const content = editor?.getHTML();
    const attachmentIds = attachments.map((attachment) => attachment.id);
    await createPostMutation.mutateAsync({
      content,
      visibility,
      attachmentIds,
    });

    setOpen(false);
    editor?.commands.clearContent();
    setAttachments([]);
  };

  // Handle dropped files and convert them to URLs
  const handleDrop = async (acceptedFiles: File[]): Promise<void> => {
    setShowUpload(false);
    setLoadingAttachments(true);

    try {
      const newFiles = await uploadFile({
        files: acceptedFiles,
        type: FileType.POST,
      });
      setAttachments((prev) => [...prev, ...newFiles]);
    } catch (error) {
      toast.error(`File upload failed: ${error}`);
      return;
    } finally {
      setLoadingAttachments(false);
    }
  };

  // Clear all attachments
  const removeAttachments = (): void => {
    setAttachments([]);
    setShowUpload(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected(fileRejections) {
      const errors = fileRejections.map(({ file, errors }) => {
        return `${file.name} - ${errors.map((e) => e.message).join(", ")}`;
      });
      toast.error(`File upload failed: ${errors.join(", ")}`);
    },
    multiple: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger: Initial Input Box */}
      <DialogTrigger asChild>
        <div className="flex items-center p-4 bg-white border-gray-300 rounded-lg cursor-pointer">
          <Image
            src={user?.avatar || avatar}
            alt="avatar"
            className="rounded-full mr-3 aspect-[1/1]"
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
      <DialogContent
        aria-describedby="create-post-modal"
        className="max-w-2xl w-full p-6 rounded-lg bg-white max-h-[calc(100vh-150px)] overflow-y-scroll"
      >
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-secondary-foreground/70">
            Create a post
          </DialogTitle>

          <div className="!-mt-2.5 mr-10">
            <Select
              value={visibility}
              onValueChange={(value) => setVisibility(value as Visibility)}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Visible for" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="onlyMe">Only me</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>

        {/* Tiptap Editor */}
        <div className="bg-secondary rounded-lg p-3 min-h-[150px] max-h-[calc(100vh-600px)] overflow-y-scroll">
          <EditorContent editor={editor} className="h-full max-w-full" />
        </div>

        {/* Upload Component with react-dropzone */}
        {showUpload && (
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg mt-3 ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-500 text-center">
              {isDragActive
                ? "Drop files here..."
                : "Drag & drop some files here, or click to select files"}
            </p>
          </div>
        )}

        {loadingAttachments && (
          <div className="flex justify-center mt-4">
            <Loader className="animate-spin" size={32} />
          </div>
        )}

        {!loadingAttachments && attachments.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 -top-1 z-10 flex gap-3">
              <Button className="bg-secondary hover:bg-secondary text-secondary-foreground flex items-center gap-1">
                <Edit />
                <span>Edit All</span>
              </Button>
              <Button
                className="bg-secondary hover:bg-secondary text-secondary-foreground flex items-center gap-1"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <ImageUp />
                <span>Add More</span>
              </Button>
            </div>

            <div className="">
              <AttachmentGallery attachments={attachments} />
            </div>

            <Button
              onClick={removeAttachments}
              className="absolute -top-1 right-0 rounded-full text-secondary-foreground bg-slate-500 hover:bg-slate-600 h-8 w-8 flex items-center justify-center"
              variant="outline"
              size="icon"
            >
              <X />
            </Button>
          </div>
        )}

        <div className="flex justify-around mt-2 mb-4">
          <Button className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold">
            <Video />
            <span>Live Video</span>
          </Button>
          <Button
            onClick={() => setShowUpload(true)}
            disabled={attachments.length > 0}
            className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold"
          >
            <ImageUp />
            <span>Photo/Video</span>
          </Button>
          <Button className="flex items-center space-x-1 bg-transparent hover:bg-secondary text-[#4E5D78] font-semibold">
            <SmileIcon />
            <span>Feeling</span>
          </Button>
        </div>

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
