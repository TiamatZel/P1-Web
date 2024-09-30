function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validUsername = 'mor_2314';
    const validPassword = '83r5^_';

    if (username === validUsername && password === validPassword) {
        window.location.href = 'shop.html'; // Redirect to the shop page
    } else {
        alert('Invalid username or password.');
    }
}
