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

    const brandNames = { ORAC: "OracDecor", NOEL: "Noel & Marquet" };
    const categoryData = {
      "cornice": { name: "Карнизи", url: "cornies.html" },
      "molding": { name: "Молдинги", url: "moldings.html" },
      "skirting": { name: "Плінтуса", url: "skirting.html" },
      "wallpanel": { name: "Стінові 3D панелі", url: "wallpanels.html" },
      "scenery": { name: "Декоративні елементи", url: "scenery.html" },
      "tool": { name: "Клеї і інструмент", url: "glues-tools.html" },
      "light": { name: "Світлові рішення", url: "light.html" }
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

    const slugUrlImg = product.title.toLowerCase().replace(/\s+/g, "-");
    const imagesToCheck = [
      product.img,
      `../../data/dataImg/${product.category}/${slugUrlImg}/${slugUrlImg}-size.webp`,
      `../../data/dataImg/${product.category}/${slugUrlImg}/${slugUrlImg}-real.webp`,
      `../../data/dataImg/${product.category}/${slugUrlImg}/${slugUrlImg}-pdf.webp`
    ];

    const track = document.getElementById("js-slider-track");
    const dotsContainer = document.getElementById("js-dots");
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    async function renderGallery() {
      const results = await Promise.all(
        imagesToCheck.map(async (src) => {
          try {
            const res = await fetch(src, { method: 'HEAD' });
            return res.ok ? src : null;
          } catch {
            return null;
          }
        })
      );

      const validImages = results.filter(src => src !== null);

      validImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = product.title;
        img.classList.add("slider-img");
        track.appendChild(img);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
      });
    }

    await renderGallery();

    let currentIndex = 0;

    function updateSlider() {
      const width = track.clientWidth;
      if (width === 0) return; 
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
      if (track.children.length === 0) return;
      currentIndex = (currentIndex + 1) % track.children.length;
      updateSlider();
    };

    document.getElementById("js-prev-btn").onclick = () => {
      if (track.children.length === 0) return;
      currentIndex = (currentIndex - 1 + track.children.length) % track.children.length;
      updateSlider();
    };

    window.addEventListener('resize', updateSlider);

  } catch (error) {
    console.error("Помилка:", error);
  }
}

loadProductDetails();