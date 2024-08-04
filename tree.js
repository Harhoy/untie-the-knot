



class Tree {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    //Containing the leafs (nodes) and twigs (edges)
    this.leafs = [];
    this.twigs = [];

    //Limits of children for each leaf
    this.childNum = 1;

    //Limit on the number of child branches;
    this.branchLimit = 5;

    //Angle
    this.angleIncrement = 180.0 / 180.0 * Math.PI;

    //Length of the twigs in pixels
    this.twigLength = 15;

    this.twigWidth = 1;

    //Wind source
    this.blower = null;

  }

  addBlower(blower) {
    this.blower = blower;
  }

  createTree(y){

    //First leaf (root)
    const root = new Leaf(this, null);
    this.leafs.push(root);

    this.root = root;

    root.x = this.canvas.width / 2;
    root.y = y;

    //Add recursively
    this.addLeafs(root);
  }

  draw() {

    for (let i = 0; i < this.twigs.length; i++){
      this.twigs[i].draw();
    }

    for (let i = 0; i < this.leafs.length; i++){
      this.leafs[i].draw();
    }
  }

  update(dt) {
    this.updateLeafs(this.root, dt);
  }


  updateLeafs(parent, dt) {

      parent.update(dt);
      for (let i = 0; i < parent.children.length; i++ ){
        this.updateLeafs(parent.children[i],dt);
      }
  }

  addLeafs(parent) {

    //Stop when rank (number of nodes down) is reached
    if (parent.rank + 1 > this.branchLimit) {
      return true;
    }

    //parent x, y
    let xP = parent.x - this.canvas.width / 2; //need to remove the "centering" in the canvas from the coordinates
    let yP = parent.y;
    let el = length([xP, yP]);

    //Normalize
    xP = xP / el;
    yP = yP / el;

    //Get angle of parent
    let angle = angleBaseNorth([0, 1],[xP, yP]);

    //calculate new angle to (relative to parent)
    let newAngle = angle + (2 * Math.random() - 1) * this.angleIncrement;

    //Root leaf always straight up
    if (parent.isroot) {
      newAngle = 0;
    }

    //New point
    let newX = parent.x + this.twigLength * Math.sin(newAngle);
    let newY = parent.y + this.twigLength * Math.cos(newAngle);

    //Create new leaf
    let newLeaf = new Leaf(this, parent);

    //Set position
    newLeaf.x = newX;
    newLeaf.y = newY;

    //Copying initial position
    newLeaf.initX = newX;
    newLeaf.initY = newY;
    newLeaf.initAngle = newAngle;
    newLeaf.angle = newAngle;


    //Add to tree list
    this.leafs.push(newLeaf);

    //Adding to parent
    parent.children.push(newLeaf);

    //Add twig
    let newTwig = new Twig(this, parent, newLeaf);
    this.twigs.push(newTwig);

    for (let i = 0; i < this.childNum; i++){
      this.addLeafs(newLeaf);
    }

  }

}


class Leaf {
  constructor(tree, parent){

    this.tree = tree;
    this.x = 0;
    this.y = 0;
    this.isroot = false;
    this.children = [];

    //Initial position
    this.initX = 0;
    this.initY = 0;
    this.initAngle = 0;

    //Angle variables
    this.angle = this.initAngle;
    this.angleV = 0;


    //Special conditions for the root
    if (parent == null) {
      this.rank = 1;
      this.x = 0;
      this.y = 0;
      this.isroot = true;
      this.parent = this;
    } else {
      this.rank = parent.rank + 1;
      this.parent = parent;
    }


  }

  draw(){
    let size = 3;
    let color = "red";
    if (this.isroot) {
      color = "white";
      size = 10;
    }
    drawNode(this.tree.ctx, this, size, color);
  }

  update(dt) {

    //New angle
    this.angleV = .01;
    this.angle += this.angleV;

    let tempX = this.x - this.parent.x;
    let tempY = this.y - this.parent.y;

    //Angle between current node and parent
    let angleParent = Math.atan2(tempY, tempX);

    //Distance between parent and required distance
    let r = length([tempX, tempY]) - this.tree.twigLength ;
    if (this.isroot) {
      r = 0; //Setting to zero if it is the root (as it has no parent, there should be no distance)
    }

    //updating position
    tempX = tempX * Math.cos(this.angleV) - tempY * Math.sin(this.angleV) - r * Math.cos(angleParent);
    tempY = tempX * Math.sin(this.angleV) + tempY * Math.cos(this.angleV) - r * Math.sin(angleParent);

    this.x = tempX + this.parent.x;
    this.y = tempY + this.parent.y;

  }

}

class Twig {
  constructor(tree, leafA, leafB) {

    this.tree = tree;
    this.leafA = leafA;
    this.leafB = leafB;

    this.length = this.tree.twigLength;
    this.width = tree.twigWidth;
  }

  draw(){
    drawLine(this.tree.ctx, this.leafA, this.leafB, this.width);
  }

}
