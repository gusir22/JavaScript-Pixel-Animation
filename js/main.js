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
spriteMaxFrame =  12; // the number of frames of the sprite starting from 0
const spriteWidth = 32;
const spriteHeight = 32;
let frameX = 0; // tracks the current frame to print from the sprite in the x axis
let animationFrame = 0; // tracks the current animation frame and default starts at 0

/*
staggers the frame rate animation in the animation function.
The animation will move to the next sprite frame every x value of staggerAnimation, staggering
the animation by x number of animationFrame cycles.
if staggerAnimation = 5, then the animate function will only move to the next sprite frame
after 5 animationFrame cycles
*/
const staggerAnimation = 4;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear the previous frame drawing and reset

    /*
    this portion controls the speed at which the animation moves through the sprite frame image.

    The position variable divides the current animationFrame value by the determined staggerAnimation
    value and then wraps it in a floor function. We then divide that floored value by the number of frames
    the source sprite image has starting from 0. Finally, we set the value of frameX to the spriteWidth by
    the value produced in the position variable.

    This makes it so that as the animate function loops and the animationFrame value increases by one
    at the end of the animate function, we essentially stagger the cycle of moving the frame drawn
    by one every so staggerAnimation value and repeat the cycle within the sprite frame limit with
    the use of the modulos.

    Ex:

    If staggerAnimation = 5 and spriteMaxFrame = 6...

        [-] FrameX will increase by one in value every 5 animationFrames.
            "Math.Floor(animationFrame/staggerAnimation)"
                    0/5 = 0     |    Math.Floor(0) = 0  <== START OF FIRST FRAMEX
                    1/5 = 0.2   |    Math.Floor(0.2) = 0
                    2/5 = 0.4   |    Math.Floor(0.4) = 0
                    3/5 = 0.6   |    Math.Floor(0.6) = 0
                    4/5 = 0.8   |    Math.Floor(0.8) = 0
                    5/5 = 1     |    Math.Floor(1) = 1  <== FIRST CHANGE OF FRAMEX, continues...
                    6/5 = 1.2   |    Math.Floor(1.2) = 1

        [-] Position value will increase by one until the sprite image frame limit is reached and
        resets back to 0. "Math.Floor(animationFrame/staggerAnimation) % spriteMaxFrame;"
                    0%6 = 0  <== START OF FIRST POSITION
                    0%6 = 0
                    0%6 = 0
                    0%6 = 0
                    0%6 = 0
                    1%6 = 1  <== FIRST CHANGE OF POSITION
                    1%6 = 1
                    ...
                    ...
                    2%6 = 2  <== SECOND CHANGE OF POSITION
                    ...
                    ...
                    3%6 = 3  <== THIRD CHANGE OF POSITION
                    ...
                    ...
                    4%6 = 4  <== FOURTH CHANGE OF POSITION
                    ...
                    ...
                    5%6 = 5  <== FIFTH CHANGE OF POSITION
                    ...
                    ...
                    6%6 = 0  <== FIRST RESET OF POSITION
                    ...
                    ...
                    7%6 = 1  <== FIRST CHANGE OF POSITION OF RESET, continues forever resetting every 6...


    */
    let position = Math.floor(animationFrame/staggerAnimation) % spriteMaxFrame;
    frameX = spriteWidth * position;

    // draw current object into canvas frame
    ctx.drawImage(spriteImage, frameX, 0, spriteWidth, spriteHeight, 100, 45, CAT_WIDTH, CAT_HEIGHT);

    animationFrame++; // count current animationFrame to memory
    requestAnimationFrame(animate); // calls itself again to begin animation loop
};

animate();