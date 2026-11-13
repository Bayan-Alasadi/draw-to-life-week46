// This is my interactive PixiJS experiment.
// I wanted to create something simple using blue colors.

import { Application, Graphics }
from 'https://cdn.jsdelivr.net/npm/pixi.js@8.22.0/dist/pixi.mjs';


// Elements from my HTML file
const box = document.querySelector('#pixi-box');

const layer = document.querySelector('#pixi-container');

const loading = document.querySelector('#canvas-loading');

const status = document.querySelector('#art-status');

const clearButton = document.querySelector('#clear-art');


// My color palette
const palette = [
    0x174f80,
    0x3d8bc2,
    0x70b7e4,
    0x9ad5f4
];


// Variables for the animation
let app;

let particles = [];

let ripples = [];

let pointer = {
    x: 0,
    y: 0
};

let pointerMoved = false;

let lastTrail = 0;


// This function creates small circles.
function makeDot(x, y, burst = false) {

    if (!app || particles.length > 180) {
        return;
    }

    const dot = new Graphics();

    const radius = 2 + Math.random() * (burst ? 7 : 4);

    const color = palette[
        Math.floor(Math.random() * palette.length)
    ];

    dot.circle(0, 0, radius).fill({
        color: color,
        alpha: 0.45 + Math.random() * 0.4
    });

    dot.position.set(x, y);

    app.stage.addChild(dot);


    // Random direction for each dot
    const direction = Math.random() * Math.PI * 2;

    const speed = burst
        ? 1.4 + Math.random() * 2.7
        : 0.3 + Math.random() * 0.9;


    particles.push({

        g: dot,

        vx: Math.cos(direction) * speed,

        vy: Math.sin(direction) * speed - 0.25,

        life: burst ? 110 : 68,

        maxLife: burst ? 110 : 68

    });

}


// This function creates a ripple when I click.
function addRipple(x, y) {

    if (!app) {
        return;
    }

    const graphics = new Graphics();

    graphics.position.set(x, y);

    app.stage.addChild(graphics);


    ripples.push({

        graphics: graphics,

        radius: 2,

        life: 75

    });


    // Create more dots when clicking
    for (let i = 0; i < 22; i++) {

        makeDot(x, y, true);

    }


    status.textContent =
        'New pattern created! Click again or move your mouse.';

}


// Get the mouse position inside the canvas
function position(event) {

    const rect = box.getBoundingClientRect();

    return {

        x: (event.clientX - rect.left)
            * app.screen.width / rect.width,

        y: (event.clientY - rect.top)
            * app.screen.height / rect.height

    };

}


// Clear everything from the canvas
function resetArtwork() {

    for (const item of particles) {

        app.stage.removeChild(item.g);

        item.g.destroy();

    }

    for (const item of ripples) {

        app.stage.removeChild(item.graphics);

        item.graphics.destroy();

    }

    particles = [];

    ripples = [];


    status.textContent =
        'Art cleared. Move your mouse or click to make something new.';

}


// Start PixiJS
async function start() {

    app = new Application();

    await app.init({

        resizeTo: box,

        backgroundAlpha: 0,

        antialias: true,

        resolution: Math.min(
            window.devicePixelRatio || 1,
            2
        )

    });


    // Add the PixiJS canvas to my website
    layer.appendChild(app.canvas);

    loading.remove();


    pointer = {

        x: app.screen.width / 2,

        y: app.screen.height / 2

    };


    // Create one pattern when the page starts
    addRipple(pointer.x, pointer.y);


    status.textContent =
        'Move your mouse across the canvas. Click to create a new pattern.';


    // Mouse movement
    box.addEventListener('pointermove', event => {

        pointer = position(event);

        pointerMoved = true;

        const now = performance.now();


        // Create a trail of dots
        if (now - lastTrail > 28) {

            makeDot(pointer.x, pointer.y);

            lastTrail = now;

        }

    });


    // Stop creating dots when mouse leaves
    box.addEventListener('pointerleave', () => {

        pointerMoved = false;

    });


    // Create a new ripple when clicking
    box.addEventListener('pointerdown', event => {

        const p = position(event);

        addRipple(p.x, p.y);

    });


    // Clear button
    clearButton.addEventListener('click', resetArtwork);


    // Animation loop
    app.ticker.add(ticker => {

        const delta = Math.min(ticker.deltaTime, 2);


        // Animate the dots
        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.g.x += p.vx * delta;

            p.g.y += p.vy * delta;

            p.life -= delta;

            p.g.alpha = Math.max(
                0,
                p.life / p.maxLife
            );


            // Remove dots when their animation ends
            if (p.life <= 0) {

                app.stage.removeChild(p.g);

                p.g.destroy();

                particles.splice(i, 1);

            }

        }


        // Animate the ripples
        for (let i = ripples.length - 1; i >= 0; i--) {

            const r = ripples[i];

            r.radius += delta * 1.7;

            r.life -= delta;

            r.graphics.clear();


            // Outer circle
            r.graphics.circle(0, 0, r.radius).stroke({

                width: 2.5,

                color: 0x397eb4,

                alpha: Math.max(0, r.life / 130)

            });


            // Inner circle
            r.graphics.circle(0, 0, r.radius * 0.6).stroke({

                width: 1.2,

                color: 0x75b9e7,

                alpha: Math.max(0, r.life / 190)

            });


            // Remove the ripple when it disappears
            if (r.life <= 0) {

                app.stage.removeChild(r.graphics);

                r.graphics.destroy();

                ripples.splice(i, 1);

            }

        }


        // Add extra dots while moving the mouse
        if (pointerMoved && Math.random() < 0.09) {

            makeDot(pointer.x, pointer.y);

        }

    });

}


// Run the interactive artwork
start().catch(error => {

    console.error('PixiJS loading error:', error);

    loading.textContent =
        'Interactive art could not load. Please check your connection.';

    status.textContent = 'PixiJS is not ready.';

});