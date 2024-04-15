import { Product, ProductInterface } from "~/models/schemas/Product";
import { data as products } from "./products.json";
import fs from "fs";
import { SortOrder } from "../constants/enums";

class ProductRepository {
  getAll(limit?: number, sort?: string) {
    const { data: products } = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    const result = [...products];
    if (sort === SortOrder.ASC) {
      result.sort(
        (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
      );
    }
    if (sort === SortOrder.DESC) {
      result.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
    }
    if (Number.isFinite(limit)) {
      return result.slice(0, limit);
    }
    return result;
  }

  getOne(id: string) {
    const { data: products } = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    return products.find((product: Product) => product!.id === parseInt(id));
  }

  add(data: Omit<ProductInterface, "id" | "created_at" | "updated_at">) {
    const newProduct = new Product(data);
    const updatedProducts = [newProduct, ...products];
    fs.writeFileSync(
      __dirname + "/products.json",
      JSON.stringify({
        data: updatedProducts,
      })
    );
    return newProduct;
  }

  updateOne(
    id: string,
    data: Omit<ProductInterface, "id" | "created_at" | "updated_at">
  ) {
    let result: null | ProductInterface = null;
    const updatedProducts = products.map((product) => {
      if (product.id === parseInt(id)) {
        result = { ...product, ...data, updated_at: new Date().toISOString() };
        return result;
      }
      return product;
    });
    fs.writeFileSync(
      __dirname + "/products.json",
      JSON.stringify({
        data: updatedProducts,
      })
    );
    return result;
  }

  deleteOne(id: string) {
    let deletedProduct: null | Product = null;
    const { data: products } = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    const updatedProducts = products.filter((product: Product) => {
      if (product.id === parseInt(id)) deletedProduct = { ...product };
      return product.id !== parseInt(id);
    });
    fs.writeFileSync(
      __dirname + "/products.json",
      JSON.stringify({
        data: updatedProducts,
      })
    );
    return deletedProduct;
  }
}

const productRepository = new ProductRepository();
export default productRepository;
