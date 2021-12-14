// JavaScript Document

var currentThrdBTree;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentThrdBTree = new thrdBTree(
    animationManager,
    drawing.width,
    drawing.height
  );
  //currentThrdBTree.implementAction(currentThrdBTree.initStateBox.bind(currentThrdBTree), "start");
}

// thrdBTreeTree
var thrdBTree = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
thrdBTree.prototype = new Algorithm();
thrdBTree.prototype.constructor = thrdBTree;

// Initialization control
thrdBTree.prototype.initControls = function () {
  var listOptionChild = ["", "leftChild", "rightChild"];
  addLabelToAlgorithmBar("node");
  this.startInsertField = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("of");
  this.childSelect = addSelectToAlgorithmBar(listOptionChild);
  this.childSelect.id = "childSelect";
  this.childSelect.onchange;
  addLabelToAlgorithmBar("Child node is");
  this.endInsertField = addInputToAlgorithmBar("text", "");
  //addLabelToAlgorithmBar("Insertion point");
  //this.insertInsertField = addInputToAlgorithmBar("text", "");

  this.createButton = addInputToAlgorithmBar("button", "Generate edges");
  this.createButton.onclick = this.createButtonCallBack.bind(this); //current ThrdBTree.createButtonCallBack()
  this.createButton.id = "crButton";
  //this.insertButton = addInputToAlgorithmBar("button", "Determine the node");
  //this.insertButton.onclick = this.insertButtonCallBack.bind(this) ;
  //this.insertButton.id = "inButton";
  this.changeButton = addInputToAlgorithmBar("button", "Join the clue");
  this.changeButton.onclick = this.changeButtonCallBack.bind(this);
  this.changeButton.id = "chButton";
  this.newButton = addInputToAlgorithmBar(
    "button",
    "Refresh the current page (will clear all the input）"
  );
  this.newButton.onclick = this.newButtonCallBack.bind(this);
};
/*thrdBTree.prototype.offSelectOrNot = function() {
	if(this.treeStyle.value == 'Tree'){
		document.getElementById("childSelect").disabled = true;
		document.getElementById("mySelect").disabled = true;
	}
	else if(this.treeStyle.value == 'bTree'){
		document.getElementById("mySelect").disabled = true;
	}
}*/

// Initialization attribute
thrdBTree.prototype.initAttributes = function () {
  // Logical part
  this.root = null;
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.radius = 20; // Round radius
  this.intervalX = 45; // xgap,Application when forming a tree
  this.intervalY = 45; // ygap,Application when forming a tree
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.tomato = "#FF6347"; // tomatocolour
  this.palegreen = "#32CD32"; // palegreencolour
  this.iniXc = 250; //Node generates starting positionxcoordinate
  this.iniYc = 100; // New nodeycoordinate103265772
  this.iniXr = 400;
  this.iniYr = 100;
  this.startX = 300; //Generate new parent nodesxcoordinate
  this.startY = 150; //Generate new parent nodesycoordinate
  this.thrdBTreeNodeArray = new Array(); //All nodes including the tree
  this.rootArray = new Array(); // Store root nodes per input, draw
  this.midOrder = new Array();
  this.valueableNumOfArticle = 0;
  //this.okOrNot = false;
  this.nullIndex = this.objectID;
};

// Initialization status box

// Insert a callback function
thrdBTree.prototype.insertButtonCallBack = function (event) {
  var leftOrRight = this.childSelect.value;
  var startInsertValue = this.startInsertField.value;
  var endInsertValue = this.endInsertField.value;
  var insertInsertValue = this.insertInsertField.value;
  if (
    startInsertValue != "" &&
    endInsertValue != "" &&
    insertInsertValue != "" &&
    leftOrRight != ""
  ) {
    // this.startInsertField.value = "";
    // this.endInsertField.value = "";
    // this.insertInsertField.value = "";
    this.implementAction(this.insertThrdBTree.bind(this), [
      startInsertValue,
      endInsertValue,
      insertInsertValue,
      leftOrRight,
    ]);
  }
};
thrdBTree.prototype.newButtonCallBack = function (event) {
  location.reload();
};
thrdBTree.prototype.insertThrdBTree = function () {
  var startValue = arguments[0][0];
  var endValue = arguments[0][1];
  var insertValue = arguments[0][2];
  var lfOrRgt = arguments[0][3];
  var isStartFind = this.isFind(startValue);
  var isEndFind = this.isFind(endValue);
  if (startValue == endValue) {
    alert("Node repeat~please enter again~~~");
    return this.commands;
  }
  if (
    isStartFind != -1 &&
    isEndFind != -1 &&
    this.thrdBTreeNodeArray[isEndFind].faObID == isStartFind + 1
  ) {
    this.thrdBTreeNodeArray[this.objectID - 1] = new thrdBTreeNode(
      this.objectID,
      isStartFind + 1,
      0,
      0,
      0,
      this.objectID - 1,
      insertValue
    );
    this.cmd(
      "CreateCircle",
      this.objectID,
      insertValue,
      this.iniXc,
      this.iniYc,
      this.radius
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("Step");
    this.cmd(
      "disConnect",
      isStartFind + 1,
      isEndFind + 1,
      this.foregroundColor
    );
    this.cmd("Step");
    this.cmd("Connect", isStartFind + 1, this.objectID, this.foregroundColor);
    this.cmd("Step");
    this.cmd("Connect", this.objectID, isEndFind + 1, this.foregroundColor);
    this.cmd("Step");
    if (this.thrdBTreeNodeArray[isStartFind].chObIDArray[0] == isEndFind + 1) {
      this.thrdBTreeNodeArray[isStartFind].chObIDArray[0] = this.objectID;
    } else if (
      this.thrdBTreeNodeArray[isStartFind].chObIDArray[1] ==
      isEndFind + 1
    ) {
      this.thrdBTreeNodeArray[isStartFind].chObIDArray[1] = this.objectID;
    }
    this.thrdBTreeNodeArray[isEndFind].faObID = this.objectID;
    if (lfOrRgt == "leftChild") {
      this.thrdBTreeNodeArray[this.objectID - 1].chObIDArray[0] = isEndFind + 1;
    } else if (lfOrRgt == "rightChild") {
      this.thrdBTreeNodeArray[this.objectID - 1].chObIDArray[1] = isEndFind + 1;
    }
    this.objectID++;
    this.done();
    for (
      var indexRoot = 0;
      indexRoot < this.thrdBTreeNodeArray.length;
      indexRoot++
    ) {
      if (
        this.thrdBTreeNodeArray[indexRoot].objectID ==
        this.thrdBTreeNodeArray[indexRoot].faObID
      ) {
        this.rootArray.push(indexRoot);
      }
    }
    {
      // Drawing
      for (var Pt = 0; Pt < this.rootArray.length; Pt++) {
        this.root = this.thrdBTreeNodeArray[this.rootArray[Pt]];
        if (Pt != 0) {
          this.resizeWidth(this.root);
          this.thrdBTreeNodeArray[this.rootArray[Pt]].x =
            this.thrdBTreeNodeArray[this.rootArray[Pt - 1]].x +
            this.thrdBTreeNodeArray[this.rootArray[Pt - 1]].rightWidth +
            this.thrdBTreeNodeArray[this.rootArray[Pt]].leftWidth;
        }
        if (this.rootArray.length == 1) {
          this.root.x = 500;
        }
        this.resizeTree(this.root.x);
      }
    }
    this.rootArray.length = 0;
  } else {
    alert("Insert insert~~~");
  }
  return this.commands;
};
/*
	call functionthis.autoThrdBTreeYou can realize automatic generation of binary tree, then click the conversion button to connect
*/
thrdBTree.prototype.autoThrdBTree = function () {
  var Range = 3 - 1;
  var Rand = Math.random();
  var num = 1 + Math.round(Rand * Range);
  if (num == 1) {
    this.TranTree1();
  } else if (num == 2) {
    this.TranTree2();
  } else {
    this.TranTree3();
  }
};
thrdBTree.prototype.TranTree1 = function () {
  var startInsertValue;
  var endInsertValue;
  var leftOrRight;
  var constArray = [];
  //alert("Please refresh the current page to perform the next step");
  constArray[0] = ["a", "b", "leftChild"];
  constArray[1] = ["b", "d", "leftChild"];
  constArray[2] = ["b", "e", "rightChild"];
  constArray[3] = ["e", "f", "rightChild"];
  constArray[4] = ["a", "c", "rightChild"];
  constArray[5] = ["c", "g", "leftChild"];
  for (var i = 0; i < 6; ++i) {
    startInsertValue = constArray[i][0];
    endInsertValue = constArray[i][1];
    leftOrRight = constArray[i][2];
    this.implementAction(this.createThrdBTree.bind(this), [
      startInsertValue,
      endInsertValue,
      leftOrRight,
    ]);
  }
};
thrdBTree.prototype.TranTree2 = function () {
  var startInsertValue;
  var endInsertValue;
  var leftOrRight;
  var constArray = [];
  //alert("Please refresh the current page to perform the next step");
  constArray[0] = ["a", "b", "leftChild"];
  constArray[1] = ["b", "c", "leftChild"];
  constArray[2] = ["c", "d", "leftChild"];
  constArray[3] = ["d", "e", "leftChild"];
  for (var i = 0; i < 4; ++i) {
    startInsertValue = constArray[i][0];
    endInsertValue = constArray[i][1];
    leftOrRight = constArray[i][2];
    this.implementAction(this.createThrdBTree.bind(this), [
      startInsertValue,
      endInsertValue,
      leftOrRight,
    ]);
  }
};
thrdBTree.prototype.TranTree3 = function () {
  var startInsertValue;
  var endInsertValue;
  var leftOrRight;
  var constArray = [];
  //alert("Please refresh the current page to perform the next step");
  constArray[0] = ["a", "b", "rightChild"];
  constArray[1] = ["b", "c", "rightChild"];
  constArray[2] = ["c", "d", "rightChild"];
  constArray[3] = ["d", "e", "rightChild"];
  for (var i = 0; i < 4; ++i) {
    startInsertValue = constArray[i][0];
    endInsertValue = constArray[i][1];
    leftOrRight = constArray[i][2];
    this.implementAction(this.createThrdBTree.bind(this), [
      startInsertValue,
      endInsertValue,
      leftOrRight,
    ]);
  }
};
thrdBTree.prototype.createButtonCallBack = function (
  parentNode,
  nodePosition,
  childNode
) {
  //this.autoThrdBTree();
  nodePosition =
    nodePosition == "left"
      ? "leftChild"
      : nodePosition == "right"
      ? "rightChild"
      : nodePosition;
  // var leftOrRight = this.childSelect.value;
  // var startInsertValue = this.startInsertField.value;
  // var endInsertValue = this.endInsertField.value;
  var leftOrRight = nodePosition;
  var startInsertValue = parentNode;
  var endInsertValue = childNode;
  if (startInsertValue != "" && endInsertValue != "" && leftOrRight != "") {
    // this.startInsertField.value = "";
    // this.endInsertField.value = "";
    this.implementAction(this.createThrdBTree.bind(this), [
      startInsertValue,
      endInsertValue,
      leftOrRight,
    ]);
  }
};
thrdBTree.prototype.changeButtonCallBack = function (event) {
  this.nullIndex = this.objectID;
  this.done();
  this.midOrderFun();
  this.alertt();
  // document.getElementById("crButton").disabled = true;
  // document.getElementById("inButton").disabled = true;
  // document.getElementById("chButton").disabled = true;
};
// Find repetition
thrdBTree.prototype.isFind = function (value) {
  for (var index = 0; index < this.thrdBTreeNodeArray.length; index++) {
    if (value == this.thrdBTreeNodeArray[index].value) {
      return index;
    }
  }
  return -1;
};
// createthrdBTree
thrdBTree.prototype.createThrdBTree = function () {
  var startValue = arguments[0][0];
  var endValue = arguments[0][1];
  var lfOrRgt = arguments[0][2];
  var fatherObID = -1;
  var indexI = -1;
  var x = 1;
  var y = 1;
  var isStartFind = this.isFind(startValue);
  var isEndFind = this.isFind(endValue);
  if (startValue == endValue) {
    alert("Node repeat~please enter again~~~");
    return this.commands;
  }
  if (
    -1 != isStartFind &&
    -1 != isEndFind &&
    this.thrdBTreeNodeArray[isEndFind].faObID !=
      this.thrdBTreeNodeArray[isEndFind].objectID
  ) {
    // Judging whether there is a ring!!!!!!
    alert("Input two nodes exist~please enter again~~~");
    return this.commands;
  }
  if (-1 == isStartFind && -1 != isEndFind) {
    if (
      this.thrdBTreeNodeArray[this.thrdBTreeNodeArray[isEndFind].faObID - 1]
        .value != startValue
    ) {
      if (
        this.thrdBTreeNodeArray[isEndFind].faObID !=
        this.thrdBTreeNodeArray[isEndFind].objectID
      ) {
        alert("Input two nodes exist~please enter again~~~");
        return this.commands;
      }
    }
  }
  if (-1 != isStartFind && -1 == isEndFind) {
    if (
      this.thrdBTreeNodeArray[isStartFind].chObIDArray[0] != null &&
      lfOrRgt == "leftChild"
    ) {
      alert("Input two nodes exist~please enter again~~~");
      return this.commands;
    }
    if (
      this.thrdBTreeNodeArray[isStartFind].chObIDArray[1] != null &&
      lfOrRgt == "rightChild"
    ) {
      alert("Input two nodes exist~please enter again~~~");
      return this.commands;
    }
  }
  if (-1 == isStartFind) {
    // For the insertion of the binary tree, the root node of each side does not need special consideration, leaf nodes consider1.Input is existing 2.Do you repeat the left?(right)Substrus tree 3.Whether the sub-tree is more than two forks
    this.thrdBTreeNodeArray[this.objectID - 1] = new thrdBTreeNode(
      this.objectID,
      this.objectID,
      0,
      x,
      y,
      this.objectID - 1,
      startValue
    );
    this.cmd(
      "CreateCircle",
      this.objectID,
      startValue,
      this.iniXr,
      this.iniYr,
      this.radius
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("Step");
    fatherObID = this.thrdBTreeNodeArray[this.objectID - 1].objectID;
    this.objectID++;
  }
  if (-1 != isStartFind) {
    indexI = isStartFind;
    fatherObID = this.thrdBTreeNodeArray[indexI].objectID;
  }
  if (-1 == isEndFind) {
    this.thrdBTreeNodeArray[this.objectID - 1] = new thrdBTreeNode(
      this.objectID,
      fatherObID,
      0,
      x,
      y,
      this.objectID - 1,
      endValue
    );
    this.cmd(
      "CreateCircle",
      this.objectID,
      endValue,
      this.iniXc,
      this.iniYc,
      this.radius
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("Step");
    if (lfOrRgt == "leftChild") {
      this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[0] = this.objectID;
      this.thrdBTreeNodeArray[fatherObID - 1].lengthOfChild++;
      this.cmd(
        "Connect",
        this.thrdBTreeNodeArray[fatherObID - 1].objectID,
        this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[0],
        this.foregroundColor
      );
    } else if (lfOrRgt == "rightChild") {
      this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[1] = this.objectID;
      this.thrdBTreeNodeArray[fatherObID - 1].lengthOfChild++;
      this.cmd(
        "Connect",
        this.thrdBTreeNodeArray[fatherObID - 1].objectID,
        this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[1],
        this.foregroundColor
      );
    }
    this.objectID++;
  }
  if (-1 != isEndFind) {
    indexI = isEndFind;
    this.thrdBTreeNodeArray[indexI].faObID = fatherObID;
    if (lfOrRgt == "leftChild") {
      this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[0] =
        this.thrdBTreeNodeArray[indexI].objectID;
      this.thrdBTreeNodeArray[fatherObID - 1].lengthOfChild++;
      this.cmd(
        "Connect",
        this.thrdBTreeNodeArray[fatherObID - 1].objectID,
        this.thrdBTreeNodeArray[indexI].objectID,
        this.foregroundColor
      );
    } else if (lfOrRgt == "rightChild") {
      this.thrdBTreeNodeArray[fatherObID - 1].chObIDArray[1] =
        this.thrdBTreeNodeArray[indexI].objectID;
      this.thrdBTreeNodeArray[fatherObID - 1].lengthOfChild++;
      this.cmd(
        "Connect",
        this.thrdBTreeNodeArray[fatherObID - 1].objectID,
        this.thrdBTreeNodeArray[indexI].objectID,
        this.foregroundColor
      );
    }
  }
  this.done();
  for (
    var indexRoot = 0;
    indexRoot < this.thrdBTreeNodeArray.length;
    indexRoot++
  ) {
    if (
      this.thrdBTreeNodeArray[indexRoot].objectID ==
      this.thrdBTreeNodeArray[indexRoot].faObID
    ) {
      this.rootArray.push(indexRoot);
    }
  }
  {
    // Drawing
    for (var Pt = 0; Pt < this.rootArray.length; Pt++) {
      this.root = this.thrdBTreeNodeArray[this.rootArray[Pt]];
      if (Pt != 0) {
        this.resizeWidth(this.root);
        this.thrdBTreeNodeArray[this.rootArray[Pt]].x =
          this.thrdBTreeNodeArray[this.rootArray[Pt - 1]].x +
          this.thrdBTreeNodeArray[this.rootArray[Pt - 1]].rightWidth +
          this.thrdBTreeNodeArray[this.rootArray[Pt]].leftWidth;
      }
      if (this.rootArray.length == 1) {
        this.root.x = 500;
      }
      this.resizeTree(this.root.x);
    }
  }
  this.rootArray.length = 0;
  return this.commands;
};
thrdBTree.prototype.resizeTree = function (posX) {
  this.resizeWidth(this.root);
  if (this.root != null) {
    this.setNewPosition(this.root, posX, this.startY, 0);
    this.animateNewPosition(this.root);
    this.cmd("Step");
  }
};

// Set the location of each node(Recursion)
thrdBTree.prototype.setNewPosition = function (tree, x, y, side) {
  // If the tree is not empty
  if (tree != null) {
    tree.y = y;
    if (side == -1) {
      // Left child
      x = parseInt(x - tree.rightWidth);
    } else if (side == 1) {
      // Right child
      x = parseInt(x + tree.leftWidth);
    }
    tree.x = x;
    this.setNewPosition(
      this.thrdBTreeNodeArray[tree.chObIDArray[0] - 1],
      x,
      parseInt(y + this.intervalY),
      -1
    );
    this.setNewPosition(
      this.thrdBTreeNodeArray[tree.chObIDArray[1] - 1],
      x,
      parseInt(y + this.intervalY),
      1
    );
  }
};

// Animation shows the location of each node(Recursion)
thrdBTree.prototype.animateNewPosition = function (tree) {
  // If the tree is non-empty, recursive left and right
  if (tree != null) {
    this.cmd("Move", tree.objectID, tree.x, tree.y);
    this.animateNewPosition(this.thrdBTreeNodeArray[tree.chObIDArray[0] - 1]);
    this.animateNewPosition(this.thrdBTreeNodeArray[tree.chObIDArray[1] - 1]);
  }
};

// Calculate the left and right width of the node(Recursion)
thrdBTree.prototype.resizeWidth = function (tree) {
  // If it is empty tree0Recurrent export
  if (tree == null) {
    return 0;
  }
  tree.leftWidth = Math.max(
    this.resizeWidth(this.thrdBTreeNodeArray[tree.chObIDArray[0] - 1]),
    this.intervalX
  ); // Left width
  tree.rightWidth = Math.max(
    this.resizeWidth(this.thrdBTreeNodeArray[tree.chObIDArray[1] - 1]),
    this.intervalX
  ); // Right width
  return parseInt(tree.leftWidth + tree.rightWidth);
};

thrdBTree.prototype.done = function () {
  // Post-processing function,For nodes without childrennull
  for (var indexJ = 0; indexJ < this.thrdBTreeNodeArray.length; indexJ++) {
    if (isNaN(this.thrdBTreeNodeArray[indexJ].chObIDArray[0])) {
      this.thrdBTreeNodeArray[indexJ].chObIDArray[0] = null;
    }
    if (isNaN(this.thrdBTreeNodeArray[indexJ].chObIDArray[1])) {
      this.thrdBTreeNodeArray[indexJ].chObIDArray[1] = null;
    }
  }
};
thrdBTree.prototype.alertt = function () {
  // Draw
  // Method: The method of traversing in the order is traversed each node, each node2Both the subtitle position generates a pointer, if there is no sub-node, a clue is generated, and draw a distinguished forward drive according to the location, followed
  this.cmd(
    "CreateCircle",
    this.nullIndex,
    "NULL",
    this.iniXc,
    this.iniYc,
    this.radius
  );
  this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
  this.cmd("Step");
  var leftlabel = "0 ";
  var rightlabel = " 0";
  var newlabel;
  for (var indexK = 0; indexK < this.midOrder.length; indexK++) {
    leftlabel = "0 ";
    rightlabel = " 0";
    if (
      this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].chObIDArray[0] != null
    ) {
      leftlabel = "0 ";
      newlabel =
        leftlabel +
        this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
        rightlabel;
      this.cmd("setlabel", this.midOrder[indexK], newlabel);
    } else {
      if (indexK - 1 < 0) {
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd("SetHighlight", this.nullIndex, true);
        this.cmd("Step");
        this.cmd("SetHighlight", this.nullIndex, false);
        this.cmd("Step");
        this.cmd(
          "CONNECT",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          this.nullIndex,
          "#FF0000",
          0.5,
          true,
          "Pre-drive"
        );
        this.cmd("Step");
        leftlabel = "1 ";
        newlabel =
          leftlabel +
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
          rightlabel;
        this.cmd("setlabel", this.midOrder[indexK], newlabel);
      } else {
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK - 1] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK - 1] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd(
          "CONNECT",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          this.thrdBTreeNodeArray[this.midOrder[indexK - 1] - 1].objectID,
          "#FF0000",
          0.5,
          true,
          "Pre-drive"
        );
        this.cmd("Step");
        leftlabel = "1 ";
        newlabel =
          leftlabel +
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
          rightlabel;
        this.cmd("setlabel", this.midOrder[indexK], newlabel);
      }
    }
    if (
      this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].chObIDArray[1] != null
    ) {
      rightlabel = " 0";
      newlabel =
        leftlabel +
        this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
        rightlabel;
      this.cmd("setlabel", this.midOrder[indexK], newlabel);
    } else {
      if (indexK + 1 >= this.midOrder.length) {
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd("SetHighlight", this.nullIndex, true);
        this.cmd("Step");
        this.cmd("SetHighlight", this.nullIndex, false);
        this.cmd("Step");
        this.cmd(
          "CONNECT",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          this.nullIndex,
          "#FF0000",
          0.5,
          true,
          "Subsequent"
        );
        this.cmd("Step");
        rightlabel = " 1";
        newlabel =
          leftlabel +
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
          rightlabel;
        this.cmd("setlabel", this.midOrder[indexK], newlabel);
      } else {
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK + 1] - 1].objectID,
          true
        );
        this.cmd("Step");
        this.cmd(
          "SetHighlight",
          this.thrdBTreeNodeArray[this.midOrder[indexK + 1] - 1].objectID,
          false
        );
        this.cmd("Step");
        this.cmd(
          "CONNECT",
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].objectID,
          this.thrdBTreeNodeArray[this.midOrder[indexK + 1] - 1].objectID,
          "#FF0000",
          0.5,
          true,
          "Subsequent"
        );
        this.cmd("Step");
        rightlabel = " 1";
        newlabel =
          leftlabel +
          this.thrdBTreeNodeArray[this.midOrder[indexK] - 1].value +
          rightlabel;
        this.cmd("setlabel", this.midOrder[indexK], newlabel);
      }
    }
  }
};
thrdBTree.prototype.midOrderFun = function () {
  var rootObID = -1;
  for (var indexK = 0; indexK < this.thrdBTreeNodeArray.length; indexK++) {
    if (
      this.thrdBTreeNodeArray[indexK].faObID ==
      this.thrdBTreeNodeArray[indexK].objectID
    ) {
      rootObID = this.thrdBTreeNodeArray[indexK].objectID;
      break;
    }
  }
  var stackArray = new Array();
  var p = rootObID;
  while (stackArray.length != 0 || p != null) {
    if (p <= this.thrdBTreeNodeArray.length && p != null) {
      stackArray.push(p);
      p = this.thrdBTreeNodeArray[p - 1].chObIDArray[0];
    } else {
      p = stackArray.pop();
      this.midOrder.push(p);
      p = this.thrdBTreeNodeArray[p - 1].chObIDArray[1];
    }
  }
};

// Tree node
function thrdBTreeNode(objectID, faObID, lengthOfChild, x, y, index, value) {
  this.objectID = objectID;
  this.faObID = faObID;
  this.chObIDArray = new Array();
  this.lengthOfChild = lengthOfChild;
  this.x = x;
  this.y = y;
  this.index = index;
  this.value = value;
}
