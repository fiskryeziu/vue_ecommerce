import type { Request, Response } from "express";
import Stripe from "stripe";
import { queryCreateOrder } from "../db/orders.queries";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
export const stripePayment = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      firstName,
      lastName,
      phone,
      shippingAddress,
      country,
      city,
      zipCode,
      cart,
    } = req.body;

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/checkout`,
      cancel_url: `http://localhost:5173/checkout`,
      metadata: {
        user_id,
        firstName,
        phone,
        lastName,
        shippingAddress,
        country,
        city,
        zipCode,
        items: JSON.stringify(
          cart.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        ),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string | undefined;
  if (!sig) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : String(err)}`,
      );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    try {
      if (metadata) {
        const items = JSON.parse(metadata.items);

        await queryCreateOrder({
          userId: metadata.user_id,
          paymentIntentId: session.payment_intent as string,
          firstName: metadata.firstName,
          lastName: metadata.lastName,
          phone: metadata.phone,
          address: metadata.shippingAddress,
          country: metadata.country,
          city: metadata.city,
          zipCode: metadata.zipCode,
          totalPrice: parseFloat((session.amount_total! / 100).toFixed(2)),
          status: "paid",
          items,
        });
      }

      console.log("✅ Order saved to DB");
    } catch (dbError) {
      console.error("❌ Failed to save order:", dbError);
    }
  }

  res.status(200).json({ received: true });
};
