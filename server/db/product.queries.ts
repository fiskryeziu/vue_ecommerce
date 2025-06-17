import type { Category } from "../types/types";
import { pool } from "./db";

export const queryProducts = async (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: "latest" | "low" | "high" | undefined;
}) => {
  const values: (string | number)[] = [];
  const conditions: string[] = [];

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`category = $${values.length}`);
  }

  if (filters.minPrice !== undefined) {
    values.push(filters.minPrice);
    conditions.push(`price >= $${values.length}`);
  }

  if (filters.maxPrice !== undefined) {
    values.push(filters.maxPrice);
    conditions.push(`price <= $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // sorting
  let orderClause = "ORDER BY id DESC";
  switch (filters.sort) {
    case "low":
      orderClause = "ORDER BY price ASC";
      break;
    case "high":
      orderClause = "ORDER BY price DESC";
      break;
    case "latest":
      orderClause = "ORDER BY created_at DESC";
      break;
    default:
      break;
  }

  // pagination
  const limit = filters.limit || 10;
  const page = filters.page || 1;
  const offset = (page - 1) * limit;

  values.push(limit);
  const limitPlaceholder = `$${values.length}`;

  values.push(offset);
  const offsetPlaceholder = `$${values.length}`;

  const productQuery = `
    SELECT * FROM products 
    ${whereClause}
    ${orderClause}
    LIMIT ${limitPlaceholder}
    OFFSET ${offsetPlaceholder}
  `;

  const countQuery = `
    SELECT COUNT(*) FROM products
    ${whereClause}
  `;

  // Only use the filter values for the count query
  const countValues = values.slice(0, values.length - 2);

  const [productsResult, countResult] = await Promise.all([
    pool.query(productQuery, values),
    pool.query(countQuery, countValues),
  ]);

  return {
    products: productsResult.rows,
    totalProducts: parseInt(countResult.rows[0].count, 10),
  };
};

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
export const queryProduct = async (slug: string) => {
  const res = await pool.query(
    `
SELECT
    *
FROM
    products
WHERE
    slug = $1
`,
    [slug],
  );
  return res.rows[0];
};
export const queryRelatedProducts = async (slug: string) => {
  const res = await pool.query(
    `
SELECT
    *
FROM
    products
WHERE
    category = (
        SELECT
            category
        FROM
            products
        WHERE
            slug = $1
    )
    AND slug != $1
LIMIT
    6;
`,
    [slug],
  );
  return res.rows;
};

export const querySearchProduct = async (searchQuery: string) => {
  const res = await pool.query(
    `SELECT id, title, price, image, slug
   FROM products
   WHERE ts @@ plainto_tsquery('english', $1)
   LIMIT 20`,
    [searchQuery],
  );

  return res.rows;
};
