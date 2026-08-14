const editForm = document.querySelector("#edit-form");
const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Get user ID from URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");


// ==========================================
// LOAD USER DATA
// ==========================================

async function getUserById(id) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();

        console.log("User data:", user);

        // Display user data in form
        fullnameInput.value = user.username;
        emailInput.value = user.email;
        passwordInput.value = user.password;

    } catch (error) {
        console.error("Error fetching user:", error);
        alert("Unable to load user data.");
    }
}


// ==========================================
// CHECK USER ID AND LOAD DATA
// ==========================================

if (!userId) {
    console.error("User ID is missing from URL");
    alert("User ID not found!");
} else {
    getUserById(userId);
}


// ==========================================
// UPDATE USER
// ==========================================

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedUser = {
        username: fullnameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    console.log("Updating user:", updatedUser);

    try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        if (!response.ok) {
            throw new Error(`Update failed: ${response.status}`);
        }

        console.log("User updated successfully");

        // Redirect to All Users page
        window.location.href = "AllUser.html";
        alert("User updated successfully!");


    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
    }
});
