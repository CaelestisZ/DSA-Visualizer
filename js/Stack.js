var currentStack;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentStack = new Stack(animationManager, drawing.width, drawing.height);
}

// Stack
var Stack = function (animManager, width, height) {
  this.init(animManager, width, height);
  //this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
Stack.prototype = new Algorithm();
Stack.prototype.constructor = Stack;

// Initialization control
Stack.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array size");
  this.insertField_maxSize = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "Initialization array");
  this.initButton.onclick = this.initCallBack.bind(this);
  addLabelToAlgorithmBar("Numerical value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.pushButton = addInputToAlgorithmBar("button", "In the stack");
  this.pushButton.onclick = this.pushCallBack.bind(this);
  this.popButton = addInputToAlgorithmBar("button", "Out of the stack");
  this.popButton.onclick = this.popCallBack.bind(this);
};

// initialization
Stack.prototype.initAttributes = function () {
  // Logical partID
  this.head = -1; // Head pointer
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.startX = 250; // Beginningxcoordinate
  this.startY = 100; // Beginningycoordinate
  this.startArrayY = 100; // Started arrayycoordinate
  this.startArrayX = 400; // Started arrayxcoordinate
  // this.initStateBox("Stack size initialization range 1-8");
};

// Initialization status box
Stack.prototype.initStateBox = function (state) {
  this.cmd("SetState", state);
};

// The bind() method creates a new function that, when called, 
// has its this keyword set to the provided value, 
// with a given sequence of arguments preceding any provided when the new function is called.

// Initialization callback function
Stack.prototype.initCallBack = function (length) {
  if (parseInt(length) > 0 && parseInt(length) <= 8) {
    this.implementAction(this.initArray.bind(this), length);
  } else {
    alert("The size of the stack should be between [1-8]");
  }
};

// Forming a stack callback function
Stack.prototype.pushCallBack = function (value) {
  if (value.trim() != "") {
    this.implementAction(this.pushNode.bind(this), value.trim());
  }
};

// Stack callback function
Stack.prototype.popCallBack = function () {
  this.implementAction(this.popNode.bind(this), 0);
};

// Empty array
Stack.prototype.clearCanvas = function () {
  for (var i = 1; i < this.objectID; i++) {
    this.cmd("Delete", i);
  }
  this.objectID = 1;
  this.head = -1; // Head pointer
};

// Initialization array
Stack.prototype.initArray = function (maxSize) {
  this.clearCanvas(); // Delete all arrays
  this.maxSize = maxSize; // Maximum capacity
  this.stack = new Array(maxSize); // Sequence table number
  this.orderObjectID = new Array(maxSize); // Sequence table object

  // Set status bar
  {
    this.cmd("SetState", "Create a size" + maxSize + "Array");
  }

  for (var i = 0; i < this.maxSize; i++) {
    this.orderObjectID[i] = i;
    this.cmd(
      "CreateRectangle",
      this.objectID,
      "",
      this.width,
      this.height,
      "center",
      "center",
      this.startArrayX,
      parseInt(this.startY + i * (this.width - 1))
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.objectID, "#FFFFFF");
    this.orderObjectID[i] = this.objectID;
    this.objectID++;
  }
  return this.commands;
};

// In the stack
Stack.prototype.pushNode = function (value) {
  if (this.stack == null) {
    this.cmd("SetState", "Please create a stack first");
    return this.commands;
  }
  if (this.head >= this.maxSize - 1) {
    this.cmd("SetState", "Stack is full");
    // alert('Already full!') ;
  } else {
    this.head++;
    // Rectangle
    {
      this.cmd("SetState", "Create value" + value + "Array elements");
      this.cmd("Step");

      this.cmd(
        "CreateRectangle",
        this.objectID,
        value,
        this.width,
        this.height,
        "center",
        "center",
        this.startX,
        this.startY
      );
      this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.objectID, this.backgroundColor);
      this.cmd("Step");
    }
    // Find a corresponding location
    {
      this.cmd(
        "SetState",
        "Array" + this.head + "No element, Can insert new elements"
      );
      this.cmd("Step");
      this.cmd("SetHighlight", this.maxSize - this.head, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.maxSize - this.head, false);
      this.cmd("Step");
    }
    this.orderObjectID[this.maxSize - this.head] = this.objectID;
    this.stack[this.head] = value;
    // Newly generated node insertion
    {
      this.cmd(
        "SetState",
        "In array" + this.head + "Position insertion of new elements" + value
      );
      this.cmd("Step");
      this.cmd(
        "Move",
        this.orderObjectID[this.maxSize - this.head],
        this.startArrayX,
        this.startY + (this.maxSize - this.head - 1) * (this.width - 1)
      );
      this.cmd("Step");
    }
    this.objectID++;
  }
  return this.commands;
};

// Pop
Stack.prototype.popNode = function () {
  if (this.stack == null) {
    this.cmd("SetState", "Please create a stack first");
    return this.commands;
  }
  if (this.head <= -1) {
    this.cmd("SetState", "The stack is empty");
    // alert('Already empty!') ;
  } else {
    // Find a corresponding location
    {
      this.cmd(
        "SetState",
        "In array" +
          this.head +
          "Location delete new elements" +
          this.stack[this.head]
      );
      this.cmd("Step");
      this.cmd(
        "SetHighlight",
        this.orderObjectID[this.maxSize - this.head],
        true
      );
      this.cmd("Step");
      this.cmd(
        "SetHighlight",
        this.orderObjectID[this.maxSize - this.head],
        false
      );
      this.cmd("Step");
    }
    var deleteObjectID = this.orderObjectID[this.maxSize - this.head];
    this.head--;
    // Newly generated node delete
    {
      this.cmd("Move", deleteObjectID, this.startX, this.startY);
      this.cmd("Step");
      this.cmd("Delete", deleteObjectID);
      this.cmd("Step");
      this.cmd("SetState", "successfully deleted");
      this.cmd("Step");
    }
    //Stack.pop(this.head);
    //this.stack[this.head] = [] ;
    //this.head -- ;
    //this.stack[this.head] = 0;
  }
  return this.commands;
};

// Stack of nodes
var StackNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
