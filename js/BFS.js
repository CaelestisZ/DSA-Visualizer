
// Initialization function
var currentGraph;
// Dynamic view of the map change
var directedGraphCurveWithSingleEdge = 0.0; // There is only one side between the two vertices, Draw a straight line at this time
var directedGraphCurveWithDoubleEdge = 0.15; // There are two edges between the two vertices. This time the curve is
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6; // Figure At the beginning of the number of vertices
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentGraph = new Graph(animationManager, drawing.width, drawing.height);
  currentGraph.implementAction(
    currentGraph.initGraph.bind(currentGraph),
    initialVertexNum
  );
  currentGraph.implementAction(
    currentGraph.getRandomGraph.bind(currentGraph),
    0
  );
}

// Generate random numbers, integers, upper and lower boundaries that are between upper and lower boundaries, can be taken
function getRandomNumber(lowerBound, upperBound) {
  var range = upperBound - lowerBound + 1;
  var rand = Math.round(Math.random() * 100);
  return (rand % range) + lowerBound;
}

/* Edge */
function GraphEdge(startVertex, endVertex, weight) {
  if (weight == null) {
    this.weight = 0;
  } else {
    this.weight = weight;
  }
  this.startVertex = startVertex;
  this.endVertex = endVertex;
}

GraphEdge.prototype = {
  constructor: GraphEdge,
};

/* Chart */
// picture
var Graph = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initialize();
};
// Inheritance and construct
Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

// initialization
Graph.prototype.initialize = function () {
  // Logical part ID
  //this.head = -1 ; // Head pointer
  this.directed = false; // Whether there is a direction
  this.showEdgeWeight = false; // Whether it shows edge weights
  // Set interface
  $(".radio2").attr("checked", "checked");
  $(".runNumber").val("0");
  $(".weightNumber").val("10");
  // $("#displayWeight").attr("checked", "checked");
  // Graphics part
  this.objectID = 0; // Sequence number of graphics
  this.BFSCircleID = 0; // BFS circles displayed over time
  this.BFSParentCircleID = 0; // Parent node of BFS traversal nodes
  this.hintLabelID = 0; // label Serial number
  this.hintObjectIDStart = 0;
  this.hintObjectIDCount = 0;
  this.hintObjectIDCurrent = 0; // Stack top pointer
  this.hintObjectIDArray;
  this.hintHighlightCircleID;
  this.hintStartX = 600;
  this.hintStartY = 150;
  this.hintInterval = 10;
  // this.hintRectWidth = 50;
  // this.hintRectHeight = 30;

  this.radius = 26; // Vertence round radius
  // Determination of vertex position
  this.R = 150; // All vertices are distributed on the circle
  this.X0 = 250; // Distributed round coordinate
  this.Y0 = 250; // Distributed round sleel

  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.highlightColor = "#FF0000";
};

// Add a side call function
addEdgeCallBack = function (startVertex, endVertex, weight) {
  if (isNaN(weight) || weight == null) {
    weight = 10;
  }
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    startVertex,
    endVertex,
    weight,
  ]);
};
// Delete edge call functions
delEdgeCallBack = function (startVertex, endVertex) {
  currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [
    startVertex,
    endVertex,
  ]);
};
// BFS traversal call function
runBFSCallBack = function (startVertex) {
  startVertex = startVertex == null || isNaN(startVertex) ? 0 : startVertex;
  currentGraph.implementAction(
    currentGraph.clearHintArea.bind(currentGraph),
    0
  );
  currentGraph.implementAction(
    currentGraph.BFSTraverse.bind(currentGraph),
    startVertex
  );
};
// Generate random map call function
randomGraphCallBack = function () {
  do {
    currentGraph.implementAction(
      currentGraph.clearAllEdges.bind(currentGraph),
      0
    );
    currentGraph.implementAction(
      currentGraph.getRandomGraph.bind(currentGraph),
      0
    );
  } while ((1.0 * currentGraph.edgeNum) / currentGraph.vertexNum < 0.6);
  // Surprising graph
};
// Show boundary rejection functions
showEdgeWeightSwitch = function (show) {
  if (show != null) {
    currentGraph.showEdgeWeight = show;
    currentGraph.implementAction(
      currentGraph.showEdgeWeightFunc.bind(currentGraph),
      show
    );
  }
};
// Dynamic map and conversion of no picture
directedGraphSwitch = function (directed) {
  if (directed != null) {
    // Clear all the edges first
    currentGraph.implementAction(
      currentGraph.clearAllEdges.bind(currentGraph),
      0
    );
    currentGraph.directed = directed;
    // Get random maps
    currentGraph.implementAction(
      currentGraph.getRandomGraph.bind(currentGraph),
      0
    );
  }
};
// Vertex quantity value change call function
vertexNumSelectChangeCallBack = function (newVertexNum) {
  if (
    !isNaN(parseInt(newVertexNum)) &&
    parseInt(newVertexNum) >= 3 &&
    parseInt(newVertexNum) <= 10
  ) {
    // Clear all
    objectManager = null;
    currentGraph = null;
    animationManager = null;
    // Regeneration
    objectManager = new ObjectManager();
    animationManager = new AnimationManager(objectManager);
    currentGraph = new Graph(animationManager, drawing.width, drawing.height);
    currentGraph.implementAction(
      currentGraph.initGraph.bind(currentGraph),
      parseInt(newVertexNum)
    );
  } else {
    alert("The range of the number of vertices should be 3-10 !");
  }
};


// Add control button
Graph.prototype.addControls = function () {
  addLabelToAlgorithmBar("Vertex quantity");
  var vertexNumList = [3, 4, 5, 6, 7, 8, 9, 10];
  vertexNumSelect = addSelectToAlgorithmBar(vertexNumList);
  vertexNumSelect.onchange = vertexNumSelectChangeCallBack;
  // Add initial value
  for (var i = 0; i < vertexNumSelect.length; i++) {
    if (vertexNumSelect.options[i].value == initialVertexNum) {
      vertexNumSelect.options[i].selected = true;
    }
  }
  //alert(vertexNumSelect.selectedIndex);

  addLabelToAlgorithmBar("starting point");
  startVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("end");
  endVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("Weights");
  edgeWeightText = addInputToAlgorithmBar("text", "");
  edgeWeightText.value = "10";
  addEdgeButton = addInputToAlgorithmBar("button", "Add edge");
  addEdgeButton.onclick = addEdgeCallBack;
  delEdgeButton = addInputToAlgorithmBar("button", "Delete");
  delEdgeButton.onclick = delEdgeCallBack;
  randomGraphButton = addInputToAlgorithmBar("button", "Generate random maps");
  randomGraphButton.onclick = randomGraphCallBack;

  addLabelToAlgorithmBar("BFS starting top");
  BFSStartVertexText = addInputToAlgorithmBar("text", "0");

  BFSTraverseButton = addInputToAlgorithmBar("button", "Run BFS");
  BFSTraverseButton.onclick = runBFSCallBack;

  showEdgeWeight = addCheckboxToAlgorithmBar("Show edge weight");
  showEdgeWeight.onclick = showEdgeWeightSwitch;
  showEdgeWeight.checked = true;

  var directedGraphList = addRadioButtonGroupToAlgorithmBar(
    ["directed Graph", "undirected Graph"],
    "GraphType"
  );
  directedGraph = directedGraphList[0];
  undirectedGraph = directedGraphList[1];
  directedGraph.onclick = directedGraphSwitch;
  undirectedGraph.onclick = directedGraphSwitch;
  undirectedGraph.checked = true;
};

// Initialization array
Graph.prototype.initGraph = function (vertexNum) {
  // BFS Moving vertex
  this.BFSCircleID = vertexNum;
  this.BFSParentCircleID = vertexNum + 1;
  // Tip area display
  this.hintHighlightCircleID = vertexNum + 2;
  this.hintLabelID = vertexNum + 3;
  this.hintObjectIDStart = vertexNum + 4;

  this.vertexNum = vertexNum; // Number of vertices
  this.edgeNum = 0; // Side of the side
  this.matrix = new Array(this.vertexNum); // Array of adjacent matrices
  for (var i = 0; i < this.vertexNum; i++) {
    this.matrix[i] = new Array(this.vertexNum);
    for (var j = 0; j < this.vertexNum; j++) {
      this.matrix[i][j] = 0;
    }
  }
  this.position = new Array(this.vertexNum); // Storage vertices
  for (var i = 0; i < this.vertexNum; i++) {
    this.position[i] = new Array(2);
  }
  // Adaptive changes to the distribution of vertices
  this.R = this.R + 20 * (this.vertexNum - 5);
  this.R = this.R > 220 ? 220 : this.R;
  for (var i = 0; i < this.vertexNum; i++) {
    this.position[i][0] = Math.round(
      this.X0 + this.R * Math.sin((2 * Math.PI * i) / this.vertexNum)
    );
    this.position[i][1] = Math.round(
      this.Y0 - this.R * Math.cos((2 * Math.PI * i) / this.vertexNum)
    );
  }
  //this.graphObjectID = new Array(maxSize) ; //

  for (var i = 0; i < this.vertexNum; i++) {
    //this.graphObjectID[i] = -1 ;
    this.cmd(
      "CreateCircle",
      this.objectID,
      this.objectID,
      this.position[this.objectID][0],
      this.position[this.objectID][1],
      this.radius
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.objectID, "#FFFFFF");
    this.objectID++;
  }
  // BFS Queue label
  this.cmd(
    "CreateLabel",
    this.hintLabelID,
    "BFS Queue",
    this.hintStartX - this.radius - 40,
    this.hintStartY
  );
  this.cmd("SetForegroundColor", this.hintLabelID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintLabelID, this.backgroundColor);
  return this.commands;
};

// Whether it is displayed while weighing weight,showforboolType, indicating whether the weight is displayed
Graph.prototype.showEdgeWeightFunc = function (show) {
  //alert("show Edge weight");
  // Map
  if (this.directed) {
    // First delete all the edges on the picture
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", i, j);
        }
      }
    }
    // Redraw
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          var label = show ? this.matrix[i][j] : "";
          var curve = this.matrix[j][i]
            ? directedGraphCurveWithDoubleEdge
            : directedGraphCurveWithSingleEdge;
          this.cmd(
            "Connect",
            i,
            j,
            this.foregroundColor,
            curve,
            this.directed,
            label
          );
        }
      }
    }
  }
  // Undirected graph
  else {
    // First delete all the edges on the picture
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[j][i]) {
          this.cmd("Disconnect", j, i);
        }
      }
    }
    // Redraw
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[j][i]) {
          var label = show ? this.matrix[i][j] : "";
          this.cmd(
            "Connect",
            j,
            i,
            this.foregroundColor,
            undirectedGraphCurve,
            this.directed,
            label
          );
        }
      }
    }
  }
  return this.commands;
};
// All of the clear map
Graph.prototype.clearAllEdges = function () {
  //alert("clearAllEdges");
  // Map
  //alert(this.directed);
  if (this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", i, j);
          this.matrix[i][j] = 0;
        }
      }
    }
  }
  // Undirected graph
  else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", j, i);
          this.matrix[i][j] = 0;
          this.matrix[j][i] = 0;
        }
      }
    }
  }
  this.edgeNum = 0;
  return this.commands;
};

// Random map
Graph.prototype.getRandomGraph = function () {
  // Generated no map
  if (!this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (!getRandomNumber(0, 2)) {
          this.addEdge([j, i, getRandomNumber(1, 100), false]);
        }
      }
    }
  }
  // Generation map
  else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (i != j) {
          //alert(i +" "+j +":"+this.matrix[i][j] );
          // Decide if it is added
          if (!getRandomNumber(0, 2)) {
            this.addEdge([i, j, getRandomNumber(1, 100), false]);
          }
        }
      }
    }
  }
  return this.commands;
};

// Add edge
Graph.prototype.addEdge = function () {
  // Introducing parameters, starting point, end point, weight, Do you need an animation?
  var startVertex = arguments[0][0];
  var endVertex = arguments[0][1];
  var weight = arguments[0][2];
  var withAnimation = arguments[0].length > 3 ? arguments[0][3] : true; // bool

  // The legality judgment of incoming parameters
  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex invalid");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex invalid");
    return this.commands;
  }
  if (weight <= 0) {
    alert("weight invalid");
    return this.commands;
  }
  // Determine if this side already exists
  if (this.directed) {
    if (this.matrix[startVertex][endVertex]) {
      alert("this edge already exists");
      return this.commands;
    }
  } else {
    if (
      this.matrix[startVertex][endVertex] ||
      this.matrix[endVertex][startVertex]
    ) {
      alert("this edge already exists");
      return this.commands;
    }
  }
  // Add this side
  if (withAnimation) {
    this.cmd("SetHighlight", startVertex, true);
    this.cmd("SetHighlight", endVertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", startVertex, false);
    this.cmd("SetHighlight", endVertex, false);
    this.cmd("Step");
  }
  //this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

  // Map
  if (this.directed) {
    this.matrix[startVertex][endVertex] = weight;
    var label1 = this.showEdgeWeight ? this.matrix[startVertex][endVertex] : "";
    var label2 = this.showEdgeWeight ? this.matrix[endVertex][startVertex] : "";
    // For award map, you need to judge whether there is a reverse connection.
    if (this.matrix[endVertex][startVertex]) {
      this.cmd("Disconnect", endVertex, startVertex);
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        directedGraphCurveWithDoubleEdge,
        this.directed,
        label1
      );
      this.cmd(
        "Connect",
        endVertex,
        startVertex,
        this.foregroundColor,
        directedGraphCurveWithDoubleEdge,
        this.directed,
        label2
      );
    } else {
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        directedGraphCurveWithSingleEdge,
        this.directed,
        label1
      );
    }
  }
  // Undirected graph
  else {
    this.matrix[startVertex][endVertex] = weight;
    this.matrix[endVertex][startVertex] = weight;
    var label = this.showEdgeWeight ? weight : "";
    if (startVertex > endVertex) {
      var tmp = startVertex;
      startVertex = endVertex;
      endVertex = tmp;
    }
    this.cmd(
      "Connect",
      startVertex,
      endVertex,
      this.foregroundColor,
      undirectedGraphCurve,
      this.directed,
      label
    );
  }
  /* changed */
  this.edgeNum++;
  return this.commands;
};

// Delete
Graph.prototype.delEdge = function () {
  // Parameters, to delete the edge
  startVertex = arguments[0][0];
  endVertex = arguments[0][1];
  // The legality judgment of incoming parameters
  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex invalid.");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex invalid.");
    return this.commands;
  }
  // If it is a non-mapgram, you need to adjust the starting point and end point.
  if (!this.directed && startVertex > endVertex) {
    var tmp = startVertex;
    startVertex = endVertex;
    endVertex = tmp;
  }
  if (!this.matrix[startVertex][endVertex]) {
    alert("this edge does not exist.");
    return this.commands;
  }

  this.cmd("SetHighlight", startVertex, true);
  this.cmd("SetHighlight", endVertex, true);
  this.cmd("Step");
  this.cmd("SetHighlight", startVertex, false);
  this.cmd("SetHighlight", endVertex, false);
  this.cmd("Step");
  //this.cmd("Disconnect", startVertex, endVertex);
  // Map
  if (this.directed) {
    this.cmd("Disconnect", startVertex, endVertex);
    this.matrix[startVertex][endVertex] = 0;
    if (this.matrix[endVertex][startVertex]) {
      var label = this.showEdgeWeight
        ? this.matrix[endVertex][startVertex]
        : "";
      this.cmd("Disconnect", endVertex, startVertex);
      this.cmd(
        "Connect",
        endVertex,
        startVertex,
        this.foregroundColor,
        directedGraphCurveWithSingleEdge,
        this.directed,
        label
      );
    }
  } else {
    //alert(startVertex+" "+endVertex);
    this.cmd("Disconnect", startVertex, endVertex);
    this.matrix[startVertex][endVertex] = 0;
    this.matrix[endVertex][startVertex] = 0;
  }
  this.edgeNum--;
  return this.commands;
};

// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
  for (var i = 0; i < this.vertexNum; i++) {
    if (this.matrix[vertex][i]) {
      var edge = new GraphEdge(vertex, i, this.matrix[vertex][i]);
      return edge;
    }
  }
  return null; // This vertex is not adjacent
};

Graph.prototype.nextEdge = function (edge) {
  for (var i = edge.endVertex + 1; i < this.vertexNum; i++) {
    if (this.matrix[edge.startVertex][i]) {
      edge.endVertex = i;
      edge.weight = this.matrix[edge.startVertex][i];
      return edge;
    }
  }
  return null; // No nextEdge
};
// 	Clearhintarea
Graph.prototype.clearHintArea = function () {
  if (typeof this.visited == "undefined") {
    return this.commands;
  }

  return this.commands;
};
// BFS
Graph.prototype.BFSTraverse = function (startVertex) {
  if (startVertex >= this.vertexNum) {
    this.cmd(
      "SetState",
      "The vertex input should be 0-" + (this.vertexNum - 1) + "between"
    );
    return this.commands;
  }
  this.visited = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.visited[i] = false;
  }

  this.cmd("CreateHighlightCircle", this.BFSCircleID, 100, 50, this.radius);
  this.cmd("SetForegroundColor", this.BFSCircleID, "#FF0000");
  this.cmd("SetBackgroundColor", this.BFSCircleID, "#FFFFFF");
  this.cmd("Step");
  this.objectID++;
  // hint circle
  this.cmd(
    "CreateHighlightCircle",
    this.hintHighlightCircleID,
    this.hintStartX,
    this.hintStartY,
    this.radius
  );
  this.cmd(
    "SetForegroundColor",
    this.hintHighlightCircleID,
    this.highlightColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.hintHighlightCircleID,
    this.backgroundColor
  );
  var visitSeq = [];
  for (var i = 0; i < this.vertexNum; i++) {
    var toVisit = (startVertex + i) % this.vertexNum;
    if (!this.visited[toVisit]) visitSeq = visitSeq.concat(this.BFS(toVisit));
  }
  // console.log(visitSeq);
  var visitSeqStr = "";
  for (var i = 0; i < visitSeq.length; i++) {
    if (i != 0) {
      visitSeqStr += ",";
    }
    visitSeqStr += visitSeq[i];
  }
  this.cmd("SetState", "BFSTraversal order is " + visitSeqStr);
  this.cmd("Delete", this.BFSCircleID);
  this.cmd("Delete", this.hintHighlightCircleID);
  this.cmd("Step");
  this.cmd("Step");
  return this.commands;
};
// BFS
// BFSAccess node, Parent node, The second layer accesses the node, The first few visits to this node
Graph.prototype.BFS = function (startVertex) {
  this.hintObjectIDArray = new Array();
  var queue = new Array();
  var visitSeq = new Array();
  visitSeq.push(startVertex);
  // visit startVertex
  this.visited[startVertex] = true;
  // moveBFS circle
  this.cmd(
    "Move",
    this.BFSCircleID,
    this.position[startVertex][0],
    this.position[startVertex][1]
  );
  this.cmd("Step");
  this.cmd("Step");
  // produceBFS	parent circle
  this.cmd(
    "CreateHighlightCircle",
    this.BFSParentCircleID,
    this.position[startVertex][0],
    this.position[startVertex][1],
    this.radius
  );
  this.cmd("SetForegroundColor", this.BFSParentCircleID, "#000000");
  this.cmd("SetBackgroundColor", this.BFSParentCircleID, "#FFFFFF");
  this.cmd("Step");

  // Record the parent node of each node
  var parent = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    parent[i] = startVertex;
  }

  queue.push(startVertex);
  this.cmd("SetState", "Add the starting node to the queue");
  this.cmd("Step");
  // this.cmd("CreateLabel", this.hintLabelID, "BFS Queue", this.hintStartX - this.radius - 40, this.hintStartY);
  // this.cmd("SetForegroundColor", this.hintLabelID, this.foregroundColor);
  // this.cmd("SetBackgroundColor", this.hintLabelID, this.backgroundColor);
  // this.cmd("CreateHighlightCircle", this.hintHighlightCircleID, this.hintStartX, this.hintStartY, this.radius);
  // this.cmd("SetForegroundColor", this.hintHighlightCircleID, this.highlightColor);
  // this.cmd("SetBackgroundColor", this.hintHighlightCircleID, this.backgroundColor);
  this.cmd(
    "CreateCircle",
    this.hintObjectIDStart + this.hintObjectIDCount,
    startVertex,
    this.hintStartX,
    this.hintStartY,
    this.radius
  );
  this.cmd(
    "SetForegroundColor",
    this.hintObjectIDStart + this.hintObjectIDCount,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.hintObjectIDStart + this.hintObjectIDCount,
    this.backgroundColor
  );
  this.hintObjectIDArray.push(this.hintObjectIDStart + this.hintObjectIDCount);
  this.hintObjectIDCount++;

  while (queue.length != 0) {
    var vertex = queue[0];
    this.cmd("SetState", "Take out the first vertex<" + vertex + ">");
    this.cmd("Step");

    queue.shift(); // Delete the first element
    this.cmd(
      "Move",
      this.BFSParentCircleID,
      this.position[vertex][0],
      this.position[vertex][1]
    );
    this.cmd("Step");
    this.cmd("Step");
    for (
      var edge = this.firstEdge(vertex);
      edge != null;
      edge = this.nextEdge(edge)
    ) {
      this.cmd(
        "SetState",
        "Check and vertex<" +
          vertex +
          ">Connected vertex<" +
          edge.endVertex +
          ">Whether it is accessed"
      );
      this.cmd("Step");
      var fromV = edge.startVertex;
      var toV = edge.endVertex;
      if (!this.directed && fromV > toV) {
        fromV = edge.endVertex;
        toV = edge.startVertex;
      }
      this.cmd("SetLineHighlight", fromV, toV, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", fromV, toV, false);
      //this.cmd("Step");

      this.cmd(
        "Move",
        this.BFSCircleID,
        this.position[edge.endVertex][0],
        this.position[edge.endVertex][1]
      );
      this.cmd("Step");
      this.cmd("Step");

      var nextVertex = edge.endVertex;
      if (!this.visited[nextVertex]) {
        // visit nextVertex
        parent[nextVertex] = edge.startVertex;
        visitSeq.push(nextVertex);
        this.visited[nextVertex] = true;
        this.cmd("SetState", "Access vertices<" + nextVertex + ">");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.BFSCircleID,
          this.position[nextVertex][0],
          this.position[nextVertex][1]
        );
        this.cmd("Step");
        this.cmd("Step");
        var flag = 0;
        for (var j = 0; j < queue.length; j++) {
          if (queue[j] == nextVertex) {
            flag = 1;
            break;
          }
        }
        if (flag == 0) {
          queue.push(nextVertex);
          this.cmd(
            "SetState",
            "Take the vertex<" + nextVertex + ">Add to the queue"
          );
          this.cmd("Step");
          // existhintRegion final adding elements
          this.cmd(
            "CreateCircle",
            this.hintObjectIDStart + this.hintObjectIDCount,
            nextVertex,
            this.hintStartX +
              this.hintObjectIDArray.length *
                (this.hintInterval + 2 * this.radius),
            this.hintStartY,
            this.radius
          );
          // this.cmd("CreateCircle", this.hintObjectIDStart+this.hintObjectIDCount, nextVertex,
          // 		this.hintStartX + this.hintObjectIDCount * (this.hintInterval + 2*this.radius), this.hintStartY, this.radius);
          this.cmd(
            "SetForegroundColor",
            this.hintObjectIDStart + this.hintObjectIDCount,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.hintObjectIDStart + this.hintObjectIDCount,
            this.backgroundColor
          );
          this.hintObjectIDArray.push(
            this.hintObjectIDStart + this.hintObjectIDCount
          );
          this.hintObjectIDCount++;
        }
        // Add elements to the stack
      }
    }
    this.cmd("Delete", this.hintObjectIDArray.shift());
    for (var j = 0; j < this.hintObjectIDArray.length; j++) {
      this.cmd(
        "Move",
        this.hintObjectIDArray[j],
        this.hintStartX + j * (this.hintInterval + 2 * this.radius),
        this.hintStartY
      );
    }
    var visitSeqStr = "";
    for (var i = 0; i < visitSeq.length; i++) {
      if (i != 0) {
        visitSeqStr += ",";
      }
      visitSeqStr += visitSeq[i];
    }
    // this.cmd("SetState", "BFSTraversal order is "+visitSeqStr);
    // this.cmd("Step");
    // this.cmd("Step");
  }
  this.cmd("Delete", this.BFSParentCircleID);
  // this.cmd("Delete", this.hintLabelID);
  return visitSeq;
};
