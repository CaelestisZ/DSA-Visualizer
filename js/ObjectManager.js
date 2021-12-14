// JavaScript Document
// Object control class
function ObjectManager() {
  this.Nodes = []; // Node array
  this.Edges = []; // Positive edge array
  this.BackEdges = []; // Reverse edge array

  this.context = document.getElementById("drawing").getContext("2d"); // canvas
  this.framenum = 0; // Current frame number
  this.height = 1000; // Canvas height
  this.width = 2000; // Canvas width

  // Create a round object
  this.addCircleObject = function (objectID, label, radius) {
    if (this.Nodes[objectID] != null) {
      alert("circle object already exists!");
    } else {
      var newCircle = new AnimatedCircle(objectID, label, radius);
      this.Nodes[objectID] = newCircle;
    }
  };

  // Create a high-bright round object
  this.addHighlightCircleObject = function (objectID, radius) {
    if (this.Nodes[objectID] != null) {
      alert("highlight circle object already exists!");
    } else {
      var newCircle = new AnimatedHighlightCircle(objectID, radius);
      this.Nodes[objectID] = newCircle;
    }
  };

  // Create a rectangular object
  this.addRectangleObject = function (
    objectID,
    label,
    width,
    height,
    xJust,
    yJust
  ) {
    if (this.Nodes[objectID] != null) {
      alert("rectangle object already exists!");
    } else {
      var newRect = new AnimatedRectangle(
        objectID,
        label,
        width,
        height,
        xJust,
        yJust
      );
      this.Nodes[objectID] = newRect;
    }
  };

  // Create a highlighted rectangular object
  this.addHighlightRectangleObject = function (
    objectID,
    width,
    height,
    xJust,
    yJust
  ) {
    if (this.Nodes[objectID] != null) {
      alert("highlight rectangle object already exists!");
    } else {
      var newRect = new AnimatedHighlightRectangle(
        objectID,
        width,
        height,
        xJust,
        yJust
      );
      this.Nodes[objectID] = newRect;
    }
  };

  // Create a rectangular object
  this.addPointerObject = function (objectID, label, length, direction) {
    if (this.Nodes[objectID] != null) {
      alert("pointer object already exists!");
    } else {
      var newPoint = new AnimatedPointer(objectID, label, length, direction);
      this.Nodes[objectID] = newPoint;
    }
  };

  // Create a status box
  this.addStateBoxObject = function (objectID, state, width, height) {
    if (this.Nodes[objectID] != null) {
      alert("state box object already exists!");
    } else {
      var newState = new StateBox(objectID, state, width, height);
      this.Nodes[objectID] = newState;
    }
  };

  // Create label
  this.addLabelObject = function (objectID, label) {
    if (this.Nodes[objectID] != null) {
      alert("label object already exists!");
    } else {
      var newLabel = new AnimatedLabel(objectID, label);
      this.Nodes[objectID] = newLabel;
    }
  };

  // Setting status
  this.setState = function (objectID, state) {
    if (this.Nodes[objectID] == null) {
      alert("state box object do not exists!");
    } else {
      this.Nodes[objectID].setState(state);
    }
  };

  // Set label
  this.setLabel = function (objectID, label) {
    if (this.Nodes[objectID] == null) {
      alert("node does not exists!");
    } else {
      //alert('sl') ;
      this.Nodes[objectID].setLabel(label);
    }
  };

  // Set out
  this.setForegroundColor = function (objectID, color) {
    if (this.Nodes[objectID] == null) {
      alert("node does not exist!");
    } else {
      this.Nodes[objectID].setForegroundColor(color);
    }
  };

  // Set background color
  this.setBackgroundColor = function (objectID, color) {
    if (this.Nodes[objectID] == null) {
      alert("node does not exist!");
    } else {
      this.Nodes[objectID].setBackgroundColor(color);
    }
  };

  // Set high bright color
  this.setHighlightColor = function (objectID, color) {
    if (this.Nodes[objectID] == null) {
      alert("node does not exist!");
    } else {
      this.Nodes[objectID].setHighlightColor(color);
    }
  };

  // Set highlight
  this.setHighlight = function (objectID, value) {
    if (this.Nodes[objectID] == null) {
      alert("node does not exist!");
    } else {
      this.Nodes[objectID].setHighlight(value);
    }
  };

  // Set straight line highlight
  this.setLineHighlight = function (fromObject, toObject, value) {
    if (
      this.Edges[fromObject] == null ||
      this.Edges[fromObject] == undefined ||
      this.BackEdges[toObject] == null ||
      this.BackEdges[toObject] == undefined
    ) {
      alert("node does not exist! cannot highlight");
    } else {
      for (var i = 0; i < this.Edges[fromObject].length; i++) {
        if (this.Edges[fromObject][i].Node2 == this.Nodes[toObject]) {
          this.Edges[fromObject][i].setHighlight(value);
        }
      }
    }
  };

  // Remove object
  this.removeObject = function (objectID) {
    if (this.Nodes[objectID] == null) {
    } else {
      if (objectID == this.Nodes.length - 1) {
        this.Nodes.pop();
      } else {
        this.Nodes[objectID] = null;
      }
    }
  };

  // Connect two objects
  this.connectEdge = function (
    fromObject,
    toObject,
    color,
    curve,
    directed,
    weight
  ) {
    //alert("connectEdge:"+fromObject +toObject+ color+ ","+curve+","+ directed+ ","+weight);
    if (this.Nodes[fromObject] == null || this.Nodes[toObject] == null) {
      alert("do not exist!");
    } else {
      if (
        this.Edges[fromObject] == null ||
        this.Edges[fromObject] == undefined
      ) {
        this.Edges[fromObject] = [];
      }
      if (
        this.BackEdges[toObject] == null ||
        this.BackEdges[toObject] == undefined
      ) {
        this.BackEdges[toObject] = [];
      }
      var newLine = new AnimatedLine(
        this.Nodes[fromObject],
        this.Nodes[toObject],
        color,
        curve,
        directed,
        weight
      );
      this.Edges[fromObject].push(newLine);
      this.BackEdges[toObject].push(newLine);
    }
  };

  // Cancel the connection of two objects
  this.disConnectEdge = function (fromObject, toObject) {
    if (
      this.Edges[fromObject] == null ||
      this.Edges[fromObject] == undefined ||
      this.BackEdges[toObject] == null ||
      this.BackEdges[toObject] == undefined
    ) {
      alert("node does not exist! cannot disconnect");
    } else {
      for (var i = 0; i < this.Edges[fromObject].length; i++) {
        if (this.Edges[fromObject][i].Node2 == this.Nodes[toObject]) {
          if (i != this.Edges[fromObject].length) {
            this.Edges[fromObject][i] =
              this.Edges[fromObject][this.Edges[fromObject].length - 1];
          }
          this.Edges[fromObject].pop();
        }
      }
      for (var i = 0; i < this.BackEdges[toObject].length; i++) {
        if (this.BackEdges[toObject][i].Node1 == this.Nodes[fromObject]) {
          if (i != this.BackEdges[toObject].length) {
            this.BackEdges[toObject][i] =
              this.BackEdges[toObject][this.BackEdges[toObject].length - 1];
          }
          this.BackEdges[toObject].pop();
        }
      }
    }
  };

  // Drawing
  this.draw = function () {
    // Empty
    this.context.clearRect(0, 0, this.width, this.height);
    // cycleNodesDrawing
    for (var i = 0; i < this.Nodes.length; i++) {
      if (this.Nodes[i] != null) {
        if (this.Nodes[i].highlighted == false) {
          this.Nodes[i].draw(this.context);
        } else {
          this.Nodes[i].pluseHighlight(this.framenum);
          this.Nodes[i].draw(this.context);
        }
      }
    }
    for (var i = 0; i < this.Edges.length; i++) {
      if (this.Edges[i] != null) {
        for (var j = 0; j < this.Edges[i].length; j++) {
          if (this.Edges[i][j] != null && this.Edges[i][j] != undefined) {
            if (this.Edges[i][j].highlighted == false) {
              this.Edges[i][j].draw(this.context);
            } else {
              this.Edges[i][j].pluseHighlight(this.framenum);
              this.Edges[i][j].draw(this.context);
            }
          }
        }
      }
    }
  };

  // Set the location of the node
  this.setPosition = function (nodeID, newX, newY) {
    if (this.Nodes[nodeID] == null) {
      alert("do not exist!");
    } else {
      this.Nodes[nodeID].x = newX;
      this.Nodes[nodeID].y = newY;
    }
  };

  // Get a nodeXcoordinate
  this.getPositionX = function (nodeID) {
    return this.Nodes[nodeID].x;
  };
  // Get a nodeYcoordinate
  this.getPositionY = function (nodeID) {
    return this.Nodes[nodeID].y;
  };
}
