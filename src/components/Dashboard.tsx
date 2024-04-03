"use client";

import { cn } from "@/lib/utils";
import UploadDropzone from "./UploadZone";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const Dashboard = () => {
  const handleCheckout = async () => {};

  return (
    <main className="mx-auto max-w-7xl md:p-10 flex flex-col items-center justify-center">
      <div className="w-3/6 flex items-start justify-center flex-col">
        <label className="text-gray-900 text-start text-lg font-medium">
          Email
        </label>

        <Input
          className={cn("w-full h-12")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // handleSubmit(handlePageSubmit)();
            }
          }}
          placeholder="Email"
        />
      </div>
      <div className="w-3/6 mt-4 ">
        <label className="text-gray-900 text-start text-lg font-medium">
          Images
        </label>
        <UploadDropzone isSubscribed={true} />
      </div>

      <div className="w-3/6 mt-4 ">
        <label className="text-gray-900 text-start text-lg font-medium">
          Options
        </label>
        <div className="flex justify-between mt-4">
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
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
            <Checkbox id="terms1" />
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
      <div className="w-3/6 mt-4 border-b border-gray-500 pb-5 flex flex-col gap-2">
        <label className="text-gray-900 text-start text-lg font-medium">
          Order Summary
        </label>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          2 option 1{" "}
          <span className="font-semibold">X no-of-uploaded-images</span>
        </p>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          2 option 1{" "}
          <span className="font-semibold">X no-of-uploaded-images</span>
        </p>
      </div>

      <div className="w-3/6 mt-4 border-b flex justify-between">
        <label className="text-gray-900 text-start text-lg font-medium">
          <span className="font-semibold">Total:</span> XX items
        </label>
        <p className="font-semibold text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          $100
        </p>
      </div>
    </main>
  );
};

export default Dashboard;
