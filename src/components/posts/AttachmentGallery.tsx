import { Attachment } from "@/lib/types";
import Image from "next/image";

interface AttachmentGalleryProps {
  attachments: Attachment[];
}

const AttachmentGallery = ({ attachments }: AttachmentGalleryProps) => {
  if (!attachments || attachments.length === 0) return null;

  if (attachments.length === 1) {
    return (
      <div className="">
        <Image
          src={attachments[0].url}
          alt="Single attachment"
          width={476}
          height={268}
          className="aspect-[476/268] object-cover w-full rounded-md"
          unoptimized
        />
      </div>
    );
  } else if (attachments.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {attachments.map((attachment, index) => (
          <div key={index} className="">
            <Image
              src={attachment.url}
              alt={`Attachment preview ${index + 1}`}
              width={476}
              height={268}
              className={`aspect-[238/268] object-cover w-full ${
                index === 0 ? "rounded-l-md" : "rounded-r-md"
              }`}
              unoptimized
            />
          </div>
        ))}
      </div>
    );
  } else if (attachments.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-1">
        <div className="">
          <Image
            src={attachments[0].url}
            alt="Attachment preview"
            width={476}
            height={268}
            className="aspect-[476/268] object-cover w-full"
            unoptimized
          />
        </div>

        <div className="grid grid-cols-2 gap-1">
          {attachments.slice(1, 3).map((attachment, index) => (
            <div key={index} className="">
              <Image
                src={attachment.url}
                alt={`Attachment preview ${index + 2}`}
                width={476}
                height={268}
                className="aspect-[238/268] object-cover w-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="">
        <Image
          src={attachments[0].url}
          alt="Attachment preview"
          width={476}
          height={268}
          className="aspect-[476/268] object-cover w-full rounded-t-md"
          unoptimized
        />
      </div>

      <div className="grid grid-cols-3 gap-1">
        {attachments.slice(1, 4).map((attachment, index) => (
          <div key={index} className="relative">
            <Image
              src={attachment.url}
              alt={`Attachment preview ${index + 2}`}
              width={476}
              height={268}
              className="aspect-[238/268] object-cover rounded-b-md"
              unoptimized
            />
            {/* Overlay for the last image if there are more than 4 */}
            {attachments.length > 4 && index === 2 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <span className="text-white font-bold text-lg">
                  +{attachments.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentGallery;
