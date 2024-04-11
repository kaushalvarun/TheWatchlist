document.addEventListener('DOMContentLoaded', function () {
    /* Login Page */
    // copyright 
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright').textContent = `TheWatchlist ©${currentYear} `;

    // login form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        // perform validation
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        event.preventDefault();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (validatePassword(password)) {
            sessionStorage.setItem('userEmail', email);
            window.location.href = 'search.html';
        }
    });

    // Function to validate email 
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Function to validate password  
    function validatePassword(password) {
        let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passRe.test(password)) {
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
            } else if (!/(?=.*[a-z])/.test(password)) {
                alert("Password must contain at least one lowercase letter.");
            } else if (!/(?=.*[A-Z])/.test(password)) {
                alert("Password must contain at least one uppercase letter.");
            } else if (!/(?=.*\d)/.test(password)) {
                alert("Password must contain at least one digit.");
            } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
                alert("Password must contain at least one special character (!@#$%^&*).");
            }
            return false;
        }
        return true;
    }
})
