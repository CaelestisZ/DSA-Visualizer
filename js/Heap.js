// JavaScript Document

var currentHeap;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentHeap = new Heap(animationManager, drawing.width, drawing.height);
}

// heap
var Heap = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
Heap.prototype = new Algorithm();
Heap.prototype.constructor = Heap;

// Initialization control
Heap.prototype.initControls = function () {
  addLabelToAlgorithmBar("Node value");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
  this.deleteButton = addInputToAlgorithmBar("button", "Delete node");
  this.deleteButton.onclick = this.deleteCallBack.bind(this);
};

// initialization
Heap.prototype.initAttributes = function () {
  // Logical part
  this.root = null;
  this.arrayLength = 0;
  this.nodeArray = [];
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.radius = 25; // Round radius
  this.intervalX = 60; // xgap
  this.intervalY = 60; // ygap
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.tomato = "#FF6347"; // tomatocolour
  this.palegreen = "#32CD32"; // palegreencolour
  this.startX = 100; // New nodexcoordinate
  this.startY = 150; // New nodeycoordinate
  this.startRootX = 500; // Root pointxcoordinate
  // Initialization status box
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// Initialization status box
Heap.prototype.initStateBox = function (state) {
  // Create a status box
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

// Insert a callback function
Heap.prototype.insertCallBack = function (value) {
  var insertValue = parseInt(value);
  if (insertValue != "" && !isNaN(insertValue)) {
    // set text value
    this.implementAction(this.insertNode.bind(this), insertValue);
  }
};

// Delete a callback function
Heap.prototype.deleteCallBack = function (value) {
  var insertValue = parseInt(value);
  if (insertValue != "" && !isNaN(insertValue)) {
    // set text value
    this.implementAction(this.deleteNode.bind(this), insertValue);
  }
};

// insert
Heap.prototype.insertNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    // Create a root node
    this.root = new HeapNode(
      this.objectID,
      value,
      this.startRootX,
      this.startY,
      null,
      null,
      null
    );
    this.objectID++;
    this.nodeArray[this.arrayLength] = this.root;
    this.arrayLength++;
    // Create a root node
    {
      this.cmd(
        "CreateCircle",
        this.root.objectID,
        this.root.value,
        this.root.x,
        this.root.y,
        this.radius
      );
      this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor);
      this.cmd("Step");
    }
  } else {
    // Create a new node
    var newNode = new HeapNode(
      this.objectID,
      value,
      this.startX,
      this.startY,
      null,
      null,
      null
    );
    this.nodeArray[this.arrayLength] = newNode;
    this.objectID++;
    {
      this.cmd(
        "CreateCircle",
        newNode.objectID,
        newNode.value,
        newNode.x,
        newNode.y,
        this.radius
      );
      this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor);
      this.cmd("Step");
    }
    // Looking for parent nodes
    var parent = this.nodeArray[parseInt((this.arrayLength - 1) / 2)];
    {
      this.cmd("SetHighlight", parent.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", parent.objectID, false);
      this.cmd("Step");
    }
    // Connect to the parent node
    if (this.arrayLength % 2 == 0) {
      parent.rightChild = newNode;
    } else {
      parent.leftChild = newNode;
    }
    newNode.parent = parent;
    {
      this.cmd(
        "Connect",
        parent.objectID,
        newNode.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
      this.resizeTree();
    }
    // Screen
    this.shiftUp(this.nodeArray[this.arrayLength]);
    this.arrayLength++;
  }
  return this.commands;
};

// delete
Heap.prototype.deleteNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
  } else {
    // Find the node you want to delete
    var delNode;
    for (var i = 0; i < this.arrayLength; i++) {
      if (this.nodeArray[i].value == value) {
        // Each node is highlighted
        {
          this.cmd(
            "SetHighlightColor",
            this.nodeArray[i].objectID,
            this.palegreen
          );
          this.cmd("SetHighlight", this.nodeArray[i].objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", this.nodeArray[i].objectID, false);
          this.cmd("Step");
          this.cmd(
            "SetBackgroundColor",
            this.nodeArray[i].objectID,
            this.palegreen
          );
          this.cmd("Step");
        }
        delNode = this.nodeArray[i];
        break;
      } else {
        // Each node is highlighted
        {
          this.cmd(
            "SetHighlightColor",
            this.nodeArray[i].objectID,
            this.tomato
          );
          this.cmd("SetHighlight", this.nodeArray[i].objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", this.nodeArray[i].objectID, false);
          this.cmd("Step");
        }
      }
    }
    // Find the last node
    var lastNode = this.nodeArray[this.arrayLength - 1];
    if (lastNode == delNode) {
      if (delNode.parent == null) {
        // Delete directly
        {
          this.cmd("Delete", delNode.objectID);
          this.cmd("Step");
        }
        this.root = null;
        this.nodeArray[this.arrayLength - 1] = null;
        this.arrayLength--;
      } else {
        // Disconnect the arrow and delete
        {
          this.cmd("Disconnect", delNode.parent.objectID, delNode.objectID);
          this.cmd("Step");
          this.cmd("Delete", delNode.objectID);
          this.cmd("Step");
        }
        if (delNode.parent.leftChild == delNode) {
          delNode.parent.leftChild = null;
        } else {
          delNode.parent.rightChild = null;
        }
        this.nodeArray[this.arrayLength - 1] = null;
        this.arrayLength--;
      }
    } else {
      // Find the last node
      {
        this.cmd("SetHighlightColor", lastNode.objectID, this.tomato);
        this.cmd("SetHighlight", lastNode.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", lastNode.objectID, false);
        this.cmd("Step");
        this.cmd("SetBackgroundColor", lastNode.objectID, this.palegreen);
        this.cmd("Step");
      }
      // Exchange two nodes
      var t = lastNode.value;
      lastNode.value = delNode.value;
      delNode.value = t;
      // Reset label
      {
        this.cmd("SetLabel", lastNode.objectID, lastNode.value);
        this.cmd("SetLabel", delNode.objectID, delNode.value);
        this.cmd("Step");
        this.cmd("SetBackgroundColor", delNode.objectID, this.backgroundColor);
        this.cmd("SetBackgroundColor", lastNode.objectID, this.backgroundColor);
        this.cmd("Step");
      }
      // Disconnect the arrow and delete
      {
        this.cmd("Disconnect", lastNode.parent.objectID, lastNode.objectID);
        this.cmd("Step");
        this.cmd("Delete", lastNode.objectID);
        this.cmd("Step");
      }
      if (lastNode.parent.leftChild == lastNode) {
        lastNode.parent.leftChild = null;
      } else {
        lastNode.parent.rightChild = null;
      }
      this.nodeArray[this.arrayLength - 1] = null;
      // Screen
      this.shiftDown(delNode);
      this.arrayLength--;
    }
  }
  return this.commands;
};

// Screen
Heap.prototype.shiftUp = function (node) {
  if (node.parent != null) {
    // If it is smaller than the parent node,
    if (parseInt(node.value) < parseInt(node.parent.value)) {
      // The node and the parent node are green.
      {
        this.cmd("SetHighlightColor", node.objectID, this.palegreen);
        this.cmd("SetHighlightColor", node.parent.objectID, this.palegreen);
        this.cmd("SetHighlight", node.objectID, true);
        this.cmd("SetHighlight", node.parent.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", node.objectID, false);
        this.cmd("SetHighlight", node.parent.objectID, false);
        this.cmd("Step");
      }
      var t = node.value;
      node.value = node.parent.value;
      node.parent.value = t;
      // Reset label
      {
        this.cmd("SetLabel", node.objectID, node.value);
        this.cmd("SetLabel", node.parent.objectID, node.parent.value);
        this.cmd("Step");
      }
      this.shiftUp(node.parent);
    } else {
      // The node and the parent node red highlight
      {
        this.cmd("SetHighlightColor", node.objectID, this.tomato);
        this.cmd("SetHighlightColor", node.parent.objectID, this.tomato);
        this.cmd("SetHighlight", node.objectID, true);
        this.cmd("SetHighlight", node.parent.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", node.objectID, false);
        this.cmd("SetHighlight", node.parent.objectID, false);
        this.cmd("Step");
      }
    }
  }
};

// Screen
Heap.prototype.shiftDown = function (node) {
  if (node != null) {
    if (node.leftChild == null && node.rightChild == null) {
      // Set red highlight
      {
        this.cmd("SetHighlightColor", node.objectID, this.tomato);
        this.cmd("SetHighlight", node.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", node.objectID, false);
        this.cmd("Step");
      }
    } else if (node.leftChild == null) {
      if (parseInt(node.value) > parseInt(node.rightChild.value)) {
        // The node and the parent node are green.
        {
          this.cmd("SetHighlightColor", node.objectID, this.palegreen);
          this.cmd(
            "SetHighlightColor",
            node.rightChild.objectID,
            this.palegreen
          );
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("SetHighlight", node.rightChild.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("SetHighlight", node.rightChild.objectID, false);
          this.cmd("Step");
        }
        var t = node.value;
        node.value = node.rightChild.value;
        node.rightChild.value = t;
        // Reset label
        {
          this.cmd("SetLabel", node.objectID, node.value);
          this.cmd("SetLabel", node.rightChild.objectID, node.rightChild.value);
          this.cmd("Step");
        }
        this.shiftDown(node.rightChild);
      } else {
        // Set red highlight
        {
          this.cmd("SetHighlightColor", node.objectID, this.tomato);
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("Step");
        }
      }
    } else if (node.rightChild == null) {
      if (parseInt(node.value) > parseInt(node.leftChild.value)) {
        // The node and the parent node are green.
        {
          this.cmd("SetHighlightColor", node.objectID, this.palegreen);
          this.cmd(
            "SetHighlightColor",
            node.leftChild.objectID,
            this.palegreen
          );
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("SetHighlight", node.leftChild.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("SetHighlight", node.leftChild.objectID, false);
          this.cmd("Step");
        }
        var t = node.value;
        node.value = node.leftChild.value;
        node.leftChild.value = t;
        // Reset label
        {
          this.cmd("SetLabel", node.objectID, node.value);
          this.cmd("SetLabel", node.leftChild.objectID, node.leftChild.value);
          this.cmd("Step");
        }
        this.shiftDown(node.leftChild);
      } else {
        // Set red highlight
        {
          this.cmd("SetHighlightColor", node.objectID, this.tomato);
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("Step");
        }
      }
    } else {
      if (
        parseInt(node.rightChild.value) <= parseInt(node.leftChild.value) &&
        parseInt(node.rightChild.value) < parseInt(node.value)
      ) {
        // The node and the parent node are green.
        {
          this.cmd("SetHighlightColor", node.objectID, this.palegreen);
          this.cmd(
            "SetHighlightColor",
            node.rightChild.objectID,
            this.palegreen
          );
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("SetHighlight", node.rightChild.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("SetHighlight", node.rightChild.objectID, false);
          this.cmd("Step");
        }
        var t = node.value;
        node.value = node.rightChild.value;
        node.rightChild.value = t;
        // Reset label
        {
          this.cmd("SetLabel", node.objectID, node.value);
          this.cmd("SetLabel", node.rightChild.objectID, node.rightChild.value);
          this.cmd("Step");
        }
        this.shiftDown(node.rightChild);
      } else if (
        parseInt(node.leftChild.value) <= parseInt(node.rightChild.value) &&
        parseInt(node.leftChild.value) < parseInt(node.value)
      ) {
        // The node and the parent node are green.
        {
          this.cmd("SetHighlightColor", node.objectID, this.palegreen);
          this.cmd(
            "SetHighlightColor",
            node.leftChild.objectID,
            this.palegreen
          );
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("SetHighlight", node.leftChild.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("SetHighlight", node.leftChild.objectID, false);
          this.cmd("Step");
        }
        var t = node.value;
        node.value = node.leftChild.value;
        node.leftChild.value = t;
        // Reset label
        {
          this.cmd("SetLabel", node.objectID, node.value);
          this.cmd("SetLabel", node.leftChild.objectID, node.leftChild.value);
          this.cmd("Step");
        }
        this.shiftDown(node.leftChild);
      } else {
        // Set red highlight
        {
          this.cmd("SetHighlightColor", node.objectID, this.tomato);
          this.cmd("SetHighlight", node.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", node.objectID, false);
          this.cmd("Step");
        }
      }
    }
  }
};

// Reissue the node of the tree
Heap.prototype.resizeTree = function () {
  this.resizeWidth(this.root);
  if (this.root != null) {
    this.setNewPosition(this.root, this.startRootX, this.startY, 0);
    this.animateNewPosition(this.root);
    this.cmd("Step");
  }
};

// Set the location of each node(Recursion)
Heap.prototype.setNewPosition = function (tree, x, y, side) {
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
    this.setNewPosition(tree.leftChild, x, parseInt(y + this.intervalY), -1);
    this.setNewPosition(tree.rightChild, x, parseInt(y + this.intervalY), 1);
  }
};

// Animation shows the location of each node(Recursion)
Heap.prototype.animateNewPosition = function (tree) {
  // If the tree is non-empty, recursive left and right
  if (tree != null) {
    this.cmd("Move", tree.objectID, tree.x, tree.y);
    this.animateNewPosition(tree.leftChild);
    this.animateNewPosition(tree.rightChild);
  }
};

// Calculate the left and right width of the node(Recursion)
Heap.prototype.resizeWidth = function (tree) {
  // If it is empty tree0Recurrent export
  if (tree == null) {
    return 0;
  }
  tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX); // Left width
  tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX); // Right width
  return parseInt(tree.leftWidth + tree.rightWidth);
};

// Pile of nodes
var HeapNode = function (objectID, value, x, y, leftChild, rightChild, parent) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
  this.leftChild = leftChild; // Left child
  this.rightChild = rightChild; // Right child
  this.parent = parent; // Father
};
