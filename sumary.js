document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;

    updateSummary();
});

function updateSummary() {
    const summaryTableBody = document.querySelector('#summary-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productCounts = {};

    summaryTableBody.innerHTML = ''; // Clear previous summary

    cart.forEach(item => {
        if (!productCounts[item.id]) {
            productCounts[item.id] = { ...item, count: 0 };
        }
        productCounts[item.id].count += 1;
    });

    let totalPrice = 0;

    Object.values(productCounts).forEach(item => {
        const subtotal = item.price * item.count;
        totalPrice += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.count}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        summaryTableBody.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function confirmPurchase() {
    alert('Purchase confirmed!');
    // Add logic to handle purchase confirmation
}

function continueShopping() {
    window.location.href = 'shop.html'; // Redirect to the shop page
}

function logout() {
    window.location.href = 'index.html'; // Redirect to the login page
}