import { SortOrder } from "~/constants/enums";
import databaseService from "./database.services";
import { Product, ProductInterface } from "~/models/schemas/Product";
import { QuerySnapshot } from "firebase-admin/firestore";

class ProductService {
  constructor() {}

  async getProducts({
    limit,
    sort,
  }: {
    limit: string | string[] | undefined;
    sort: string | string[] | undefined;
  }) {
    let query: any = databaseService.products;
    if (sort === SortOrder.ASC || sort === SortOrder.DESC) {
      query = query.orderBy("created_at", sort);
    }
    if (limit !== undefined) query = query.limit(parseInt(limit as string));
    const snapshot: QuerySnapshot = await query.get();
    const result: any = [];
    snapshot.docs.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }

  async getOne(id: string) {
    const snapshot = await databaseService.products.doc(id).get();
    if (snapshot.exists) return snapshot.data();
    return null;
  }

  async addProduct(
    data: Omit<ProductInterface, "id" | "created_at" | "updated_at">
  ) {
    const newProduct = new Product(data);
    const writeResult = await databaseService.products
      .doc(newProduct.id.toString())
      .set({ ...newProduct });
    const snapshot = await databaseService.products
      .doc(newProduct.id.toString())
      .get();
    return snapshot.data();
  }

  async deleteOne(id: string) {
    const doc = await databaseService.products.doc(id).get();
    if (doc.exists) {
      const writeResult = await databaseService.products.doc(id).delete();
      return writeResult;
    }
    return null;
  }

  async updateOne(
    id: string,
    data: Omit<ProductInterface, "id" | "created_at" | "updated_at">
  ) {
    const doc = await databaseService.products.doc(id).get();
    if (doc.exists) {
      const result = await databaseService.products.doc(id).update(data);
      return (await databaseService.products.doc(id).get()).data();
    }
    return null;
  }
}

const productService = new ProductService();
export default productService;
