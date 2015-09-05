var ctx; //Canvas object

/************************************************
Initialize the drawing canvas
************************************************/
function initialize() {

    //Get the canvas context object from the body
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
}

function drawGrid(field) {
    
    //Clear the canvas
    ctx.clearRect(0,0,200,400);
    
    //Loop over each grid cell
    for(i = 0; i < 20; i++) {
        for(x = 0; x < 10; x++){
            c=0;
            ff = field[x+1][i+1];
           
            if (ff=='2')
                c=22;
            else if (ff=='4')
                c=120;
            else if (ff=='3')
                c=270;
            else if (ff=='x')
                c=60;

            if (c!=0) drawBlock(x, i, c);
        }
    }
}

/*************************************************
Draws a tetrimino at the specified game coordinate
with the specified orientation
x = [0,9]    x-coordinate
y = [0,19]    y-coordinate
t = [0,6]    tetrimino type
o = [0,3]   orientation
*************************************************/
function drawTetrimino(x, y, t, o) {
    var c;

    if (t == 'I') //
        c = 180; //Cyan
    else if (t == 'J') 
        c = 240; //Blue
    else if (t == 'L') 
        c = 40; //Orange
    else if (t == 'O') 
        c = 60; //Yellow
    else if (t == 'S') 
        c = 120; //Green
    else if (t == 'T')
        c = 280; //Purple
    else //Z type
        c = 0; //Red

    /**** Pick the appropriate tetrimino type ****/
    if (t == 'I') { //I Type
        //Get orientation
        if (o==0 || o==2) {
            drawBlock(x - 1, y, c);
            drawH3(x,y,c);
        } else if (o == 1 || o==3) {
            drawV3(x,y,c);
            drawBlock(x, y + 4, c);
        } 
    }
    if (t == 'J') { //J Type
       
        //Get orientation
        if (o == 0) {
            drawH3(x,y,c);
            drawBlock(x, y + 1, c);

        } else if (o == 1) {
            drawBlock(x, y, c);
            drawV3(x+1,y,c);
        } else if (o == 2) {
            drawH3(x,y+1,c);
            drawBlock(x + 2, y, c);
        } else if (o == 3) {
            drawV3(x,y,c);
            drawBlock(x, y + 2, c);
        }
    }
    if (t == 'L') { //L Type

       
        //Get orientation
        if (o == 0) {
            drawH3(x,y,c);
            drawBlock(x + 2, y + 1, c);
        } else if (o == 1) {
            drawV3(x+1,y,c);
            drawBlock(x,y+2, c);
        } else if (o == 2) {
            drawH3(x,y+1,c);
            drawBlock(x, y, c);
        } else if (o == 3) {
            drawV3(x,y,c);
            drawBlock(x+1,y, c);
        }
    }
    if (t == 'O') { //O Type

      drawH2(x,y,c);
      drawH2(x,y+1,c);
        //Orientation doesn't matter
    }

    if (t == 'S') { //S Type


        //Get orientation
        if (o == 0) {
            drawH2(x,y,c);
            drawH2(x+1,y+1,c);
        } else if (o == 1) {
            drawV2(x,y+1,c);
            drawV2(x+1,y,c);
        } else if (o == 2) {
         
        } else if (o == 3) {
         
        }
    }
    if (t == 'T') { //T Type
        //Get orientation
        if (o == 0) {
            drawH3(x,y,c); drawBlock(x+1, y + 1, c);
        } else if (o == 1) {
            drawV3(x+1,y,c); drawBlock(x,y+1, c);
        } else if (o == 2) {
            drawH3(x,y+1,c); drawBlock(x+1,y, c);
        } else if (o == 3) {
            drawV3(x,y,c); drawBlock(x+1, y+1, c);
        }
    }
    if (t == 'Z') { //Z Type
        //Get orientation
        if (o == 0 || o ==2) {
            drawH2(x,y+1);
            drawH2(x+1,y);
        } else if (o == 1 || o==3) {
            drawV2(x,y,c);
            drawV2(x+1,y+1,c);
        } 
    }
} 
function drawH2(x, y, c) {
    drawBlock(x, y, c);
    drawBlock(x + 1, y, c);
}
function drawH3(x, y, c) {
    drawBlock(x, y, c);
    drawBlock(x + 1, y, c);
    drawBlock(x + 2, y, c);
}
function drawV2(x, y, c) {
    drawBlock(x, y+1, c);
    drawBlock(x, y, c);
}
function drawV3(x, y, c) {
    drawBlock(x, y+2, c);
    drawBlock(x, y+1, c);
    drawBlock(x, y, c);
}

/************************************************
Draws a block at the specified game coordinate
x = [0,9]    x-coordinate
y = [0,19]    y-coordinate
c = [0,360]    color hue
************************************************/
function drawBlock(x, y, c) {

    //Convert game coordinaes to pixel coordinates
    pixelX = x * 20;
    pixelY = (19 - y) * 20;


    /**** Draw the center part of the block ****/

    //Set the fill color using the supplied color
    ctx.fillStyle = "hsl(" + c + ",100%,50%)";

    //Create a filled rectangle
    ctx.fillRect(pixelX + 2, pixelY + 2, 16, 16);


    /**** Draw the top part of the block ****/

    //Set the fill color slightly lighter
    ctx.fillStyle = "hsl(" + c + ",100%,70%)";

    //Create the top polygon and fill it
    ctx.beginPath();
    ctx.moveTo(pixelX, pixelY);
    ctx.lineTo(pixelX + 20, pixelY);
    ctx.lineTo(pixelX + 18, pixelY + 2);
    ctx.lineTo(pixelX + 2, pixelY + 2);
    ctx.fill();


    /**** Draw the sides of the block ****/

    //Set the fill color slightly darker
    ctx.fillStyle = "hsl(" + c + ",100%,40%)";

    //Create the left polygon and fill it
    ctx.beginPath();
    ctx.moveTo(pixelX, pixelY);
    ctx.lineTo(pixelX, pixelY + 20);
    ctx.lineTo(pixelX + 2, pixelY + 18);
    ctx.lineTo(pixelX + 2, pixelY + 2);
    ctx.fill();

    //Create the right polygon and fill it
    ctx.beginPath();
    ctx.moveTo(pixelX + 20, pixelY);
    ctx.lineTo(pixelX + 20, pixelY + 20);
    ctx.lineTo(pixelX + 18, pixelY + 18);
    ctx.lineTo(pixelX + 18, pixelY + 2);
    ctx.fill();


    /**** Draw the bottom part of the block ****/

    //Set the fill color much darker
    ctx.fillStyle = "hsl(" + c + ",100%,30%)";

    //Create the bottom polygon and fill it
    ctx.beginPath();
    ctx.moveTo(pixelX, pixelY + 20);
    ctx.lineTo(pixelX + 20, pixelY + 20);
    ctx.lineTo(pixelX + 18, pixelY + 18);
    ctx.lineTo(pixelX + 2, pixelY + 18);
    ctx.fill();
}
