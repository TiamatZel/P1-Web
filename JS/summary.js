document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartId = urlParams.get('cartId');
    fetchCartDetails(cartId);

    document.getElementById('recalculate-button').addEventListener('click', recalculateTotal);
    document.getElementById('checkout-button').addEventListener('click', checkout);
});

async function fetchCartDetails(cartId) {
    try {
        console.log(`Fetching details for cart ID: ${cartId}`);
        const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cart = await response.json();
        console.log('Cart details:', cart);
        await displayCartDetails(cart);
    } catch (error) {
        console.error('Error fetching cart details:', error);
    }
}

async function fetchProduct(productId) {
    try {
        console.log(`Fetching product ID: ${productId}`);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        console.log('Product details:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

async function displayCartDetails(cart) {
    const cartTableBody = document.querySelector('#cart-details-table tbody');
    cartTableBody.innerHTML = '';
    let grandTotal = 0;

    for (const item of cart.products) {
        const product = await fetchProduct(item.productId);
        console.log('Displaying product:', product);
        const total = item.quantity * product.price;
        grandTotal += total;

        const tr = document.createElement('tr');

        const tdProduct = document.createElement('td');
        tdProduct.textContent = product.title;
        tr.appendChild(tdProduct);

        const tdQuantity = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.dataset.productId = item.productId;
        quantityInput.addEventListener('change', () => updateQuantity(item.productId, quantityInput.value, product.price));
        tdQuantity.appendChild(quantityInput);
        tr.appendChild(tdQuantity);

        const tdUnitPrice = document.createElement('td');
        tdUnitPrice.textContent = `$${product.price.toFixed(2)}`;
        tr.appendChild(tdUnitPrice);

        const tdTotal = document.createElement('td');
        tdTotal.textContent = `$${total.toFixed(2)}`;
        tr.appendChild(tdTotal);

        cartTableBody.appendChild(tr);
    }

    document.getElementById('grand-total').textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}

function updateQuantity(productId, newQuantity, price) {
    const totalCell = document.querySelector(`input[data-product-id="${productId}"]`).closest('tr').querySelector('td:last-child');
    const newTotal = newQuantity * price;
    totalCell.textContent = `$${newTotal.toFixed(2)}`;

    recalculateTotal();
}

function recalculateTotal() {
    let grandTotal = 0;
    document.querySelectorAll('#cart-details-table tbody tr').forEach(row => {
        const quantity = parseInt(row.querySelector('input').value, 10);
        const unitPrice = parseFloat(row.children[2].textContent.replace('$', ''));
        const total = quantity * unitPrice;
        row.children[3].textContent = `$${total.toFixed(2)}`;
        grandTotal += total;
    });
    document.getElementById('grand-total').textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}

function checkout() {
    alert('Proceeding to checkout!');
}
