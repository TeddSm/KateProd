document.querySelectorAll(".menu-list-title").forEach((title) => {
  title.addEventListener("click", () => {
    const parent = title.parentElement;
    parent.classList.toggle("active");
  });
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