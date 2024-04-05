import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";
import {
  generateOrderConfirmationHTML,
  generateOrderDetailsHTML,
  getTextFromImage,
  sendEmail,
  updateOrderPaymentStatus,
} from "@/lib/utils-server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { Images } from "../../../../../types/collection";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event.data.object.client_reference_id;

    // Update the order in your database to mark it as paid.
    if (orderId) {
      processWebhookTasks(orderId);
    }
  }

  return new Response(null, { status: 200 });
}

async function processWebhookTasks(orderId: string) {
  const order = await updateOrderPaymentStatus(orderId);
  if (order) {
    await sendEmail({
      recipient_email: order.user_email,
      subject: "Order Confirmation",
      html: generateOrderConfirmationHTML(
        order?.order_number,
        order?.created_at || "",
        order?.total_items || 0,
        order?.total_price || 0,
        order?.user_email || ""
      ),
    });

    const { data: imagesData, error } = await supabase
      .from("images")
      .select("*")
      .eq("order_number", order.order_number)
      .returns<Images[]>();

    if (error) {
      console.error("Error fetching images:", error);
    }

    if (imagesData) {
      const requests = imagesData.map((imageData) =>
        getTextFromImage(imageData)
      );
      const responses = await Promise.all(requests);
      const updatePromises = responses.map(async (response) => {
        await supabase
          .from("images")
          .update({ image_text: response.image_text })
          .eq("image_id", response.image_id);
      });

      await Promise.all(updatePromises);
      await sendEmail({
        recipient_email: process.env.ADMIN_EMAIL || "",
        subject: "New Order",
        html: generateOrderDetailsHTML(order, responses),
      });
    }
  }
}
