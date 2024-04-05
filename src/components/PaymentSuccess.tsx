"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "./ui/use-toast";

const PaymentSuccess = () => {
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
      router.push("/");
    } else if (payment === "failed") {
      toast({
        title: "Payment failed!",
        description: "Your order could not be placed.",
        variant: "destructive",
      });
      router.push("/");
    }
  }, [payment, router]);
  return <div></div>;
};

export default PaymentSuccess;
