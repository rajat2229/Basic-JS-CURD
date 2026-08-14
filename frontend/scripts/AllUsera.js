const userscontainer = document.querySelector("#userContainer");

async function getAllUsers() {
    try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function displayUsers(users) {
    userscontainer.innerHTML = ""; // Clear previous content
    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-card";
        userDiv.innerHTML = `
            <figure class='user-figure'>${user.username[0].toUpperCase()}</figure>
             <!--<h1>Id: ${user.id}</h1>-->
            <h2>Name:${user.username}</h2>
            <p>Email: ${user.email}</p>
             <!-- show encripted password -->
            
            <p>Password : ${user.password}</p>
            <button class="btn" id="editUser" onclick="edituser(${user.id})">Edit</button>
            <button class="btn" id="deleteUser" onclick="deleteUser(${user.id})">Delete</button>

        `;
        userscontainer.append(userDiv);
    });
}

document.getElementById("getAllUsers").addEventListener("click", getAllUsers);

async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Refresh the user list after deletion
        alert("User deleted successfully!");
        getAllUsers();
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

function edituser(id) {
    // Redirect to the edit user page with the user ID as a query parameter
    window.location.href = `EditUser.html?id=${id}`;
}   