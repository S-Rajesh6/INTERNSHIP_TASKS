/* File: script.js */

// ===================================
// Step 2: JavaScript Form Validation
// ===================================

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting normally
    
    // Clear previous errors
    clearErrors();

    if (validateForm()) {
        alert('Form Submitted Successfully! (In a real app, data would be sent to a server)');
        form.reset(); // Clear the form after success
    } else {
        alert('Please correct the errors in the form.');
    }
});

function validateForm() {
    let isValid = true;
    
    // Check Name (Required Field)
    if (nameInput.value.trim() === '') {
        displayError('nameError', 'Name is required.');
        isValid = false;
    }

    // Check Email (Required and Format)
    if (emailInput.value.trim() === '') {
        displayError('emailError', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError('emailError', 'Please enter a valid email format.');
        isValid = false;
    }

    // Check Message (Required Field)
    if (messageInput.value.trim() === '') {
        displayError('messageError', 'Message is required.');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    // Basic regex for email format checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}


// ===================================
// Step 4: Dynamic To-Do List (DOM Manipulation)
// ===================================

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create new list item (li)
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${taskText} 
            <button class="delete-btn">Remove</button>
        `;
        
        // Add the new item to the list (DOM Manipulation)
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    } else {
        alert('Please enter a task before adding.');
    }
}

function deleteTask(e) {
    // Check if the clicked element is a delete button
    if (e.target.classList.contains('delete-btn')) {
        // Remove the parent <li> element (DOM Manipulation)
        const listItem = e.target.parentElement;
        taskList.removeChild(listItem);
    }
}