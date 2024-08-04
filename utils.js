
function distance(p1, p2) {
  return ((p1.x  - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** .5;
}

function dot(a1, a2) {
  var sum = 0;
  for (let i = 0; i < a1.length; i++) {
    sum += a1[i] * a2[i];
  }
  return sum;
}

function length(a1) {
  var sum = 0;
  for (let i = 0; i < a1.length; i++) {
    sum += a1[i] ** 2;
  }
  return sum ** .5;
}

//Computes angle between two vectors
function angle(a1, a2) {
  return dot(a1, a2)/ (length(a1) * length(a2));
}

//Computes angle between two vectors where it is assumed that vector 1 gives the "north" position in the local system
function angleBaseNorth(a1, a2) {
  if ((Math.sign(a1[0]) != Math.sign(a2[0])) && (Math.sign(a1[1]) != Math.sign(a2[1]))) {
    return 2 * Math.PI - Math.acos(angle(a1,a2));
  }
  return Math.acos(angle(a1,a2));
}


function color(x,xMax){

  let col1 = [0,0,0];
  let col2 = [255,255,255];
  let colOut = [];
  let k = Math.min(1, x / xMax);




}

/*
let a1 = [0,1];
let a2 = [1,0];
console.log(angle(a1,a2));
console.log(angleBaseNorth(a1,a2) * 180 / Math.PI);
*/

function drawLine(ctx, p1, p2, width) {

  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = "white";
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.fill();
  ctx.stroke();
}


function drawNode(ctx, p, radius, color){
  ctx.beginPath();
  let x = p.x;
  let y = p.y;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
