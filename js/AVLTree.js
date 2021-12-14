var currentAVLTree;
// init function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentAVLTree = new AVLTree(animationManager, drawing.width, drawing.height);
}

// sequence table
var AVLTree = function (animManager, width, height) {
  this.init(animManager, width, height);

  this.initAttributes(); // init properties
};
// inheritance and constructor
AVLTree.prototype = new Algorithm();
AVLTree.prototype.constructor = AVLTree;

// init control
AVLTree.prototype.initControls = function () {
  addLabelToAlgorithmBar("Node value");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
};

// init properties
AVLTree.prototype.initAttributes = function () {
  // Logical part
  this.root = null;
  // graphics part
  this.objectID = 1; // serial num of figure
  this.radius = 25; // radius of circle
  this.intervalX = 60; // x gap
  this.intervalY = 60; // y gap
  this.foregroundColor = "#1E90FF"; // foreground color
  this.backgroundColor = "#B0E0E6"; // background color
  this.tomato = "#FF6347"; // tomato color
  this.palegreen = "#32CD32"; // palegreen
  this.startX = 600; // x coordinate of new node
  this.startY = 150; // y coordinate of new node
  this.startRootX = 800; // x coordinate of root node
  // this.array = [[3, 2, 1, 4]];

  this.array = [
    [3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9],
    [7, 4, 2, 1, 3, 6, 5, 13, 11, 9, 8, 10, 12, 15, 14, 16],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 3, 2, 5, 6, 4, 8, 10, 9, 12, 11, 14, 16, 15, 13, 7],
    [9, 8, 10, 11, 12, 13, 14, 15, 16, 7, 6, 5, 4, 1, 2, 3],
    [16, 14, 15, 12, 10, 8, 9, 11, 13, 5, 6, 3, 1, 2, 4, 7],
    [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [7, 13, 15, 16, 14, 11, 12, 9, 10, 8, 4, 6, 5, 2, 3, 1],
  ];

  this.index = 0;
  this.ifdelete = false;
  // init status box
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// init status box
AVLTree.prototype.initStateBox = function (state) {
  // create status box
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

// randomly generate callback function
AVLTree.prototype.randomAVLCallBack = function (value) {
  this.implementAction(this.randomAVL.bind(this), 0);
};

// randomly generated
AVLTree.prototype.randomAVL = function (value) {
  this.index =
    Math.round(Math.random() * this.array.length) % this.array.length;
  this.ifdelete = true;
  for (var i = 0; i < this.array[this.index].length; i++) {
    this.insertNode(this.array[this.index][i]);
  }
  this.deleteNode();
  return this.commands;
};

// insert callback function
AVLTree.prototype.insertCallBack = function (value) {
  var insertValue = parseInt(value);
  if (insertValue != "" && !isNaN(insertValue)) {
    this.implementAction(this.insertNode.bind(this), insertValue);
  }
};

// delete avl callback function
AVLTree.prototype.deleteAVLCallBack = function (value) {
  this.implementAction(this.deleteNode.bind(this), 0);
};

// delete callback function
AVLTree.prototype.deleteCallBack = function (value) {
  // randomly delete
  if (this.ifdelete == true) {
    node =
      Math.round(Math.random() * this.array[this.index].length) %
      this.array[this.index].length;
    value = this.array[this.index][node];
    this.array[this.index].splice(node, 1);
    this.implementAction(this.deleteNode.bind(this), value);
  } else {
    alert("cannot be deleted");
  }
};

// delete
AVLTree.prototype.deleteNode = function () {
  node =
    Math.round(Math.random() * this.array[this.index].length) %
    this.array[this.index].length;
  value = this.array[this.index][node];
  this.cmd("SetState", "delete node" + value);
  this.cmd("Step");
  this.cmd("Step");
  var temp = this.root;
  // start to find
  while (true) {
    if (value >= temp.value && temp.rightChild != null) {
      // find node
      {
        this.cmd("SetState", "node comparison" + value + ">=" + temp.value);
        this.cmd("Step");
        this.cmd("SetHighlight", temp.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", temp.objectID, false);
        this.cmd("Step");
      }
      temp = temp.rightChild;
    } else if (value < temp.value && temp.leftChild != null) {
      // find node
      {
        this.cmd("SetState", "node comparison" + value + "<" + temp.value);
        this.cmd("Step");
        this.cmd("SetHighlight", temp.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", temp.objectID, false);
        this.cmd("Step");
      }
      temp = temp.leftChild;
    } else {
      break;
    }
  }
  // find node
  if (value >= temp.value) {
    // set status box
    {
      this.cmd("SetState", "node comparison" + value + ">=" + temp.value);
      this.cmd("Step");
    }
  } else {
    // set status box
    {
      this.cmd("SetState", "Node comparison" + value + "<" + temp.value);
      this.cmd("Step");
    }
  }
  // set highlight
  {
    this.cmd("SetHighlight", temp.objectID, true);
    this.cmd("Step");
    this.cmd("SetHighlight", temp.objectID, false);
    this.cmd("Step");
  }
  this.cmd("SetState", "delete node" + temp.value);

  if (temp.parent == null) {
    // root node is deleted
    // if only the root node
    if (temp.leftChild == null && temp.rightChild == null) {
      // delete directly
      {
        this.cmd("SetState", "node has no children, delete directly");
        this.cmd("Step");
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
      }
      this.root = null;
    }
    // if only right child
    else if (temp.leftChild == null) {
      // disconnect
      {
        this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
        this.cmd("Step");
      }
      var del = temp;
      this.root = temp.rightChild;
      this.root.parent = null;
      // delete node
      {
        this.cmd("Delete", del.objectID);
        this.cmd("Step");
      }
      this.resizeTree();
    }
    // if only left child
    else if (temp.rightChild == null) {
      // disconnect
      {
        this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
        this.cmd("Step");
      }
      var del = temp;
      this.root = temp.leftChild;
      this.root.parent = null;
      // delete node
      {
        this.cmd("Delete", del.objectID);
        this.cmd("Step");
      }
      this.resizeTree();
    }
    // if there are both left and right children
    else {
      // find rightmost node of left child first
      var rightest = temp.leftChild;
      while (rightest.rightChild != null) {
        // find right child
        {
          this.cmd("Step");
          this.cmd("SetHighlight", rightest.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", rightest.objectID, false);
          this.cmd("Step");
        }
        rightest = rightest.rightChild;
      }
      // find rightmost child
      {
        this.cmd("SetHighlightColor", rightest.objectID, this.palegreen);
        this.cmd("SetState", "find rightmost child of left subtree");
        this.cmd("Step");
        this.cmd("SetHighlight", rightest.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", rightest.objectID, false);
        this.cmd("Step");
        this.cmd("SetHighlightColor", rightest.objectID, this.tomato);
      }
      // make rightmost node become root node
      rightest.x = temp.x;
      rightest.y = temp.y;
      {
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
        this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID);
        this.cmd("Step");
        this.cmd("Move", rightest.objectID, rightest.x, rightest.y);
        this.cmd("Step");
      }
      rightest.leftChild = temp.leftChild;
      rightest.rightChild = temp.rightChild;
      rightest.parent.rightChild = null;
      rightest.parent = temp.parent;
      this.root = rightest;
      this.resizeTree();
    }
  } else {
    del = temp.parent;
    // if it is a leaf node
    if (temp.leftChild == null && temp.rightChild == null) {
      // delete directly
      {
        this.cmd("SetState", "node has no children, delete directly");
        this.cmd("Step");
        this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
        this.cmd("Step");
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
      }
      // set this child of its parent node to be empty
      if (temp == temp.parent.leftChild) {
        temp.parent.leftChild = null;
      } else {
        temp.parent.rightChild = null;
      }
      temp = null;
    }
    // if only right child
    else if (temp.leftChild == null) {
      // disconnect
      {
        this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
        this.cmd("Step");
        this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
        this.cmd("Step");
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
      }
      // Set the child of its parent node as the right child of this child
      if (temp == temp.parent.leftChild) {
        // establish connection
        {
          this.cmd(
            "Connect",
            temp.parent.objectID,
            temp.rightChild.objectID,
            this.foregroundColor
          );
          this.cmd("Step");
        }
        temp.parent.leftChild = temp.rightChild;
        temp.rightChild.parent = temp.parent;
      } else {
        // establish connection
        {
          this.cmd(
            "Connect",
            temp.parent.objectID,
            temp.rightChild.objectID,
            this.foregroundColor
          );
          this.cmd("Step");
        }
        temp.parent.rightChild = temp.rightChild;
        temp.rightChild.parent = temp.parent;
      }
      temp = null;
      this.resizeTree();
    }
    // If only left child
    else if (temp.rightChild == null) {
      // Disconnection
      {
        this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
        this.cmd("Step");
        this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
        this.cmd("Step");
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
      }
      // This child hits the child's right child for this child
      if (temp == temp.parent.leftChild) {
        // establish connection
        {
          this.cmd(
            "Connect",
            temp.parent.objectID,
            temp.leftChild.objectID,
            this.foregroundColor
          );
          this.cmd("Step");
        }
        temp.parent.leftChild = temp.leftChild;
        temp.leftChild.parent = temp.parent;
      } else {
        // establish connection
        {
          this.cmd(
            "Connect",
            temp.parent.objectID,
            temp.leftChild.objectID,
            this.foregroundColor
          );
          this.cmd("Step");
        }
        temp.parent.rightChild = temp.leftChild;
        temp.leftChild.parent = temp.parent;
      }
      temp = null;
      this.resizeTree();
    }
    // If the left and right children have
    else {
      // First find the left child's rightmost node
      var rightest = temp.leftChild;
      while (rightest.rightChild != null) {
        // To find a right child
        {
          this.cmd("Step");
          this.cmd("SetHighlight", rightest.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", rightest.objectID, false);
          this.cmd("Step");
        }
        rightest = rightest.rightChild;
      }
      // Find the rightmost child
      {
        this.cmd("SetHighlightColor", rightest.objectID, this.palegreen);
        this.cmd("SetState", "Find the rightmost child of the left child");
        this.cmd("Step");
        this.cmd("SetHighlight", rightest.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", rightest.objectID, false);
        this.cmd("Step");
        this.cmd("SetHighlightColor", rightest.objectID, this.tomato);
      }
      // Let the node on the right side become root nodes
      rightest.x = temp.x;
      rightest.y = temp.y;
      {
        this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID);
        this.cmd("Step");
        this.cmd(
          "Connect",
          rightest.objectID,
          temp.leftChild.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          rightest.objectID,
          temp.rightChild.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
        this.cmd("Step");
        this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
        this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
        this.cmd("Step");
        this.cmd(
          "Connect",
          temp.parent.objectID,
          rightest.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd("Delete", temp.objectID);
        this.cmd("Step");
        this.cmd("Move", rightest.objectID, rightest.x, rightest.y);
        this.cmd("Step");
      }
      if (rightest != temp.leftChild) {
        rightest.parent.rightChild = null;
        rightest.leftChild = temp.leftChild;
        temp.leftChild.parent = rightest;
      }
      rightest.rightChild = temp.rightChild;
      temp.rightChild.parent = rightest;
      rightest.parent = temp.parent;
      if (temp == temp.parent.leftChild) {
        temp.parent.leftChild = rightest;
      } else {
        temp.parent.rightChild = rightest;
      }
      temp = null;
      this.resizeTree();
    }
    // Update the location of each node of the tree
    this.resizeTree();
    // Calculate the height of each node
    this.calHeight(this.root);
    // Update balancing factors for each node
    this.calBalFactor(this.root);
    // Back from this node upward
    var isTurn = false;
    var stack = new Array(); // Stack storage path
    temp = del;
    while (temp != null) {
      stack.push(temp);
      if (temp.balfactor >= 2 || temp.balfactor <= -2) {
        isTurn = true;
        break;
      }
      temp = temp.parent;
    }
    if (isTurn) {
      var first = stack.pop();
      var second = stack.pop();
      var third = stack.pop();
      // set highlight
      {
        this.cmd("SetHighlight", first.objectID, true);
        this.cmd("SetHighlight", second.objectID, true);
        this.cmd("SetHighlight", third.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", first.objectID, false);
        this.cmd("SetHighlight", second.objectID, false);
        this.cmd("SetHighlight", third.objectID, false);
        this.cmd("Step");
      }
      // start turning
      if (first.leftChild == second && second.leftChild == third) {
        this.singleRightTurn(first, second);
      } else if (first.rightChild == second && second.rightChild == third) {
        this.singleLeftTurn(first, second);
      } else if (first.leftChild == second && second.rightChild == third) {
        this.leftRightTurn(first, second, third);
      } else if (first.rightChild == second && second.leftChild == third) {
        this.rightLeftTurn(first, second, third);
      }
    }
    // update position of every points
    this.resizeTree();
  }
  return this.commands;
};

// insert
AVLTree.prototype.insertNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    this.root = new TreeNode(
      this.objectID,
      value,
      this.startRootX,
      this.startY,
      0,
      null,
      null,
      null
    );
    this.objectID++;
    // Create a root node
    {
      this.cmd("SetState", "Create a root node" + value);
      this.cmd("Step");
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
    var temp = this.root;
    var newNode = new TreeNode(
      this.objectID,
      value,
      this.startX,
      this.startY,
      null,
      null,
      null
    );
    this.objectID++;
    // Create a new node
    {
      this.cmd("SetState", "Create a new node" + value);
      this.cmd("Step");
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
    // Start looking for
    while (true) {
      if (newNode.value >= temp.value && temp.rightChild != null) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + ">=" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (newNode.value < temp.value && temp.leftChild != null) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + "<" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        break;
      }
    }
    // Find node
    if (newNode.value >= temp.value) {
      // Set status box
      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + ">=" + temp.value
        );
        this.cmd("Step");
      }
    } else {
      // Set status box
      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + "<" + temp.value
        );
        this.cmd("Step");
      }
    }
    // Set highlight
    {
      this.cmd("SetHighlight", temp.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", temp.objectID, false);
      this.cmd("Step");
      this.cmd(
        "Connect",
        temp.objectID,
        newNode.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    // The node is inserted into the corresponding position
    if (parseInt(newNode.value) >= parseInt(temp.value)) {
      // Insert to the right
      temp.rightChild = newNode;
      newNode.parent = temp;
      // insert
      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert to the parent node" +
            temp.value +
            "Right child"
        );
        this.cmd("Step");
      }
    } else {
      // Insert to the left
      temp.leftChild = newNode;
      newNode.parent = temp;
      // insert
      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert to the parent node" +
            temp.value +
            "Left child"
        );
        this.cmd("Step");
      }
    }
    // Update the location of each node of the tree
    this.resizeTree();
    // Calculate the height of each node
    this.calHeight(this.root);
    // Update balancing factors for each node
    this.calBalFactor(this.root);
    // Back from this node upward
    var isTurn = false;
    var stack = new Array(); // Stack storage path
    temp = newNode;
    while (temp != null) {
      stack.push(temp);
      if (temp.balfactor >= 2 || temp.balfactor <= -2) {
        isTurn = true;
        break;
      }
      temp = temp.parent;
    }
    if (isTurn) {
      var first = stack.pop();
      var second = stack.pop();
      var third = stack.pop();
      // set highlight
      {
        this.cmd("SetHighlight", first.objectID, true);
        this.cmd("SetHighlight", second.objectID, true);
        this.cmd("SetHighlight", third.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", first.objectID, false);
        this.cmd("SetHighlight", second.objectID, false);
        this.cmd("SetHighlight", third.objectID, false);
        this.cmd("Step");
      }
      // start turning
      if (first.leftChild == second && second.leftChild == third) {
        this.singleRightTurn(first, second);
      } else if (first.rightChild == second && second.rightChild == third) {
        this.singleLeftTurn(first, second);
      } else if (first.leftChild == second && second.rightChild == third) {
        this.leftRightTurn(first, second, third);
      } else if (first.rightChild == second && second.leftChild == third) {
        this.rightLeftTurn(first, second, third);
      }
    }
    // update position of every points
    this.resizeTree();
  }
  return this.commands;
};

// delete
AVLTree.prototype.insertNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    this.root = new TreeNode(
      this.objectID,
      value,
      this.startRootX,
      this.startY,
      0,
      null,
      null,
      null
    );
    this.objectID++;
    // Create a root node
    {
      this.cmd("SetState", "Create a root node" + value);
      this.cmd("Step");
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
    var temp = this.root;
    var newNode = new TreeNode(
      this.objectID,
      value,
      this.startX,
      this.startY,
      null,
      null,
      null
    );
    this.objectID++;
    // Create a new node
    {
      this.cmd("SetState", "Create a new node" + value);
      this.cmd("Step");
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
    // Start looking for
    while (true) {
      if (newNode.value >= temp.value && temp.rightChild != null) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + ">=" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (newNode.value < temp.value && temp.leftChild != null) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + "<" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        break;
      }
    }
    // Find node
    if (newNode.value >= temp.value) {
      // Set status box
      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + ">=" + temp.value
        );
        this.cmd("Step");
      }
    } else {
      // Set status box
      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + "<" + temp.value
        );
        this.cmd("Step");
      }
    }
    // Set highlight
    {
      this.cmd("SetHighlight", temp.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", temp.objectID, false);
      this.cmd("Step");
      this.cmd(
        "Connect",
        temp.objectID,
        newNode.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    // The node is inserted into the corresponding position
    if (parseInt(newNode.value) >= parseInt(temp.value)) {
      // Insert to the right
      temp.rightChild = newNode;
      newNode.parent = temp;
      // insert
      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert to the parent node" +
            temp.value +
            "Right child"
        );
        this.cmd("Step");
      }
    } else {
      // Insert to the left
      temp.leftChild = newNode;
      newNode.parent = temp;
      // insert
      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert to the parent node" +
            temp.value +
            "Left child"
        );
        this.cmd("Step");
      }
    }
    // Update the location of each node of the tree
    this.resizeTree();
    // Calculate the height of each node
    this.calHeight(this.root);
    // Update balancing factors for each node
    this.calBalFactor(this.root);
    // Back from this node upward
    var isTurn = false;
    var stack = new Array(); // Stack storage path
    temp = newNode;
    while (temp != null) {
      stack.push(temp);
      if (temp.balfactor >= 2 || temp.balfactor <= -2) {
        isTurn = true;
        break;
      }
      temp = temp.parent;
    }
    if (isTurn) {
      var first = stack.pop();
      var second = stack.pop();
      var third = stack.pop();
      // set highlight
      {
        this.cmd("SetHighlight", first.objectID, true);
        this.cmd("SetHighlight", second.objectID, true);
        this.cmd("SetHighlight", third.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", first.objectID, false);
        this.cmd("SetHighlight", second.objectID, false);
        this.cmd("SetHighlight", third.objectID, false);
        this.cmd("Step");
      }
      // start turning
      if (first.leftChild == second && second.leftChild == third) {
        this.singleRightTurn(first, second);
      } else if (first.rightChild == second && second.rightChild == third) {
        this.singleLeftTurn(first, second);
      } else if (first.leftChild == second && second.rightChild == third) {
        this.leftRightTurn(first, second, third);
      } else if (first.rightChild == second && second.leftChild == third) {
        this.rightLeftTurn(first, second, third);
      }
    }
    // update position of every points
    this.resizeTree();
  }
  return this.commands;
};

// single right turn method
AVLTree.prototype.singleRightTurn = function (first, second) {
  // B's right child is null?
  if (second.rightChild != null) {
    // B gives right child to A
    {
      this.cmd("Disconnect", second.objectID, second.rightChild.objectID);
      this.cmd("Step");
    }
    first.leftChild = second.rightChild;
    {
      this.cmd(
        "Connect",
        first.objectID,
        first.leftChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    first.leftChild.parent = first;
  } else {
    first.leftChild = null;
  }
  // A's parent is null?
  if (first.parent == null) {
    // if A is root
    this.root = second;
    second.parent = null;
  } else {
    // if A is not root
    if (first.parent.leftChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.leftChild = second;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          second.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      second.parent = first.parent;
    } else if (first.parent.rightChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.rightChild = second;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          second.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      second.parent = first.parent;
    }
  }
  // set A be the right child of B
  {
    this.cmd("Disconnect", first.objectID, second.objectID);
    this.cmd("Step");
    this.cmd("Connect", second.objectID, first.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  second.rightChild = first;
  first.parent = second;
};

// single left turn method
AVLTree.prototype.singleLeftTurn = function (first, second) {
  // B's left child is null?
  if (second.leftChild != null) {
    // B gives right child to A
    {
      this.cmd("Disconnect", second.objectID, second.leftChild.objectID);
      this.cmd("Step");
    }
    first.rightChild = second.leftChild;
    {
      this.cmd(
        "Connect",
        first.objectID,
        first.rightChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    first.rightChild.parent = first;
  } else {
    first.rightChild = null;
  }
  // A's parent is null?
  if (first.parent == null) {
    // B will be the root
    this.root = second;
    second.parent = null;
  } else {
    // set B be A's parent's child
    if (first.parent.leftChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.leftChild = second;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          second.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      second.parent = first.parent;
    } else if (first.parent.rightChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.rightChild = second;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          second.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      second.parent = first.parent;
    }
  }
  // set A be the right child of B
  {
    this.cmd("Disconnect", first.objectID, second.objectID);
    this.cmd("Step");
    this.cmd("Connect", second.objectID, first.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  second.leftChild = first;
  first.parent = second;
};

// left right turn method
AVLTree.prototype.leftRightTurn = function (first, second, third) {
  // if C's left child is not null
  if (third.leftChild != null) {
    // give its left child to be B's right child
    {
      this.cmd("Disconnect", third.objectID, third.leftChild.objectID);
      this.cmd("Step");
    }
    second.rightChild = third.leftChild;
    {
      this.cmd(
        "Connect",
        second.objectID,
        second.rightChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    second.rightChild.parent = second;
  } else {
    second.rightChild = null;
  }
  // if C's right child is not null
  if (third.rightChild != null) {
    // give its right child to be A's left child
    {
      this.cmd("Disconnect", third.objectID, third.rightChild.objectID);
      this.cmd("Step");
    }
    first.leftChild = third.rightChild;
    {
      this.cmd(
        "Connect",
        first.objectID,
        first.leftChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    first.leftChild.parent = first;
  } else {
    first.leftChild = null;
  }
  // if A's parent is null
  if (first.parent == null) {
    this.root = third;
    third.parent = null;
  } else {
    // set C be A's parent's child
    if (first.parent.leftChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.leftChild = third;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          third.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      third.parent = first.parent;
    } else if (first.parent.rightChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.rightChild = third;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          third.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      third.parent = first.parent;
    }
  }
  // set B be the left child of C, set A be the right child of C
  {
    this.cmd("Disconnect", second.objectID, third.objectID);
    this.cmd("Step");
    this.cmd("Connect", third.objectID, second.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  third.leftChild = second;
  second.parent = third;
  {
    this.cmd("Disconnect", first.objectID, second.objectID);
    this.cmd("Step");
    this.cmd("Connect", third.objectID, first.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  third.rightChild = first;
  first.parent = third;
};

// right left turn method
AVLTree.prototype.rightLeftTurn = function (first, second, third) {
  // if C's left child is not null
  if (third.leftChild != null) {
    // give its left child to be B's right child
    {
      this.cmd("Disconnect", third.objectID, third.leftChild.objectID);
      this.cmd("Step");
    }
    first.rightChild = third.leftChild;
    {
      this.cmd(
        "Connect",
        first.objectID,
        first.rightChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    first.rightChild.parent = first;
  } else {
    first.rightChild = null;
  }
  // if C's right child is not null
  if (third.rightChild != null) {
    // give its right child to be A's left child
    {
      this.cmd("Disconnect", third.objectID, third.rightChild.objectID);
      this.cmd("Step");
    }
    second.leftChild = third.rightChild;
    {
      this.cmd(
        "Connect",
        second.objectID,
        second.leftChild.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }
    second.leftChild.parent = second;
  } else {
    second.leftChild = null;
  }
  // if A's parent is null
  if (first.parent == null) {
    this.root = third;
    third.parent = null;
  } else {
    // set C be A's parent's child
    if (first.parent.leftChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.leftChild = third;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          third.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      third.parent = first.parent;
    } else if (first.parent.rightChild == first) {
      {
        this.cmd("Disconnect", first.parent.objectID, first.objectID);
        this.cmd("Step");
      }
      first.parent.rightChild = third;
      {
        this.cmd(
          "Connect",
          first.parent.objectID,
          third.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
      }
      third.parent = first.parent;
    }
  }
  // set B be the left child of C, set A be the right child of C
  {
    this.cmd("Disconnect", first.objectID, second.objectID);
    this.cmd("Step");
    this.cmd("Connect", third.objectID, first.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  third.leftChild = first;
  first.parent = third;
  {
    this.cmd("Disconnect", second.objectID, third.objectID);
    this.cmd("Step");
    this.cmd("Connect", third.objectID, second.objectID, this.foregroundColor);
    this.cmd("Step");
  }
  third.rightChild = second;
  second.parent = third;
};

// Reissue the node of the tree
AVLTree.prototype.resizeTree = function () {
  this.resizeWidth(this.root);
  if (this.root != null) {
    this.setNewPosition(this.root, this.startRootX, this.startY, 0);
    this.animateNewPosition(this.root);
    this.cmd("Step");
  }
};

// Set the location of each node (Recursion)
AVLTree.prototype.setNewPosition = function (tree, x, y, side) {
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

// Animation shows the location of each node (Recursion)
AVLTree.prototype.animateNewPosition = function (tree) {
  // If the tree is non-empty, recursive left and right
  if (tree != null) {
    this.cmd("Move", tree.objectID, tree.x, tree.y);
    this.animateNewPosition(tree.leftChild);
    this.animateNewPosition(tree.rightChild);
  }
};

// Calculate the left and right width of the node (Recursion)
AVLTree.prototype.resizeWidth = function (tree) {
  // If it is empty tree to return 0, recursive exit
  if (tree == null) {
    return 0;
  }
  tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX); // Left width
  tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX); // Right width
  return parseInt(tree.leftWidth + tree.rightWidth);
};

// Computational node balance factor(Recursion)
AVLTree.prototype.calBalFactor = function (tree) {
  // If it is empty tree to return 0, recursive exit
  if (tree == null) {
    return 0;
  }
  tree.balfactor = parseInt(tree.rightHeight - tree.leftHeight);
  this.calBalFactor(tree.leftChild);
  this.calBalFactor(tree.rightChild);
};

// Calculate the height of the node(Recursion)
AVLTree.prototype.calHeight = function (tree) {
  // If it is empty tree to return 0, recursive exit
  if (tree == null) {
    return 0;
  }
  tree.leftHeight = this.calHeight(tree.leftChild);
  tree.rightHeight = this.calHeight(tree.rightChild);
  return parseInt(Math.max(tree.leftHeight, tree.rightHeight) + 1);
};

// Tree node
var TreeNode = function (
  objectID,
  value,
  x,
  y,
  balfactor,
  leftChild,
  rightChild,
  parent
) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // X coordinate
  this.y = y; // Y coordinate
  this.balfactor = balfactor; // Balance factor
  this.leftChild = leftChild; // Left child
  this.rightChild = rightChild; // Right child
  this.parent = parent; // Father
};
