"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import TestimonialItem from "./TestimonialItem";
import { buttonVariants } from "./ui/button";

const Testimonials = () => {
  const [isPlaying, setIsPlaying] = useState<null | number>(null);

  return (
    <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56 flex flex-col items-center justify-center">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
            Testimonials
          </h2>
        </div>
      </div>
      <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 p-10 md:p-0">
        {testimonials.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            imgSrc={testimonial.imgSrc}
            audioSrc={testimonial.audioSrc}
            alt={testimonial.alt}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            id={index}
          />
        ))}
      </ol>

      <Link
        className={buttonVariants({
          size: "lg",
          className: "mt-5",
        })}
        href="/order"
      >
        Get started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default Testimonials;

const testimonials = [
  {
    imgSrc: "/testimonials-1.avif",
    audioSrc: "/testimonials.wav",
    alt: "Testimonial 1",
  },
  {
    imgSrc: "/testimonials-2.avif",
    audioSrc: "/testimonials.wav",
    alt: "Testimonial 2",
  },
  {
    imgSrc: "/testimonials-3.avif",
    audioSrc: "/testimonials.wav",
    alt: "Testimonial 3",
  },
  {
    imgSrc: "/testimonials-4.avif",
    audioSrc: "/testimonials.wav",
    alt: "Testimonial 4",
  },
];
