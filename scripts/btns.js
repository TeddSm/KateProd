import { getFilteredProducts, renderProducts } from "./main.js";

const backBtn = document.getElementById('back-btn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../../index.html'; 
        }
    });
}

const searchInput = document.querySelector('#search-input');
if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase().trim();
        const products = await getFilteredProducts();

        const filtered = products.filter(item => 
            item.title.toLowerCase().includes(query)
        );
        renderProducts(filtered); 
    });
}