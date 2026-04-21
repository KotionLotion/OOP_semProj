document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch('/views/navbar.html');
    const html = await res.text();

    document.getElementById('navbar').innerHTML = html;

    // attach logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/views/login.html';
        });
    }
});