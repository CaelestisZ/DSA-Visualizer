// JavaScript Document

var currentPatternMatch;
// Initialization function
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentPatternMatch = new PatternMatch(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// Mode match
var PatternMatch = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ; // Initialization control
  this.initAttributes(); // Initialization attribute
};

// Inheritance and construct
PatternMatch.prototype = new Algorithm();
PatternMatch.prototype.constructor = PatternMatch;

// Initialization control
PatternMatch.prototype.initControls = function () {
  this.insertField = addInputToAlgorithmBar("text", "");
  this.patternButton = addInputToAlgorithmBar(
    "button",
    "Generate a mode string"
  );
  this.patternButton.onclick = this.patternCallBack.bind(this);
  this.targetButton = addInputToAlgorithmBar(
    "button",
    "Generate a target string"
  );
  this.targetButton.onclick = this.targetCallBack.bind(this);
  this.matchButton = addInputToAlgorithmBar("button", "Start match");
  this.matchButton.onclick = this.matchCallBack.bind(this);
};

// initialization
PatternMatch.prototype.initAttributes = function () {
  // Logical part
  this.pattern = null;
  this.target = null;
  this.head = -1;
  this.next = null;
  // Graphics part
  this.objectID = 1; // Sequence number of graphics
  this.width = 50; // Rectangular width
  this.height = 50; // Rectangular height
  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.matchedColor = "#32CD32"; // Matching colors
  this.startX = 150; // Beginningxcoordinate
  this.startY = 100; // Beginningycoordinate
  this.startArrayY = 250; // Started arrayycoordinate
  this.patterntime = false;
  this.targettime = false;
  this.matchingtime = false;
  // Initialization status box
  // this.implementAction(this.initStateBox.bind(this), "start");
};

// Initialization status box
PatternMatch.prototype.initStateBox = function (state) {
  // Create a status box
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

// Mode string callback function
PatternMatch.prototype.patternCallBack = function (patternStr) {
  // var insertValue = this.insertField.value;
  var insertValue = patternStr;
  if (insertValue != "") {
    // set text value
    // this.insertField.value = "";
    this.implementAction(this.initPattern.bind(this), insertValue);
  }
};

// Target string callback function
PatternMatch.prototype.targetCallBack = function (targetStr) {
  // var insertValue = this.insertField.value;
  var insertValue = targetStr;
  if (insertValue != "") {
    // set text value
    // this.insertField.value = "";
    this.implementAction(this.initTarget.bind(this), insertValue);
  }
};

//Simple matchback function
PatternMatch.prototype.matchCallBack = function (event) {
  this.implementAction(this.matching.bind(this), 0);
};
//KMPMatch the back modulo
PatternMatch.prototype.KMPmatchCallBack = function (event) {
  this.implementAction(this.KMPmatching.bind(this), 0);
};

// Initialization mode string
PatternMatch.prototype.initPattern = function (pattern) {
  pattern = pattern.trim();
  if (pattern.length > 16 || pattern.length <= 0) {
    this.cmd("SetState", "The length of the pattern string should be 1-16");
    return this.commands;
  }
  //Empty mode string original content
  if (this.patterntime == true) {
    for (var m = 0; m < this.pattern.length; m++) {
      if (this.patternArray[m].value != null) {
        this.cmd("Delete", this.patternArray[m].objectID);
      }
    }
    this.cmd("Step");
  }
  this.pattern = pattern;
  this.patternArray = new Array(this.pattern.length); // Mode string character array
  // Create a status box
  {
    this.cmd("SetState", "Create a target string");
    this.cmd("Step");
  }
  for (var i = 0; i < this.pattern.length; i++) {
    this.patternArray[i] = new ArrayNode(
      this.objectID,
      this.pattern[i],
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY
    );
    // Create a pattern string rectangle
    {
      this.cmd(
        "CreateRectangle",
        this.patternArray[i].objectID,
        this.patternArray[i].value,
        this.width,
        this.height,
        "center",
        "center",
        this.patternArray[i].x,
        this.patternArray[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.patternArray[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.patternArray[i].objectID, "#FFFFFF");
    }
    this.objectID++;
  }
  this.cmd("Step");
  this.patterntime = true;
  return this.commands;
};

// Initialize the target string
PatternMatch.prototype.initTarget = function (target) {
  target = target.trim();
  if (target.length > 16 || target.length <= 0) {
    this.cmd("SetState", "The length of the target string should be 1-16");
    return this.commands;
  }
  //Clear target string original content
  if (this.targettime == true) {
    for (var m = 0; m < this.target.length; m++) {
      if (this.targetArray[m].value != null) {
        this.cmd("Delete", this.targetArray[m].objectID);
      }
    }
    this.cmd("Step");
  }
  this.target = target;
  this.targetArray = new Array(this.target.length); // Mode string character array
  // Create a status box
  {
    this.cmd("SetState", "Create a mode string");
    this.cmd("Step");
  }
  for (var i = 0; i < this.target.length; i++) {
    this.targetArray[i] = new ArrayNode(
      this.objectID,
      this.target[i],
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY + 100
    );
    // Create a pattern string rectangle
    {
      this.cmd(
        "CreateRectangle",
        this.targetArray[i].objectID,
        this.targetArray[i].value,
        this.width,
        this.height,
        "center",
        "center",
        this.targetArray[i].x,
        this.targetArray[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.targetArray[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.targetArray[i].objectID, "#FFFFFF");
    }
    this.objectID++;
  }
  this.cmd("Step");
  this.targettime = true;
  return this.commands;
};
// match
PatternMatch.prototype.matching = function () {
  //Reset background color with graphics position
  for (pos = 0; pos < this.pattern.length; pos++) {
    this.cmd("SetBackgroundColor", this.patternArray[pos].objectID, "#FFFFFF");
  }
  this.cmd("Step");
  for (pos = 0; pos < this.target.length; pos++) {
    this.targetArray[pos].x = parseInt(this.startX + pos * (this.width - 1));
    this.targetArray[pos].y = this.startArrayY + 100;
    this.cmd(
      "Move",
      this.targetArray[pos].objectID,
      this.targetArray[pos].x,
      this.targetArray[pos].y
    );
    this.cmd("SetBackgroundColor", this.targetArray[pos].objectID, "#FFFFFF");
  }
  for (var i = 0; i < this.pattern.length - this.target.length + 1; i++) {
    for (var j = 0; j < this.target.length; j++) {
      // Find a comparison position

      this.cmd("SetHighlight", this.patternArray[i + j].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.patternArray[i + j].objectID, false);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, false);
      this.cmd("Step");

      //If the match is being matched, the match failed
      if (this.patternArray[i + j].value != this.targetArray[j].value) {
        if (this.pattern.length - i > this.target.length) {
          // Create a status box
          {
            this.cmd(
              "SetState",
              "Target string" +
                parseInt(i + j + 1) +
                "Character and pattern string" +
                parseInt(j + 1) +
                "Character"
            );
            this.cmd("Step");
          }
          for (var pos = 0; pos < this.target.length; pos++) {
            this.targetArray[pos].x += this.width - 1;
            this.cmd(
              "Move",
              this.targetArray[pos].objectID,
              this.targetArray[pos].x,
              this.targetArray[pos].y
            );
          }
          //Reset background color
          for (pos = 0; pos < this.pattern.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.patternArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          for (pos = 0; pos < this.target.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.targetArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          break;
        } else {
          // Create a status box
          {
            this.cmd("SetState", "Match failed");
            this.cmd("Step");
          }
          //Reset background color
          for (pos = 0; pos < this.pattern.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.patternArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          for (pos = 0; pos < this.target.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.targetArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          return this.commands;
        }
      } else {
        // Create a status box
        {
          this.cmd(
            "SetState",
            "Target string" +
              parseInt(i + j + 1) +
              "Character and pattern string" +
              parseInt(j + 1) +
              "Character"
          );
          this.cmd("Step");
        }
        //Put the matching character background color green
        this.cmd(
          "SetBackgroundColor",
          this.patternArray[i + j].objectID,
          this.matchedColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.targetArray[j].objectID,
          this.matchedColor
        );
      }
    }
    //Match success
    if (j == this.target.length) {
      // Create a status box
      {
        this.cmd(
          "SetState",
          "In position" + (i + 1).toString() + "Match success"
        );
        this.cmd("Step");
      }
      break;
    }
    //Match the target string to move a rectangle after the failure
  }
  //Until finally does not appear and the target string identical characters, match failed
  if (i == this.pattern.length) {
    // Create a status box
    {
      this.cmd("SetState", "Match failed");
      this.cmd("Step");
    }
  }
  return this.commands;
};

//ObtainnextArray
PatternMatch.prototype.getNext = function () {
  var k = -1;
  var j = 0;
  this.next = new Array(this.targetArray.length);
  this.next[j] = k;
  while (j < this.targetArray.length) {
    if (k == -1 || this.targetArray[k].value == this.targetArray[j].value) {
      ++j;
      ++k;
      this.next[j] = k;
    } else {
      k = this.next[k];
    }
  }
};

//KMPmatch
PatternMatch.prototype.KMPmatching = function () {
  if (this.matchingtime == true) {
    for (var i = 0; i < this.patternArray.length; i++) {
      this.cmd(
        "SetForegroundColor",
        this.patternArray[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.patternArray[i].objectID, "#FFFFFF");
    }
    this.cmd("Step");
    for (var i = 0; i < this.targetArray.length; i++) {
      this.targetArray[i].x = parseInt(this.startX + i * (this.width - 1));
      this.cmd(
        "Move",
        this.targetArray[i].objectID,
        this.targetArray[i].x,
        this.targetArray[i].y
      );
      {
        this.cmd(
          "SetForegroundColor",
          this.targetArray[i].objectID,
          this.foregroundColor
        );
        this.cmd("SetBackgroundColor", this.targetArray[i].objectID, "#FFFFFF");
      }
    }
    this.cmd("Step");
  }
  var i = 0;
  var j = 0;
  this.getNext();
  while (i < this.patternArray.length && j < this.targetArray.length) {
    if (j != -1) {
      /*if( j == -1){
    		// Find a comparison position
		
			//this.cmd("SetHighlight",this.patternArray[i].objectID, true) ;
			//this.cmd("Step") ;			
			////this.cmd("SetHighlight", this.patternArray[i].objectID, false);
			//this.cmd("Step") ;
			//this.cmd("SetHighlight",this.targetArray[0].objectID, true) ;
			//this.cmd("Step") ;
			///this.cmd("SetHighlight",this.targetArray[0].objectID, false);
			//this.cmd("Step") ;
    	}
    	else{*/
      // Find a comparison position

      this.cmd("SetHighlight", this.patternArray[i].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.patternArray[i].objectID, false);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, false);
      this.cmd("Step");
    }
    if (j == -1 || this.patternArray[i].value == this.targetArray[j].value) {
      /*if( j == -1){
        		//Put the matching character background color green
				this.cmd("SetBackgroundColor", this.patternArray[i].objectID,this.matchedColor) ;
				this.cmd("SetBackgroundColor", this.targetArray[0].objectID, this.matchedColor) ;
				this.cmd("SetState","0","Pattern string"+parseInt(i+1)+"Character with the target string"+parseInt(j+1)+"Character is the same");
				this.cmd("Step");
        	}
        	else{*/
      if (j != -1) {
        //Put the matching character background color green
        this.cmd(
          "SetBackgroundColor",
          this.patternArray[i].objectID,
          this.matchedColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.targetArray[j].objectID,
          this.matchedColor
        );
        this.cmd(
          "SetState",
          "Pattern string" +
            parseInt(i + 1) +
            "Character with the target string" +
            parseInt(j + 1) +
            "Character is the same"
        );
        this.cmd("Step");
      }
      i++;
      j++;
    } else {
      {
        //Prompt non-match characters,Eliminate the color of the matching field
        for (var m = 0; m < this.patternArray.length; m++) {
          this.cmd(
            "SetForegroundColor",
            this.patternArray[m].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.patternArray[m].objectID,
            "#FFFFFF"
          );
        }
        for (var m = 0; m < this.targetArray.length; m++) {
          this.cmd(
            "SetForegroundColor",
            this.targetArray[m].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.targetArray[m].objectID,
            "#FFFFFF"
          );
        }
        this.cmd(
          "SetState",
          "Pattern string" +
            parseInt(i + 1) +
            "Character with the target string" +
            parseInt(j + 1) +
            "Character"
        );
        this.cmd("Step");
      }
      for (var n = 0; n < this.targetArray.length; n++) {
        //move
        {
          this.targetArray[n].x = parseInt(
            this.targetArray[n].x + (j - this.next[j]) * (this.width - 1)
          );
          this.cmd(
            "Move",
            this.targetArray[n].objectID,
            this.targetArray[n].x,
            this.targetArray[n].y
          );
          //Will have identified the same character background color green
          for (var t = 0; t < this.next[j]; t++) {
            this.cmd(
              "SetBackgroundColor",
              this.patternArray[i - t - 1].objectID,
              this.matchedColor
            );
            this.cmd(
              "SetBackgroundColor",
              this.targetArray[t].objectID,
              this.matchedColor
            );
          }
          this.cmd("Step");
        }
      }
      j = this.next[j];
    }
  }
  if (this.targetArray.length == j) {
    this.cmd(
      "SetState",
      "Find success, in position" + parseInt(i - j + 1) + "Match success"
    );
    this.cmd("Step");
  } else {
    this.cmd("SetState", "Find failed");
    this.cmd("Step");
  }
  this.matchingtime = true;
  return this.commands;
};

// Node class
var ArrayNode = function (objectID, value, x, y) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
};
