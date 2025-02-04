// Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;
const SPRITE_RATIO = 3;
const CAT_WIDTH = 32 * SPRITE_RATIO;
const CAT_HEIGHT = 32 * SPRITE_RATIO;

// Sprite set up
const spriteImage = new Image();
spriteImage.src = 'sprites/ALLCats/BatmanCatFree/JumpCattt.png';
const spriteWidth = 32;
const spriteHeight = 32;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(spriteImage, 0, 0, spriteWidth, spriteHeight, 100, 45, CAT_WIDTH, CAT_HEIGHT);
    requestAnimationFrame(animate);
};

animate();