const password = document.getElementById("password");
const hidePass = document.getElementById("hidePass");

password.addEventListener("input", function () {
    if (password.value.length > 0) {
        hidePass.style.display = "flex";
    } else {
        hidePass.style.display = "none";
    }
});

hidePass.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        hidePass.innerHTML = `
            <svg class="hide-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="3" y1="3" x2="21" y2="21"></line>
            </svg>
        `;
    } else {
        password.type = "password";
        hidePass.innerHTML = `
            <svg class="hide-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
});



const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");

const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");



loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value.trim();

    email.classList.remove("input-error");
    password.classList.remove("input-error");

    emailError.style.display = "none";
    passError.style.display = "none";


    const users = JSON.parse(localStorage.getItem("users")) || [];


    const user = users.find(function (user) {
        return user.email === emailValue;
    });


    if (emailValue === "" || !user) {

        email.classList.add("input-error");

        emailError.textContent =
            "The email address or mobile number you entered isn't connected to an account.";

        emailError.style.display = "block";

        return;
    }

    if (user.password !== passwordValue) {

        password.classList.add("input-error");

        passError.textContent =
            "The password you've entered is incorrect.";

        passError.style.display = "block";

        return;
    }


    localStorage.setItem("currentUser", JSON.stringify(user));
    
    window.location.href = "feedpage.html";

    // window.location.href = "feedpage.html";


    // alert("Login successful!");
});






