import { Attachment } from "@/lib/types";
import Image from "next/image";
import VideoPlayer from "@/components/shared/video-player";

interface AttachmentGalleryProps {
  attachments: Attachment[];
}

const AttachmentGallery = ({ attachments }: AttachmentGalleryProps) => {
  if (attachments.length === 1) {
    if (attachments[0].mimetype.startsWith("video")) {
      return (
        <VideoPlayer
          sources={[
            {
              src: attachments[0].url,
              type: attachments[0].mimetype,
            },
          ]}
          className="aspect-[476/268] object-cover w-full"
          controls
        />
      );
    }

    return (
      <div className="">
        <Image
          src={attachments[0].url}
          alt="Single attachment"
          width={476}
          height={268}
          className="aspect-[476/268] object-cover w-full"
          unoptimized
        />
      </div>
    );
  }

  if (attachments.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {attachments.map((attachment, index) => {
          if (attachment.mimetype.startsWith("video")) {
            return (
              <VideoPlayer
                key={index}
                sources={[
                  {
                    src: attachment.url,
                    type: attachment.mimetype,
                  },
                ]}
                className="aspect-[238/268] object-cover w-full"
                controls
              />
            );
          }

          return (
            <div key={index} className="">
              <Image
                src={attachment.url}
                alt={`Attachment preview ${index + 1}`}
                width={476}
                height={268}
                className="aspect-[238/268] object-cover w-full"
                unoptimized
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (attachments.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-1">
        {attachments[0].mimetype.startsWith("video") ? (
          <VideoPlayer
            sources={[
              {
                src: attachments[0].url,
                type: attachments[0].mimetype,
              },
            ]}
            className="aspect-[476/268] object-cover w-full"
            controls
          />
        ) : (
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
        )}

        <div className="grid grid-cols-2 gap-1">
          {attachments.slice(1, 3).map((attachment, index) => {
            if (attachment.mimetype.startsWith("video")) {
              return (
                <VideoPlayer
                  key={index}
                  sources={[
                    {
                      src: attachment.url,
                      type: attachment.mimetype,
                    },
                  ]}
                  className="aspect-[238/268] object-cover w-full"
                  controls
                />
              );
            }

            return (
              <div key={index} className="">
                <Image
                  src={attachment.url}
                  alt={`Attachment preview ${index + 2}`}
                  width={476}
                  height={268}
                  className="aspect-[238/268] object-cover w-full"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {attachments[0].mimetype.startsWith("video") ? (
        <VideoPlayer
          sources={[
            {
              src: attachments[0].url,
              type: attachments[0].mimetype,
            },
          ]}
          className="aspect-[476/268] object-cover w-full"
          controls
        />
      ) : (
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
      )}

      <div className="grid grid-cols-3 gap-1">
        {attachments.slice(1, 4).map((attachment, index) => (
          <div key={index} className="relative">
            {attachment.mimetype.startsWith("video") ? (
              <VideoPlayer
                sources={[
                  {
                    src: attachment.url,
                    type: attachment.mimetype,
                  },
                ]}
                className="aspect-[238/268] object-cover w-full"
                controls
              />
            ) : (
              <div className="">
                <Image
                  src={attachment.url}
                  alt={`Attachment preview ${index + 2}`}
                  width={476}
                  height={268}
                  className="aspect-[238/268] object-cover w-full"
                  unoptimized
                />
              </div>
            )}

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
