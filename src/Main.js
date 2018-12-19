// Setup 
var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mousePos = new Point(0, 0);
var movingPoint = false;
var points = [];
iterations = 500;

function resizeCanvas() {
    canvas.width = parseFloat(window.getComputedStyle(canvas).width);
    canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}
resizeCanvas();


// Events
canvas.addEventListener('mousemove', e => {
    mousePos = new Point(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousedown', e => {
    points.push(mousePos);
    draw();
});

// Draw stuff
function circle(p) {
    ctx.beginPath();
    ctx.fillStyle = "#99FF66";
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#99FF66";
    ctx.arc(p.x, p.y, 8, 0, 2 * Math.PI);
    ctx.stroke();
}

function line(a, b, style) {
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function curve(points) {
    var curve = [];
    for (var i = 0; i <= iterations; i++) {
        curve.push(deCasteljau(points, i / iterations));
    }
    for (var i = 0; i < curve.length - 1; i++) {
        line(curve[i], curve[i + 1], "#999966");
    }
};

// Bezier
function deCasteljau(points, t) {
    if (points.length == 1){
        return points[0];
    }
    var dc_points = [];
    for (var i = 0; i < (points.length-1); i++){
        // Do (1-t)*a + t*b
        var a = Vector.kProduct(1-t, points[i]);
        var b = Vector.kProduct(t, points[i+1]);
        var c = Vector.add(a,b);
        dc_points.push(c);
    }
    return deCasteljau(dc_points, t);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(point => {
        circle(point);
    });

    if (points.length > 1) {
        curve(points);
    }
};