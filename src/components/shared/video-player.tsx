"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  classNames?: {
    container?: string;
    video?: string;
  };
  sources?: VideoSource[];
}

export default function VideoPlayer({
  classNames,
  className,
  sources,
  ...props
}: VideoPlayerProps): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        void videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div className={classNames?.container} ref={ref}>
      <video
        aria-label="Video"
        className={cn(classNames?.video, className)}
        ref={videoRef}
        {...props}
      >
        {sources?.map((source, index) => (
          // eslint-disable-next-line react/no-array-index-key -- no need to persist
          <source key={index} src={source.src} type={source.type} />
        ))}
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
