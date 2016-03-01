canvas = document.getElementById("screen");
context = canvas.getContext('2d');
var x, y, k = 1;
var dots = 75;
/*for(var i = 0; i<dots/4; i++) {
    x = 8 * i * Math.sin(i * 20 * Math.PI / dots) + 158;
    y = 8 * i * Math.cos(i * 20 * Math.PI / dots) + 145;
    context.fillStyle = 'black';
    //context.fillRect(x,y,1 + 1/2 * i/dots/1.5 ,1 + 1/2 * i/dots/1.5);

    context.beginPath();
    context.arc(x,y,2 * i,0,2*Math.PI);
    context.lineWidth = 3;
    context.stroke();
}*/
setInterval(function() {
    context.clearRect(0,0,300,300);
    for(var i = 0; i<dots/4; i++) {
        x = 8 * i * Math.sin(i * 20 * k * Math.PI / dots) + 158;
        y = 8 * i * Math.cos(i * 20 * k * Math.PI / dots) + 145;
        context.fillStyle = 'black';
        //context.fillRect(x,y,1 + 1/2 * i/dots/1.5 ,1 + 1/2 * i/dots/1.5);
        context.beginPath();
        context.arc(x,y,2 * i,0,2*Math.PI);
        context.lineWidth = 3;
        context.stroke();
    }
    k += .005;
}, 10);