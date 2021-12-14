// JavaScript Document

var currentQueue;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentQueue = new Queue(animationManager, drawing.width, drawing.height);
}

// queue
var Queue = function (animManager, width, height) {
  this.init(animManager, width, height);
  //this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
Queue.prototype = new Algorithm();
Queue.prototype.constructor = Queue;

// Initialization control
Queue.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array size");
  this.insertField_maxSize = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "Initialization array");
  this.initButton.onclick = this.initCallBack.bind(this);
  addLabelToAlgorithmBar("Numerical value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.pushButton = addInputToAlgorithmBar("button", "Join the team");
  this.pushButton.onclick = this.pushCallBack.bind(this);
  this.popButton = addInputToAlgorithmBar("button", "Outstanding team");
  this.popButton.onclick = this.popCallBack.bind(this);
};

// initialization
Queue.prototype.initAttributes = function () {
  // Logical partID
  this.front = 0; // Head pointer
  this.rear = 0; //Tail pointer
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.startX = 150; // Beginningxcoordinate
  this.startY = 150; // Beginningycoordinate
  this.startArrayY = 250; // Started arrayycoordinate
  this.startArrowY = 300; // Started arrowycoordinate
  this.length = 30; // Arrow length
  // this.implementAction(this.initStateBox.bind(this), "start") ;
};

// Initialization status box
Queue.prototype.initStateBox = function (state) {
  return this.commands;
};

// Initialization callback function
Queue.prototype.initCallBack = function (length) {
  if (parseInt(length) > 0 && parseInt(length) <= 16) {
    this.implementAction(this.initArray.bind(this), length);
  } else {
    alert("The initialization array length should be between [1,16]");
  }
};

// Introduction callback function
Queue.prototype.pushCallBack = function (value) {
  if (value.trim() != "") {
    this.implementAction(this.enQueue.bind(this), value);
  }
};

// Draw a callback function
Queue.prototype.popCallBack = function () {
  this.implementAction(this.deQueue.bind(this), 0);
};

Queue.prototype.clearCanvas = function () {
  // Empty array
  if (this.queue != null && this.queue != undefined) {
    for (var i = 0; i < this.queue.length; i++) {
      if (this.queue[i] != null) {
        this.cmd("Delete", this.queue[i].objectID);
      }
    }
    this.queue = null;
  }
  // Empty element
  if (this.orderObjectID != null && this.orderObjectID != undefined) {
    for (var i = 0; i < this.orderObjectID.length; i++) {
      this.cmd("Delete", this.orderObjectID[i]);
    }
    this.orderObjectID = null;
  }
  this.front = 0; // Head pointer
  this.rear = 0; //Tail pointer
};

// Initialization array
Queue.prototype.initArray = function (maxSize) {
  this.clearCanvas();
  this.maxSize = parseInt(maxSize) + 1; // Maximum capacity
  this.queue = new Array(this.maxSize); // Queue array
  this.orderObjectID = new Array(this.maxSize); // Queue's object
  // Set status bar
  {
    this.cmd("SetState", "Create a size" + this.maxSize + "Array");
  }
  for (var i = 0; i < this.maxSize; i++) {
    this.orderObjectID[i] = this.objectID;
    this.cmd(
      "CreateRectangle",
      this.objectID,
      "",
      this.width,
      this.height,
      "center",
      "center",
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.objectID, "#FFFFFF");
    this.orderObjectID[i] = this.objectID;
    this.objectID++;
  }
  return this.commands;
};

// insert
Queue.prototype.enQueue = function (value) {
  if (this.queue == null) {
    this.cmd("SetState", "Please create a queue first");
    return this.commands;
  }
  if ((this.rear + 1) % this.maxSize == this.front) {
    this.cmd(
      "SetState",
      "The queue is full, you can't continue to enter the item"
    );
    // alert('Already full!') ;
  } else {
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
        "Array" + this.rear + "No element, Can insert new elements"
      );
      this.cmd("Step");
      this.cmd("SetHighlight", this.orderObjectID[this.rear], true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.orderObjectID[this.rear], false);
      this.cmd("Step");
    }
    this.queue[this.rear] = new QueueNode(
      this.objectID,
      value,
      this.startX + this.rear * (this.width - 1),
      this.startArrayY
    );
    // Newly generated node insertion
    {
      this.cmd(
        "Move",
        this.queue[this.rear].objectID,
        this.queue[this.rear].x,
        this.queue[this.rear].y
      );
      this.cmd("Step");
    }
    this.objectID++;
    this.rear = (this.rear + 1) % this.maxSize;
  }
  return this.commands;
};

// delete
Queue.prototype.deQueue = function () {
  if (this.queue == null) {
    this.cmd("SetState", "Please create a queue first");
    return this.commands;
  }
  if (this.front == this.rear) {
    this.cmd("SetState", "The queue is empty");
    // alert('Already empty!') ;
  } else {
    // Find a corresponding location
    {
      this.cmd(
        "SetState",
        "In array" +
          this.front +
          "Location delete new elements" +
          this.queue[this.front].value
      );
      this.cmd("Step");
      this.cmd("SetHighlight", this.queue[this.front].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.queue[this.front].objectID, false);
      this.cmd("Step");
    }
    var deleteObjectID = this.queue[this.front].objectID;
    //Queue
    {
      this.cmd("Move", deleteObjectID, this.startX, this.startY);
      this.cmd("Step");
      this.cmd("Delete", deleteObjectID);
      this.cmd("Step");
      this.cmd("SetState", "successfully deleted");
      this.cmd("Step");
    }
    this.queue[this.front] = null;
    this.front = (this.front + 1) % this.maxSize;
  }
  return this.commands;
};

// Queue node
var QueueNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
