import { cert, initializeApp } from "firebase-admin/app";
import serviceAccount from "service-account.json";
initializeApp({ credential: cert(serviceAccount as any) });
import { onRequest } from "firebase-functions/v2/https";
import app from "./app";
import { PRODUCTS_MESSAGES } from "./constants/messages";
import fs from "fs";
import { Product } from "./models/schemas/Product";
import databaseService from "./services/database.services";

export const saveProducts = onRequest(async (req, res) => {
  const productsRef = databaseService.products;
  const products: { data: Product[] } = JSON.parse(
    fs.readFileSync(__dirname + "/database/products.json").toString()
  );
  for (let product of products.data) {
    await productsRef.doc(product.id.toString()).set(product);
  }
  res.json({
    message: PRODUCTS_MESSAGES.SAVE_PRODUCT_SUCCESSFULLY,
  });
});

export const getProducts = onRequest(async (req, res) => {
  const snapshot = await databaseService.products
    .orderBy("created_at", "asc")
    .get();
  const result: any = [];
  snapshot.forEach((doc) => {
    // console.log(doc.id, "=>", doc.data());
    result.push(doc.data());
  });
  res.json({
    message: PRODUCTS_MESSAGES.GET_PRODUCTS_SUCCESSFULLY,
    result,
  });
});

export const api = onRequest(app.callback() as any);
