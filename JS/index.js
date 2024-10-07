
async function verifyUser(username, password) {
    try {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            return { success: true, user: user };
        } else {
            return { success: false, message: 'Incorrect username or password' };
        }
    } catch (error) {
        return { success: false, message: 'Error connecting to the API' };
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await verifyUser(username, password);
    if (result.success) {
        window.location.href = 'shop.html';
        // You can redirect the user or take other actions here
    } else {
        alert(result.message);
    }
}