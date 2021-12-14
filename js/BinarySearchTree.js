// JavaScript Document

var currentBST;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentBST = new BinarySearchTree(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Sequence table
var BinarySearchTree = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
BinarySearchTree.prototype = new Algorithm();
BinarySearchTree.prototype.constructor = BinarySearchTree;

// Initialization control
BinarySearchTree.prototype.initControls = function () {
  addLabelToAlgorithmBar("Node value");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
  this.searchButton = addInputToAlgorithmBar("button", "Find node");
  this.searchButton.onclick = this.searchCallBack.bind(this);
  this.deleteButton = addInputToAlgorithmBar("button", "Delete node");
  this.deleteButton.onclick = this.deleteCallBack.bind(this);
  this.dfsButton = addInputToAlgorithmBar("button", "Depth search");
  this.dfsButton.onclick = this.DFSCallBack.bind(this);
  this.bfsButton = addInputToAlgorithmBar("button", "Search");
  this.bfsButton.onclick = this.BFSCallBack.bind(this);
};

// Initialization attribute
BinarySearchTree.prototype.initAttributes = function () {
  // Logical part
  this.root = null;
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
  this.array = [];
  // Initialization status box
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// Initialization status box
BinarySearchTree.prototype.initStateBox = function (state) {
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
BinarySearchTree.prototype.insertCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("Must enter a +ve integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    var insertValue = parseInt(value);
    var isExist = false;
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i] == insertValue) {
        isExist = true;
        break;
      }
    }
    // alert(isExist);
    if (isExist == true) {
      alert("This number has already appeared");
    } else {
      this.implementAction(this.insertNode.bind(this), insertValue);
      this.array.push(insertValue);
    }
  }
};

// Find a callback function
BinarySearchTree.prototype.searchCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("Must enter an integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    var searchValue = parseInt(value);
    this.implementAction(this.searchNode.bind(this), searchValue);
  }
};

// Delete a callback function
BinarySearchTree.prototype.deleteCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("Must enter an integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    // alert(this.array);
    var deleteValue = parseInt(value);
    this.implementAction(this.deleteNode.bind(this), deleteValue);
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i] == deleteValue) {
        this.array.splice(i, 1);
        break;
      }
    }
    // alert(this.array);
  }
};

// Deep search callback function
BinarySearchTree.prototype.DFSCallBack = function (event) {
  this.implementAction(this.DeepFirstSearch.bind(this), 2);
};

// Guangso callback function
BinarySearchTree.prototype.BFSCallBack = function (event) {
  this.implementAction(this.BroadFirstSearch.bind(this));
};

// insert
BinarySearchTree.prototype.insertNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    // Create a root node
    this.root = new TreeNode(
      this.objectID,
      value,
      this.startRootX,
      this.startY,
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
    this.resizeTree();
  }
  return this.commands;
};

// Look up
BinarySearchTree.prototype.searchNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    this.cmd("SetState", "Empty tree.");
    this.cmd("Step");
  } else {
    var found = false;
    var temp = this.root;
    // Start looking for
    while (temp != null) {
      if (value > temp.value) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              ">" +
              temp.value +
              ", Move to the right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (value < temp.value) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              "<" +
              temp.value +
              ", Move to the right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison: " + value + "=" + temp.value + ", Find node"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.palegreen);
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.tomato);
        }
        found = true;
        break;
      }
    }
    if (!found) {
      // No node found
      {
        this.cmd("SetState", "No node found" + value);
        this.cmd("Step");
      }
    } else {
      // Find node
      {
        this.cmd("SetState", "Find node" + value);
        this.cmd("Step");
      }
    }
  }
  return this.commands;
};

// delete
BinarySearchTree.prototype.deleteNode = function (value) {
  // If the root node is empty
  if (this.root == null || this.root == undefined) {
    this.cmd("SetState", "Empty tree cannot be removed");
    this.cmd("Step");
  } else {
    var found = false;
    var temp = this.root;
    // Start looking for
    while (temp != null) {
      if (value > temp.value) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              ">" +
              temp.value +
              ", Move to the right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (value < temp.value) {
        // Find node
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              "<" +
              temp.value +
              ", Move to the right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        // Find node
        {
          this.cmd("SetState", "Node comparison: " + value + "=" + temp.value);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.palegreen);
          this.cmd("SetState", "Find nodes, ready to delete");
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.tomato);
        }
        if (temp.parent == null) {
          // Delete is root node
          // If there is only root node
          if (temp.leftChild == null && temp.rightChild == null) {
            // Delete directly
            {
              this.cmd(
                "SetState",
                "This node does not have a child node, delete directly"
              );
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }
            this.root = null;
          }
          // If only the right child
          else if (temp.leftChild == null) {
            // Disconnection
            {
              this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
              this.cmd("Step");
            }
            var del = temp;
            this.root = temp.rightChild;
            this.root.parent = null;
            // Delete node
            {
              this.cmd("Delete", del.objectID);
              this.cmd("Step");
            }
            this.resizeTree();
          }
          // If only left child
          else if (temp.rightChild == null) {
            // Disconnection
            {
              this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
              this.cmd("Step");
            }
            var del = temp;
            this.root = temp.leftChild;
            this.root.parent = null;
            // Delete node
            {
              this.cmd("Delete", del.objectID);
              this.cmd("Step");
            }
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
              this.cmd(
                "SetState",
                "Find the rightmost child of the left child"
              );
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
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
              this.cmd(
                "Disconnect",
                rightest.parent.objectID,
                rightest.objectID
              );
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
          // If it is a leaf node
          if (temp.leftChild == null && temp.rightChild == null) {
            // Delete directly
            {
              this.cmd(
                "SetState",
                "This node does not have a child node, delete directly"
              );
              this.cmd("Step");
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }
            // This child hits the parent node is empty
            if (temp == temp.parent.leftChild) {
              temp.parent.leftChild = null;
            } else {
              temp.parent.rightChild = null;
            }
            temp = null;
          }
          // If only the right child
          else if (temp.leftChild == null) {
            // Disconnection
            {
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
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
              this.cmd(
                "SetState",
                "Find the rightmost child of the left child"
              );
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
              this.cmd(
                "Disconnect",
                rightest.parent.objectID,
                rightest.objectID
              );
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
        }
        found = true;
        break;
      }
    }
    if (!found) {
      // No node found
      {
        this.cmd("SetState", "No node found" + value + "Can't delete");
        this.cmd("Step");
      }
    } else {
      // Delete completion
      {
        this.cmd("SetState", "Delete completion");
        this.cmd("Step");
      }
    }
  }
  return this.commands;
};

// Reissue the node of the tree
BinarySearchTree.prototype.resizeTree = function () {
  this.resizeWidth(this.root);
  if (this.root != null) {
    this.setNewPosition(this.root, this.startRootX, this.startY, 0);
    this.animateNewPosition(this.root);
    this.cmd("Step");
  }
};

// Set the location of each node(Recursion)
BinarySearchTree.prototype.setNewPosition = function (tree, x, y, side) {
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
BinarySearchTree.prototype.animateNewPosition = function (tree) {
  // If the tree is non-empty, recursive left and right
  if (tree != null) {
    this.cmd("Move", tree.objectID, tree.x, tree.y);
    this.animateNewPosition(tree.leftChild);
    this.animateNewPosition(tree.rightChild);
  }
};

// Calculate the left and right width of the node(Recursion)
BinarySearchTree.prototype.resizeWidth = function (tree) {
  // If it is empty tree0Recurrent export
  if (tree == null) {
    return 0;
  }
  tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX); // Left width
  tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX); // Right width
  return parseInt(tree.leftWidth + tree.rightWidth);
};

// Deep priority search(1:Prime, 2:Order, 3:Resequence)
BinarySearchTree.prototype.DeepFirstSearch = function (order) {
  // Search
  if (order == 1) {
    this.stateBox = "start";
    this.PreOrderRecursive(this.root);
  } else if (order == 2) {
    this.stateBox = "start";
    this.MidOrderRecursive(this.root);
  } else if (order == 3) {
    this.stateBox = "start";
    this.PostOrderRecursive(this.root);
  }
  return this.commands;
};

// Preface recursive function
BinarySearchTree.prototype.PreOrderRecursive = function (tree) {
  if (tree != null) {
    // Highlighted
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }
    // Access node
    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }
    // Set status box
    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
    this.PreOrderRecursive(tree.leftChild);
    this.PreOrderRecursive(tree.rightChild);
  }
};

// Sedential recursive function
BinarySearchTree.prototype.MidOrderRecursive = function (tree) {
  if (tree != null) {
    // Highlighted
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }
    this.MidOrderRecursive(tree.leftChild);
    // Access node
    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }
    // Set status box
    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
    this.MidOrderRecursive(tree.rightChild);
  }
};

// Sedential recursive function
BinarySearchTree.prototype.PostOrderRecursive = function (tree) {
  if (tree != null) {
    // Highlighted
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }
    this.PostOrderRecursive(tree.leftChild);
    this.PostOrderRecursive(tree.rightChild);
    // Access node
    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }
    // Set status box
    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
  }
};

// Guangsheng priority search
BinarySearchTree.prototype.BroadFirstSearch = function () {
  this.stateBox = "start";
  var queue = new Array();
  queue.push(this.root); // Root node into the team
  // If the queue is not empty
  while (queue.length != 0) {
    var temp = queue.shift(); // Take the first element
    // Access node
    {
      this.cmd("SetHighlight", temp.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", temp.objectID, false);
      this.cmd("Step");
    }
    // Set status box
    this.stateBox = this.stateBox + ", " + temp.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
    // If the left child is not empty, the left child will enter the team.
    if (temp.leftChild != null) {
      queue.push(temp.leftChild);
    }
    // If the right child is not separated, the right child will enter the team.
    if (temp.rightChild != null) {
      queue.push(temp.rightChild);
    }
  }
  return this.commands;
};

// Tree node
var TreeNode = function (objectID, value, x, y, leftChild, rightChild, parent) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
  this.leftChild = leftChild; // Left child
  this.rightChild = rightChild; // Right child
  this.parent = parent; // Father
};
