export async function getAllProducts() {
  const response = await fetch("../data/data.json");
  const products = await response.json();

  return products;
}

export async function getFilteredProducts() {
  const response = await fetch("../../data/data.json");
  const products = await response.json();

  const pagePath = window.location.pathname;
  let currentCategory = "";
  let isCatalog = false;
  if (pagePath.includes("products.html")) {
    isCatalog = true;
  } else if (pagePath.includes("moldings.html")) {
    currentCategory = "molding";
  } else if (pagePath.includes("cornies.html")) {
    currentCategory = "cornice";
  } else if (pagePath.includes("skirting.html")) {
    currentCategory = "skirting";
  } else if (pagePath.includes("wallpanels.html")) {
    currentCategory = "wallpanel";
  } else if (pagePath.includes("light.html")) {
    currentCategory = "light";
  } else if (pagePath.includes("scenery.html")) {
    currentCategory = "scenery";
  } else if (pagePath.includes("glues-tools.html")) {
    currentCategory = "tool";
  }
  if (isCatalog) {
    return products;
  } else {
    return products.filter((item) => item.category === currentCategory);
  }
}

export function renderProducts(productsArray) {
  const listContainer = document.getElementById("productList");
  if (!listContainer) return;

  listContainer.innerHTML = "";

  if (productsArray.length === 0) {
    listContainer.innerHTML = `
            <li class="no-results">
                <p>На жаль, за вашим запитом нічого не знайдено 🔍</p>
            </li>
        `;
    return;
  }

  const brandNames = {
    orac: "OracDecor",
    noel: "Noel & Marquet",
  };

  productsArray.forEach((product) => {
    const displayBrand =
      brandNames[product.brand.toLowerCase()] || product.brand;

    const cardHTML = `
            <li class="product-item">
                <article class="product-card">
                    <a href="product.html?id=${product.id}">
                    <img src="${product.img}" alt="${product.title}" class="product-card-img">
                    <div class="product-card-body">
                        <h3 class="product-card-title">${product.title}</h3>
                        <p class="product-card-brand">${displayBrand}</p>
                        <p class="product-card-material">${product.materialDisplay}®</p>
                        <p class="product-card-size">${product.height}x${product.width}hx${product.length}</p>
                        <p class="product-card-price">Ціна: <span>${product.price}</span> грн</p>
                    </div>
                    </a>
                </article>
            </li>
        `;
    listContainer.innerHTML += cardHTML;
  });
}

export async function init() {
  const filteredData = await getFilteredProducts();
  renderProducts(filteredData);
}

init();
