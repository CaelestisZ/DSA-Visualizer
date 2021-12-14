// JavaScript Document

var currentOrderList;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentOrderList = new OrderList(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Sequence table
var OrderList = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Inheritance and construct
OrderList.prototype = new Algorithm();
OrderList.prototype.constructor = OrderList;

// Initialization control
OrderList.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array size");
  this.insertField_maxSize = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "Initialization array");
  this.initButton.onclick = this.initCallBack.bind(this);
  addLabelToAlgorithmBar("Serial number");
  this.insertField_seq = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("Numerical value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
  addLabelToAlgorithmBar("Serial number");
  this.insertField_del = addInputToAlgorithmBar("text", "");
  this.deleteButton = addInputToAlgorithmBar("button", "Delete node");
  this.deleteButton.onclick = this.deleteCallBack.bind(this);
};

// initialization
OrderList.prototype.initAttributes = function () {
  // Logical partID
  this.head = -1; // Head pointer
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.tomato = "#FF6347"; // tomatocolour
  this.palegreen = "#32CD32"; // palegreencolour
  this.startX = 100; // Beginningxcoordinate
  this.startY = 150; // Beginningycoordinate
  this.startArrayY = 250; // Started arrayycoordinate
  this.startArrowY = 300; // Started arrowycoordinate
  this.length = 30; // Arrow length
  // this.implementAction(this.initStateBox.bind(this), "start") ;
};

// Initialization status box
OrderList.prototype.initStateBox = function (state) {
  return this.commands;
};

// Initialization callback function
OrderList.prototype.initCallBack = function (length) {
  if (parseInt(length) > 0 && parseInt(length) <= 18) {
    this.implementAction(this.initArray.bind(this), length);
    this.cmd("Step");
    this.cmd("SetState", "From 0 Start inserting elements");
  } else {
    alert("The incoming array length should be0~18between");
  }
};

// Insert a callback function
OrderList.prototype.insertCallBack = function (seq, value) {
  if (this.maxSize == null) {
    alert("Initialize list first.");
    return;
  }
  if (seq != "" && value != "") {
    this.implementAction(this.insertNode.bind(this), [seq, value]);
  }
};

// Delete a callback function
OrderList.prototype.deleteCallBack = function (seq) {
  if (seq != "") {
    this.implementAction(this.deleteNode.bind(this), seq);
  }
};

OrderList.prototype.clearCanvas = function () {
  // Empty array
  if (this.arrayList != null && this.arrayList != undefined) {
    for (var i = 0; i < this.arrayList.length; i++) {
      this.cmd("Delete", this.arrayList[i].objectID);
    }
    this.arrayList = null;
  }
  // clear pos label
  if (this.arrayListLabel != null && this.arrayListLabel != undefined) {
    for (var i = 0; i < this.arrayListLabel.length; i++) {
      this.cmd("Delete", this.arrayListLabel[i].objectID);
    }
    this.arrayListLabel = null;
  }
  // Empty element
  if (this.orderList != null && this.orderList != undefined) {
    for (var i = 0; i < this.orderList.length; i++) {
      if (
        this.orderList[i] != undefined &&
        this.orderList[i] instanceof OrderListNode
      ) {
        this.cmd("Delete", this.orderList[i].objectID);
      }
    }
    this.orderList = null;
  }
  // Empty arrow
  if (this.arrow != null) {
    this.cmd("Delete", this.arrow.objectID);
    this.arrow = null;
  }
};

// Initialization array
OrderList.prototype.initArray = function (maxSize) {
  // Delete all arrays
  this.clearCanvas();
  this.head = -1;
  this.maxSize = parseInt(maxSize); // Maximum capacity
  this.arrayList = new Array(this.maxSize); // Array box
  this.arrayListLabel = new Array(this.maxSize); // pos label
  this.orderList = new Array(this.maxSize); // Sequence table number
  // Set status bar
  {
    this.cmd("SetState", "Create a size " + maxSize + " Array");
  }
  // Create an array
  for (var i = 0; i < this.maxSize; i++) {
    this.arrayList[i] = new OrderListNode(
      this.objectID,
      "",
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY
    );
    this.objectID++;
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
      this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
    }
    // create pos label
    this.arrayListLabel[i] = new OrderListNode(
      this.objectID,
      i,
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY + 40
    );
    this.objectID++;
    this.cmd(
      "CreateLabel",
      this.arrayListLabel[i].objectID,
      this.arrayListLabel[i].value,
      this.arrayListLabel[i].x,
      this.arrayListLabel[i].y
    );
    this.cmd(
      "SetForegroundColor",
      this.arrayListLabel[i].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayListLabel[i].objectID, "#FFFFFF");
  }
  this.cmd("Step");
  return this.commands;
};

// insert
OrderList.prototype.insertNode = function (valueArr) {
  var pos = valueArr[0];
  var value = valueArr[1];
  var newNode;
  if (this.head >= this.maxSize - 1) {
    // alert('Already full!') ;
    this.cmd("SetState", "The sequence table is full and cannot be inserted!");
  } else {
    if (pos > this.head + 1 || pos < 0) {
      this.cmd("SetState", "Location error!");
      // alert('Position error!') ;
    } else {
      this.head++;
      newNode = new OrderListNode(
        this.objectID,
        value,
        this.startX,
        this.startY
      );
      this.objectID++;
      // Create a rectangle
      {
        this.cmd("SetState", "Create value" + value + "Array elements");
        this.cmd("Step");
        this.cmd(
          "CreateRectangle",
          newNode.objectID,
          newNode.value,
          this.width,
          this.height,
          "center",
          "center",
          newNode.x,
          newNode.y
        );
        this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor);
        this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor);
        this.cmd("Step");
      }
      // Find a corresponding location
      if (this.head == pos) {
        // Box highlight
        {
          this.cmd(
            "SetState",
            "Array" + pos + "No element, Can insert new elements"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", this.arrayList[pos].objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", this.arrayList[pos].objectID, false);
          this.cmd("Step");
        }
      } else {
        // Array elements highlight
        {
          this.cmd(
            "SetState",
            "Array" +
              pos +
              "Location has an element, After all of the elements are moved one place"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", this.orderList[pos].objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", this.orderList[pos].objectID, false);
          this.cmd("Step");
        }
        // After the node moves backwards
        for (var i = this.head - 1; i >= pos; i--) {
          this.orderList[i + 1] = this.orderList[i];
          this.orderList[i + 1].x += this.width - 1;
          // Element movement
          {
            this.cmd(
              "Move",
              this.orderList[i + 1].objectID,
              this.orderList[i + 1].x,
              this.orderList[i + 1].y
            );
          }
        }
        this.cmd("Step");
      }
      // Newly generated node insertion
      this.orderList[pos] = newNode;
      this.orderList[pos].x = parseInt(this.startX + pos * (this.width - 1));
      this.orderList[pos].y = this.startArrayY;
      {
        this.cmd(
          "SetState",
          "In array" + pos + "Position insertion of new elements" + value
        );
        this.cmd("Step");
        this.cmd(
          "Move",
          this.orderList[pos].objectID,
          this.orderList[pos].x,
          this.orderList[pos].y
        );
        this.cmd("Step");
      }
      // Dynasty pointer
      if (this.head == 0) {
        this.arrow = new OrderListNode(
          this.objectID,
          "head",
          this.startX,
          this.startArrowY
        );
        {
          this.cmd(
            "CreatePointer",
            this.arrow.objectID,
            "head",
            this.length,
            "up",
            this.arrow.x,
            this.arrow.y
          );
          this.cmd("SetForegroundColor", this.arrow.objectID, this.tomato);
          this.cmd("Step");
        }
        this.objectID++;
      } else {
        this.arrow.x = parseInt(this.arrow.x + this.width - 1);
        this.cmd("Move", this.arrow.objectID, this.arrow.x, this.arrow.y);
      }
      // Judgment is full
      if (this.head == this.maxSize - 1) {
        this.cmd("SetState", "Array,Cannot be inserted");
        this.cmd("Step");
      }
      this.objectID++;
    }
  }
  return this.commands;
};

// delete
OrderList.prototype.deleteNode = function (pos) {
  if (this.head <= -1) {
    // alert('Already empty!') ;
    this.cmd("SetState", "The sequence table is empty, you can't delete it!");
  } else {
    if (pos > this.head || pos < 0) {
      this.cmd("SetState", "Location error!");
      // alert('Position error!') ;
    } else {
      // Find a corresponding location
      {
        this.cmd(
          "SetState",
          "In array" +
            pos +
            "Location delete new elements" +
            this.orderList[pos].value
        );
        this.cmd("Step");
        this.cmd("SetHighlight", this.orderList[pos].objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", this.orderList[pos].objectID, false);
        this.cmd("Step");
      }
      // Newly generated node delete
      {
        this.cmd(
          "Move",
          this.orderList[pos].objectID,
          this.startX,
          this.startY
        );
        this.cmd("Step");
        this.cmd("Delete", this.orderList[pos].objectID);
        this.cmd("Step");
      }
      if (pos != this.head) {
        // Element moves backward
        {
          this.cmd(
            "SetState",
            "Array location" + pos + "After the element moves forward"
          );
          this.cmd("Step");
        }
        // After the node moves forward
        for (var i = parseInt(pos) + 1; i <= this.head; i++) {
          this.orderList[i - 1] = this.orderList[i];
          this.orderList[i - 1].x -= this.width - 1;
          // Element movement
          {
            this.cmd(
              "Move",
              this.orderList[i - 1].objectID,
              this.orderList[i - 1].x,
              this.orderList[i - 1].y
            );
          }
        }
        this.cmd("Step");
        // successfully deleted
        {
          this.cmd("SetState", "successfully deleted");
          this.cmd("Step");
        }
      } else {
        // Element moves backward
        {
          this.cmd("SetState", "successfully deleted");
          this.cmd("Step");
        }
      }
      this.orderList[this.head] = [];
      this.head--;
      // Dynasty pointer
      if (this.head == -1) {
        this.cmd("Delete", this.arrow.objectID);
      } else {
        this.arrow.x = parseInt(this.arrow.x - (this.width - 1));
        this.cmd("Move", this.arrow.objectID, this.arrow.x, this.arrow.y);
      }
      // Determine whether the array is empty
      if (this.head == -1) {
        this.cmd("SetState", "Number of empty,I can't delete it");
        this.cmd("Step");
      }
    }
  }
  return this.commands;
};

// Sequence table node
var OrderListNode = function (objectID, value, x, y) {
  this.objectID = objectID; // Graphical serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
};
