import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaymentSuccess from "@/components/PaymentSuccess";
import Testimonials from "@/components/Testimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Get <span className="text-indigo-600">Song</span> for your{" "}
          <span className="text-indigo-600">Photos</span> in seconds
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
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              How it Works
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
              <span className="text-sm font-medium text-indigo-600">
                Step 1
              </span>
              <span className="text-xl font-semibold">Upload photo</span>
              <span className="mt-2 text-zinc-700">
                Upload multiple photos at once. We support JPEG, PNG, and JPG
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-indigo-600">
                Step 2
              </span>
              <span className="text-xl font-semibold">Checkout</span>
              <span className="mt-2 text-zinc-700">
                Choose the best plan for you and checkout. We accept all major
                credit cards.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-indigo-600">
                Step 3
              </span>
              <span className="text-xl font-semibold">Get your song</span>
              <span className="mt-2 text-zinc-700">
                Get your song on your email.
              </span>
            </div>
          </li>
        </ol>
      </div>

      {/* Testimonials */}
      <Testimonials />

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
      <PaymentSuccess />
    </>
  );
}

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
