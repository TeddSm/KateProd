import { renderProducts, getAllProducts } from "./main.js";

async function sale() {
  const products = await getAllProducts();
  const filteredProducts = products.filter((item) => item.sale === true);
  renderProducts(filteredProducts);
}

sale();
