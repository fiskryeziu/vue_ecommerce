import { pool } from "../db/db";
import { products } from "./seedData";

async function main() {
  let client;
  try {
    client = await pool.connect();

    for (const product of products) {
      await client.query(
        `INSERT INTO products (title, slug, description, price, compareprice, image, category, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          product.title,
          product.slug,
          product.description,
          product.price,
          product.compareprice,
          product.image,
          product.category,
          product.rating,
        ],
      );
    }
    console.log("✅ All seeders ran successfully.");
  } catch (err) {
    console.error("❌ Seeder error:", err);
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

main();
