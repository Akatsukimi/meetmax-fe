"use client";

import Image from "next/image";
import avatar from "@/assets/avatar.png";
import banner from "@/assets/cover-photo.png";
import { Button } from "@/components/ui/button";
import { CloudUpload, ImageIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import PhotoUploadModal from "@/components/modals/photo-upload-modal";
import { useAuth } from "@/providers/auth-provider";

export default function ProfileHeader() {
  const { user, updateAuthUser } = useAuth();
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [coverPhotoModalOpen, setCoverPhotoModalOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="rounded-md shadow pb-7.5">
      <div className="relative">
        <Image
          src={banner}
          alt="Cover Photo"
          width={1232}
          height={350}
          className="aspect-auto object-cover rounded-md"
          priority
        />
        <Button
          variant="outline"
          className="absolute right-4 bottom-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setCoverPhotoModalOpen(true)}
        >
          <CloudUpload />
          Edit Cover Photo
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <div className="absolute -bottom-16 left-6 rounded-full border-2 border-background cursor-pointer">
              <Image
                src={user?.avatar || avatar}
                alt="Avatar"
                width={104}
                height={104}
                className="object-cover aspect-[1/1] rounded-full shadow"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit py-1 px-2">
            <div className="flex items-center gap-3.5 p-3 hover:bg-gray-100 cursor-pointer rounded-sm">
              <ImageIcon size={20} />
              <span>See profile picture</span>
            </div>
            <div
              className="flex items-center gap-3.5 p-3 hover:bg-gray-100 cursor-pointer rounded-sm"
              onClick={() => setAvatarModalOpen(true)}
            >
              <CloudUpload size={20} />
              <span>Upload new picture</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-between mt-[75px] px-7.5">
        <div>
          <h1 className="text-2xl font-bold">Saleh Ahmed</h1>
          <p className="text-muted-foreground">UI Designer</p>
        </div>
        <Button variant="outline">Edit basic info</Button>
      </div>

      {avatarModalOpen && (
        <PhotoUploadModal
          isOpen={avatarModalOpen}
          onClose={() => setAvatarModalOpen(false)}
          isAvatar
          userId={user.id}
          updateAuthUser={updateAuthUser}
        />
      )}

      {coverPhotoModalOpen && (
        <PhotoUploadModal
          isOpen={coverPhotoModalOpen}
          onClose={() => setCoverPhotoModalOpen(false)}
          userId={user.id}
          updateAuthUser={updateAuthUser}
        />
      )}
    </div>
  );
}
