import nodemailer from "nodemailer";
import { openai } from "./openai";
import { MailOptions } from "nodemailer/lib/json-transport";
import { Images, Orders, Pricing } from "../../types/collection";
import supabase from "./supabase";
import { Image } from "@/app/api/checkout/route";

export async function sendEmail({
  recipient_email,
  subject,
  html,
}: {
  recipient_email: string;
  subject: string;
  html: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465, // or 587 for TLS/STARTTLS
      secure: process.env.EMAIL_PORT === "465" ? true : false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER!,
      to: recipient_email,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId, recipient_email);
  } catch (error) {
    console.error("Error occurred while sending the email:", error);
  }
}

export async function getTextFromImage(imageData: Images) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: imageData.image_url as any,
          },
        ],
      },
    ],
  });
  return {
    ...imageData,
    image_text: response.choices[0].message.content,
  };
}

export const updateOrderPaymentStatus = async (
  orderId: string
): Promise<Orders | void> => {
  const { data: order, error } = await supabase
    .from("orders")
    .update({ payment_status: "paid" })
    .match({ order_number: orderId })
    .select()
    .returns<Orders[]>();

  if (error) {
    console.error(error);
  } else {
    return order[0];
  }
};

export function generateOrderDetailsHTML(
  order: Orders,
  images: Images[]
): string {
  let html = `
      <h2>Order Details</h2>
      <table border="1">
          <tr>
              <th>Order Number</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Total Price</th>
              <th>User Email</th>
          </tr>
          <tr>
              <td>${order.order_number}</td>
              <td>${order.order_status}</td>
              <td>${order.payment_status}</td>
              <td>${order.total_price}</td>
              <td>${order.user_email}</td>
          </tr>
      </table>
      <h2>Images</h2>
      <table border="1">
          <tr>
              <th>Image ID</th>
              <th>Image Name</th>
              <th>Image Text</th>
              <th>Image URL</th>
          </tr>
  `;

  images.forEach((image) => {
    html += `
          <tr>
              <td>${image.image_id}</td>
              <td>${image.image_name || ""}</td>
              <td>${image.image_text || ""}</td>
              <td>${image.image_url || ""}</td>
          </tr>
      `;
  });

  html += `</table>`;

  return html;
}

export const calculateTotalPrice = (
  options: number[],
  pricingOptions: Pricing[],
  images: Image[]
) => {
  return (
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
};

export function generateOrderConfirmationHTML(
  orderNumber: number,
  orderDate: string,
  totalSongs: number,
  totalPayment: number,
  customerEmailAddress?: string
): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
              color: #333;
              text-align: center;
          }
          p {
              color: #555;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
          }
          .order-details {
              border-top: 2px solid #ccc;
              padding-top: 20px;
              margin-top: 20px;
          }
          .order-details table {
              width: 100%;
          }
          .order-details table td {
              padding: 8px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Order Confirmation</h1>
          <p>Thank you for placing your order with SongsForPhoto.</p>
          
          <div class="order-details">
              <p><strong>Here’s a summary of your order details for your reference:</strong></p>
              <table>
                  <tr>
                      <td>Order Number:</td>
                      <td>${orderNumber}</td>
                  </tr>
                  <tr>
                      <td>Order Date:</td>
                      <td>${new Date(orderDate).toLocaleString()}</td>
                  </tr>
                  <tr>
                      <td>Total Songs:</td>
                      <td>${totalSongs}</td>
                  </tr>
                  <tr>
                      <td>Order Total:</td>
                      <td>${totalPayment}</td>
                  </tr>
              </table>
          </div>

          <p><strong>What’s Next?</strong></p>
          <p>Our team is now working on creating your unique songs, which involves a detailed AI-powered process to ensure the music perfectly complements your photo(s). Once your songs are ready, we’ll send them directly to your email (${customerEmailAddress}).</p>
          <p>We aim to have all songs delivered within 24 hours (but usually much faster) from the order date.</p>
          
          <p>Should you have any questions, you can directly reply to this email.</p>

          <p>Thank you.</p>
          
          <p><strong>SongsForPhoto</strong><br>
          <a href="http://www.songsforphoto.com">www.songsforphoto.com</a></p>
      </div>
  </body>
  </html>
  `;
}
