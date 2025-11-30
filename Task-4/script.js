/* File: script.js */

document.addEventListener('DOMContentLoaded', () => {

    // --- Data Mockup (Step 3) ---
    const products = [
        { id: 1, name: "Smart Watch", price: 299.99, category: "tech", rating: 4.5 },
        { id: 2, name: "Gaming Headset", price: 89.50, category: "tech", rating: 3.9 },
        { id: 3, name: "Casual T-Shirt", price: 25.00, category: "apparel", rating: 4.8 },
        { id: 4, name: "Wireless Speaker", price: 149.99, category: "tech", rating: 4.2 },
        { id: 5, name: "Throw Blanket", price: 45.00, category: "home", rating: 4.7 },
        { id: 6, name: "Denim Jeans", price: 65.00, category: "apparel", rating: 4.1 },
    ];

    // ===========================================
    // Step 3: Product Listing, Filtering, & Sorting
    // ===========================================
    const productList = document.getElementById('productList');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOption = document.getElementById('sortOption');

    function renderProducts(currentProducts) {
        productList.innerHTML = ''; // Clear existing products
        if (currentProducts.length === 0) {
            productList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No products match your criteria.</p>';
            return;
        }

        currentProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="rating">Rating: ${'★'.repeat(Math.round(product.rating))} (${product.rating})</p>
            `;
            productList.appendChild(card);
        });
    }

    function applyFiltersAndSorting() {
        let filteredProducts = [...products]; // Start with a copy of all products
        const selectedCategory = categoryFilter.value;
        const selectedSort = sortOption.value;

        // 1. Filtering by Category
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }

        // 2. Sorting
        if (selectedSort === 'name') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSort === 'price_low') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(filteredProducts);
    }

    // Attach listeners for filtering and sorting
    categoryFilter.addEventListener('change', applyFiltersAndSorting);
    sortOption.addEventListener('change', applyFiltersAndSorting);
    
    // Initial load of products
    applyFiltersAndSorting();


    // ===========================================
    // Step 2: To-Do List with Local Storage
    // ===========================================
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const LOCAL_STORAGE_KEY = 'portfolio_todos';

    // Helper to get todos from Local Storage
    function getTodos() {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        // Returns an empty array if nothing is stored
        return storedTodos ? JSON.parse(storedTodos) : []; 
    }

    // Helper to save todos to Local Storage
    function saveTodos(todos) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }

    // Renders the list from the current array of tasks
    function renderTodoList() {
        todoList.innerHTML = '';
        const todos = getTodos();
        
        if (todos.length === 0) {
            todoList.innerHTML = '<li>No tasks yet! Add one above.</li>';
            return;
        }

        todos.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        const todos = getTodos();
        todos.push(taskText);
        saveTodos(todos);
        
        todoInput.value = ''; // Clear input
        renderTodoList();
    }

    // Function to delete a task
    function deleteTask(event) {
        if (event.target.classList.contains('delete-btn')) {
            const indexToDelete = parseInt(event.target.dataset.index);
            const todos = getTodos();
            
            // Remove the task at the specified index
            todos.splice(indexToDelete, 1);
            saveTodos(todos);
            
            renderTodoList();
        }
    }

    // Attach event listeners for To-Do App
    addTodoBtn.addEventListener('click', addTask);
    todoList.addEventListener('click', deleteTask);
    
    // Load tasks from Local Storage on page load
    renderTodoList();
});