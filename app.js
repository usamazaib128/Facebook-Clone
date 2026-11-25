const firstName = document.getElementById("firstName");
const surname = document.getElementById("surname");

const gender = document.getElementById("gender");
const genderError = document.getElementById("genderError");

const regEmail = document.getElementById("regEmail");
const regEmailError = document.getElementById("regEmailError");

const regPassword = document.getElementById("regPassword");
const regPassError = document.getElementById("regPassError");
const regHidePass = document.getElementById("regHidePass");





const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const emailPattern = /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]{2,}\.com$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;


firstName.addEventListener("blur", function () {
    const value = firstName.value.trim();

    if (value === "" || !namePattern.test(value)) {

        firstName.classList.add("input-error");
    }
    else {
        firstName.classList.remove("input-error");
    }
});

surname.addEventListener("blur", function () {
    const value = surname.value.trim();

    if (value === "" || !namePattern.test(value)) {

        surname.classList.add("input-error");
    }
    else {
        surname.classList.remove("input-error");
    }


});


// gender.addEventListener("change", function () {
//     if (gender.value === "") {
//         gender.classList.add("input-error");
//         genderError.textContent = "Please select your gender.";
//         genderError.style.display = "block";
//     }
//     else {
//         gender.classList.remove("input-error");
//         genderError.style.display = "none";
//     }
// });


regEmail.addEventListener("blur", function () {
    const value = regEmail.value.trim();

    if (value === "") {
        regEmail.classList.add("input-error");
        regEmailError.style.display = "none";
    }

    else if (!emailPattern.test(value)) {
        regEmail.classList.add("input-error");
        regEmailError.textContent = "Please enter a valid mobile number or email address.";
        regEmailError.style.display = "block";
    }

    else {

        regEmail.classList.remove("input-error");
        regEmailError.style.display = "none";
    }
});


regPassword.addEventListener("blur", function () {
    const value = regPassword.value.trim();

    if (value === "") {
        regPassword.classList.add("input-error");
        regPassError.style.display = "none";
    }
    else if (!passwordPattern.test(value)) {

        regPassword.classList.add("input-error");

        regPassError.textContent =
            "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).";

        regPassError.style.display = "block";
    }
    else {
        regPassword.classList.remove("input-error");
        regPassError.style.display = "none";
    }
});

regHidePass.style.display = "none";

regPassword.addEventListener("input", function () {
    if (regPassword.value.length > 0) {
        regHidePass.style.display = "flex";
    }
    else {
        regHidePass.style.display = "none";
    }
});

regHidePass.addEventListener("click", function () {
    if (regPassword.type === "password") {
        regPassword.type = "text";
        regHidePass.innerHTML = `
            <svg class="eye-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="3" y1="3" x2="21" y2="21"></line>
            </svg>
        `;
    } else {
        regPassword.type = "password";
        regHidePass.innerHTML = `
            <svg class="eye-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
});


const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const firstNameValue = firstName.value.trim();

    if (firstNameValue === "") {
        firstName.classList.add("input-error");
        document.getElementById("firstNameError").textContent =
            "Please enter your first name.";
        document.getElementById("firstNameError").style.display = "block";
        isValid = false;
    }
    else if (!namePattern.test(firstNameValue)) {
        firstName.classList.add("input-error");
        document.getElementById("firstNameError").textContent =
            "Please enter a valid first name.";
        document.getElementById("firstNameError").style.display = "block";
        isValid = false;
    }
    else {
        firstName.classList.remove("input-error");
        document.getElementById("firstNameError").style.display = "none";
    }


    const surnameValue = surname.value.trim();

    if (surnameValue === "") {
        surname.classList.add("input-error");
        document.getElementById("surnameError").textContent =
            "Please enter your surname.";
        document.getElementById("surnameError").style.display = "block";
        isValid = false;
    }
    else if (!namePattern.test(surnameValue)) {
        surname.classList.add("input-error");
        document.getElementById("surnameError").textContent =
            "Please enter a valid surname.";
        document.getElementById("surnameError").style.display = "block";
        isValid = false;
    }
    else {
        surname.classList.remove("input-error");
        document.getElementById("surnameError").style.display = "none";
    }



    if (gender.value === "") {
        gender.classList.add("input-error");
        genderError.textContent = "Please select your gender.";
        genderError.style.display = "block";
        isValid = false;
    }
    else {
        gender.classList.remove("input-error");
        genderError.style.display = "none";
    }





    const emailValue = regEmail.value.trim().toLowerCase();

if (emailValue === "") {
    regEmail.classList.add("input-error");
    regEmailError.textContent =
        "Please enter your email address or mobile number.";
    regEmailError.style.display = "block";
    isValid = false;
}
else if (!emailPattern.test(emailValue)) {
    regEmail.classList.add("input-error");
    regEmailError.textContent =
        "Please enter a valid mobile number or email address.";
    regEmailError.style.display = "block";
    isValid = false;
}
else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = users.some(function (u) {
        return u.email === emailValue;
    });

    if (alreadyExists) {
        regEmail.classList.add("input-error");
        regEmailError.textContent = "This email is already registered.";
        regEmailError.style.display = "block";
        isValid = false;
    }
    else {
        regEmail.classList.remove("input-error");
        regEmailError.style.display = "none";
    }
}




    const passwordValue = regPassword.value.trim();

    if (passwordValue === "") {
        regPassword.classList.add("input-error");
        regPassError.textContent =
            "Please enter your password.";
        regPassError.style.display = "block";
        isValid = false;
    }
    else if (!passwordPattern.test(passwordValue)) {
        regPassword.classList.add("input-error");
        regPassError.textContent =
            "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).";
        regPassError.style.display = "block";
        isValid = false;
    }
    else {
        regPassword.classList.remove("input-error");
        regPassError.style.display = "none";
    }


    
       
    if (isValid) {

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const newUser = {
            firstName : firstName.value.trim(),
            surname : surname.value.trim(),
            gender : gender.value.trim(),
            email : emailValue,
            password : regPassword.value.trim()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        // signupForm.submit();
        window.location.href = "index.html"
    }
});













