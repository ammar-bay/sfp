import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import TestimonialItem from "@/components/TestimonialItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            songsforphoto is now public!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Get <span className="text-blue-600">Song</span> for your{" "}
          <span className="text-blue-600">Photos</span> in seconds
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Upload your photo and get a song recommendation in seconds. No
          registration required.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/order"
          // target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Start getting songs for your photos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Upload your photo and get a song recommendation in seconds. No
              registration required.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">Upload photo</span>
              <span className="mt-2 text-zinc-700">
                Upload multiple photos at once. We support JPEG, PNG, and JPG
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">Checkout</span>
              <span className="mt-2 text-zinc-700">
                Choose the best plan for you and checkout. We accept all major
                credit cards.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">Get your song</span>
              <span className="mt-2 text-zinc-700">
                Get your song on your email.
              </span>
            </div>
          </li>
        </ol>
      </div>

      {/* Testimonials */}
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
            />
          ))}
        </ol>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/order"
          // target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* FAQs */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56 flex flex-col items-center justify-center">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full md:w-4/5 md:cursor-pointer p-10 md:p-0"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger
                style={{
                  textAlign: "start",
                }}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer} </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

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

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];
