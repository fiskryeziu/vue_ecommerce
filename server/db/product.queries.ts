import type { Category } from "../types/user";
import { pool } from "./db";

export const queryProductsByCategory = async (category: Category) => {
  const res = await pool.query(
    `SELECT * FROM products WHERE category = $1 LIMIT 6`,
    [category],
  );
  return res.rows;
};
export const getNewArrivalsProducts = async () => {
  const res = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC LIMIT 6;",
  );
  return res.rows;
};
export const getFeaturedProducts = async () => {
  const res = await pool.query(
    "SELECT * FROM products WHERE is_featured = TRUE ORDER BY created_at DESC;",
  );
  return res.rows;
};

export const getBestSellerProduct = async () => {
  const res = await pool.query(
    `
SELECT
    p.*,
    SUM(oi.quantity) AS total_sold
FROM
    products p
    JOIN order_items oi ON p.id = oi.product_id
GROUP BY
    p.id
ORDER BY
    total_sold DESC
LIMIT
    6;
`,
  );
  return res.rows;
};
