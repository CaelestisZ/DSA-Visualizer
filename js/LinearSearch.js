// JavaScript Document

// Initialization Function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  var currentLinearSearch = new LinearSearch(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Sequence
var LinearSearch = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initControls(); // Controls init
  this.initAttributes(); // Attributes init
};

LinearSearch.prototype = new Algorithm();
LinearSearch.prototype.constructor = LinearSearch;

LinearSearch.prototype.initControls = function () {
  addLabelToAlgorithmBar("Size");
  this.insertField_maxSize = addInputToAlgorithmBar("text", "");
  this.initMaxSizeButton = addInputToAlgorithmBar("button", "Maximum Capacity");
  this.initMaxSizeButton.onclick = this.initMaxSizeCallBack.bind(this);
  addLabelToAlgorithmBar("Value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.initArrayButton = addInputToAlgorithmBar("button", "Initialize");
  this.initArrayButton.onclick = this.initArrayCallBack.bind(this);
  addLabelToAlgorithmBar("Search");
  this.insertField_number = addInputToAlgorithmBar("text", "");
  this.initNumberButton = addInputToAlgorithmBar("button", "Value to search");
  this.initNumberButton.onclick = this.initNumberCallBack.bind(this);
  this.searchNumberButton = addInputToAlgorithmBar("button", "Find");
  this.searchNumberButton.onclick = this.searchNumberCallBack.bind(this);
};

LinearSearch.prototype.initAttributes = function () {
  this.head = 0;
  this.number = 0;
  this.numNode = null;
  this.node = 0;
  this.timer = false;
  this.objectID = 1;
  this.width = 50;
  this.height = 50;
  this.foregroundColor = "#1E90FF";
  this.backgroundColor = "#B0E0E6";
  this.startX = 100;
  this.startY = 150;
  this.startArrayY = 250;
  this.implementAction(this.initStateBox.bind(this), "start");
};

LinearSearch.prototype.initStateBox = function (state) {
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

LinearSearch.prototype.initMaxSizeCallBack = function (event) {
  var insertValue = this.insertField_maxSize.value;
  if (insertValue != "") {
    // set text value
    this.insertField_maxSize.value = "";
    this.implementAction(this.initMaxSize.bind(this), insertValue);
  }
};

LinearSearch.prototype.initArrayCallBack = function (event) {
  var insertValue = this.insertField_value.value;
  if (insertValue != "") {
    // set text value
    this.insertField_value.value = "";
    this.implementAction(this.initArray.bind(this), insertValue);
  }
};

LinearSearch.prototype.initNumberCallBack = function (event) {
  var insertValue = this.insertField_number.value;
  if (insertValue != "") {
    // set text value
    this.insertField_number.value = "";
    this.implementAction(this.initNumber.bind(this), insertValue);
  }
};

LinearSearch.prototype.searchNumberCallBack = function (event) {
  this.implementAction(this.searchNumber.bind(this), 0);
};

LinearSearch.prototype.initMaxSize = function (maxSize) {
  this.maxSize = maxSize;
  this.arrayList = new Array(this.maxSize);
  {
    this.cmd("SetState", 0, "The array size is" + this.maxSize);
    this.cmd("Step");
  }
};

LinearSearch.prototype.initArray = function (arrayNodeValue) {
  var i = this.head;
  //this.timer = true ;
  this.nodeValue = arrayNodeValue;
  if (i < this.maxSize) {
    this.arrayList[i] = new LinearSearchNode(
      this.objectID,
      this.nodeValue,
      parseInt(this.startX + this.head * (this.width - 1)),
      this.startArrayY
    );
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
    {
      this.cmd("SetState", 0, "Array out of bounds");
      this.cmd("Step");
    }
  }
  return this.commands;
};

LinearSearch.prototype.initNumber = function (number) {
  this.number = number;
  this.numNode = new LinearSearchNode(
    this.objectID,
    this.number,
    this.startX,
    this.startY
  );
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

LinearSearch.prototype.searchNumber = function () {
  for (var i = 0; i < this.maxSize; i++) {
    {
      this.cmd(
        "Move",
        this.numNode.objectID,
        parseInt(this.numNode.x + i * (this.width - 1)),
        this.numNode.y
      );
      this.cmd("Step");
    }
    if (this.numNode.value == this.arrayList[i].value) {
      {
        this.cmd("SetState", 0, "Find the element");
        this.cmd("Step");
      }
      {
        this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#32CD32");
        this.cmd("Step");
        this.cmd("SetBackgroundColor", this.numNode.objectID, "#32CD32");
        this.cmd("Step");
      }
      i = -1;
      break;
    }
    //Find a comparison position
    {
      this.cmd("SetHighlight", this.arrayList[i].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.arrayList[i].objectID, false);
      this.cmd("Step");
      this.cmd("SetHighlight", this.numNode.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.numNode.objectID, false);
      this.cmd("Step");
    }
  }
  if (i != -1) {
    {
      this.cmd("SetState", 0, "No such element in the array");
      this.cmd("Step");
    }
  }
  return this.commands;
};

var LinearSearchNode = function (objectID, value, x, y) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
};
