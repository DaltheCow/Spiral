canvas = document.getElementById("screen");
context = canvas.getContext('2d');
var k = 0, x, y, l;
var dots = 75, center = {x: 158, y: 145};
context.fillStyle = 'black';
var circleArray = [];

function drawCircle(x,y,i) {
    context.beginPath();
    context.arc(x,y,2 * i,0,2*Math.PI);
    context.lineWidth = 3;
    context.stroke();
}
function addCircle() {
    circleArray.push(circObj());
}
function circObj() {
    return {i:k};
}

setInterval(function() {
    context.clearRect(0,0,300,300);
    if (k%1 === 0) {
        addCircle();
    }
    for(var j = 0;j<circleArray.length;j++) {
        l = circleArray.length-(j+1);
        x = 8 * (l+k-circleArray[l].i) * Math.sin((l+k-circleArray[l].i) * 20 * Math.PI / dots) + center.x;
        y = 8 * (l+k-circleArray[l].i) * Math.cos((l+k-circleArray[l].i) * 20 * Math.PI / dots) + center.y;
        drawCircle(x,y,j+k-circleArray[l].i);
    }
    k+=.01;
    k = Math.round(100*k)/100;
}, 10);
/*for(var as = 0; as<15;as++)
    addCircle();*/