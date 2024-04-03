"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

interface TestimonialItemProps {
  imgSrc: string;
  audioSrc: string;
  alt: string;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  imgSrc,
  alt,
  audioSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  const handleHover = (value: boolean) => {
    setIsHovering(value);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

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
          (isPlaying ? (
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
