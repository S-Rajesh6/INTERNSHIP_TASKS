/* File: script.js */

// 1. Get a reference to the button element using its ID
const button = document.getElementById('alertButton');

// 2. Define the function to run when the button is clicked
function showAlert() {
    // Implement the simple interaction: trigger an alert message
    alert('Button was clicked! This is the basic JavaScript interactivity.');
}

// 3. Attach the function to the button's click event
button.addEventListener('click', showAlert);

// Confirmation message in the console
console.log('JavaScript is running and listening for button clicks.')