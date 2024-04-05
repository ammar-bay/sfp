"use client";

import UploadDropzone from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import axios from "axios";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

import { Pricing } from "../../../types/collection";

export interface Image {
  imageUrl: string;
  imageName: string;
}

type status = "uploading images" | "checking out" | null;

const Order = () => {
  const [email, setEmail] = useState("");
  const [options, setOptions] = useState<number[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [pricingOptions, setPricingOptions] = useState<Pricing[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<status>(null);

  const { startUpload } = useUploadThing("imageUpload");

  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    }
  };

  useEffect(() => {
    if (options) {
      fetchPricing();
    }
  }, [options]);

  const fetchPricing = async () => {
    try {
      const res = await axios.get("/api/pricing");
      const data = await res.data;
      setPricingOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    if (status) return; // not null

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email.",
        variant: "destructive",
      });
      return;
    }
    setStatus("uploading images");

    const filesWithPrefix = files.map((file) => {
      const newFile = new File([file], `${email}-${file.name}`, {
        type: file.type,
      });
      return newFile;
    });

    const res = await startUpload(filesWithPrefix);

    if (!res) {
      toast({
        title: "Error",
        description: "An error occurred while uploading your images.",
        variant: "destructive",
      });
      setStatus(null);
      return;
    }

    const images = res.map((fileResponse) => ({
      imageUrl: fileResponse?.url,
      imageName: fileResponse?.name,
    }));

    try {
      setStatus("checking out");
      const res = await axios.post("/api/checkout", { email, images, options });
      const data = res.data;
      if (data.url) {
        window.location.href = data.url;
        setEmail("");
        setFiles([]);
        setOptions([]);
        setLoadedImages([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your order.",
        variant: "destructive",
      });
    } finally {
      setStatus(null);
    }
  };

  useEffect(() => {
    setTotalPrice(
      2 *
        files.length *
        pricingOptions
          .filter(
            (option) =>
              options.includes(+option.option) &&
              files.length >= option.min_images &&
              files.length <= option.max_images
          )
          .reduce((acc, option) => acc + option.price, 0)
    );
  }, [files, options, pricingOptions]);

  const handleImageDelete = async (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <main
      className="mx-auto max-w-7xl md:p-10 flex flex-col items-center justify-center w-4/5 md:w-3/5 lg:w-3/6 pt-5"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <div className="w-full flex items-start justify-center flex-col">
        <label className="text-gray-900 text-start text-lg font-medium">
          Email
        </label>
        <Input
          className={cn("w-full h-12")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="w-full mt-4 ">
        <label className="text-gray-900 text-start text-lg font-medium">
          Images
        </label>
        <UploadDropzone setFiles={setFiles} />
      </div>

      <div className="w-full mt-4 flex gap-2">
        {files.map((file, index) => (
          <div className="relative h-20 w-20" key={index}>
            <Image
              alt={""}
              src={URL.createObjectURL(file)}
              className="rounded-lg object-cover"
              fill
              onLoad={() => handleImageLoad(index)}
            />
            {loadedImages.includes(index) && (
              <div
                className="absolute top-[-5px] right-[-5px] cursor-pointer bg-white rounded-full p-px"
                onClick={() => handleImageDelete(index)}
              >
                <FaTimes className="text-red-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full mt-4 ">
        <label className="text-gray-900 text-start text-lg font-medium">
          Options
        </label>
        <TooltipProvider>
          <div className="flex gap-5 mt-4">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                onClick={() =>
                  options.includes(1)
                    ? setOptions(options.filter((option) => option !== 1))
                    : setOptions([...options, 1])
                }
                checked={options.includes(1)}
              />
              <div className="gap-1.5 leading-none flex">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Option 1
                </label>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger className="cursor-default ml-1.5">
                    <HelpCircle className="h-4 w-4 text-zinc-500" />
                  </TooltipTrigger>
                  <TooltipContent className="w-80 p-2">
                    Loren ipsum dolor sit amet, consectetur adipiscing elit.
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                onClick={() =>
                  options.includes(2)
                    ? setOptions(options.filter((option) => option !== 2))
                    : setOptions([...options, 2])
                }
                checked={options.includes(2)}
              />
              <div className="gap-1.5 leading-none flex">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Option 2
                </label>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger className="cursor-default ml-1.5">
                    <HelpCircle className="h-4 w-4 text-zinc-500" />
                  </TooltipTrigger>
                  <TooltipContent className="w-80 p-2">
                    Loren ipsum dolor sit amet, consectetur adipiscing elit.
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
      {/* {images.length > 0 && options.length > 0 && (
        <> */}
      <div className="w-full mt-4 border-b border-gray-500 pb-5 flex flex-col gap-2">
        <label className="text-gray-900 text-start text-lg font-medium">
          Order Summary
        </label>
        {options.map((option, index) => (
          <p
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            key={index}
          >
            2 option {option + " "}
            <span className="font-semibold">X {files.length + " images"}</span>
          </p>
        ))}
      </div>

      <div className="w-full mt-4 border-b flex justify-between">
        <label className="text-gray-900 text-start text-lg font-medium">
          <span className="font-semibold">Total:</span>{" "}
          {2 * options.length * files.length} items
        </label>
        <p className="font-semibold text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          ${totalPrice}
        </p>
      </div>
      <Button
        className="mt-4 capitalize"
        onClick={handleCheckout}
        variant="default"
        size="lg"
        disabled={status !== null || files.length === 0 || options.length === 0}
      >
        {status ? status : "Checkout"}
      </Button>
    </main>
  );
};

export default Order;
