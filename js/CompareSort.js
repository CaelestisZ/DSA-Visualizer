// JavaScript Document

var currentSort;
// s
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentSort = new Sort(animationManager, drawing.width, drawing.height);
}

// s
var Sort = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // s
  this.initAttributes(); // s
};
// s
Sort.prototype = new Algorithm();
Sort.prototype.constructor = Sort;

// s
Sort.prototype.initControls = function () {
  addLabelToAlgorithmBar("s");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "s");
  this.initButton.onclick = this.initCallBack.bind(this);
  this.selectSortButton = addInputToAlgorithmBar("button", "s");
  this.selectSortButton.onclick = this.selectSortCallBack.bind(this);
  this.insertSortButton = addInputToAlgorithmBar("button", "s");
  this.insertSortButton.onclick = this.insertSortCallBack.bind(this);
  this.bubbleSortButton = addInputToAlgorithmBar("button", "s");
  this.bubbleSortButton.onclick = this.bubbleSortCallBack.bind(this);
  this.shellSortButton = addInputToAlgorithmBar("button", "s");
  this.shellSortButton.onclick = this.shellSortCallBack.bind(this);
  this.QuickSortButton = addInputToAlgorithmBar("button", "s");
  this.QuickSortButton.onclick = this.QuickSortCallBack.bind(this);
  this.MergeSortButton = addInputToAlgorithmBar("button", "s");
  this.MergeSortButton.onclick = this.MergeSortCallBack.bind(this);
};

// s
Sort.prototype.initAttributes = function () {
  // s
  // s
  this.objectID = 1;
  this.width = 30; // s
  this.height = 6; // s
  this.foregroundColor = "#1E90FF"; // s
  this.backgroundColor = "#B0E0E6"; // s
  this.tomato = "#FF6347"; // tomatos
  this.palegreen = "#32CD32"; // palegreens
  this.startX = 100; // sxs
  this.startY = 150; // sys
  this.startArrayY = 350; // sys
  // s
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// s
Sort.prototype.initStateBox = function (state) {
  // s
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

// s
Sort.prototype.initCallBack = function (length) {
  var insertValue = length;
  if (insertValue != "") {
    // set text value
    // this.insertField.value = "";
    this.implementAction(this.initArray.bind(this), insertValue);
  } else {
    alert("s");
  }
};

// s
Sort.prototype.selectSortCallBack = function (event) {
  this.implementAction(this.selectSort.bind(this), 0);
};

// s
Sort.prototype.insertSortCallBack = function (event) {
  this.implementAction(this.insertSort.bind(this), 1);
};

// s
Sort.prototype.bubbleSortCallBack = function (event) {
  this.implementAction(this.bubbleSort.bind(this), 0);
};

// s
Sort.prototype.shellSortCallBack = function (event) {
  this.implementAction(this.shellSort.bind(this), 0);
};

// s
Sort.prototype.quickSortCallBack = function (event) {
  //this.implementAction(this.QuickSort.bind(this), [0,this.maxSize-1]);
  this.iID = this.objectID++;
  this.jID = this.objectID++;

  this.cmd(
    "CREATEPOINTER",
    this.iID,
    "i",
    20,
    "up",
    this.arrayList[0].x,
    this.startArrayY + 10
  );
  this.cmd(
    "CREATEPOINTER",
    this.jID,
    "j",
    20,
    "up",
    this.arrayList[this.maxSize - 1].x,
    this.startArrayY + 10
  );
  this.QuickSort(0, this.maxSize - 1);
  this.cmd("Delete", this.iID);
  this.cmd("Delete", this.jID);
};

// s
Sort.prototype.mergeSortCallBack = function (event) {
  this.implementAction(this.ToCirle.bind(this));
  this.implementAction(this.divide.bind(this), [0, this.maxSize - 1]);
  this.implementAction(this.MergeSort.bind(this), [0, this.maxSize - 1]);
};

// s
Sort.prototype.initArray = function (value) {
  value = parseInt(value);
  if (isNaN(value)) {
    this.cmd("SetState", "s2-30s");
    return this.commands;
  }
  if (value < 2 || value > 30) {
    this.cmd("SetState", "s2-30s");
    return this.commands;
  }
  if (this.flag) {
    for (var j = 0; j < this.maxSize; j++) {
      this.cmd("DELETE", this.arrayList[j].objectID);
    }
  }
  if (this.circleList != null) {
    for (var i = 0; i < this.circleList.length; i++) {
      if (this.circleList[i] != null) {
        this.cmd("DELETE", this.circleList[i].objectID);
      }
    }
  }
  this.maxSize = value;
  this.arrayList = new Array(value); // s
  this.arrayData = new Array(value);
  this.cmd("Step");
  // s
  {
    this.cmd("SetState", "s" + value + "s");
    this.cmd("Step");
  }
  for (var i = 0; i < this.maxSize; i++) {
    this.flag = 1;
    this.arrayData[i] = Math.floor(1 + Math.random() * 29);
    this.arrayList[i] = new ArrayNode(
      this.objectID,
      this.arrayData[i],
      parseInt(this.startX + i * this.width),
      this.startArrayY
    );
    this.objectID++;
    // s
    {
      this.cmd(
        "CreateRectangle",
        this.arrayList[i].objectID,
        this.arrayList[i].value,
        this.width,
        this.height * this.arrayList[i].value,
        "center",
        "bottom",
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
  }
  this.cmd("Step");

  return this.commands;
};

// s
Sort.prototype.selectSort = function (value) {
  //this.point=value;    //s
  for (var i = value; i < this.maxSize - 1; i++) {
    this.min_pos = i; //s
    this.cmd("SetState", "s" + i + "s");
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[this.min_pos].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[this.min_pos].objectID,
      this.palegreen
    );
    this.min = this.arrayList[i].value; //s
    for (var j = i + 1; j < this.maxSize; j++) {
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd("Step");
      if (this.arrayList[j].value < this.min) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[this.min_pos].objectID,
          this.foregroundColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[this.min_pos].objectID,
          "#FFFFFF"
        );
        this.min = this.arrayList[j].value;
        this.min_pos = j;
      } else {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j].objectID,
          this.foregroundColor
        );
        this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      }
    }
    if (this.min_pos != i) {
      //
      this.swap(i, this.min_pos);
    }
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
  this.cmd(
    "SetForegroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.backgroundColor
  );
  return this.commands;
};

// s
Sort.prototype.insertSort = function (value) {
  for (var i = value; i < this.maxSize; i++) {
    this.cmd("SetState", "s" + (i + 1) + "s");
    this.cmd("Step");
    var j = i;
    while (j > 0) {
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.palegreen
      );
      this.cmd("Step");
      if (this.arrayList[j - 1].value <= this.arrayList[j].value) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j].objectID,
          this.foregroundColor
        ); //s
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[j].objectID,
          this.backgroundColor
        );
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j - 1].objectID,
          this.foregroundColor
        ); //s
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[j - 1].objectID,
          this.backgroundColor
        );
        break;
      }
      this.swap(j - 1, j);
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.backgroundColor
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.backgroundColor
      );
      j--;
    }
  }
  return this.commands;
};

// s
Sort.prototype.bubbleSort = function (value) {
  var flag = 1; // is sorted
  for (var i = value; i < this.maxSize - 1; i++) {
    flag = 1;
    this.cmd("SetState", "s" + (i + 1) + "s");
    this.cmd("Step");
    for (var j = this.maxSize - 1; j > i; j--) {
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.palegreen
      );
      this.cmd("Step");

      if (this.arrayList[j - 1].value > this.arrayList[j].value) {
        this.swap(j - 1, j);
        flag = 0;
      }
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      ); //s
      this.cmd("SetBackgroundColor", this.arrayList[j - 1].objectID, "#FFFFFF");
    }
    // the array is sorted
    if (flag == 1) {
      this.cmd("SetState", "s");
      break;
    }
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
  this.cmd(
    "SetForegroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.backgroundColor
  );
  return this.commands;
};

// s
Sort.prototype.shellSort = function (value) {
  var gap = Math.floor(this.maxSize / 2); //gaps
  while (gap != 0) {
    var group = Math.floor(this.maxSize / gap);
    for (; group > 0; group--) {
      var start = (group - 1) * gap;
      this.MoveRange(start, start + gap - 1, (group - 1) * 20); //s
      this.cmd("Step");
    }
    //this.cmd("",);
    for (var i = 0; i < gap; i++) {
      for (var j = i; j < this.maxSize; j += gap) {
        for (var j1 = j; j1 < this.maxSize; j1 += gap) {
          this.cmd(
            "SetForegroundColor",
            this.arrayList[j1].objectID,
            this.foregroundColor
          ); //s
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[j1].objectID,
            this.tomato
          );
        }
        var inc = j;
        while (inc >= gap) {
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc].objectID,
            this.foregroundColor
          ); //s
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc].objectID,
            this.tomato
          );
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc - gap].objectID,
            this.foregroundColor
          ); //s
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc - gap].objectID,
            this.tomato
          );
          this.cmd("Step");
          if (this.arrayList[inc].value >= this.arrayList[inc - gap].value) {
            this.cmd(
              "SetForegroundColor",
              this.arrayList[inc].objectID,
              this.foregroundColor
            ); //s
            this.cmd(
              "SetBackgroundColor",
              this.arrayList[inc].objectID,
              "#FFFFFF"
            );
            this.cmd(
              "SetForegroundColor",
              this.arrayList[inc - gap].objectID,
              this.foregroundColor
            ); //s
            this.cmd(
              "SetBackgroundColor",
              this.arrayList[inc - gap].objectID,
              "#FFFFFF"
            );
            break;
          }
          this.swap(inc - gap, inc);
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc].objectID,
            this.foregroundColor
          ); //s
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc].objectID,
            "#FFFFFF"
          );
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc - gap].objectID,
            this.foregroundColor
          ); //s
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc - gap].objectID,
            "#FFFFFF"
          );
          inc -= gap;
        }
      }
    }
    this.cmd("Step");
    for (var i1 = 0; i1 < this.maxSize; i1++) {
      this.arrayList[i1].x = parseInt(this.startX + i1 * this.width);
      this.cmd(
        "Move",
        this.arrayList[i1].objectID,
        parseInt(this.startX + i1 * this.width),
        this.startArrayY
      );
    }
    this.cmd("Step");
    gap = Math.floor(gap / 2);
  }
  return this.commands;
};

// s
Sort.prototype.QuickSort = function (low, high) {
  // var low=valueArr[0];
  // var high=valueArr[1];
  if (high < low) {
    return;
  }
  this.cmd("step");
  var i = low + 1;
  var j = high;
  var pivot = this.arrayList[low].value;
  // s
  this.pivotStateID = this.objectID;
  this.objectID++;
  {
    this.cmd("Step");
    var y = parseInt(
      this.startArrayY - (this.height * this.arrayList[low].value) / 2
    );
    this.cmd(
      "CREATECIRCLE",
      this.pivotStateID,
      this.arrayList[low].value,
      this.arrayList[low].x,
      y,
      15
    );
    //this.cmd("SetForegroundColor", this.arrayList[i].objectID, "red") ;
    //this.cmd("SetBackgroundColor", this.pivotStateID, "red") ;
    this.cmd("Step");
    this.cmd("Move", this.pivotStateID, this.arrayList[low].x, 140);
    this.cmd("Step");
  }
  if (i == this.maxSize) {
    this.cmd(
      "Move",
      this.iID,
      this.arrayList[i - 1].x + this.width,
      this.startArrayY + 10
    );
    this.cmd(
      "Move",
      this.jID,
      this.arrayList[j - 1].x + this.width,
      this.startArrayY + 10
    );
    this.cmd("Step");
  } else {
    this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
    this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
    this.cmd("Step");
  }
  //this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
  //this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
  //this.cmd("Step");
  while (i <= j) {
    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.palegreen);
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    ); //s
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[low].objectID,
      this.palegreen
    );
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    while (i <= j && this.arrayList[i].value < pivot) {
      i++;
      if (i == this.maxSize) {
        this.cmd(
          "Move",
          this.iID,
          this.arrayList[i - 1].x + this.width,
          this.startArrayY + 10
        );
        this.cmd("Step");
      } else {
        this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
        this.cmd("Step");
      }
      if (i <= j) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[i].objectID,
          this.foregroundColor
        ); //s
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[i].objectID,
          this.palegreen
        );
        this.cmd(
          "SetForegroundColor",
          this.arrayList[low].objectID,
          this.foregroundColor
        ); //s
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[low].objectID,
          this.palegreen
        );
        this.cmd("Step");
        this.cmd(
          "SetForegroundColor",
          this.arrayList[i].objectID,
          this.foregroundColor
        ); //s
        this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
        this.cmd(
          "SetForegroundColor",
          this.arrayList[low].objectID,
          this.foregroundColor
        ); //s
        this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
      }
    }

    this.cmd(
      "SetForegroundColor",
      this.arrayList[j].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen);
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    ); //s
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[low].objectID,
      this.palegreen
    );
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[j].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    ); //s
    this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    while (j >= i && this.arrayList[j].value > pivot) {
      j--;
      this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
      this.cmd("Step");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[low].objectID,
        this.foregroundColor
      ); //s
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[low].objectID,
        this.palegreen
      );
      this.cmd("Step");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //s
      this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[low].objectID,
        this.foregroundColor
      ); //s
      this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    }
    if (i <= j) {
      this.cmd(
        "Move",
        this.iID,
        this.arrayList[i + 1].x,
        this.startArrayY + 10
      );
      this.cmd(
        "Move",
        this.jID,
        this.arrayList[j - 1].x,
        this.startArrayY + 10
      );
      this.swap(i, j);
      i++;
      j--;
    }
  }
  this.swap(low, j);
  //this.cmd("DISCONNECT",this.pivotStateID,this.arrayList[low].objectID);
  this.cmd("DELETE", this.pivotStateID);
  this.cmd("Step");
  this.QuickSort(low, j - 1);
  this.QuickSort(j + 1, high);
  return this.commands;
};

//s
Sort.prototype.ToCirle = function () {
  //this.startX=300;
  this.circleList = new Array(this.maxSize);
  for (var i = 0; i < this.maxSize; i++) {
    var y = parseInt(
      this.startArrayY - (this.height * this.arrayList[i].value) / 2
    );
    this.circleList[i] = new ArrayNode(
      this.objectID,
      this.arrayData[i],
      this.arrayList[i].x,
      y
    );
    this.objectID++;
    {
      this.cmd("Step");
      this.cmd(
        "CREATECIRCLE",
        this.circleList[i].objectID,
        this.circleList[i].value,
        this.circleList[i].x,
        this.circleList[i].y,
        15
      );
      //this.cmd("SetForegroundColor", this.arrayList[i].objectID, "red") ;
      this.cmd("SetBackgroundColor", this.circleList[i].objectID, "#FFFFFF");
      this.cmd("Step");
    }
  }
  this.cmd("Step");
  for (var j = 0; j < this.maxSize; j++) {
    this.cmd("Step");
    this.cmd("DELETE", this.arrayList[j].objectID);
    this.cmd("Step");
  }
  this.cmd("Step");
  this.MoveToStart(100, 150);
  return this.commands;
};
//s
Sort.prototype.divide = function (valueArr) {
  var low = valueArr[0];
  var high = valueArr[1];
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    this.CircleMoveRange(mid + 1, this.maxSize - 1, 20);
    this.cmd("Step");
    this.divide([low, mid]);
    //this.cmd("Step");
    this.divide([mid + 1, high]);
    //this.cmd("Step");
  }
  this.cmd("Step");
  return this.commands;
};
// s
Sort.prototype.MergeSort = function (valueArr) {
  var low = valueArr[0];
  var high = valueArr[1];
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    this.MergeSort([low, mid]);
    this.MergeSort([mid + 1, high]);
    var leftIndex = low;
    var rightIndex = mid + 1;
    var k = low;
    var InsertArray = new Array(high - low + 1);
    for (var j = 0; j < high - low + 1; j++) {
      InsertArray[j] = new ArrayNode("", "", "", "");
    }
    var index = 0;
    while (leftIndex <= mid && rightIndex <= high) {
      if (
        this.circleList[leftIndex].value <= this.circleList[rightIndex].value
      ) {
        this.cmd(
          "SetState",
          this.circleList[leftIndex].value +
            "<=" +
            this.circleList[rightIndex].value
        );
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[leftIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[leftIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[leftIndex];
        k++;
        leftIndex++;
      } else {
        this.cmd(
          "SetState",
          this.circleList[leftIndex].value +
            ">" +
            this.circleList[rightIndex].value
        );
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[rightIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[rightIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[rightIndex];
        k++;
        rightIndex++;
      }
    }
    if (leftIndex <= mid) {
      while (leftIndex <= mid) {
        this.cmd("SetState", " ");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[leftIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[leftIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[leftIndex];
        k++;
        leftIndex++;
      }
    } else {
      while (rightIndex <= high) {
        this.cmd("SetState", " ");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[rightIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[rightIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[rightIndex];
        k++;
        rightIndex++;
      }
    }
    for (var i1 = 0, i2 = low; i1 < index, i2 <= high; i1++, i2++) {
      this.circleList[i2] = InsertArray[i1];
    }
    for (var i = low; i <= high; i++) {
      this.cmd(
        "Move",
        this.circleList[i].objectID,
        this.circleList[i].x,
        this.circleList[i].y
      );
    }
    this.cmd("Step");
  }
  return this.commands;
};
//s
Sort.prototype.swap = function (index1, index2) {
  var distance = this.arrayList[index2].x - this.arrayList[index1].x;
  minNode = new ArrayNode("", "", "", "");
  minNode = this.arrayList[index2];
  this.arrayList[index2] = this.arrayList[index1];
  this.arrayList[index1] = minNode;

  this.arrayList[index2].x += distance;
  this.cmd(
    "Move",
    this.arrayList[index2].objectID,
    this.arrayList[index2].x,
    this.arrayList[index2].y
  );

  this.arrayList[index1].x -= distance;
  this.cmd(
    "Move",
    this.arrayList[index1].objectID,
    this.arrayList[index1].x,
    this.arrayList[index1].y
  );
  this.cmd("Step");
};
// s
var ArrayNode = function (objectID, value, x, y) {
  this.objectID = objectID; // s
  this.value = value; // s
  this.x = x; // xs
  this.y = y; // ys
};
//s
Sort.prototype.MoveRange = function (start, end, distance) {
  for (var i = start; i <= end; i++) {
    this.arrayList[i].x += distance;
    this.cmd(
      "Move",
      this.arrayList[i].objectID,
      this.arrayList[i].x,
      this.arrayList[i].y
    );
  }
};
Sort.prototype.CircleMoveRange = function (start, end, distance) {
  for (var i = start; i <= end; i++) {
    this.circleList[i].x += distance;
    this.cmd(
      "Move",
      this.circleList[i].objectID,
      this.circleList[i].x,
      this.circleList[i].y
    );
  }
};
Sort.prototype.MoveToStart = function (x, y) {
  for (var i = 0; i < this.maxSize; i++) {
    this.cmd("Step");
    if (i == this.maxSize - 1) {
      this.circleList[i].x = x + i * 32;
      this.circleList[i].y = y - 2;
    } else {
      this.circleList[i].x = x + i * 32;
      this.circleList[i].y = y;
    }
    this.cmd(
      "Move",
      this.circleList[i].objectID,
      this.circleList[i].x,
      this.circleList[i].y
    );
    this.cmd("Step");
  }
};
