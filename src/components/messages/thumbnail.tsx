/* eslint-disable @next/next/no-img-element */

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Attachment } from '@/lib/types';

interface ThumbnailProps {
  attachment: Attachment;
}

const Thumbnail = ({ attachment }: ThumbnailProps) => {
  if (!attachment) return null;

  return (
    <Dialog>
      <div className="relative overflow-hidden max-w-[400px]">
        <DialogTrigger>
          <Image
            src={attachment.url}
            alt={attachment.name || 'Attachment'}
            width={400}
            height={400}
            className="aspect-[1/1] object-cover rounded-sm"
          />
        </DialogTrigger>
      </div>
      <DialogContent className="h-full min-w-fit border-none bg-transparent py-10 shadow-none flex justify-center items-center">
        <img
          src={attachment.url}
          alt="Message image"
          className="rounded-md object-contain max-h-full max-w-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
