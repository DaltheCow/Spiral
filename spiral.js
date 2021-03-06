canvas = document.getElementById("screen");
context = canvas.getContext('2d');
var k = 0, x, y, l;
var dots = 75, center = {x: 250, y: 250}, count = 0, speed = 5, score = 0, currColor, hitColor = true, game = true, hit = 0;
context.fillStyle = 'black';
var circleArray = [];

function drawCircle(x,y,i,color) {
    context.fillStyle = color;
    context.lineWidth = 1 + i/5;
    if (i>10)
        i=10 + i/10-1;
    context.beginPath();
    context.arc(x,y,2 * i,0,2*Math.PI);
    context.fill();
}

function addCircle() {
    circleArray.push({i:k,color:randomColor(),x:null,y:null, size:null});
}
function gameOver() {
    game = false;
    clearInterval(interval);
    context.font = "20px verdana";
    context.fillStyle = 'white';
    context.fillRect(190,215,120,30);
    context.fillStyle = 'black';
    context.fillText("Game Over",195,230);
}

function randomColor() {
    var x = Math.random();
    if (x<.2) return 'black';
    else if (x<.4) return 'blue';
    else if (x<.6) return 'green';
    else if (x<.8) return 'red';
    else return 'yellow';
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function scorer(points) {
    score+=points;
    document.getElementById("header").innerHTML = "Score: " + score;
}

function colorChange() {
    if (!hitColor && k > 30) {
        gameOver();
    }
    if (game) {
        hit = 0;
        var tempColor = currColor;
        while (currColor === tempColor){
            currColor = randomColor();
        }
        hitColor = false;
        document.getElementById("color").innerHTML = currColor;
        document.getElementById("color").color = currColor;
        canvas.style = "border: 10px" + " solid " + currColor + ";";
    }
}

canvas.addEventListener('mousedown',function(event) {
    var tempColor;
    count = 0;
    var pos = getMousePos(canvas,event);
    circleArray.forEach(function(AE,i) {
        if (pos.y > (-Math.sqrt(Math.pow(AE.size,2) - Math.pow(pos.x-AE.x,2)) + AE.y) &&
            pos.y < (Math.sqrt(Math.pow(AE.size,2) - Math.pow(pos.x-AE.x,2)) + AE.y)) {
            if (AE.color === currColor) {
                scorer(Math.floor(((3-hit) / 3) * Math.abs(circleArray.length/2 - i)));
                tempColor = AE.color;
                while (AE.color === tempColor){
                    AE.color = randomColor();
                }
                hitColor = true;
                hit--;
            }
            else if (game){
                hit++;
                scorer(-i);
            }
        }
    });
},false);

canvas.addEventListener('mousemove',function(event) {
    if (count >= 10000) {
        interval = setInterval(function() {
            SpiralManagement();
        }, speed);
    }
    count = 0;
}, false);

function SpiralManagement() {
    if (count > 5000) {
        clearInterval(interval);
    }
    context.clearRect(0,0,500,500);
    if (k%15 === 0) {
        colorChange();
        context.fillStyle = currColor;
        context.fillRect(0,0,500,500);
    }
    if (k%1 === 0) {
        addCircle();
        if (circleArray.length > 60) {
            circleArray.splice(0,1);
        }
    }
    for(var j = 0;j<circleArray.length;j++) {
        l = circleArray.length-(j+1);
        x = 5.5 * (k-circleArray[l].i) * Math.sin((k-circleArray[l].i) * 20 * Math.PI / dots) + center.x;
        y = 5.5 * (k-circleArray[l].i) * Math.cos((k-circleArray[l].i) * 20 * Math.PI / dots) + center.y;
        drawCircle(x, y, (k-circleArray[l].i), circleArray[l].color);
        circleArray[l].x = x, circleArray[l].y = y;
        circleArray[l].size = 2 * (k-circleArray[l].i);
        if (k-circleArray[l].i > 10) {
            circleArray[l].size = 2*(10 + (k-circleArray[l].i)/10-1)
        }
    }
    k+=.01;
    count +=1;
    k = Math.round(100*k)/100;
    if (hit === 3) {
        gameOver();
    }
}

var interval = setInterval(function() {
    SpiralManagement();
}, speed);




