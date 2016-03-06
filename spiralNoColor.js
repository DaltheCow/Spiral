canvas = document.getElementById("screen");
context = canvas.getContext('2d');
var k = 0, x, y, l;
var dots = 75, center = {x: 5/3 * 150, y: 5/3 * 150};
context.fillStyle = 'black';
var circleArray = [];

function drawCircle(x,y,i,color) {
    //context.fillStyle = color;
    context.lineWidth = 1 + i/5;
    if (i>10)
        i=10 + i/10-1;
    context.beginPath();
    context.arc(x,y,2 * i,0,2*Math.PI);
    context.stroke();
}
function addCircle() {
    circleArray.push({i:k});
}
/*function randomColor() {
    var x = Math.random();
    if (x<.2) return 'black';
    else if (x<.4) return 'blue';
    else if (x<.6) return 'green';
    else if (x<.8) return 'red';
    else return 'yellow';
}*/

setInterval(function() {
    context.clearRect(0,0,500,500);
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
            drawCircle(x,y,k-circleArray[l].i);
    }
    k+=.01;
    k = Math.round(100*k)/100;
}, 5);