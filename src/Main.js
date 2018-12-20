// #######################################  Setup #############################################
var container;
var canvas;
var ctx;
var mousePos;
var movingPoint;
var points;
var crossPlotXPoints;
var crossPlotYPoints;
var moving;
//Buttons and Input
var iterations;
var showPolygons;
var showPoints;
var showCurves;
var recalcular;
var reset;


function setup() {
    container = document.getElementById('container');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    mousePos = new Point(0, 0);
    movingPoint = false;
    points = [];
    crossPlotXPoints = [];
    crossPlotYPoints = [];
    moving = {
        'mov': false,
        'circle': -1
    };
    iterations = document.getElementById('Iterations').value;
    showPolygons = document.getElementById('Polygons');
    showPoints = document.getElementById('Points');
    showCurves = document.getElementById('Curves');
    recalcular = document.getElementById('Recalcular');
    reset = document.getElementById('Reset');
}
setup();

function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}
resizeToFit();
draw();

//###################################################### Colision #################################################
function circleClicked() {
    for (let i = 0; i < points.length; i++) {
        if (Vector.size(Vector.sub(mousePos, points[i])) <= 8) {
            return i;
        }
    }
    return -1;
}

// ##################################################  Events #######################################################
canvas.addEventListener('mousemove', e => {
    mousePos = new Point(e.offsetX, e.offsetY);
    if (mousePos.x < canvas.width / 2 && mousePos.y < canvas.height / 2) {
        if (moving.mov) {
            points[moving.circle] = mousePos;
            attPointsX();
            attPointsY();
            draw();
        }
    }
});

canvas.addEventListener('mousedown', e => {
    if (mousePos.x < canvas.width / 2 && mousePos.y < canvas.height / 2) {
        let checkClick = circleClicked();
        if (checkClick > -1) {
            moving.mov = true;
            moving.circle = checkClick;
        } else {
            points.push(mousePos);
            attPointsX();
            attPointsY();
            draw();
        }
    }

});
canvas.addEventListener('mouseup', e => {
    if (moving.mov) {
        moving.mov = false;
        moving.circle = -1;
    }
});

showPolygons.addEventListener('click', e => {
    draw();
});

showPoints.addEventListener('click', e => {
    draw();
});
showCurves.addEventListener('click', e=>{
    draw();
})

recalcular.addEventListener('click', e => {
    iterations = document.getElementById('Iterations').value;
    draw();
});

reset.addEventListener('click', e => {
    setup();
    draw();
});


// ########################################################### DRAW ###########################################
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

function limits(){
    let x0 = new Point(canvas.width/2, 0);
    let xF = new Point(canvas.width/2, canvas.height);
    line(x0,xF ,"#F0F8FF");
    let y0 = new Point(0, canvas.height/2);
    let yF = new Point(canvas.width, canvas.height/2);
    line(y0, yF, "F0F8FF");
}

// ################################################## Bezier #########################################3
function deCasteljau(points, t) {
    if (points.length == 1) {
        return points[0];
    }
    var dc_points = [];
    for (var i = 0; i < (points.length - 1); i++) {
        //(1-t)*a + t*b
        var a = Vector.kProduct(1 - t, points[i]);
        var b = Vector.kProduct(t, points[i + 1]);
        var c = Vector.add(a, b);
        dc_points.push(c);
    }
    return deCasteljau(dc_points, t);
}

function drawBezier(pts){
    if (showPoints.checked) {
        pts.forEach(point => {
            circle(point);
        });
    }

    if (showCurves.checked && pts.length > 1) {
        curve(pts);
    }

    if (showPolygons.checked) {
        polygonControl(pts);
    }
}

function draw() {
    console.log(crossPlotXPoints);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    limits();
    drawBezier(points);
    drawBezier(crossPlotXPoints);
    drawBezier(crossPlotYPoints);

};

// ###################################### CROSS PLOTS ####################

function attPointsX(){
    for(let i = 0;i<points.length;i++){
        let p = new Point(points[i].x, canvas.height/2 + ((canvas.height/2)/Math.max((points.length-1), 1) * i));
        crossPlotXPoints[i] = p;
    }
}

function attPointsY(){
    for(let i =0;i<points.length;i++){
        let p = new Point(canvas.width/2 + ((canvas.width/2)/Math.max((points.length-1), 1) * i), points[i].y);
        crossPlotYPoints[i] = p;
    }
}