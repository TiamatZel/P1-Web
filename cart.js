document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;

    const cartTableBody = document.querySelector('#cart-table tbody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productCounts = {};

    cart.forEach(item => {
        if (!productCounts[item.id]) {
            productCounts[item.id] = { ...item, count: 0 };
        }
        productCounts[item.id].count += 1;
        productCounts[item.id].date = item.date; // Update to the latest date
    });

    Object.values(productCounts).forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.count}</td>
            <td>${item.date}</td>
            <td>
                <a href="sumary.html?id=${item.id}">Ver</a> | 
                <a href="#" onclick="removeFromCart(${item.id})">Eliminar</a>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
});

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload the page to update the cart
}

function logout() {
    window.location.href = 'index.html'; // Redirect to the login page
}