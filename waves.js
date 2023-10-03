var waveCanvas = document.getElementById('movement-display')
var c = waveCanvas.getContext('2d')

waveCanvas.width = innerWidth
waveCanvas.height = innerHeight

let wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01,
    saturation: 50
}


let waves = [];

// Add initial wave(s) to the array
waves.push({
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01,
    saturation: 50,
});

// Add more waves dynamically
function addWave() {
    waves.push({
        y: canvas.height / 2,
        length: 0.01,
        amplitude: 100,
        frequency: 0.01 + Math.random() * 0.02,
        saturation: 50,
    });

    if (waves.length > 5) {
        waves.shift(); // Remove the oldest wave
    }
    
}

// Function to update and draw all waves
function animateWaves() {
    requestAnimationFrame(animateWaves);

    c.clearRect(0, 0, canvas.width, canvas.height);

    waves.forEach((wave, waveIndex) => {
        c.beginPath();
        c.moveTo(0, wave.y);

        for (let i = 0; i < canvas.width; i++) {
            wave.y = canvas.height / 2 + Math.sin(i * wave.frequency + waveIndex * 100) * wave.amplitude;

            // Apply saturation effect
            c.strokeStyle = 'lightblue';
           

            c.lineTo(i, wave.y);
        }

        c.stroke();
    });
}

// Start the animation
animateWaves();



// Set an interval to create waves every 0.5 seconds (500 milliseconds)
const waveInterval = setInterval(createWavePeriodically, 500);

// Optionally, you can clear the interval after a certain number of waves
const maxWaves = 10; // Adjust this number as needed
let waveCount = 0;

function createWavePeriodically() {
    addWave();
    
    // Increase amplitude for the newly added wave
    const newWave = waves[waves.length - 1];
    newWave.amplitude += 170; // You can adjust the amplitude change
    
    // Increment the wave count and clear the interval if needed
    waveCount++;
    if (waveCount >= maxWaves) {
        clearInterval(waveInterval);
    }
}