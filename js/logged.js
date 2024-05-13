document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    setupModalCloseBehavior();
    checkLoginStatus();

    const loginItem = document.getElementById('loginItem');
    if (loginItem) {
        console.log('Login item found, attaching click event listener');
        loginItem.addEventListener('click', function() {
            console.log('Login item clicked');
            showLoginModal();
        });
    }
});

function checkLoginStatus() {
    const is_logged = localStorage.getItem('is_logged') === 'true'; // Retrieve login status from localStorage
    initializeUserInterface(is_logged);
}

function initializeUserInterface(is_logged) {
    console.log('Initializing user interface based on login status:', is_logged);
    const userNameItem = document.getElementById('userNameItem');
    const balanceItem = document.getElementById('balanceItem');
    const loginItem = document.getElementById('loginItem');
    const logoutItem = document.getElementById('logoutItem');
    const settingsItem = document.getElementById('settingsItem');

    if (is_logged) {
        console.log('User is logged in');
        userNameItem.style.display = 'block';
        balanceItem.style.display = 'block';
        loginItem.style.display = 'none';
        logoutItem.style.display = 'block';
        settingsItem.style.display = 'block';

        userNameItem.textContent = localStorage.getItem('user_name');
        balanceItem.textContent = 'Balance: ' + localStorage.getItem('user_balance') + ' UAH';
    } else {
        console.log('User is not logged in');
        userNameItem.style.display = 'none';
        balanceItem.style.display = 'none';
        loginItem.style.display = 'block';
        logoutItem.style.display = 'none';
        settingsItem.style.display = 'none';
    }
}


function setupModalCloseBehavior() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        const closeButton = modal.querySelector('.close-button');
        closeButton.onclick = function() {
            console.log('Close button clicked');
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                console.log('Clicked outside the modal');
                modal.style.display = 'none';
            }
        }
    }
}

function showLoginModal() {
    const modalContainer = document.getElementById('loginModalContainer');
    const modal = document.getElementById('loginModal');  // Ensure this ID matches your modal's ID in the HTML content
    if (modalContainer && modal) {
        modalContainer.style.display = 'block';  // You can change 'block' to 'flex' if that suits your layout better
        modal.style.display = 'block';           // Make sure this matches how you want the modal itself displayed
        console.log('Login modal is now visible');
    } else {
        console.error('Modal container or modal element not found - check IDs and if modal content is correctly loaded');
    }
}

function addLoginFormEventListeners() {
    // Assuming the close button is within the loaded content and has class 'close-button'
    const closeButton = document.querySelector('#loginModal .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideLoginModal();
        });
        console.log('Close button event listener added.');
    } else {
        console.error('Close button not found.');
    }
}

function hideLoginModal() {
    const modalContainer = document.getElementById('loginModalContainer');
    const modal = document.getElementById('loginModal');
    if (modalContainer && modal) {
        modalContainer.style.display = 'none'; // Hide the container
        modal.style.display = 'none'; // Hide the modal itself
        console.log('Modal and modal container are now hidden');
    } else {
        console.error('Modal container or modal element not found - check IDs and if modal content is correctly loaded');
    }
}


function loadLoginForm() {
    console.log('Attempting to load the login form');
    fetch('../reusable/login.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            const loginModalContainer = document.getElementById('loginModalContainer');
            if (loginModalContainer) {
                loginModalContainer.innerHTML = html;
                console.log('Modal content loaded into container');
                addLoginFormEventListeners(); // Add event listeners after content is loaded
                showLoginModal(); // Optionally show the modal immediately after loading
            }
        })
        .catch(error => {
            console.error('Failed to load login form:', error);
        });
}

function handleLogin(event) {
    event.preventDefault();  // Prevent default form submission behavior

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const keepSignedIn = document.getElementById('check').checked;

    // This should be a dedicated endpoint for login that checks credentials
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:ZOHOxVVb/auth/login', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            // Parse the response to get error details if possible
            return response.json().then(data => {
                throw new Error(data.message || `HTTP status ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.is_logged) {
            console.log('Login successful:', data);
            localStorage.setItem('is_logged', 'true');
            localStorage.setItem('user_name', data.user_name || username);  // Store additional user data as needed
            hideLoginModal();
            initializeUserInterface(true);
        } else {
            alert('Login failed: ' + (data.message || 'Invalid credentials'));
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Login error: ' + error.message);  // Improved error feedback
    });    
}

function handleRegister(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve user input from the form
    const username = document.getElementById('reg-user').value;
    const password = document.getElementById('reg-pass').value;
    const repeatPassword = document.getElementById('reg-repeat-pass').value;
    const email = document.getElementById('reg-email').value;

    // Simple validation for example purposes
    if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return;
    }

    console.log('Registering with:', username, email, password);

    // Perform the API call to register the user
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:ZOHOxVVb/auth/signup', { // Adjust URL for registration endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Registration successful:', data);
        alert('Registration successful!');
        hideLoginModal();
    })
    .catch(error => {
        console.error('Registration error:', error);
        alert('Registration error: ' + error.message);
    });
}


function logoutUser() {
    localStorage.setItem('is_logged', 'false');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_balance');
    initializeUserInterface(false);
}
