// Import User
import { User } from "./class/User.js";
let user = new User();

// Get DOM
let username_input = document.querySelector("#username");
let email_input = document.querySelector("#email");
let password_input = document.querySelector("#password");
let confirmPassword_input = document.querySelector("#confirmPassword");
let error = document.querySelector("#error");
let btn = document.querySelector(".btn.btn-dark");

// Add keydown event listener to window
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click(); // Trigger button click event
  }
});

btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = email_input.value;
  const username = username_input.value;
  const password = password_input.value;
  const confirmPassword = confirmPassword_input.value;

  try {
    // Check if email exists
    const emailExists = await user.checkEmailExists(email);
    if (emailExists) {
      error.style.display = "block";
      error.textContent = "Email already exists.";
      return;
    }

    // Check if username exists
    const usernameExists = await user.checkUsernameExists(username);
    if (usernameExists) {
      error.style.display = "block";
      error.textContent = "Username already exists.";
      return;
    }

    // Verify Password
    if (password !== confirmPassword) {
      error.style.display = "block";
      error.textContent = "Passwords do not match.";
      return;
    }

    // Register User
    await user.signup(username, email, password);
    // Redirect to login page
    window.location.href = "../login.html";
  } catch (error) {
    // Handle any errors
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
});