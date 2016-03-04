canvas = document.getElementById("screen");
context = canvas.getContext('2d');
var x, y, k = 0, i = 0;
var dots = 75;
context.fillStyle = 'black';
setInterval(function() {
    context.clearRect(0,0,300,300);
    for(i; i<dots/2.7; i++) {

        x = 8 * i * Math.sin(i * 20 * Math.PI / dots) + 158;
        y = 8 * i * Math.cos(i * 20 * Math.PI / dots) + 145;

        context.beginPath();
        context.arc(x,y,2 * i,0,2*Math.PI);
        context.lineWidth = 3;
        context.stroke();
    }
    i = k, k+=.01;
}, 10);