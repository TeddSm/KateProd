import { getFilteredProducts, renderProducts } from "./main.js";

const openSearch = document.querySelector("#openSearchBtn");
const searchContainer = document.querySelector("#searchContainer");
const closeSearch = document.querySelector("#closeSearchBtn");
if(openSearch) {
  openSearch.addEventListener("click", () => {
    searchContainer.classList.add("active");
    searchInputHeader.focus();
  })
}
if(closeSearch) {
  closeSearch.addEventListener("click", () => {
    searchContainer.classList.remove("active");
  })
}

async function performSearch(inputElement) {
  const query = inputElement.value.toLowerCase().trim();

  if (query === "") {
    inputElement.focus();
    showToast("Заповніть пошукове поле!");
    inputElement.classList.add('error-blink');
    setTimeout(() => inputElement.classList.remove('error-blink'), 700);
    return;
  }

  const products = await getFilteredProducts();
  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  if (filtered.length > 0) {
    showToast(`Знайдено товарів: ${filtered.length}`);
    renderProducts(filtered);
    
  } else {
    showToast("На жаль, нічого не знайдено");
  }
}

document.querySelectorAll(".search-group").forEach((group) => {
  const btn = group.querySelector(".search-btn");
  const input = group.querySelector(".search-input");

  if (btn && input) {
    btn.addEventListener("click", () => performSearch(input));

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        performSearch(input);
      }
    });
  }
});

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

const goFilter = document.querySelector("#filterGoBtn");

if (goFilter) {
  goFilter.addEventListener("click", async () => {
    await filterByBrand();
  });
}

const sortSelect = document.querySelector("#sortPrice");

function sortProducts(products, type) {
  const sorted = [...products];

  if (type === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (type === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}

async function filterByBrand() {
  const getSelected = (selector) =>
    Array.from(document.querySelectorAll(selector))
      .filter((cb) => cb.checked)
      .map((cb) => cb.value.toLowerCase());

  const minH =
    parseInt(document.getElementById("slider-height-min").value) || 0;
  const maxH =
    parseInt(document.getElementById("slider-height-max").value) || Infinity;
  const minW = parseInt(document.getElementById("slider-width-min").value) || 0;
  const maxW =
    parseInt(document.getElementById("slider-width-max").value) || Infinity;

  const selectedBrands = getSelected(".checkbox-input");
  const selectedMaterials = getSelected(".checkbox-material");
  const selectedUsages = getSelected(".checkbox-usage");

  let products = await getFilteredProducts();

  if (window.location.pathname.includes("sale.html")) {
    products = products.filter((p) => p.sale === true);
  }

  products = products.filter((p) => {
    const productH = parseFloat(p.height) || 0;
    const productW = parseFloat(p.width) || 0;

    return (
      productH >= minH &&
      productH <= maxH &&
      productW >= minW &&
      productW <= maxW
    );
  });

  if (selectedBrands.length > 0) {
    products = products.filter(
      (p) => p.brand && selectedBrands.includes(p.brand.toLowerCase())
    );
  }

  if (selectedMaterials.length > 0) {
    products = products.filter(
      (p) => p.material && selectedMaterials.includes(p.material.toLowerCase())
    );
  }

  if (selectedUsages.length > 0) {
    products = products.filter((p) => {
      if (!p.usage) return false;
      const productUsages = Array.isArray(p.usage) ? p.usage : [p.usage];
      return productUsages.some((u) =>
        selectedUsages.includes(u.toLowerCase())
      );
    });
  }

  const sortType = sortSelect ? sortSelect.value : "default";
  products = sortProducts(products, sortType);
  if (products.length > 0) {
    showToast(`Знайдено товарів: ${products.length}`);
    renderProducts(products);
  } else {
    showToast("На жаль, за вашим запитом нічого не знайдено");
  }
}

const menuLinks = document.querySelectorAll(".mega-menu-link");
const menuPicture = document.querySelector(".mega-menu-picture");

menuLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const newImg = link.getAttribute("data-image");
    if (newImg) {
      menuPicture.style.backgroundImage = `url(${newImg})`;
    }
  });
  link.addEventListener("mouseleave", () => {});
});

function initDoubleSlider(minId, maxId, minTextId, maxTextId, trackId) {
  const minSlider = document.getElementById(minId);
  const maxSlider = document.getElementById(maxId);
  const minText = document.getElementById(minTextId);
  const maxText = document.getElementById(maxTextId);
  const track = document.getElementById(trackId);

  const colorActive = "#000000";
  const colorStatic = "#ddd";

  function update() {
    let valMin = parseInt(minSlider.value);
    let valMax = parseInt(maxSlider.value);

    if (valMin > valMax) {
      minSlider.value = valMax;
      valMin = valMax;
    }

    const percent1 = (valMin / minSlider.max) * 100;
    const percent2 = (valMax / maxSlider.max) * 100;

    track.style.background = `linear-gradient(to right, 
      ${colorStatic} ${percent1}%, 
      ${colorActive} ${percent1}%, 
      ${colorActive} ${percent2}%, 
      ${colorStatic} ${percent2}%)`;

    minText.textContent = valMin;
    maxText.textContent = valMax;
  }

  minSlider.addEventListener("input", update);
  maxSlider.addEventListener("input", update);

  update();
}

initDoubleSlider(
  "slider-height-min",
  "slider-height-max",
  "val-height-min",
  "val-height-max",
  "track-height"
);

initDoubleSlider(
  "slider-width-min",
  "slider-width-max",
  "val-width-min",
  "val-width-max",
  "track-width"
);

export function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const mobileSearchToggle = document.getElementById("mobileSearchToggle");
const mobileSearchContainer = document.querySelector(".mobile-search-container");

if(mobileSearchToggle) {
  mobileSearchToggle.addEventListener("click", () => {
    mobileSearchContainer.classList.toggle("active");
    filterSearchInput.focus();
  })
}

document.querySelectorAll(".filter-list-title").forEach((title) => {
  title.addEventListener("click", () => {
    const parent = title.parentElement;
    parent.classList.toggle("active");
  });
});

const mainFilterToggle = document.getElementById("mainFilterToggle");
const filterContainer = document.getElementById("filterContainer");

if (mainFilterToggle && filterContainer) {
  mainFilterToggle.addEventListener("click", () => {
    filterContainer.classList.toggle("active");
  });
}

window.addEventListener('load', () => {
  if (window.location.hash === "#search") {
    openSearch.click(); 
    searchInputHeader.focus();
    
    
    history.replaceState(null, null, ' ');
  }
});