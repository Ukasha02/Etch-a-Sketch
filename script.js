let eraserMode = false;

// Function to create a grid
function createGrid(size) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing grid
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.width = '640px'; // Adjust width if needed
    container.style.border = '1px solid black';

    const squareSize = 640 / size; // Calculate size of each square

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.style.width = `${squareSize}px`;
        div.style.height = `${squareSize}px`;
        div.style.border = '1px solid gray'; // Optional: For better visibility
        div.style.boxSizing = 'border-box';
        div.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Initial color set to white

        // Add hover effect to change background color with random RGB and darken progressively
        div.addEventListener('mouseenter', () => {
            if (eraserMode) {
                div.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Erase color
                div.style.opacity = 1.0; // Reset opacity
            } else {
                if (!div.dataset.darkness) {
                    div.dataset.darkness = 1.0; // Initial opacity value
                }
                
                // Generate a random RGB color
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

                // Reduce opacity by 0.1 each interaction until fully dark
                div.dataset.darkness -= 0.1;
                div.style.opacity = div.dataset.darkness;
            }
        });

        container.appendChild(div);
    }
}

// Initial grid setup
document.addEventListener('DOMContentLoaded', () => {
    createGrid(16); // Create a default 16x16 grid
});

// Button functionality to create a new grid
document.getElementById('newGridButton').addEventListener('click', () => {
    const sizeInput = document.getElementById('gridSizeInput').value;
    let size = parseInt(sizeInput);
    if (size && size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a valid number between 1 and 100.");
    }
});

// Button functionality to toggle eraser mode
document.getElementById('eraserButton').addEventListener('click', () => {
    eraserMode = !eraserMode;
    document.getElementById('eraserButton').textContent = eraserMode ? 'Eraser Mode: ON' : 'Eraser Mode: OFF';
});
