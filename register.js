document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        var formData = {
            name: document.getElementById('register-name').value,
            phone: document.getElementById('register-phone').value,
            username: document.getElementById('register-usernamename').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value,
            birthday: document.getElementById('birthday').value,
            region: document.getElementById('region').value,
            team: document.getElementById('register-team').value
        };

        // Basic validation 
        if (formData.name && formData.email && formData.password) {
            // Store data in Local Storage
            var users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful');
        } else {
            alert('Please fill out all required fields.');
        }
    });
});
