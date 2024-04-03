import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Orders, Pricing } from "../../../../types/collection";
import { calculateTotalPrice } from "@/lib/utils-server";

export interface Image {
  imageUrl: string;
  imageName: string;
}

interface RequestBody {
  email: string;
  options: number[];
  images: Image[];
}

export async function POST(request: Request) {
  if (request.method === "POST") {
    const req = await request.json();
    const { email, options, images }: RequestBody = req;
    try {
      const { data: pricingOptions, error } = await supabase
        .from("pricing")
        .select("*")
        .returns<Pricing[]>();

      if (error || !pricingOptions) {
        return NextResponse.json({ error: "Error occured" }, { status: 500 });
      }

      const total_price = calculateTotalPrice(options, pricingOptions, images);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_email: email,
          price_options: options,
          total_price,
        })
        .select()
        .returns<Orders[]>();

      if (orderError || !orderData) {
        return NextResponse.json({ error: "Error occured" }, { status: 500 });
      }

      const orderNumber = orderData[0].order_number;

      const imageData = images.map((image: Image) => ({
        order_number: orderNumber,
        image_url: image.imageUrl,
        image_name: image.imageName,
      }));

      const { error: imageError } = await supabase
        .from("images")
        .insert(imageData);

      const session = await stripe.checkout.sessions.create({
        client_reference_id: orderNumber.toString(),
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "SongforPhoto",
              },
              unit_amount: total_price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order?payment=failed`,
      });

      if (imageError) {
        return NextResponse.json({ error: "Error occured" }, { status: 500 });
      }

      return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error occured" }, { status: 500 });
    }
  } else {
    return NextResponse.json("Method not allowed", { status: 405 });
  }
}
