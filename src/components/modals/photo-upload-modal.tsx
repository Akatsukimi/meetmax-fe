import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "@/app/hooks/useDebounceEffect";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import toast from "react-hot-toast";
import { User } from "@/lib/types";
import useUploadAvatar from "@/app/hooks/useUploadAvatar";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAvatar?: boolean;
  userId: string;
  updateAuthUser: (user: User | null) => void;
}

// This is to demonstrate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function PhotoUploadModal({
  isOpen,
  onClose,
  isAvatar,
  userId,
  updateAuthUser,
}: PhotoUploadModalProps) {
  const [imgSrc, setImgSrc] = useState("");
  const [originalFileName, setOriginalFileName] = useState("avatar.png");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const { mutateAsync: uploadAvatar } = useUploadAvatar();

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const file = e.target.files[0];
      setOriginalFileName(file.name);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  async function handleSave() {
    if (!previewCanvasRef.current) return;

    previewCanvasRef.current.toBlob(
      async (blob) => {
        if (blob) {
          const file = new File([blob], originalFileName, {
            type: "image/png",
          });

          try {
            const updatedUser = await uploadAvatar({ userId, file });
            updateAuthUser(updatedUser);
          } catch (error) {
            toast.error(`Failed to update avatar: ${error}`);
          } finally {
            onClose();
          }
        }
      },
      "image/png",
      1 // High-quality
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-96 max-h-[calc(100vh-200px)] overflow-y-scroll custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Upload new photo</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="flex justify-around">
          <Button className="relative">
            <input
              className="opacity-0 absolute cursor-pointer size-full"
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
            <UploadIcon />
            Upload photo
          </Button>
          <Button variant="outline" onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </Button>
        </div>
        <div className="flex justify-between">
          <div>
            <Label>Scale:</Label>
            <Input
              className="focus-visible:ring-offset-0"
              placeholder="1"
              type="number"
              step={0.1}
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Rotate:</Label>
            <Input
              className="focus-visible:ring-offset-0"
              placeholder="0"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
        </div>
        {imgSrc && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              minWidth={isAvatar ? 60 : 500}
              minHeight={isAvatar ? 60 : 250}
              circularCrop={isAvatar}
            >
              <Image
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                width={isAvatar ? 500 : 1000}
                height={500}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </>
        )}
        {completedCrop && (
          <div className="flex justify-center">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
              className={isAvatar ? "rounded-full" : ""}
            />
          </div>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!completedCrop}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
