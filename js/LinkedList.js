function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentLinkList = new LinkList(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Singly linked list
var LinkList = function (animManager, width, height) {
  this.init(animManager, width, height);
  //this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};
// Constructor
LinkList.prototype = new Algorithm();
LinkList.prototype.constructor = LinkList;

// Initialize controls
LinkList.prototype.initControls = function () {
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

// Initialize attributes
LinkList.prototype.initAttributes = function () {
  // Logical part
  this.head = null;
  this.tail = null;
  this.length = 0;
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.interval = 120; // gap
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.tomato = "#FF6347"; // tomatocolour
  this.palegreen = "#32CD32"; // palegreencolour
  this.startX = 150; // New nodexcoordinate
  this.startY = 100; // New nodeycoordinate
  this.startHeadY = 200; // Head nodeycoordinate
  this.startheadArrowY = 250; // Head pointerycoordinate
  this.starttailArrowY = 310; // Tail pointerycoordinate
  this.arrowLength = 30; // Arrow length
  this.implementAction(this.initHeadNode.bind(this), 0);
};

// Insert a callback function
LinkList.prototype.insertCallBack = function (seq, value) {
  if (seq != "" && value != "") {
    seq = parseInt(seq);
    value = parseInt(value);
    if (this.head.value <= 5) {
      this.implementAction(this.insertNode.bind(this), [seq, value]);
    } else {
      alert("Max length allowed for LL = 6");
    }
  }
};

// Delete a callback function
LinkList.prototype.deleteCallBack = function (value) {
  if (value != "") {
    this.implementAction(this.deleteNode.bind(this), value);
  }
};

// Initialization head node
LinkList.prototype.initHeadNode = function () {
  this.head = new ListNode(
    this.objectID,
    0,
    this.startX,
    this.startHeadY,
    null
  );
  this.tail = this.head;
  this.objectID++;
  this.length++;
  // Draw head node
  {
    this.cmd(
      "SetState",
      "You can insert / delete elements starting from position 1. The tail will adjust itself."
    );
    this.cmd(
      "CreateRectangle",
      this.head.objectID,
      this.head.value,
      this.width,
      this.height,
      "center",
      "center",
      this.head.x,
      this.head.y
    );
    this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
  }
  // Draw head pointer
  this.headArrow = new ListNode(
    this.objectID,
    "head",
    this.startX,
    this.startheadArrowY,
    null
  );
  this.objectID++;
  this.tailArrow = new ListNode(
    this.objectID,
    "tail",
    this.startX,
    this.starttailArrowY,
    null
  );
  this.objectID++;
  {
    this.cmd(
      "CreatePointer",
      this.headArrow.objectID,
      "head",
      this.arrowLength,
      "up",
      this.headArrow.x,
      this.headArrow.y
    );
    this.cmd("SetForegroundColor", this.headArrow.objectID, this.tomato);
    this.cmd(
      "CreatePointer",
      this.tailArrow.objectID,
      "tail",
      this.arrowLength,
      "up",
      this.tailArrow.x,
      this.tailArrow.y
    );
    this.cmd("SetForegroundColor", this.tailArrow.objectID, this.tomato);
  }
  return this.commands;
};

// insert
LinkList.prototype.insertNode = function (valueArr) {
  var pos = valueArr[0];
  var value = valueArr[1];
  var point = this.head;
  if (pos > this.length || pos <= 0) {
    alert(
      "Location error! The location is out of range.\nCurrent range [1-" +
        (this.head.value + 1).toString() + "]"
    );
    // alert('Position error! The position is out of range.\nCurrent range ' + 1 +' 
    //to '+this.head.value) ;
  } else {
    var newNode = new ListNode(
      this.objectID,
      value,
      this.startX,
      this.startY,
      null
    );
    this.objectID++;
    this.length++;
    // Draw a new node
    {
      this.cmd("SetState", "Create a new node: " + value);
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
      // node will have red outline if commented out
      this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor); 
      // node will turn green if commented out
      this.cmd("Step");
    }
    for (var i = 0; i < pos - 1; i++) {
      // Highlight
      {
        this.cmd("SetState", "Search" + i);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, false);
        this.cmd("Step");
      }
      point = point.linked;
    }
    // Highlight
    {
      this.cmd("SetState", "Search" + parseInt(pos - 1));
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, false);
      this.cmd("Step");
    }
    // If inserted into the tail node
    if (point == this.tail) {
      newNode.x = parseInt(point.x + this.interval);
      newNode.y = parseInt(point.y);
      point.linked = newNode;
      this.tail = newNode;
      this.tailArrow.x = newNode.x;
      this.tailArrow.y = this.startheadArrowY;
      // connect
      {
        this.cmd(
          "SetState",
          "This location is the end of the node, insert directly"
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          newNode.objectID,
          this.forgroundColor
        );
        this.cmd("Step");
        this.cmd("Move", newNode.objectID, newNode.x, newNode.y);
        this.cmd("Step");
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y
        );
        this.cmd("Step");
      }
    } else {
      // If it is not a tailpoint
      newNode.x = parseInt(point.x + this.interval);
      newNode.y = parseInt(point.y);
      newNode.linked = point.linked;
      point.linked = newNode;
      // connect
      {
        this.cmd("SetState", "disconnect" + point.value + "Pointer domain");
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, newNode.linked.objectID);
        this.cmd("Step");
        this.cmd(
          "SetState",
          "Set the insert node " +
            value +
            "Pointer points to subsequent nodes " +
            newNode.linked.value
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          newNode.objectID,
          newNode.linked.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd(
          "SetState",
          "set up " +
            point.value +
            "Pointer pointing to the insertion node: " +
            value
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          newNode.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.shiftBack(newNode.linked);
        this.cmd("Move", newNode.objectID, newNode.x, newNode.y);
        this.cmd("Step");
      }
    }
    // Insert success
    {
      this.head.value++;
      this.cmd("Delete", this.head.objectID);
      this.cmd(
        "CreateRectangle",
        this.head.objectID,
        this.head.value,
        this.width,
        this.height,
        "center",
        "center",
        this.head.x,
        this.head.y
      );
      this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
      this.cmd("SetState", "Insert success");
      this.cmd("Step");
    }
  }
  return this.commands;
};

// delete
LinkList.prototype.deleteNode = function (pos) {
  if (pos >= this.length || pos <= 0) {
    alert(
      "Location error! The location is out of range.\nCurrent range [1-" +
        this.head.value + "]"
    );
    // alert('Position error! The position is out of range.\nCurrent range ' + 1 +' to '+this.head.value) ;
  } else {
    this.length--;
    var point = this.head;
    var next;
    for (var i = 0; i < pos - 1; i++) {
      // Highlight
      {
        this.cmd("SetState", "Search" + i);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, false);
        this.cmd("Step");
      }
      point = point.linked;
    }
    next = point.linked;
    // Highlight
    {
      this.cmd("SetState", "Search" + parseInt(pos - 1));
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, false);
      this.cmd("Step");
      this.cmd("SetState", "Search" + parseInt(pos));
      this.cmd("Step");
      this.cmd("SetHighlight", next.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", next.objectID, false);
      this.cmd("Step");
    }
    if (next == this.tail) {
      // If it is a tail point
      this.tail = point;
      this.tailArrow.x = point.x;
      if (point == this.head) {
        this.tailArrow.y = this.starttailArrowY;
      } else {
        this.tailArrow.y = this.startheadArrowY;
      }
      // Disconnect and delete
      {
        this.cmd(
          "SetState",
          "This location is the end of the node, delete directly"
        );
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, next.objectID);
        this.cmd("Step");
        this.cmd("Delete", next.objectID);
        this.cmd("Step");
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y
        );
        this.cmd("Step");
      }
      next = null;
      this.tail.linked = null;
    } else {
      // If it is not a tailpoint
      // Connection, disconnect and delete
      {
        this.cmd("SetState", "disconnect" + point.value + "Pointer domain");
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, next.objectID);
        this.cmd("Step");
        this.cmd(
          "SetState",
          "set up " +
            point.value +
            "Pointer points to subsequent nodes " +
            next.linked.value
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          next.linked.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd(
          "SetState",
          "Disconnect Remove Node" + next.value + "Pointer domain"
        );
        this.cmd("Step");
        this.cmd("Disconnect", next.objectID, next.linked.objectID);
        this.cmd("Step");
        this.cmd("SetState", "Delete node" + next.value);
        this.cmd("Step");
        this.cmd("Delete", next.objectID);
        this.cmd("Step");
        this.shiftFront(next.linked);
        this.cmd("Step");
      }
      point.linked = next.linked;
      next.linked = null;
    }
    // successfully deleted
    {
      this.head.value--;
      this.cmd("Delete", this.head.objectID);
      this.cmd(
        "CreateRectangle",
        this.head.objectID,
        this.head.value,
        this.width,
        this.height,
        "center",
        "center",
        this.head.x,
        this.head.y
      );
      this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
      this.cmd("SetState", "successfully deleted");
      this.cmd("Step");
    }
  }
  return this.commands;
};

// Backward
LinkList.prototype.shiftBack = function (head) {
  while (head != this.tail) {
    // move
    {
      this.cmd("Move", head.objectID, head.linked.x, head.linked.y);
    }
    head.x = head.linked.x;
    head.y = head.linked.y;
    head = head.linked;
  }
  head.x = parseInt(head.x + this.interval);
  head.y = head.y;
  this.tailArrow.x = head.x;
  this.tailArrow.y = this.startheadArrowY;
  // After the tail node movement
  {
    this.cmd("Move", head.objectID, head.x, head.y);
    this.cmd(
      "Move",
      this.tailArrow.objectID,
      this.tailArrow.x,
      this.tailArrow.y
    );
  }
};

// Move forward
LinkList.prototype.shiftFront = function (head) {
  while (head != this.tail) {
    head.x = parseInt(head.x - this.interval);
    head.y = head.linked.y;
    // move
    {
      this.cmd("Move", head.objectID, head.x, head.y);
    }
    head = head.linked;
  }
  head.x = parseInt(head.x - this.interval);
  head.y = head.y;
  this.tailArrow.x = head.x;
  this.tailArrow.y = this.startheadArrowY;
  // move
  {
    this.cmd("Move", head.objectID, head.x, head.y);
    this.cmd(
      "Move",
      this.tailArrow.objectID,
      this.tailArrow.x,
      this.tailArrow.y
    );
  }
};

var ListNode = function (objectID, value, x, y, linked) {
  this.objectID = objectID; // Serial number
  this.value = value; // value
  this.x = x; // xcoordinate
  this.y = y; // ycoordinate
  this.linked = linked; // pointer
};
