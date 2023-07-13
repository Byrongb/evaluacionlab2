const profileContainer = document.getElementById("profile-container");

function createProfileComponent(profile) {
  const profileBox = document.createElement("div");
  profileBox.className = "profile-box";

  const profilePicture = document.createElement("div");
  profilePicture.className = "profile-picture";

  const usernameField = document.createElement("div");
  usernameField.className = "profile-field";
  usernameField.textContent = "Username: " + profile.username;

  const emailField = document.createElement("div");
  emailField.className = "profile-field";
  emailField.textContent = "Email: " + profile.email;

  const phoneField = document.createElement("div");
  phoneField.className = "profile-field";
  phoneField.textContent = "Phone: " + profile.phone;

  const companyField = document.createElement("div");
  companyField.className = "profile-field";
  companyField.textContent = "Company: " + profile.company.name;

  profileBox.appendChild(profilePicture);
  profileBox.appendChild(usernameField);
  profileBox.appendChild(emailField);
  profileBox.appendChild(phoneField);
  profileBox.appendChild(companyField);

  profileContainer.appendChild(profileBox);
}

async function fetchProfiles(page = 1) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const profile = data[i];
      createProfileComponent(profile);
    }

    if (data.length === 5) {
      fetchProfiles(page + 1);
    }
  } catch (error) {
    console.log("Error al obtener los perfiles:", error);
  }
}

const allUsersButton = document.getElementById("all-users-button");
allUsersButton.addEventListener("click", () => {
  profileContainer.innerHTML = "";
  fetchProfiles();
});