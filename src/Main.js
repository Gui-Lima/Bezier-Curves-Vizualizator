// Setup
var container;
var canvas;
var ctx;
var mousePos;
var movingPoint;
var points;
var moving;
//Buttons and Input
var iterations;
var showPolygons;
var showPoints;
var recalcular;
var reset;

function setup() {
    container = document.getElementById('container');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    mousePos = new Point(0, 0);
    movingPoint = false;
    points = [];
    moving = {'mov': false, 'circle':-1};
    iterations = document.getElementById('Iterations').value;
    showPolygons = document.getElementById('Polygons');
    showPoints = document.getElementById('Points');
    recalcular = document.getElementById('Recalcular');
    reset = document.getElementById('Reset');
}
setup();

function resizeCanvas() {
    canvas.width = parseFloat(window.getComputedStyle(canvas).width);
    canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}
resizeCanvas();


// Colision
function circleClicked() {
    for (let i = 0; i < points.length; i++) {
        if (Vector.size(Vector.sub(mousePos, points[i])) <= 8) {
            return i;
        }
    }
    return -1;
}

// Events
canvas.addEventListener('mousemove', e => {
    mousePos = new Point(e.offsetX, e.offsetY);
    if (moving.mov) {
        points[moving.circle] = mousePos;
        draw();
    }
});

canvas.addEventListener('mousedown', e => {
    let checkClick = circleClicked();
    if (checkClick > -1) {
        moving.mov = true;
        moving.circle = checkClick;
    } else {
        points.push(mousePos);
        draw();
    }
});
canvas.addEventListener('mouseup', e => {
    if (moving.mov) {
        moving.mov = false;
        moving.circle = -1;
    }
});

showPolygons.addEventListener('click', e=>{
    draw();
});

showPoints.addEventListener('click', e=>{
    draw();
});

recalcular.addEventListener('click', e=>{
    iterations = document.getElementById('Iterations').value;
    draw();
});

reset.addEventListener('click', e=>{
    setup();
    draw();
});


// Draw stuff
function circle(p) {
    ctx.beginPath();
    ctx.fillStyle = "#0000CD";
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
        line(curve[i], curve[i + 1], "#E9967A");
    }
};

function polygonControl(points) {
    for (let i = 0; i < points.length - 1; i++) {
        line(points[i], points[i + 1], "#556B2F");
    }
}

// Bezier
function deCasteljau(points, t) {
    if (points.length == 1) {
        return points[0];
    }
    var dc_points = [];
    for (var i = 0; i < (points.length - 1); i++) {
        // Do (1-t)*a + t*b
        var a = Vector.kProduct(1 - t, points[i]);
        var b = Vector.kProduct(t, points[i + 1]);
        var c = Vector.add(a, b);
        dc_points.push(c);
    }
    return deCasteljau(dc_points, t);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(showPoints.checked){
        points.forEach(point => {
            circle(point);
        });
    }
    if (points.length > 1) {
        curve(points);
    }

    if(showPolygons.checked){
        polygonControl(points);
    }
};