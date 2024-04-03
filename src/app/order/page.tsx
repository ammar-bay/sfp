"use client";

import { cn } from "@/lib/utils";
import UploadDropzone from "@/components/UploadZone";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Pricing } from "../../../types/collection";

export interface Image {
  imageUrl: string;
  imageName: string;
}

const Order = () => {
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<Image[]>([
    // {
    //   imageUrl: "https://via.placeholder.com/150",
    //   imageName: "Image 1",
    // },
  ]);
  const [options, setOptions] = useState<number[]>([1]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [pricingOptions, setPricingOptions] = useState<Pricing[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    }
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const payment = searchParams.get("payment");

  useEffect(() => {
    if (payment === "success") {
      toast({
        title: "Payment successful!",
        description: "Your order has been successfully placed.",
        variant: "default",
      });
      router.push("/order");
    } else if (payment === "failed") {
      toast({
        title: "Payment failed!",
        description: "Your order could not be placed.",
        variant: "destructive",
      });
      router.push("/order");
    }
  }, [payment, router]);

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
    if (loading) return;

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

    try {
      setLoading(true);
      const res = await axios.post("/api/checkout", { email, images, options });
      const data = res.data;
      if (data.url) {
        window.location.href = data.url;
        setEmail("");
        setImages([]);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalPrice(
      2 *
        images.length *
        pricingOptions
          .filter(
            (option) =>
              options.includes(+option.option) &&
              images.length >= option.min_images &&
              images.length <= option.max_images
          )
          .reduce((acc, option) => acc + option.price, 0)
    );
  }, [images, options, pricingOptions]);

  return (
    <main className="mx-auto max-w-7xl md:p-10 flex flex-col items-center justify-center w-4/5 md:w-3/5 lg:w-3/6 pt-5">
      <div className="w-full flex items-start justify-center flex-col">
        {/* <label className="text-gray-900 text-start text-lg font-medium">
          Email
        </label> */}
        <Input
          className={cn("w-full h-12")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="w-full mt-4 ">
        {/* <label className="text-gray-900 text-start text-lg font-medium">
          Images
        </label> */}
        <UploadDropzone setImages={setImages} />
      </div>

      <div className="w-full mt-4 flex gap-2">
        {images.map((image, index) => (
          <div className="relative h-20 w-20" key={index}>
            <Image
              alt={image.imageName}
              src={image.imageUrl}
              className="rounded-lg object-cover"
              fill
              onLoad={() => handleImageLoad(index)}
            />
            {loadedImages.includes(index) && (
              <div
                className="absolute top-[-5px] right-[-5px] cursor-pointer bg-white rounded-full p-px"
                onClick={() => {
                  setImages((prevImages) =>
                    prevImages.filter((_, i) => i !== index)
                  );
                }}
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
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Option 1
              </label>
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
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Option 2
              </label>
            </div>
          </div>
        </div>
      </div>
      {images.length > 0 && options.length > 0 && (
        <>
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
                <span className="font-semibold">
                  X {images.length + " images"}
                </span>
              </p>
            ))}
          </div>

          <div className="w-full mt-4 border-b flex justify-between">
            <label className="text-gray-900 text-start text-lg font-medium">
              <span className="font-semibold">Total:</span>{" "}
              {2 * options.length * images.length} items
            </label>
            <p className="font-semibold text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ${totalPrice}
            </p>
          </div>
          <Button
            className="mt-4"
            onClick={handleCheckout}
            variant="default"
            size="lg"
          >
            {loading ? "Processing..." : "Checkout"}
          </Button>
        </>
      )}
    </main>
  );
};

export default Order;
