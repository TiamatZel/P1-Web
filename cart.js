document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;

    const cartTableBody = document.querySelector('#cart-table tbody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>
                <a href="#" onclick="viewProduct(${item.id})">Ver</a> | 
                <a href="#" onclick="removeFromCart(${item.id})">Eliminar</a>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
});

function viewProduct(productId) {
    alert(`Viewing product ${productId}`);
    // Add logic to view product details
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload the page to update the cart
}

function logout() {
    window.location.href = 'index.html'; // Redirect to the login page
}