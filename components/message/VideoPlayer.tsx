"use client";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";


// Create a small wrapper component for video attachments
export default function VideoPlayer({ url }: { url: string }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setKey(prev => prev + 1);
      }
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <ReactPlayer
      key={key}
      src={url}
      controls
      width="100%"
      height="100%"
      className="react-player"
    />
  );
}