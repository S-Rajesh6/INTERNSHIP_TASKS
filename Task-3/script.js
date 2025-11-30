/* File: script.js - Initialization Fix */

document.addEventListener('DOMContentLoaded', () => {
    // === CAROUSEL SETUP ===
    const imagesContainer = document.querySelector('.carousel-images');
    const carouselContainer = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalImages = images.length;

    // ... (rest of the carousel functions: updateCarousel, nextBtn.addEventListener, etc.)
    
    // Call updateCarousel immediately after everything is defined
    updateCarousel(); 

    // === API SETUP ===
    const jokeButton = document.getElementById('fetchJokeButton');
    // ... (rest of the API elements and functions)
    
    // Call initial API fetch
    fetchJoke(); 
    
    // Event listener for button interaction
    jokeButton.addEventListener('click', fetchJoke);
});

// The rest of the functions (updateCarousel, fetchJoke, etc.) should be defined 
// outside or inside this block, but ensuring variable scope is correct.