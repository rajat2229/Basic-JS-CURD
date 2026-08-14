const registerForm = document.querySelector("#register-form");
const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); //->> stops  browser from refreshing the page when the form is submitted
    // console.log("Form Submitted");
    let newUser = {
        username: fullnameInput.value,
        email: emailInput.value.toLowerCase(),
        password: passwordInput.value,
    };
    alert("user Created!");
    console.log(newUser);

    // clearing input fields 
    fullnameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // send new user to database /backend
    await fetch("https://basic-js-curd.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    // fetch all users from database /backend
    const response = await fetch("https://basic-js-curd.onrender.com");
    const users = await response.json();
    console.log(users);



    // navigate to all users page 
    window.location.href = "AllUser.html";
});