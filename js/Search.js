// JavaScript Document

var currentSearch;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentSearch = new Search(animationManager, drawing.width, drawing.height);
}

// Sequence table
var Search = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};

// Inheritance and construct
Search.prototype = new Algorithm();
Search.prototype.constructor = Search;

// Initialization control
Search.prototype.initControls = function () {
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
Search.prototype.initAttributes = function () {
  // Logical partID
  this.head = 0; // Head pointer
  this.number = 0; //Find numbers
  this.numNode = null; // Digital node
  this.node = 0; //Array element value
  this.arraytimer = false; //Determine whether the array has been initialized
  this.numtimer = false; //Judging whether the lookup number has been completed
  this.haveInitMax = false;
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.startX = 100; // Beginningxcoordinate
  this.startY = 150; // Beginningycoordinate
  this.startArrayY = 250; // Started arrayycoordinate
  this.implementAction(this.initState.bind(this), "state");
  // this.implementAction(this.initStateBox.bind(this), "start");
};

Search.prototype.initState = function () {
  this.cmd(
    "SetState",
    "The array content is only allowed to enter numbers, separated by spaces and commas."
  );
  return this.commands;
};

// Initialization status box
Search.prototype.initStateBox = function (state) {
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
Search.prototype.initMaxSizeCallBack = function (value) {
  var insertValue = parseInt(value);
  if (insertValue != "" && !isNaN(insertValue)) {
    this.implementAction(this.initMaxSize.bind(this), insertValue);
  }
};

// Initialization array callback function
Search.prototype.initArrayCallBack = function (value) {
  value = value.trim();
  if (value == "") {
    alert("The array content cannot be empty.");
  } else {
    var arrayContent = this.parseIntSeq(value);
    for (var i = 0; i < arrayContent.length && i < this.maxSize; i++) {
      this.implementAction(this.initArray.bind(this), arrayContent[i]);
    }
  }
  // var insertValue = parseInt(value);
  // if (insertValue != "" && !isNaN(insertValue)) {
  // 	this.implementAction(this.initArray.bind(this), insertValue);
  // }
};

// Initialization lookup digital callback function
Search.prototype.initNumberCallBack = function (value) {
  this.implementAction(this.initNumber.bind(this), value);
};

// Find a callback function
Search.prototype.linearSearchCallBack = function (value) {
  value = parseInt(value);
  if (isNaN(value)) {
    alert('Please enter the "number" found.');
  }
  this.initNumberCallBack(value);
  this.implementAction(this.linearSearch.bind(this), 0);
};

// binary search
Search.prototype.binarySearchCallBack = function (value) {
  value = parseInt(value);
  if (isNaN(value)) {
    alert('Please enter the "number" found.');
  }
  this.initNumberCallBack(value);
  this.implementAction(this.binarySearch.bind(this), 0);
};

//Initialization array boundary
Search.prototype.initMaxSize = function (maxSize) {
  if (maxSize > 10 || maxSize < 3) {
    this.cmd("SetState", "Array size should be3-10");
    return this.commands;
  }
  /*if(arraytimer == true){
		for( var j = 0 ; j < this.maxSize ; j ++){
			this.cmd("Delete",this.arrayList[j].objectID);
		}
	}*/
  if (this.arraytimer == true) {
    for (var i = 0; i < this.maxSize + 1; i++) {
      this.cmd("Delete", i + 1);
    }
    this.cmd("Step");
    this.objectID = 1;
    this.head = 0;
    this.haveInitMax = true;
  }
  this.maxSize = maxSize; // Maximum capacity
  this.arrayList = new Array(this.maxSize);
  // Create a status box to clear the array size
  {
    this.cmd("SetState", "Array size is" + this.maxSize);
    this.cmd("Step");
  }
  // Create a rectangle
  for (var i = 0; i < this.maxSize; i++) {
    this.arrayList[i] = new SearchNode(
      this.objectID,
      "",
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY
    );
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
    this.cmd("Step");
    this.objectID++;
  }
  this.arraytimer = true;
  return this.commands;
};

// Initialization array
Search.prototype.initArray = function (arrayNodeValue) {
  if (isNaN(arrayNodeValue)) {
    alert("Please enter the number:");
    return 0;
  }
  if (this.head < this.maxSize) {
    // Add an element to the rectangle
    {
      this.arrayList[this.head].value = arrayNodeValue; //Array element value
      this.cmd(
        "SetLabel",
        this.arrayList[this.head].objectID,
        this.arrayList[this.head].value
      );
      this.head++;
    }
  } else {
    // Create a status box number group
    {
      this.cmd("SetState", "Array crosses");
      this.cmd("Step");
    }
  }
  return this.commands;
};

//Initialize find numbers
Search.prototype.initNumber = function (number) {
  if (this.numtimer == true && this.haveInitMax != true) {
    if (this.numNode.value != null) {
      this.cmd("Delete", this.numNode.objectID);
      this.cmd("Step");
    }
  }
  this.haveInitMax = false;
  if (isNaN(number)) {
    this.cmd("SetState", "Please enter the number");
    return this.commands;
  }
  this.number = number;
  this.numNode = new SearchNode(
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
  //this.objectID ++ ;
  this.numtimer = true;
  return this.commands;
};

//Find functions
Search.prototype.linearSearch = function () {
  /*for (var j = 1; j < this.objectID + 1; j++) {
		this.cmd("SetForegroundColor", j, this.foregroundColor);
		this.cmd("SetBackgroundColor", j, this.backgroundColor);
		this.cmd("Step");
	}*/
  for (var i = 0; i < this.maxSize; i++) {
    //Mobile rectangle
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
      // Create a status box to find this element
      {
        this.cmd("SetState", "Find this element");
        this.cmd("Step");
      }
      // Will match the numbers and array elements background color green
      {
        this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#32CD32");
        this.cmd("Step");
        this.cmd("SetBackgroundColor", this.numNode.objectID, "#32CD32");
        this.cmd("Step");
      }
      i = -1;
      break;
    } else {
      // Create a status box
      {
        this.cmd(
          "SetState",
          "Current array" +
            parseInt(i + 1) +
            "Elements and lookup numbers are not equal"
        );
        this.cmd("Step");
      }
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
    // Create a status box to find failed
    {
      this.cmd("SetState", "No element in array");
      this.cmd("Step");
    }
  }
  return this.commands;
};

//Find functions
Search.prototype.binarySearch = function () {
  /*for (var j = 1; j < this.objectID + 1; j++) {
		this.cmd("SetBackgroundColor", j, this.foregroundColor);
		this.cmd("SetBackgroundColor", j, this.backgroundColor);
		this.cmd("Step");
	}*/
  // invalid array order
  for (var i = 1; i < this.maxSize; i++) {
    if (this.arrayList[i].value < this.arrayList[i - 1].value) {
      this.cmd(
        "SetState",
        "The array does not meet the requirements of ascending, and the two-point lookup cannot be performed."
      );
      return this.commands;
    }
  }
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
      // Create a status box
      {
        this.cmd(
          "SetState",
          "currentmidValue" +
            mid +
            ",Array" +
            parseInt(mid + 1) +
            "Elements and lookup numbers are not equal"
        );
        this.cmd("Step");
      }
    } else if (this.numNode.value > this.arrayList[mid].value) {
      left = mid + 1;
      // Create a status box
      {
        this.cmd(
          "SetState",
          "currentmidValue" +
            mid +
            ",Array" +
            parseInt(mid + 1) +
            "Elements and lookup numbers are not equal"
        );
        this.cmd("Step");
      }
    } else {
      // Create a status box to find this element
      {
        this.cmd(
          "SetState",
          "Find this element, location in array" +
            parseInt(mid + 1) +
            "Position"
        );
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
      this.cmd("SetState", "No element in array");
      this.cmd("Step");
    }
  }
  return this.commands;
};

Search.prototype.parseIntSeq = function (value) {
  var intSeq = new Array();
  var stopChar = new Set([
    " ",
    ",",
    ".",
    ";",
    "-",
    ":",
    "/",
    "，",
    "。",
    "；",
    "：",
    "、",
  ]);
  var start = 0;
  var end = 0;
  for (var i = 0; i < value.length; i++) {
    if (stopChar.has(value[i])) {
      end = i - 1;
      if (end >= start) {
        var val = parseInt(value.substr(start, end - start + 1));
        if (!isNaN(val)) {
          intSeq.push(val);
        }
      }
      start = i + 1;
    }
  }
  end = value.length - 1;
  if (end >= start) {
    var val = parseInt(value.substr(start, end - start + 1));
    if (!isNaN(val)) {
      intSeq.push(val);
    }
  }
  return intSeq;
};

// Sequence table node
var SearchNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // Node elements value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
