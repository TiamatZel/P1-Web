document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupCategoryLinks();
});

function fetchProducts(category = '') {
    let url = 'https://fakestoreapi.com/products';
    if (category) {
        url += `/category/${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear previous products
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <h3>${product.title}</h3>
                    <img src="${product.image}" alt="${product.title}">
                    <div class="price-add-container">
                        <p>$${product.price}</p>
                        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add</button>
                    </div>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function setupCategoryLinks() {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            let categoryName = category.textContent.toLowerCase();
            if (categoryName === "jewelry") {
                categoryName = "jewelery"; // Adjust the category name for the API
            }
            fetchProducts(categoryName);
        });
    });
}

function addToCart(productId, productTitle, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const dateAdded = new Date().toLocaleString();
    cart.push({ id: productId, title: productTitle, price: productPrice, date: dateAdded });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Product ${productTitle} added to cart!`);
}

function logout() {
    window.location.href = 'index.html'; // Redirect to the login page
}

function search() {
    const query = document.getElementById('search').value;
    alert('Searching for: ' + query); // Add search logic here
}

document.querySelector('.cart').addEventListener('click', () => {
    window.location.href = 'cart.html'; // Redirect to the cart page
});
