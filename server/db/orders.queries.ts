import type { CreateOrderPayload } from "../types/types";
import { pool } from "./db";

export const queryCreateOrder = async (order: CreateOrderPayload) => {
  try {
    const orderInsertQuery = `
      INSERT INTO orders (
        user_id,
        stripe_payment_intent_id,
        first_name,
        last_name,
        phone,
        shipping_address,
        shipping_country,
        shipping_city,
        shipping_zip,
        total_price,
        order_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id;
    `;
    const orderValues = [
      order.userId,
      order.paymentIntentId,
      order.firstName,
      order.lastName,
      order.phone,
      order.address,
      order.country,
      order.city,
      order.zipCode,
      order.totalPrice,
      order.status,
    ];

    const result = await pool.query(orderInsertQuery, orderValues);
    const orderId = result.rows[0].id;

    const itemInsertQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;

    for (const item of order.items) {
      await pool.query(itemInsertQuery, [
        orderId,
        item.productId,
        item.quantity,
        item.price,
      ]);
    }
  } catch (err) {
    throw err;
  } finally {
    console.log("order created");
  }
};

export const queryOrdersByUserId = async (id: string) => {
  const orderInsertQuery = `
SELECT
  o.id AS order_id,
  o.created_at::DATE AS date,
  o.order_status AS status,
  o.total_price AS total,
  o.shipping_address || ', ' || o.shipping_city || ', ' || o.shipping_country || ' ' || o.shipping_zip AS shipping_address,
  json_agg(
    json_build_object(
      'id', p.id,
      'title', p.title,
      'image', p.image,
      'quantity', oi.quantity
    )
  ) AS items
FROM
  orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE
  o.user_id = $1
GROUP BY
  o.id
ORDER BY
  o.created_at DESC;
    `;
  const result = await pool.query(orderInsertQuery, [id]);

  return result.rows;
};
