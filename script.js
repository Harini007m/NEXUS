// Login Form Validation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLogin();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegister();
        });
    }

    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });
    }

    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Landing page interactions
    const dashboardLink = document.getElementById('dashboardLink');
    const profileLink = document.getElementById('profileLink');
    const applicationsLink = document.getElementById('applicationsLink');
    const logoutLink = document.getElementById('logoutLink');
    const exploreColleges = document.getElementById('exploreColleges');
    const trackApplications = document.getElementById('trackApplications');
    const counsellingTips = document.getElementById('counsellingTips');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    if (exploreColleges) {
        exploreColleges.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                showMessage('Exploring colleges...');
            }
        });
    }

    if (trackApplications) {
        trackApplications.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                showMessage('Tracking applications...');
            }
        });
    }

    if (counsellingTips) {
        counsellingTips.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                showMessage('Getting counselling tips...');
            }
        });
    }
});

function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation (basic)
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        emailError.textContent = 'Invalid email or password.';
        isValid = false;
    }

    if (isValid) {
        // Simulate login success
        showMessage('Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 1500);
    }
}

function validateRegister() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const emailError = document.getElementById('regEmailError');
    const passwordError = document.getElementById('regPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    let isValid = true;

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        emailError.textContent = 'Email already registered.';
        isValid = false;
    }

    if (isValid) {
        // Save user
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Registration successful! Please login.');
        showLoginForm();
    }
}

function showRegisterForm() {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('registerFormContainer').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerFormContainer').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
}

function showMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.background = '#4caf50';
    messageEl.style.color = 'white';
    messageEl.style.padding = '10px 20px';
    messageEl.style.borderRadius = '5px';
    messageEl.style.zIndex = '1000';
    messageEl.style.animation = 'slideIn 0.3s ease-out';

    document.body.appendChild(messageEl);

    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
