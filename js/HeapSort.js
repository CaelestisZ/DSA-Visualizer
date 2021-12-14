// JavaScript Document

var currentSort;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentSort = new Sort(animationManager, drawing.width, drawing.height);
}

// Sort
var Sort = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
Sort.prototype = new Algorithm();
Sort.prototype.constructor = Sort;

// Initialization control
Sort.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array length");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "Random generate array");
  this.initButton.onclick = this.initCallBack.bind(this);

  this.HeapSortButton = addInputToAlgorithmBar("button", "Stack");
  this.HeapSortButton.onclick = this.HeapSortCallBack.bind(this);
};

// Initialization attribute
Sort.prototype.initAttributes = function () {
  // Logical part
  // Graphics part
  this.objectID = 1;
  this.width = 40; // Rectangular width
  this.height = 40; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.tomato = "#FF6347"; // tomatocolour
  this.palegreen = "#32CD32"; // palegreencolour
  this.startX = 30; // Beginningxcoordinate
  this.startY = 150; // Beginningycoordinate
  this.startArrayY = 130; // Started arrayycoordinate
  this.startLabelY = 400; //Labelycoordinate
  this.heapStartX = 800;
  this.heapStartY = 200;
  // Initialization status box
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// Initialization status box
Sort.prototype.initStateBox = function (state) {
  // Create a status box
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

// Initialization callback function
Sort.prototype.initCallBack = function (value) {
  // var insertValue = this.insertField.value;
  var insertValue = value;
  if (insertValue != "") {
    // set text value
    // this.insertField.value = "";
    this.implementAction(this.initArray.bind(this), insertValue);
  } else {
    alert("Please enter an array length");
  }
};

// Boundary sorting callback function
Sort.prototype.HeapSortCallBack = function (event) {
  //this.implementAction(this.MoveToStart.bind(this));
  this.implementAction(this.HeapSort.bind(this), this.maxSize);
};

Sort.prototype.clearCanvas = function () {
  if (this.arrayList != null) {
    for (var i = 0; i < this.arrayList.length; i++) {
      if (this.arrayList[i] != null) {
        this.cmd("Delete", this.arrayList[i].objectID);
      }
    }
    this.arrayList = null;
  }
  this.arrayData = null;
  this.maxSize = 0;
};

// Initialization array
Sort.prototype.initArray = function (value) {
  value = parseInt(value);
  if (isNaN(value)) {
    this.cmd("SetState", "Array length 2-24");
    return this.commands;
  }
  if (value < 2 || value > 24) {
    this.cmd("SetState", "Array length 2-24");
    return this.commands;
  }
  this.clearCanvas();
  this.maxSize = value;
  this.arrayList = new Array(value); // Array box
  this.arrayData = new Array(value);
  // Set status bar
  {
    this.cmd("SetState", "Create a size" + value + "Array");
    this.cmd("Step");
  }
  for (var i = 0; i < this.maxSize; i++) {
    this.arrayData[i] = Math.floor(1 + Math.random() * 99);
    this.arrayList[i] = new ArrayNode(
      this.objectID,
      this.arrayData[i],
      parseInt(this.startX + i * this.width),
      this.startArrayY
    );
    this.objectID++;
    // Create a rectangle
    {
      /*this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;*/
      this.cmd(
        "CREATECIRCLE",
        this.arrayList[i].objectID,
        this.arrayList[i].value,
        this.arrayList[i].x,
        this.arrayList[i].y,
        15
      );
      //this.cmd("SetForegroundColor", this.arrayList[i].objectID, "red") ;
      this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
    }
  }
  this.cmd("Step");

  return this.commands;
};

//Stack
Sort.prototype.HeapSort = function (value) {
  this.cmd("SetState", "Stack the array to the array");
  this.cmd("Step");
  this.MoveToStart(); //Stack the array to the array
  // this.connect(); //Connect the father and child relationship
  this.BulidHeap(); //Build a pile
  var arraySize = this.maxSize;
  for (var i = this.maxSize - 1; i > 0; i--) {
    this.cmd(
      "SetState",
      "Find the biggest value of the current pile" + this.arrayList[0].value
    );
    this.cmd("Step");
    this.swap(0, i);
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[i].objectID,
      this.backgroundColor
    );
    this.cmd("Step");
    this.maxSize--;
    this.SiftDown(0);
    this.cmd("Step");
  }

  this.cmd(
    "SetBackgroundColor",
    this.arrayList[0].objectID,
    this.backgroundColor
  );
  this.cmd("Step");

  for (var j = 0; j < arraySize; j++) {
    this.arrayList[j].x = parseInt(this.startX + j * this.width);
    this.arrayList[j].y = this.startArrayY;
    this.cmd(
      "Move",
      this.arrayList[j].objectID,
      this.arrayList[j].x,
      this.arrayList[j].y
    );
    this.cmd("Step");
  }
  return this.commands;
};
//Build a pile
Sort.prototype.BulidHeap = function () {
  for (var i = this.maxSize / 2 - 1; i >= 0; i--) {
    this.SiftDown(i);
    this.cmd("Step");
  }
};
//Adjust
Sort.prototype.SiftDown = function (left) {
  this.cmd("SetState", "Adjust the pile down");
  this.cmd("Step");
  var i = left;
  var j = i * 2 + 1;
  while (j < this.maxSize) {
    if (
      j < this.maxSize - 1 &&
      this.arrayList[j].value < this.arrayList[j + 1].value
    )
      j++;
    this.cmd("SetHighlight", this.arrayList[i].objectID, true);
    this.cmd("SetHighlight", this.arrayList[j].objectID, true);
    this.cmd("Step");
    this.cmd("SetHighlight", this.arrayList[i].objectID, false);
    this.cmd("SetHighlight", this.arrayList[j].objectID, false);
    this.cmd("Step");
    if (this.arrayList[i].value < this.arrayList[j].value) {
      this.cmd(
        "SetState",
        this.arrayList[i].value +
          " < " +
          this.arrayList[j].value +
          ",Exchange two elements."
      );
      this.cmd("Step");
      this.swap(i, j);
      i = j;
      j = 2 * j + 1;
    } else break;
  }
};
//Exchange elements
Sort.prototype.swap = function (index1, index2) {
  var distanceX = this.arrayList[index2].x - this.arrayList[index1].x;
  var distanceY = this.arrayList[index2].y - this.arrayList[index1].y;
  minNode = new ArrayNode("", "", "", "");
  minNode = this.arrayList[index2];
  this.arrayList[index2] = this.arrayList[index1];
  this.arrayList[index1] = minNode;

  this.arrayList[index2].x += distanceX;
  this.arrayList[index2].y += distanceY;

  this.cmd(
    "Move",
    this.arrayList[index2].objectID,
    this.arrayList[index2].x,
    this.arrayList[index2].y
  );

  this.arrayList[index1].x -= distanceX;
  this.arrayList[index1].y -= distanceY;
  this.cmd(
    "Move",
    this.arrayList[index1].objectID,
    this.arrayList[index1].x,
    this.arrayList[index1].y
  );
  this.cmd("Step");
};

Sort.prototype.MoveToStart = function () {
  var row = 0;
  var i, j;
  var k = 0;
  for (i = 0; ; i++) {
    if (this.power(2, i) - 1 > this.maxSize) break;
  }

  for (j = 0; j < i; j++) {
    row = -(this.power(2, j) - 1) / 2;
    for (
      k = this.power(2, j) - 1;
      k < this.power(2, j + 1) - 1 && k < this.maxSize;
      k++
    ) {
      this.arrayList[k].x = this.heapStartX + row * 25 * Math.pow(2, i - j);
      this.arrayList[k].y = this.heapStartY + j * 50;
      this.cmd(
        "Move",
        this.arrayList[k].objectID,
        this.arrayList[k].x,
        this.arrayList[k].y
      );
      this.cmd("Step");
      row++;
    }
  }
  /*
	for (k = 1; k < this.maxSize; k++) {
		if (k != 0) {
			this.cmd("Connect", this.arrayList[k].objectID, this.arrayList[Math.floor((k - 1) / 2)].objectID, '#FF6347');
		}
	}
	this.cmd("Step");
	*/
  return this.commands;
};
Sort.prototype.power = function (m, n) {
  var result = 1;
  for (var i = 0; i < n; i++) {
    result *= m;
  }
  return result;
};
Sort.prototype.connect = function () {
  for (var i = 0; i < this.maxSize / 2; i++) {
    if (i * 2 + 1 < this.maxSize)
      this.cmd(
        "Connect",
        this.arrayList[i].objectID,
        this.arrayList[i * 2 + 1].objectID,
        "blue"
      );
    if (i * 2 + 2 < this.maxSize)
      this.cmd(
        "Connect",
        this.arrayList[i].objectID,
        this.arrayList[i * 2 + 2].objectID,
        "blue"
      );
  }
};
// Array node
var ArrayNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
