const   canvas      =   document.getElementById("canvas")
const   ctx         =   canvas.getContext("2d")

let     resx        =   window.innerWidth
let     resy        =   window.innerHeight

let     fs          =   15
let     maxcols     =   Math.floor(resx/fs)
let     maxrows     =   Math.floor(resy/fs)
let     frames      =   0
let     lastrender  =   0

let     life    =   new Array(maxrows);

for(var i = 0 ; i < maxrows ; i++){
        life[i] = new Array(maxcols); 
}

let     buffer  =   [...life];


var     keyMap  =   {
68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function keyDown(event) {
    var key =   keyMap[event.keyCode]
        state.pressedKeys[key]  =   true
}

function keyUp(event){
    var key =   keyMap[event.keyCode]
        state.pressedKeys[key]  =   false
}

window.addEventListener("keydown" , keyDown , false)
window.addEventListener("keyup"   , keyUp   , false)

var state = {

x:  resx/2,
    y:  resy/2,

    pressedKeys:{

left:   false,
        right:  false,
        up:     false,
        down:   false
    }
}

function update(progress){

    for(let i = 0 ; i < maxrows ; i++){
        for(let j = 0 ; j < maxcols ; j++){

let nCount  =   0; 
let ii      =   0;

            //i - 1
            ii = i - 1
                if(ii > 0){

                    //j - 1
                    if(life[ii][j -1] == 1){
                        nCount++;
                    }                               
                    //j
                    if(life[ii][j] == 1){
                        nCount++;
                    }
                    //j + 1
                    if(life[ii][j + 1] == 1){
                        nCount++;
                    }
                }
            //i
            ii = i

                    //j - 1
                    if(life[ii][j -1] == 1){
                        nCount++;
                    }                               
                    //j + 1
                    if(life[ii][j + 1] == 1){
                        nCount++;
                    }

            //i + 1
            ii = i + 1
                if(ii < maxrows){

                    //j - 1
                    if(j - 1 > 0){
                        if(life[ii][j -1] == 1){
                            nCount++;
                        }
                    }
                               
                    //j
                    if(life[ii][j] == 1){
                        nCount++;
                    }
                    //j + 1
                    if(j + 1 < maxcols){
                        if(life[ii][j + 1] == 1){
                            nCount++;
                        }
                    }
                
                }

        }
    }
}



function draw(){


    ctx.clearRect(0,0,resx,resy);

    ctx.fillStyle   =   "black"
        ctx.fillRect(0,0,resx,resy);

    ctx.fillStyle   =   "green"

        for( let i = 0 ; i < maxrows  ; i++){
            for(let j = 0 ; j < maxcols ; j++){

                if(buffer[i][j]){
                    ctx.fillRect(   j * fs  ,   i * fs , fs , fs );
                }
            }    
        }



}

function gameLoop(timestamp){

    var progress    =   timestamp   -   lastrender;

    update(progress);
    draw();

    lastrender  =   timestamp;
    requestAnimationFrame(gameLoop);   
}

window.onload = function(){

    ctx.canvas.width   =   resx;
    ctx.canvas.height  =   resy;

    requestAnimationFrame(gameLoop);
}


function updatePosition(p){

    if (state.pressedKeys.left) {
        state.x -= p
    }
    if (state.pressedKeys.right) {
        state.x += p
    }
    if (state.pressedKeys.up) {
        state.y -= p
    }
    if (state.pressedKeys.down) {
        state.y += p
    }

    if (state.x > resx) {
        state.x -= resx
    }
    else if (state.x < 0) {
        state.x += resx
    }
    if (state.y > resy) {
        state.y -= resy
    }
    else if (state.y < 0) {
        state.y += resy
    }
}
