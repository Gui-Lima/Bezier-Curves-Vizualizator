
// Setup 
var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mousePos = new Point(0,0);
var movingPoint = false;
var circles = [];

// Events
canvas.addEventListener('mousemove', e=>{
    mousePos = new Point(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousedown', e=>{
    circles.push(mousePos   );
    draw();
});




function draw(){
    circles.forEach(p =>{
      circle(p); 
    });
};


// Draw stuff
function circle(p){
    ctx.beginPath();
    ctx.fillStyle = "#99FF66";
    ctx.arc(p.x, p.y, 4 , 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#99FF66";
    ctx.arc(p.x, p.y, 8 , 0, 2*Math.PI);
ctx.stroke();
}