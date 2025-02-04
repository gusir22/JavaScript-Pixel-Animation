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
spriteMaxFrame =  13 - 1; // 13 is the number of frames in jumpcatt.png, the minus 1 is to prevent the blank frame to appear and cause the animation to blink
const spriteWidth = 32;
const spriteHeight = 32;
let frameX = 0; // tracks the current frame to print from the sprite in the x axis
let spriteFrame = 0;
const staggerAnimation = 4;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(spriteImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 100, 45, CAT_WIDTH, CAT_HEIGHT);
    if (spriteFrame % staggerAnimation == 0) {
        if (frameX < spriteMaxFrame) {
            frameX++; // move to next frame
        } else {
            frameX = 0; // reset to zero
        }
    }

    spriteFrame++;
    requestAnimationFrame(animate);
};

animate();