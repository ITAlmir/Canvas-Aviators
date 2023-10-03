const canvasFirework = document.getElementById('canvas');
const conFw = canvasFirework.getContext('2d');

canvasFirework.width = innerWidth;
canvasFirework.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

addEventListener('resize', () => {
    canvasFirework.width = innerWidth;
    canvasFirework.height = innerHeight;
    init();
});

let gravity = 0.005;
let friction = 0.99;

// Objects
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        conFw.save();
        conFw.globalAlpha = this.alpha;
        conFw.beginPath();
        conFw.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        conFw.fillStyle = this.color;
        conFw.fill();
        conFw.closePath();
        conFw.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

// Implementation
let particles;

function init() {
    particles = [];
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    conFw.fillStyle = 'rgba(0, 0, 0, 0)';
    conFw.fillRect(0, 0, canvasFirework.width, canvasFirework.height);

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
        } else {
            particles.splice(i, 1);
        }
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particles.splice(i, 1);
      }
    });
}

  init();
  animate();

// addEventListener('click', (event) => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
//     let particleCount = 500;
//     let angleIncrement = Math.PI * 2 / particleCount;
//     let power = 10;

//     for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
//             x: Math.cos(angleIncrement * i) * Math.random() * power,
//             y: Math.sin(angleIncrement * i) * Math.random() * power
//         }));
//     }
// });
