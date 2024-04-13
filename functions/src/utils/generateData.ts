import { faker } from "@faker-js/faker";
import fs from "fs";

export function generateProducts() {
  for (let i = 0; i < 1000; i++) {
    const data = JSON.parse(
      fs.readFileSync(__dirname + "/../week1/database/products.json").toString()
    );
    const newProduct = {
      id: faker.number.int(),
      name: faker.commerce.product(),
      price: faker.number.int({ max: 1000 }),
      description: faker.commerce.productDescription(),
      product: faker.commerce.productMaterial(),
      color: faker.color.human(),
      createdAt: faker.date.anytime(),
      image: faker.image.url(),
    };
    const updatedProducts = [...data.data, newProduct];
    fs.writeFileSync(
      __dirname + "/../week1/database/products.json",
      JSON.stringify({
        data: updatedProducts,
      })
    );
  }
}
