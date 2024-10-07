document.addEventListener('DOMContentLoaded', () => {
    fetchCarts();
});

async function fetchCarts() {
    try {
        const response = await fetch('https://fakestoreapi.com/carts');
        const carts = await response.json();
        displayCarts(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
    }
}

function displayCarts(carts) {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';

    carts.forEach(cart => {
        const tr = document.createElement('tr');

        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = cart.products.length;
        tr.appendChild(tdQuantity);

        const tdDate = document.createElement('td');
        tdDate.textContent = new Date(cart.date).toLocaleDateString();
        tr.appendChild(tdDate);

        const tdActions = document.createElement('td');
        tdActions.innerHTML = `<button onclick="viewCartDetails(${cart.id})">View Details</button>`;
        tr.appendChild(tdActions);

        cartTableBody.appendChild(tr);
    });
}

function viewCartDetails(cartId) {
    // Redirect to summary.html with cartId as query parameter
    window.location.href = 'summary.html';
}
