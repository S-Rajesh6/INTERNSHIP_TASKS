/* File: script.min.js (Dynamic & Optimized JavaScript) */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data for Blog Posts ---
    const allPostsData = [
        { id: 1, title: "Getting Started with Frontend Frameworks", content: "Explore the basics of React, Vue, and Angular for modern web development. Learn about component-based architecture and state management.", category: "frontend", image: "https://via.placeholder.com/600x400/3498db/ffffff?text=Frontend+Frameworks", author: "Jane Doe", date: "2023-10-26" },
        { id: 2, title: "Backend Development with Node.js and Express", content: "Dive into building robust APIs using Node.js and Express. Understand routing, middleware, and connecting to databases.", category: "backend", image: "https://via.placeholder.com/600x400/2ecc71/ffffff?text=Node.js+Backend", author: "John Smith", date: "2023-10-20" },
        { id: 3, title: "Dockerizing Your Web Application for Deployment", content: "A practical guide to containerizing your app with Docker. Learn to create Dockerfiles and manage images and containers.", category: "devops", image: "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Docker+DevOps", author: "Alice Brown", date: "2023-10-15" },
        { id: 4, title: "The Future of Web Development: AI and Beyond", content: "Speculations and current trends shaping the future of web development, including the impact of AI on coding and design.", category: "thoughts", image: "https://via.placeholder.com/600x400/f1c40f/333333?text=Web+Future", author: "Bob White", date: "2023-10-01" },
        { id: 5, title: "Optimizing Web Performance: A Checklist", content: "A comprehensive checklist for boosting your website's speed and efficiency. Covers lazy loading, image optimization, and caching.", category: "frontend", image: "https://via.placeholder.com/600x400/9b59b6/ffffff?text=Web+Performance", author: "Jane Doe", date: "2023-09-28" },
        { id: 6, title: "Understanding RESTful APIs: A Practical Guide", content: "Learn the principles of RESTful API design and how to consume them effectively in your applications.", category: "backend", image: "https://via.placeholder.com/600x400/1abc9c/ffffff?text=REST+API", author: "John Smith", date: "2023-09-20" },
        { id: 7, title: "Continuous Integration & Deployment with GitHub Actions", content: "Automate your development workflow with CI/CD pipelines using GitHub Actions for seamless deployments.", category: "devops", image: "https://via.placeholder.com/600x400/34495e/ffffff?text=GitHub+Actions", author: "Alice Brown", date: "2023-09-10" },
        { id: 8, title: "My Journey into Open Source Contributions", content: "Sharing my personal experiences and tips for getting started with contributing to open source projects.", category: "thoughts", image: "https://via.placeholder.com/600x400/e67e22/ffffff?text=Open+Source", author: "Bob White", date: "2023-09-05" },
    ];
    
    const postsPerPage = 4;
    let currentPage = 1;
    let currentFilteredPosts = [];

    const postsContainer = document.getElementById('postsContainer');
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // --- Dynamic Content Rendering (Step 1) ---
    function renderPosts(postsToRender, append = false) {
        if (!append) {
            postsContainer.innerHTML = ''; // Clear existing posts if not appending
            currentPage = 1;
            // Optionally, scroll to the top of the posts container
            // document.getElementById('controls-and-posts').scrollIntoView({ behavior: 'smooth' });
        }

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = currentPage * postsPerPage;
        const postsBatch = postsToRender.slice(startIndex, endIndex);

        if (postsBatch.length === 0 && !append) {
            postsContainer.innerHTML = '<p class="loading-message">No posts found matching your criteria.</p>';
        }

        postsBatch.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            
            // The HTML structure ensures safe image loading via loading="lazy" (Step 2)
            card.innerHTML = `
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="post-image" 
                     loading="lazy"> 
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <span class="category-tag">${post.category}</span>
            `;
            postsContainer.appendChild(card);
        });

        // Update the Load More button visibility
        if (endIndex >= postsToRender.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // --- Dynamic Features: Search and Filter (Step 1) ---
    function applySearchAndFilter() {
        const query = searchBar.value.toLowerCase().trim();
        const category = categoryFilter.value;

        currentFilteredPosts = allPostsData.filter(post => {
            const matchesQuery = post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || post.category === category;
            return matchesQuery && matchesCategory;
        });

        renderPosts(currentFilteredPosts, false); // Render fresh batch from page 1
    }

    // --- Load More Functionality ---
    function loadMorePosts() {
        currentPage++;
        renderPosts(currentFilteredPosts, true); // Append next batch
    }

    // --- Mobile Menu Toggle ---
    function toggleMenu() {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open');
    }

    // --- Event Listeners and Initial Load ---
    searchBar.addEventListener('input', applySearchAndFilter);
    categoryFilter.addEventListener('change', applySearchAndFilter);
    loadMoreBtn.addEventListener('click', loadMorePosts);
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked (on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Initial display of posts
    currentFilteredPosts = [...allPostsData]; // Start with all posts
    renderPosts(currentFilteredPosts, false);
});
