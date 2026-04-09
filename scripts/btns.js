import { getFilteredProducts, renderProducts } from "./main.js";

const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "../../index.html";
    }
  });
}

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
if (searchInput && searchBtn) {
  searchBtn.addEventListener("click", async (e) => {
    const query = searchInput.value.toLowerCase().trim();
    const products = await getFilteredProducts();
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    renderProducts(filtered);
    searchInput.value = "";
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
}

const closeBtn = document.getElementById("close-btn");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menuMobile");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menu.classList.add("is-open");
  });
}
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("is-open");
  });
}

const openFilter = document.querySelector("#filter-btn");
const filterContainer = document.querySelector("#filterContainer");
if (openFilter) {
  openFilter.addEventListener("click", () => {
    filterContainer.classList.add("is-open");
  });
}

const closeFilter = document.querySelector("#closeFilterBtn");
if (closeFilter) {
  closeFilter.addEventListener("click", () => {
    filterContainer.classList.remove("is-open");
  });
}

const goFilter = document.querySelector("#filterGoBtn");

if (goFilter) {
  goFilter.addEventListener("click", async () => {
    await filterByBrand();
  });
}

async function filterByBrand() {
  const brandCheckboxes = document.querySelectorAll(".checkbox-input");
  const selectedBrands = Array.from(brandCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value.toLowerCase());

  const allProducts = await getFilteredProducts();

  if (selectedBrands.length === 0) {
    renderProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter((product) =>
    selectedBrands.includes(product.brand.toLowerCase())
  );

  renderProducts(filtered);
}
