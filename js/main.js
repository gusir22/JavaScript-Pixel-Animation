// Update user selections ///////////////////////////////////////////////////////////////////////////
let spriteType = 'Batman'; // default start spriteType
const dropdown = document.getElementById('sprite-types'); // find dropdown object
// create change event listener to update the spriteType in the spriteImg src
dropdown.addEventListener('change', function(e){
    spriteType = e.target.value; // update value
    updateAnimationStates(); // save updated value for next frame
})


let spriteState = 'idle'; // default start spriteState
const radioGroup = document.querySelectorAll('input[name="sprite-state'); // find radio objects
radioGroup.forEach(radio => { // iterate through all radio inputs
    // create change event listener to update the spriteState in the spriteImg src
    radio.addEventListener('change', function(){
        spriteState = this.value; // update value
        updateAnimationStates(); // save updated value for next frame
    });
});


// Canvas setup ////////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById('canvas1'); // get canvas element
const ctx = canvas.getContext('2d'); // save 2d drawing methods to ctx variable
const CANVAS_WIDTH = 480; // how wide we want the canvas to be
const CANVAS_HEIGHT = 480; // how tall we want the canvas to be
const SPRITE_RATIO = 3; // this multiplies the dimensions of the sprite by the value given
const FRAME_WIDTH = 32 * SPRITE_RATIO; // sets the frame width for when the sprite is drawn later
const FRAME_HEIGHT = 32 * SPRITE_RATIO; // sets the frame height for when the sprite is drawn later
let animationFrame = 0; // will keep track of what frame we are in the animation
/*
staggers the frame rate animation in the animation function.
The animation will move to the next sprite frame every x value of staggerAnimation, staggering
the animation by x number of animationFrame cycles.
if staggerAnimation = 5, then the animate function will only move to the next sprite frame
after 5 animationFrame cycles
*/
const staggerAnimation = 4;

// Sprite set up ////////////////////////////////////////////////////////////////////////////////////////
let spriteImage = new Image(); // create a spriteImage instance to draw later on
const spriteWidth = 32; // set to the width of an individual frame of the sprite sheet object
const spriteHeight = 32; // set to the height of an individual frame of the sprite sheet object

const spriteAnimations = []; // init empty list to store spriteAnimations data in updateAnimationStates function

function updateAnimationStates() {
    /**
    * updates the data for each animation state
    **/
    const animationStates = [
        {
            name: 'idle',
            frames: 7,
            src: `sprites/ALLCats/${spriteType}/idle.png`,
        },
        {
            name: 'jump',
            frames: 13,
            src: `sprites/ALLCats/${spriteType}/jump.png`,
        },
    ];

    animationStates.forEach((state, index) => {  // for each animation state
        let frames = { // create a data set
            loc: [], // init empty list to store sprite coordinates
            src: state.src, // set the frame sprite sheet src
        }
        // loop through each frame in the sprite sheet and add their x and y location to the loc list
        for (let j = 0; j < state.frames; j++) {
            let positionX = j * spriteWidth;
            let positionY = 0; // for single line sprite sheets
            // let positionY = index * spriteHeight;  // for multiline sprite sheets
            frames.loc.push({x:positionX, y:positionY});
        }
        // save the state data to the spriteAnimations list for rendering
        spriteAnimations[state.name] = frames;
    });
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear the previous frame drawing and reset

    /*
    this portion controls the speed at which the animation moves through the sprite frame image.

    The position variable divides the current animationFrame value by the determined staggerAnimation
    value and then wraps it in a floor function. We then divide that floored value by the current length
    of the spriteAnimation. Finally, we set the value of frameX to the spriteWidth by
    the value produced in the position variable.

    This makes it so that as the animate function loops and the animationFrame value increases by one
    at the end of the animate function, we essentially stagger the cycle of moving the frame drawn
    by one every so staggerAnimation value and repeat the cycle within the sprite frame limit with
    the use of the modulus operator.

    Ex:

    If staggerAnimation = 5 and spriteAnimations[spriteState].loc.length = 6...

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
    let position = Math.floor(animationFrame/staggerAnimation) % spriteAnimations[spriteState].loc.length;
    let frameX = spriteWidth * position; // set current sprite image x coordinate
    let frameY = spriteAnimations[spriteState].loc[position].y; // set current sprite image y coordinate
    spriteImage.src = spriteAnimations[spriteState].src; // set current sprite image src

    // draw current object into canvas frame
    ctx.drawImage(spriteImage, frameX, frameY,
        spriteWidth, spriteHeight, 100, 45, FRAME_WIDTH, FRAME_HEIGHT);

    animationFrame++; // count current animationFrame to memory
    requestAnimationFrame(animate); // calls itself again to begin animation loop
};

updateAnimationStates();
animate();