

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = "1000";
canvas.height = "650";


let aniId;
let tree;
let currentChild;
let currentBranch;
let currentLength;


function start(twigLength = null, branchLimit = null) {

  tree = new Tree(ctx, canvas);

  if (twigLength != null) {
    tree.twigLength = twigLength;
  }

  if (branchLimit != null){
    tree.branchLimit = branchLimit;
  }

  console.log("t",tree.twigLength,tree.branchLimit);

  tree.createTree(300);
  tree.draw();

  let lastTime = 0;

  function animate(time) {

    dt = (time - lastTime) / 1000;
    tree.update(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tree.draw();
    aniId = requestAnimationFrame(animate);
    lastTime = time;

  }
  animate(0);
}

function stop() {
  cancelAnimationFrame(aniId);
}

function restart(childNum = null, branchLimit = null) {
  start(childNum,branchLimit);
}

//Events
let twigLengthButton = document.getElementById("twigLength");
let branchLimitButton = document.getElementById("branchLimit");

twigLengthButton.addEventListener('mouseup', function() {
  stop();
  restart(parseInt(twigLengthButton.value), parseInt(branchLimitButton.value));
  document.getElementById("twigLengthVal").innerHTML = tree.twigLength;
});

branchLimitButton.addEventListener('mouseup', function() {
  stop();
  restart(parseInt(twigLengthButton.value), parseInt(branchLimitButton.value));
  document.getElementById("branchLimitVal").innerHTML = tree.branchLimit;
  console.log(branchLimitButton.value);
});


start();
