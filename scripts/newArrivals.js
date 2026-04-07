import { renderProducts, getAllProducts } from "./main.js";

async function newArrivals() {
    const products = await getAllProducts();
    const filteredProducts = products.filter(item => item.newArrivals === true);
    renderProducts(filteredProducts);
}

newArrivals();