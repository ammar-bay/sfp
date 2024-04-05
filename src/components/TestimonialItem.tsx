"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

interface TestimonialItemProps {
  imgSrc: string;
  audioSrc: string;
  alt: string;
  isPlaying: number | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  imgSrc,
  alt,
  audioSrc,
  isPlaying,
  setIsPlaying,
  id,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  const handleHover = (value: boolean) => {
    setIsHovering(value);
  };

  const handleAudioEnded = () => {
    setIsPlaying(null);
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (isPlaying === id) {
      currentAudioRef?.play();
    } else {
      currentAudioRef?.pause();
      if (currentAudioRef) currentAudioRef.currentTime = 0; // Reset to start
    }

    return () => {
      currentAudioRef?.pause();
      if (currentAudioRef) currentAudioRef.currentTime = 0; // Reset to start
    };
  }, [isPlaying, id]);

  return (
    <li className="md:flex-1 relative">
      <Image
        alt={alt}
        src={imgSrc}
        className="rounded-lg object-cover h-52 w-full"
        width={300}
        height={200}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      />
      <div
        className="absolute top-0 left-0 h-52 w-full cursor-pointer z-10"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handlePlay}
      >
        {isHovering &&
          (isPlaying === id ? (
            <FaStop className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer" />
          ) : (
            <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer" />
          ))}
        <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnded} />
      </div>
    </li>
  );
};

export default TestimonialItem;
