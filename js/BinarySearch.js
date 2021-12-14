// JavaScript Document

// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  var currentLinearSearch = new BinarySearch(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Sequence table
var BinarySearch = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initControls(); // Initialization control
  this.initAttributes(); // Initialization attribute
};

// Inheritance and construct
BinarySearch.prototype = new Algorithm();
BinarySearch.prototype.constructor = BinarySearch;

// Initialization control
BinarySearch.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array size");
  this.insertField_maxSize = addInputToAlgorithmBar("text", "");
  this.initMaxSizeButton = addInputToAlgorithmBar(
    "button",
    "Initialization maximum capacity"
  );
  this.initMaxSizeButton.onclick = this.initMaxSizeCallBack.bind(this);
  addLabelToAlgorithmBar("Numerical value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.initArrayButton = addInputToAlgorithmBar(
    "button",
    "Initialization array"
  );
  this.initArrayButton.onclick = this.initArrayCallBack.bind(this);
  addLabelToAlgorithmBar("Check number");
  this.insertField_number = addInputToAlgorithmBar("text", "");
  this.initNumberButton = addInputToAlgorithmBar(
    "button",
    "Initialize find numbers"
  );
  this.initNumberButton.onclick = this.initNumberCallBack.bind(this);
  this.searchNumberButton = addInputToAlgorithmBar("button", "Look up");
  this.searchNumberButton.onclick = this.searchNumberCallBack.bind(this);
};

// initialization
BinarySearch.prototype.initAttributes = function () {
  // Logical partID
  this.head = 0; // Head pointer
  this.number = 0; //Find numbers
  this.numNode = null; // Digital node
  this.node = 0; //Array element value
  this.timer = false; //Determine if it is already looking for
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.startX = 100; // Beginningxcoordinate
  this.startY = 150; // Beginningycoordinate
  this.startArrayY = 250; // Started arrayycoordinate
  this.implementAction(this.initStateBox.bind(this), "start");
};

// Initialization status box
BinarySearch.prototype.initStateBox = function (state) {
  // Create a status box
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

//Initialization array boundary
BinarySearch.prototype.initMaxSizeCallBack = function (event) {
  var insertValue = this.insertField_maxSize.value;
  if (insertValue != "") {
    // set text value
    this.insertField_maxSize.value = "";
    this.implementAction(this.initMaxSize.bind(this), insertValue);
  }
};

// Initialization array callback function
BinarySearch.prototype.initArrayCallBack = function (event) {
  var insertValue = this.insertField_value.value;
  if (insertValue != "") {
    // set text value
    this.insertField_value.value = "";
    this.implementAction(this.initArray.bind(this), insertValue);
  }
};

// Initialization lookup digital callback function
BinarySearch.prototype.initNumberCallBack = function (event) {
  var insertValue = this.insertField_number.value;
  if (insertValue != "") {
    // set text value
    this.insertField_number.value = "";
    this.implementAction(this.initNumber.bind(this), insertValue);
  }
};

// Find a callback function
BinarySearch.prototype.searchNumberCallBack = function (event) {
  this.implementAction(this.searchNumber.bind(this), 0);
};

//Initialization array boundary
BinarySearch.prototype.initMaxSize = function (maxSize) {
  this.maxSize = maxSize; // Maximum capacity
  this.arrayList = new Array(this.maxSize);
  // Create a status box to clear the array size
  {
    this.cmd("SetState", 0, "Array size is" + this.maxSize);
    this.cmd("Step");
  }
};

// Initialization array
BinarySearch.prototype.initArray = function (arrayNodeValue) {
  var i = this.head;
  //this.timer = true ;
  this.nodeValue = arrayNodeValue; //Array element value
  if (i < this.maxSize) {
    this.arrayList[i] = new BinarySearchNode(
      this.objectID,
      this.nodeValue,
      parseInt(this.startX + this.head * (this.width - 1)),
      this.startArrayY
    );
    // Create a rectangle
    {
      this.cmd(
        "CreateRectangle",
        this.arrayList[i].objectID,
        this.arrayList[i].value,
        this.width,
        this.height,
        "center",
        "center",
        this.arrayList[i].x,
        this.arrayList[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[i].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[i].objectID,
        this.backgroundColor
      );
    }
    this.objectID++;
    this.head++;
  } else {
    // Create a status box number group
    {
      this.cmd("SetState", 0, "Array crosses");
      this.cmd("Step");
    }
  }
  return this.commands;
};

//Initialize find numbers
BinarySearch.prototype.initNumber = function (number) {
  this.number = number;
  this.numNode = new BinarySearchNode(
    this.objectID,
    this.number,
    this.startX,
    this.startY
  );
  // Create a rectangle
  {
    this.cmd(
      "CreateRectangle",
      this.numNode.objectID,
      this.numNode.value,
      this.width,
      this.height,
      "center",
      "center",
      this.numNode.x,
      this.numNode.y
    );
    this.cmd("SetForegroundColor", this.numNode.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.numNode.objectID, this.backgroundColor);
    this.cmd("Step");
  }
  this.objectID++;
  return this.commands;
};

//Find functions
BinarySearch.prototype.searchNumber = function () {
  var left = 0;
  var right = this.maxSize - 1;
  var midm = 0;
  while (left <= right) {
    mid = parseInt((left + right) / 2);
    //Mobile rectangle
    {
      this.cmd(
        "Move",
        this.numNode.objectID,
        parseInt(this.numNode.x + mid * (this.width - 1)),
        this.numNode.y
      );
      this.cmd("Step");
    }
    if (this.numNode.value < this.arrayList[mid].value) {
      right = mid - 1;
    } else if (this.numNode.value > this.arrayList[mid].value) {
      left = mid + 1;
      alert(this.numNode.value);
      alert(this.arrayList[mid].value);
    } else {
      // Create a status box to find this element
      {
        this.cmd("SetState", 0, "Find this element");
        this.cmd("Step");
      }
      // Will match the numbers and array elements background color green
      {
        this.cmd("SetBackgroundColor", this.arrayList[mid].objectID, "#32CD32");
        this.cmd("Step");
        this.cmd("SetBackgroundColor", this.numNode.objectID, "#32CD32");
        this.cmd("Step");
      }
      break;
    }
    //Find a comparison position
    {
      this.cmd("SetHighlight", this.arrayList[mid].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.arrayList[mid].objectID, false);
      this.cmd("Step");
      this.cmd("SetHighlight", this.numNode.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.numNode.objectID, false);
      this.cmd("Step");
    }
  }
  if (left > right) {
    // Create a status box to find failed
    {
      this.cmd("SetState", 0, "No element in array");
      this.cmd("Step");
    }
  }
  return this.commands;
};

// Sequence table node
var BinarySearchNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
