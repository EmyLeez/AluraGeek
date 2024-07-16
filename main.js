import { fetchProducts, addProduct, deleteProduct } from './requests.js';

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const form = document.getElementById('product-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newProduct = {
            name: form['product-name'].value,
            price: form['product-price'].value,
            image: form['product-image'].value
        };
        await addProduct(newProduct);
        form.reset();
        loadProducts();
    });
});

async function loadProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    const products = await fetchProducts();
    if (products.length === 0) {
        document.querySelector('.no-products-message').style.display = 'block';
    } else {
        document.querySelector('.no-products-message').style.display = 'none';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>R$ ${product.price}</p>
        <button class="delete-button" data-id="${product.id}">Excluir</button>
    `;
    card.querySelector('.delete-button').addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
        await deleteProduct(id);
        loadProducts();
    });
    return card;
}
