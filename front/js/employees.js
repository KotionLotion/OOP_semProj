const token = localStorage.getItem('token');
if (!token) window.location.href = '/views/login.html';

const form = document.getElementById('employeeForm');
const tbody = document.querySelector('#employeesTable tbody');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const department = document.getElementById('department');
const username = document.getElementById('username');
const password = document.getElementById('password');
const role = document.getElementById('role');

let currentUser = null;

// auth check
fetch('/api/auth/me', {
    headers: { Authorization: 'Bearer ' + token }
})
.then(r => r.json())
.then(data => {
    if (!data.success) {
        localStorage.removeItem('token');
        window.location.href = '/views/login.html';
        return;
    }

    currentUser = data.user;
    if (currentUser.role !== 'manager') {
        form.style.display = 'none';
    }

    loadEmployees();
});

// load
function loadEmployees() {
    fetch('/api/employees', {
        headers: { Authorization: 'Bearer ' + token }
    })
    .then(r => r.json())
    .then(data => {

        tbody.innerHTML = '';

        data.forEach(emp => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.department}</td>
                <td>${emp.username || '-'}</td>
                <td>${emp.role || 'employee'}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

// create
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        department: department.value,
        username: username.value,
        password: password.value,
        role: role.value
    };

    fetch('/api/auth/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(res => {
        if (res.success) {
            alert('Employee created!');
            form.reset();
            loadEmployees();
        } else {
            alert(res.message || res.error);
        }
    });
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/views/login.html';
});