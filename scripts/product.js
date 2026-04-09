async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) return;

  try {
    const response = await fetch("../../data/data.json");
    const products = await response.json();

    const product = products.find((p) => p.id == productId);

    if (product) {
      document.getElementById("js-page-title").innerText = product.title;
      document.getElementById("js-product-img").src = product.img;
      document.getElementById("js-product-img").alt = product.title;
      document.getElementById("js-product-title").innerText = product.title;
      document.getElementById("js-product-text").innerText = product.desc;
      document.getElementById("js-product-price").innerText = product.price;
    } else {
      document.getElementById("js-product-title").innerText =
        "Товар не знайдено";
    }
  } catch (error) {
    console.error("Помилка завантаження даних:", error);
  }
}
loadProductDetails();
