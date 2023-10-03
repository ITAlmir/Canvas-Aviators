// Get the canvas element within the "bg" div
const bgCanvas = document.getElementById('canvas');
const bgCtx = bgCanvas.getContext('2d');

// Get the barrel image element
const barrelImg = document.getElementById('barrel-img');

// Get the turret base image element
const baseImg = document.getElementById('base-img'); // Use the correct ID

// Create a separate canvas for the airplane animation
const airplaneCanvas = document.createElement('canvas');
const airplaneCtx = airplaneCanvas.getContext('2d');

// Preload the turret image
const turretImg = new Image();
turretImg.src = 'images/rocket3-removebg-preview.png';

// Preload the airplane image
const airplaneImage = new Image();
airplaneImage.src = 'images/airplane-removebg.png';
airplaneImage.width = 120;
airplaneImage.height = 15;
// Set canvas size
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;
airplaneCanvas.width = bgCanvas.width;
airplaneCanvas.height = bgCanvas.height;

// Cannon properties
const turretWidth = 180;
const turretHeight = 160; // Decreased turret height
const barrelWidth = 120;
const barrelHeight = 160; // Decreased barrel height
let originalBarrelWidth = turretWidth;

// Initialize cannon position (fixed position)
const turretX = bgCanvas.width / 2;
const turretY = (bgCanvas.height - (bgCanvas.height * 0.25)); // Adjusted turretY

let mouseX = turretX;
let mouseY = turretY;
let barrelAngle = 0;
let barrelScale = 1.0;

// Calculate the maximum and minimum y values
const maxHeight = bgCanvas.height * 0.65; // 65% of the height from the top
const minHeight = bgCanvas.height * 0.10; // 10% of the height from the top

let airx = bgCanvas.width + airplaneImage.width; // Use airplaneImage.width
let airy = Math.random() * (maxHeight - minHeight) + minHeight;
let airRandomDelay = Math.floor(Math.random() * 20000) + 1000;
// Define the speed of the airplane (pixels per frame)
let airSpeed = 13;
// ... (Previous code)
let missleSpeed = 20;

//boolean coallition vaiable
let isCoallition = true;

//scores increament
let scores = 0;
let rocketLoads = 3;
let level = 1;
let lastLevelScore = 0;

// Function to update the displayed scores, rocket loads, and level
function updateScoresAndRocketLoads() {
    // Get the elements by their IDs
    const scoresElement = document.getElementById('scores');
    const rocketLoadsElement = document.getElementById('rocket-loads');
    const levelElement = document.getElementById('game-level');

    if (scores >= lastLevelScore + 5) {
        airSpeed = airSpeed + 3;
        level = level + 1;
        lastLevelScore = scores;
    }

    // Update the content of the elements with the current values
    if (rocketLoads < 0) {
    } else {
        rocketLoadsElement.textContent = `Rockets: ${rocketLoads}`;
    }
    scoresElement.textContent = `Scores: ${scores}`;
    levelElement.textContent = `Level: ${level}`;
}


function startAirAnimationRandomly() {
    // Define the airAnimation function
    function airAnimation() {
        if (airx < bgCanvas.width && airx > 0 && isCoallition) {
            airRandomDelay = Math.floor(Math.random() * 20000) + 1000;
            createWavePeriodically();
        } else {
            clearInterval(waveInterval);
            waves = [];
        }
        // Clear the airplaneCanvas
        airplaneCtx.clearRect(0, 0, airplaneCanvas.width, airplaneCanvas.height);

        if(isCoallition){
            // Draw the airplane at the current position on the airplaneCanvas
            airplaneCtx.drawImage(airplaneImage, airx, airy, 120, 30);
        }
        // Transfer the airplaneCanvas content to the bgCanvas
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        drawCannon();
        bgCtx.drawImage(airplaneCanvas, 0, 0);

        if(!isCoallition){
            airx = -500;
        }else{
            // Update the x-coordinate for the next frame
        airx -= airSpeed;
        }
        

        // Check if the airplane has gone off the right side of the canvas
        if (airx < (0 - airplaneImage.width)) {
            setTimeout(() => {
                // Reset the x-coordinate to the left side of the canvas
                airx = bgCanvas.width + airplaneImage.width;
                airy = Math.random() * (maxHeight - minHeight) + minHeight;
                isCoallition = true;
                rocketLoads = 3;
                updateScoresAndRocketLoads();

            }, airRandomDelay / 2);
        }

        // Request the next frame
        requestAnimationFrame(airAnimation);
    }

    // Start the animation
    airAnimation();

}
    // Call the function to start the animation randomly after the image is loaded
    startAirAnimationRandomly();


// Function to draw the cannon
// Function to draw the cannon
function drawCannon() {
    // Clear the entire canvas
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    rocketLoadsCount();

    if (isCoallition && rocketLoadsCount()) {
        // Save the current canvas state
        bgCtx.save();

        // Translate the canvas to the turret's position
        bgCtx.translate(turretX, turretY);

        // Rotate the canvas based on the stored angle
        bgCtx.rotate(barrelAngle);

        // Draw the barrel image
        bgCtx.drawImage(barrelImg, -barrelWidth / 2, -barrelHeight + 30, barrelWidth, barrelHeight);

        // Restore the canvas state
        bgCtx.restore();
    }

    // Draw the turret base image (fixed position, no rotation)
    bgCtx.drawImage(baseImg, turretX - turretWidth / 2, turretY - turretHeight + 100, turretWidth, turretHeight);
}
drawCannon();

// Mousemove event listener to update the mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Calculate the new rotation angle based on mouse position
    barrelAngle = Math.atan2(mouseX - turretX, turretY - mouseY);
    drawCannon();
    rocketLoadsCount();
});

if(isCoallition && rocketLoadsCount()){
// Function to draw the barrel
function drawBarrel(barrelX, barrelY, angle, barrelScale) {
    rocketLoadsCount();
    // Clear the entire canvas
   // bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    
    // Calculate the new position of the barrel on the canvas
    const newX = barrelX + Math.cos(angle) * missleSpeed;
    const newY = barrelY + Math.sin(angle) * missleSpeed;

    barrelScale -= 0.005; // You can adjust the rate of scale change as needed

    // Ensure that the barrel scale factor doesn't go below a certain minimum value
    if (barrelScale < 0.33) {
        barrelScale = 0.33; // Minimum scale is 1/3
    }

   
    // Use the stored rotation angle to draw the barrel
    bgCtx.save();
    bgCtx.translate(barrelX, barrelY);
    bgCtx.rotate(barrelAngle); // Use the stored angle
    bgCtx.scale(barrelScale, barrelScale);  
    bgCtx.drawImage(barrelImg, -originalBarrelWidth / 2, -barrelHeight / 2, originalBarrelWidth, barrelHeight);    
    bgCtx.restore();


    
    // Request the next frame for animation
    requestAnimationFrame(() => drawBarrel(newX, newY, angle, barrelScale));
    isColliding(barrelX,barrelY);
    if(isColliding(barrelX,barrelY)){

        isCoallition = false;
        rocketLoads = 0;

        let particleCount = 200;
        let angleIncrement = Math.PI * 2 / particleCount;
        let power = 10;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(airx, airy, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
                x: Math.cos(angleIncrement * i) * Math.random() * power,
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }));
        }
        animate();
         // Increment the score only once for this collision
         scores++;
        updateScoresAndRocketLoads();
    }

}
}
if(rocketLoads > 0 && isCoallition){
// Add a click event listener to the document
document.addEventListener('click', (e) => {
    //decrease shootingLoads
    rocketLoads--;
    updateScoresAndRocketLoads();
   rocketLoadsCount();
    // Reset the barrel scale factor to its original value
    barrelScale = 1.0;
    
    if(rocketLoadsCount()){
    // Calculate the angle between the turret and the mouse pointer
    const angle = Math.atan2(e.clientY - turretY, e.clientX - turretX);
   
    // Set the initial position of the barrel to match the turret's position
    const barrelX = turretX;
    const barrelY = turretY;

    
    // Start updating the barrel's position
    drawBarrel(barrelX, barrelY, angle, barrelScale);
}
});
}


function isColliding(barrelX, barrelY) {
    return (
        barrelX < airx + airplaneImage.width &&
        barrelX + (barrelWidth/4) > airx &&
        barrelY < airy + airplaneImage.height &&
        barrelY + (barrelHeight/4) > airy
    );
}

function rocketLoadsCount(){

    if(rocketLoads < 0){
        return false;
    }
    return true;
}

updateScoresAndRocketLoads();



