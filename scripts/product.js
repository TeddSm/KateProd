async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (!productId) return;

  try {
    const response = await fetch("../../data/data.json");
    const products = await response.json();
    const product = products.find((p) => p.id == productId);

    if (!product) {
      document.getElementById("js-product-title").innerText = "Товар не знайдено";
      return;
    }

    const images = [
      product.img,
      `../../data/dataImg/${product.title.toLowerCase()}/${product.title.toLowerCase()}-size.webp`,
      `../../data/dataImg/${product.title.toLowerCase()}/${product.title.toLowerCase()}-real.webp`,
      `../../data/dataImg/${product.title.toLowerCase()}/${product.title.toLowerCase()}-pdf.webp`
    ];

    const track = document.getElementById("js-slider-track");
    const dotsContainer = document.getElementById("js-dots");
    
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = product.title;
      img.onerror = () => img.remove(); 
      track.appendChild(img);

      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.onclick = () => goToSlide(index);
      dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;

    function updateSlider() {
      const width = track.clientWidth;
      track.style.transform = `translateX(${-currentIndex * width}px)`;
      
      document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    document.getElementById("js-next-btn").onclick = () => {
      currentIndex = (currentIndex + 1) % track.children.length;
      updateSlider();
    };

    document.getElementById("js-prev-btn").onclick = () => {
      currentIndex = (currentIndex - 1 + track.children.length) % track.children.length;
      updateSlider();
    };

    const categoryData = {
    "cornice": { name : "Карнизи", url: "cornies.html" },
    "molding": { name: "Молдинги", url: "moldings.html" },
    "skirting": { name: "Плінтуса", url: "skirting.html" },
    "wallpanel": { name: "Стінові 3D панелі", url: "wallpanels.html" },
    "scenery": { name: "Декоративні елементи", url: "scenery.html" },
    "tool": { name: "Клеї і інструмент", url: "glues-tools.html" },
    "light": { name: "Світлові рішення", url: "light.html" }
};

const brandNames = {
    ORAC: "OracDecor",
    NOEL: "Noel & Marquet",
  };

const catInfo = categoryData[product.category];
 const displayBrand = brandNames[product.brand] || product.brand;

if (catInfo) {
    const catLink = document.getElementById("pageMapCategory");
    
    catLink.innerHTML = catInfo.name;
    
    catLink.href = `../products/${catInfo.url}`;
}

const pageMapProduct = document.getElementById("pageMapProduct");
pageMapProduct.innerHTML = product.title;
pageMapProduct.href = window.location.href;

    document.getElementById("js-page-title").innerText = product.title.replace("-", " ");
    document.getElementById("js-product-title").innerText = product.title.replace("-", " ");
    document.getElementById("js-product-text").innerText = product.desc;
    document.getElementById("js-product-price").innerText = product.price;
     document.getElementById("js-product-brand").innerText = displayBrand;
       document.getElementById("js-product-materialDisplay").innerText = product.materialDisplay;
    document.getElementById("js-product-height").innerText = product.height;
    document.getElementById("js-product-width").innerText = product.width;
    document.getElementById("js-product-length").innerText = product.length;

    window.addEventListener('resize', updateSlider);

  } catch (error) {
    console.error("Помилка:", error);
  }
}

loadProductDetails();