document.addEventListener("DOMContentLoaded", () => {
    // This function fetches data from the backend and updates the UI
    const fetchAndRenderData = async () => {
        try {
            // Use the service name 'backend' from the Docker network as the hostname
            const response = await fetch("http://backend:5000/api/data");
            const users = await response.json();

            const userList = document.getElementById("user-list");
            userList.innerHTML = ""; // Clear existing list

            users.forEach(user => {
                const li = document.createElement("li");
                li.textContent = `ID: ${user.id}, Name: ${user.name}`;
                userList.appendChild(li);
            });
        } catch (error) {
            console.error("Failed to fetch data from backend:", error);
            const userList = document.getElementById("user-list");
            userList.innerHTML = "<li>Error loading data. Is the backend running?</li>";
        }
    };

    // This function handles form submissions to create new users
    const addUserForm = document.getElementById("add-user-form");
    if (addUserForm) {
        addUserForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("name-input");
            const name = nameInput.value;

            try {
                const response = await fetch("http://backend:5000/api/data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name }),
                });

                if (response.ok) {
                    nameInput.value = ""; // Clear input
                    fetchAndRenderData(); // Refresh the data list
                } else {
                    console.error("Failed to add user.");
                }
            } catch (error) {
                console.error("Failed to post data to backend:", error);
            }
        });
    }

    // Initial fetch to populate the list on page load
    fetchAndRenderData();
});
