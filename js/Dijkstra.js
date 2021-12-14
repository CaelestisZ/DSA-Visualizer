
// Initialization function
var currentGraph;
/* chenged */
// Dynamic view of the map change
var directedGraphCurveWithSingleEdge = 0.0; // There is only one side between the two vertices, Draw a straight line at this time
var directedGraphCurveWithDoubleEdge = 0.15; // There are two edges between the two vertices. This time the curve is
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6;
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentGraph = new Graph(animationManager, drawing.width, drawing.height);
  currentGraph.implementAction(
    currentGraph.initGraph.bind(currentGraph),
    initialVertexNum
  );

  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    5,
    100,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    4,
    30,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    2,
    10,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    1,
    12,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    1,
    2,
    5,
    false,
  ]);

  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    2,
    3,
    50,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    4,
    3,
    20,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    3,
    5,
    10,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    4,
    5,
    60,
    false,
  ]);
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
  // Logical partID
  //this.head = -1 ; // Head pointer
  this.directed = true; // Whether there is a direction
  this.showEdgeWeight = true; // Whether it shows edge weights
  // Set interface
  $(".radio1").attr("checked", "checked");
  $(".runDijNumber").val("0");
  $(".weightDijNumber").val("10");
  // $("#displayWeight").attr("checked", "checked");

  // Graphics part
  this.objectID = 0; // Sequence number of graphics

  this.highlightRectangleKnownID; // Known Highlight rectangle
  this.highlightRectangleCostID; // cost Highlight rectangle
  this.highlightRectanglePathID; // path Highlight rectangle

  this.hintVertexID; // vertex
  this.hintKnownID; // Known
  this.hintCostID; // Cost
  this.hintPathID; // Path

  this.hintVertexColumnID; // vertexList
  this.hintKnownColumnID; // KnownList
  this.hintCostColumnID; // CostList
  this.hintPathColumnID; // PathList

  this.radius = 26; // Vertence round radius
  // Determination of vertex position
  this.R = 150; // All vertices are distributed on the circle
  this.X0 = 250; // Distributed round coordinate
  this.Y0 = 250; // Distributed round sleel

  this.hintStartX = 600;
  this.hintStartY = 150;
  this.hintObjectWidth = 60;
  this.hintObjectHeight = 30;

  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  this.highlightColor = "#FF0000"; // High-brightness
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
// Dijkstracall function
runDijkstraCallBack = function (startVertex) {
  startVertex = startVertex == null || isNaN(startVertex) ? 0 : startVertex;
  currentGraph.implementAction(
    currentGraph.clearHintArea.bind(currentGraph),
    0
  );
  currentGraph.implementAction(
    currentGraph.Dijkstra.bind(currentGraph),
    startVertex
  );
};
// Generate random map call function
randomGraphCallBack = function () {
  currentGraph.implementAction(
    currentGraph.clearAllEdges.bind(currentGraph),
    0
  );
  currentGraph.implementAction(
    currentGraph.getRandomGraph.bind(currentGraph),
    0
  );
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
    alert("The number of values of the vertex should be 3-10 !");
  }
};

// var vertexNumSelect;

// var randomGraphButton;
// var startVertexText;
// var endVertexText;
// var edgeWeightText;
// var addEdgeButton;
// var delEdgeButton;

// var DijkstraStartVertexText;
// var runDijkstraButton;

// var showEdgeWeight;
// var directedGraph;
// var undirectedGraph;

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

  addLabelToAlgorithmBar("DijkstraStarting top");
  DijkstraStartVertexText = addInputToAlgorithmBar("text", "0");

  runDijkstraButton = addInputToAlgorithmBar("button", "Run Dijkstra");
  runDijkstraButton.onclick = runDijkstraCallBack;

  showEdgeWeight = addCheckboxToAlgorithmBar("Show edge weight");
  showEdgeWeight.onclick = showEdgeWeightSwitch;
  showEdgeWeight.checked = true;
  showEdgeWeight.disabled = true;

  var directedGraphList = addRadioButtonGroupToAlgorithmBar(
    ["directed Graph", "undirected Graph"],
    "GraphType"
  );
  directedGraph = directedGraphList[0];
  undirectedGraph = directedGraphList[1];
  directedGraph.onclick = directedGraphSwitch;
  undirectedGraph.onclick = directedGraphSwitch;
  directedGraph.checked = true;
};

// Initialization array
Graph.prototype.initGraph = function (vertexNum) {
  this.vertexNum = vertexNum; // Number of vertices
  this.edgeNum = 0; // Side of the side
  // Some graphicsIDInitialize
  // this.highlightRectangleKnownID; // Known Highlight rectangle
  // this.highlightRectangleCostID = vecostte Num;
  // this.highlightRectanglePathID = vertpathN um+1;
  this.hintVertexID = vertexNum;
  this.hintKnownID = vertexNum + 1;
  this.hintCostID = vertexNum + 2;
  this.hintPathID = vertexNum + 3;
  this.hintVertexColumnID = new Array(this.vertexNum);
  this.hintKnownColumnID = new Array(this.vertexNum);
  this.hintCostColumnID = new Array(this.vertexNum);
  this.hintPathColumnID = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.hintVertexColumnID[i] = vertexNum + 4 + 4 * i;
    this.hintKnownColumnID[i] = vertexNum + 4 + 4 * i + 1;
    this.hintCostColumnID[i] = vertexNum + 4 + 4 * i + 2;
    this.hintPathColumnID[i] = vertexNum + 4 + 4 * i + 3;
  }
  this.highlightRectangleKnownID = 5 * vertexNum + 5;
  this.highlightRectangleCostID = 5 * vertexNum + 6;
  this.highlightRectanglePathID = 5 * vertexNum + 7;

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
// Clearhintarea
Graph.prototype.clearHintArea = function () {
  if (typeof this.INF == "undefined") {
    // do nothing
    return this.commands;
  }
  // Already definedthis.INFDescription has been runDijkstraalgorithm
  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd("Delete", this.hintPathColumnID[i]);
    this.cmd("Delete", this.hintCostColumnID[i]);
    this.cmd("Delete", this.hintKnownColumnID[i]);
    this.cmd("Delete", this.hintVertexColumnID[i]);
  }
  this.cmd("Delete", this.hintPathID);
  this.cmd("Delete", this.hintCostID);
  this.cmd("Delete", this.hintKnownID);
  this.cmd("Delete", this.hintVertexID);
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
          // due toconnectTime is small to big, sodisconnectWhen you want to be small
          this.cmd("Disconnect", j, i);
          //alert("disconnected"+" "+j +" "+i);
          this.matrix[i][j] = 0;
          this.matrix[j][i] = 0;
        }
      }
    }
  }
  this.edgeNum = 0;
  return this.commands;
};

/* changed */
// Generate a random map
Graph.prototype.getRandomGraph = function () {
  // Generated no map
  if (!this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (getRandomNumber(0, 1)) {
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
          if (getRandomNumber(0, 1)) {
            //alert(i+ " " +j +" "+ rand);
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
  var withAnimation = arguments[0][3]; // bool
  // The legality judgment of incoming parameters
  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex illegal");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex illegal");
    return this.commands;
  }
  if (weight <= 0) {
    alert("weight illegal");
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

  // Map
  if (this.directed) {
    this.matrix[startVertex][endVertex] = weight;
    //var label1 = (startVertexText.checked) ? this.matrix[startVertex][endVertex] : "";
    //var label2 = (startVertexText.checked) ? this.matrix[endVertex][startVertex] : "";
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
        this.matrix[startVertex][endVertex]
      );
      this.cmd(
        "Connect",
        endVertex,
        startVertex,
        this.foregroundColor,
        directedGraphCurveWithDoubleEdge,
        this.directed,
        this.matrix[endVertex][startVertex]
      );
    } else {
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        directedGraphCurveWithSingleEdge,
        this.directed,
        this.matrix[startVertex][endVertex]
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
      weight
    );
  }
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
    alert("start Vertex illegal.");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex illegal.");
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
  // Map
  if (this.directed) {
    this.cmd("Disconnect", startVertex, endVertex);
    this.matrix[startVertex][endVertex] = 0;
    if (this.matrix[endVertex][startVertex]) {
      var label = showEdgeWeight.checked
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
// Enter a side, output the next side of the same starting point
Graph.prototype.nextEdge = function (edge) {
  for (var i = edge.endVertex + 1; i < this.vertexNum; i++) {
    if (this.matrix[edge.startVertex][i]) {
      edge.endVertex = i;
      edge.weight = this.matrix[edge.startVertex][i];
      return edge;
    }
  }
  return null; // NonextEdge
};

// Dijkstraalgorithm
Graph.prototype.Dijkstra = function (startVertex) {
  // Cancel the high bright top
  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd("SetForegroundColor", i, this.foregroundColor);
  }
  // Assume that it is a direction
  this.INF = 10000;
  // Source pointiShortest distance
  var dist = new Array(this.vertexNum);
  // Have you found it?i Shortest path
  var found = new Array(this.vertexNum);
  // Record path
  var path = new Array(this.vertexNum);
  // Record full path
  var fullPath = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    fullPath[i] = new Array();
  }
  // Some initialization
  for (var i = 0; i < this.vertexNum; i++) {
    if (this.matrix[startVertex][i]) {
      dist[i] = this.matrix[startVertex][i];
    } else {
      dist[i] = this.INF;
    }
    found[i] = -1; // -1Did not find
    path[i] = startVertex; // viastartVertexarrive
  }
  dist[startVertex] = 0;
  found[startVertex] = 1;
  this.cmd("SetForegroundColor", startVertex, this.highlightColor);
  fullPath[startVertex].push(startVertex);
  //path[startVertex] = startVertex;
  // hintShow current content
  // vertex
  this.cmd(
    "CreateRectangle",
    this.hintVertexID,
    "Vertex",
    this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX,
    this.hintStartY - this.hintObjectHeight
  );
  this.cmd("SetForegroundColor", this.hintVertexID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintVertexID, this.backgroundColor);
  // Known
  this.cmd(
    "CreateRectangle",
    this.hintKnownID,
    "Known",
    this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX + this.hintObjectWidth,
    this.hintStartY - this.hintObjectHeight
  );
  this.cmd("SetForegroundColor", this.hintKnownID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintKnownID, this.backgroundColor);
  // Cost
  this.cmd(
    "CreateRectangle",
    this.hintCostID,
    "Cost",
    this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX + 2 * this.hintObjectWidth,
    this.hintStartY - this.hintObjectHeight
  );
  this.cmd("SetForegroundColor", this.hintCostID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintCostID, this.backgroundColor);
  // Path
  this.cmd(
    "CreateRectangle",
    this.hintPathID,
    "Path",
    2 * this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX + 3 * this.hintObjectWidth,
    this.hintStartY - this.hintObjectHeight
  );
  this.cmd("SetForegroundColor", this.hintPathID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintPathID, this.backgroundColor);
  // vertex
  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd(
      "CreateRectangle",
      this.hintVertexColumnID[i],
      i,
      this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX,
      this.hintStartY + i * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.hintVertexColumnID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.hintVertexColumnID[i],
      this.backgroundColor
    );
  }
  // known
  for (var i = 0; i < this.vertexNum; i++) {
    var label = found[i] == 1 ? "True" : "False";
    this.cmd(
      "CreateRectangle",
      this.hintKnownColumnID[i],
      label,
      this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + this.hintObjectWidth,
      this.hintStartY + i * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.hintKnownColumnID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.hintKnownColumnID[i],
      this.backgroundColor
    );
  }
  // cost
  for (var i = 0; i < this.vertexNum; i++) {
    var label = dist[i] == this.INF ? "INF" : dist[i];
    this.cmd(
      "CreateRectangle",
      this.hintCostColumnID[i],
      label,
      this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + 2 * this.hintObjectWidth,
      this.hintStartY + i * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.hintCostColumnID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.hintCostColumnID[i],
      this.backgroundColor
    );
  }
  // Path
  for (var i = 0; i < this.vertexNum; i++) {
    var label = "";
    this.cmd(
      "CreateRectangle",
      this.hintPathColumnID[i],
      label,
      2 * this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + 3 * this.hintObjectWidth,
      this.hintStartY + i * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.hintPathColumnID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.hintPathColumnID[i],
      this.backgroundColor
    );
  }

  this.cmd(
    "SetState",
    "Top of the starting point " + startVertex + " Set to your own expense0"
  );
  this.cmd("SetHighlight", startVertex, true);
  this.cmd("Step");
  this.cmd("SetHighlight", startVertex, false);
  this.cmd("Step");

  // Add a path to the starting point
  this.cmd(
    "CreateHighlightRectangle",
    this.highlightRectangleKnownID,
    this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX + this.hintObjectWidth,
    this.hintStartY + startVertex * this.hintObjectHeight
  );
  this.cmd(
    "SetForegroundColor",
    this.highlightRectangleKnownID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.highlightRectangleKnownID,
    this.backgroundColor
  );
  this.cmd("Step");
  this.cmd(
    "CreateHighlightRectangle",
    this.highlightRectanglePathID,
    2 * this.hintObjectWidth,
    this.hintObjectHeight,
    "left",
    "top",
    this.hintStartX + 3 * this.hintObjectWidth,
    this.hintStartY + startVertex * this.hintObjectHeight
  );
  this.cmd(
    "SetForegroundColor",
    this.highlightRectanglePathID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.highlightRectanglePathID,
    this.backgroundColor
  );
  this.cmd("Step");
  this.cmd(
    "SetLabel",
    this.hintPathColumnID[startVertex],
    fullPath[startVertex][0]
  );
  this.cmd("Step");
  this.cmd("Delete", this.highlightRectanglePathID);
  this.cmd("Delete", this.highlightRectangleKnownID);

  for (var i = 1; i < this.vertexNum; i++) {
    var min = this.INF;
    var vertex = -1;
    for (var j = 0; j < dist.length; j++) {
      if (found[j] == -1 && dist[j] < min) {
        min = dist[j];
        vertex = j;
      }
    }
    // Can't find a valid and minimal side
    if (vertex == -1) {
      // Middle finger
      break;
    }
    // Found a suitable side
    found[vertex] = 1;
    this.cmd(
      "SetState",
      "Find to the vertices " + vertex + " Shortest path,Cost " + min
    );
    // Depend onpathEstablish a complete path
    fullPath[vertex].push(vertex);
    for (var i = fullPath[path[vertex]].length - 1; i >= 0; i--) {
      fullPath[vertex].unshift(fullPath[path[vertex]][i]);
    }
    // Highlight smallestcost
    this.cmd(
      "CreateHighlightRectangle",
      this.highlightRectangleCostID,
      this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + 2 * this.hintObjectWidth,
      this.hintStartY + vertex * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.highlightRectangleCostID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.highlightRectangleCostID,
      this.backgroundColor
    );
    this.cmd("Step");
    this.cmd("SetForegroundColor", vertex, this.highlightColor);
    // willvertexofKnownRevise
    this.cmd(
      "CreateHighlightRectangle",
      this.highlightRectangleKnownID,
      this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + this.hintObjectWidth,
      this.hintStartY + vertex * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.highlightRectangleKnownID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.highlightRectangleKnownID,
      this.backgroundColor
    );
    this.cmd("SetLabel", this.hintKnownColumnID[vertex], "True");
    // this.cmd("SetForegroundColor", this.hintKnownColumnID[vertex], this.highlightColor);
    this.cmd("Step");
    // HighlightPathAnd update
    this.cmd(
      "CreateHighlightRectangle",
      this.highlightRectanglePathID,
      2 * this.hintObjectWidth,
      this.hintObjectHeight,
      "left",
      "top",
      this.hintStartX + 3 * this.hintObjectWidth,
      this.hintStartY + vertex * this.hintObjectHeight
    );
    this.cmd(
      "SetForegroundColor",
      this.highlightRectanglePathID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.highlightRectanglePathID,
      this.backgroundColor
    );
    this.cmd("Step");
    var labelPath = "";
    for (var i = 0; i < fullPath[vertex].length; i++) {
      labelPath = labelPath + fullPath[vertex][i] + " ";
    }
    this.cmd("SetLabel", this.hintPathColumnID[vertex], labelPath);
    this.cmd("Step");
    // Delete two high debut
    // this.cmd("Delete", this.highlightRectangleKnownID);
    this.cmd("Delete", this.highlightRectangleCostID);
    this.cmd("Delete", this.highlightRectanglePathID);
    this.cmd("Step");

    this.cmd("SetHighlight", vertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", vertex, false);
    this.cmd("Step");
    for (
      var edge = this.firstEdge(vertex);
      edge != null;
      edge = this.nextEdge(edge)
    ) {
      this.cmd("SetHighlight", edge.startVertex, true);
      this.cmd("Step");
      this.cmd("SetHighlight", edge.startVertex, false);
      this.cmd("Step");
      var lineSt = edge.startVertex;
      var lineEn = edge.endVertex;
      if (!this.directed && lineSt > lineEn) {
        var tmp = lineEn;
        lineEn = lineSt;
        lineSt = tmp;
      }
      this.cmd("SetLineHighlight", lineSt, lineEn, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", lineSt, lineEn, false);
      this.cmd("Step");
      if (
        found[edge.endVertex] == -1 &&
        dist[vertex] + edge.weight < dist[edge.endVertex]
      ) {
        this.cmd(
          "SetState",
          "Update from the vertex" +
            startVertex +
            " arrive " +
            edge.endVertex +
            " The shortest path is" +
            startVertex +
            ".->" +
            vertex +
            "->" +
            edge.endVertex
        );
        this.cmd("Step");
        dist[edge.endVertex] = dist[vertex] + edge.weight;
        // Highlightdistrenew
        // this.cmd("CreateHighlightRectangle", this.highlightRectangleCostID,
        // 		this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
        // 		this.hintStartX + 2* this.hintObjectWidth, this.hintStartY + edge.endVertex * this.hintObjectHeight);
        // this.cmd("SetForegroundColor", this.highlightRectangleCostID, this.foregroundColor);
        // this.cmd("SetBackgroundColor", this.highlightRectangleCostID, this.backgroundColor);
        // this.cmd("Step");
        // this.cmd("SetLabel", this.hintCostColumnID[edge.endVertex], dist[edge.endVertex]);
        // this.cmd("Step");
        // this.cmd("Delete", this.highlightRectangleCostID);

        path[edge.endVertex] = vertex;
      } else {
        this.cmd(
          "SetState",
          "vertex" +
            startVertex +
            " arrive " +
            edge.endVertex +
            " The path is not updated"
        );
        this.cmd("Step");
      }
      // After finding the vertices of a shortest path, updatecost
      this.cmd(
        "CreateHighlightRectangle",
        this.highlightRectangleCostID,
        this.hintObjectWidth,
        this.hintObjectHeight,
        "left",
        "top",
        this.hintStartX + 2 * this.hintObjectWidth,
        this.hintStartY + edge.endVertex * this.hintObjectHeight
      );
      this.cmd(
        "SetForegroundColor",
        this.highlightRectangleCostID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.highlightRectangleCostID,
        this.backgroundColor
      );
      this.cmd("Step");
      this.cmd(
        "SetLabel",
        this.hintCostColumnID[edge.endVertex],
        dist[edge.endVertex]
      );
      this.cmd("Step");
      this.cmd("Delete", this.highlightRectangleCostID);
    }
    // Update completed, deleteknown high light circle ID
    this.cmd("Delete", this.highlightRectangleKnownID);
    this.cmd("Step");
  }

  // Processing the remaining vertices of the path, the path is set toNO PATH
  for (var i = 0; i < this.vertexNum; i++) {
    if (found[i] == -1 && dist[i] == this.INF) {
      // hintRegionally highlight this vertex, then modify the pathlabel
      this.cmd(
        "SetState",
        "Did not find it " +
          startVertex +
          " arrive " +
          i +
          " Path, its path is setNO PATH"
      );
      this.cmd("Step");
      this.cmd(
        "CreateHighlightRectangle",
        this.highlightRectangleKnownID,
        this.hintObjectWidth,
        this.hintObjectHeight,
        "left",
        "top",
        this.hintStartX + this.hintObjectWidth,
        this.hintStartY + i * this.hintObjectHeight
      );
      this.cmd(
        "SetForegroundColor",
        this.highlightRectangleKnownID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.highlightRectangleKnownID,
        this.backgroundColor
      );
      this.cmd(
        "CreateHighlightRectangle",
        this.highlightRectangleCostID,
        this.hintObjectWidth,
        this.hintObjectHeight,
        "left",
        "top",
        this.hintStartX + 2 * this.hintObjectWidth,
        this.hintStartY + i * this.hintObjectHeight
      );
      this.cmd(
        "SetForegroundColor",
        this.highlightRectangleCostID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.highlightRectangleCostID,
        this.backgroundColor
      );
      this.cmd(
        "CreateHighlightRectangle",
        this.highlightRectanglePathID,
        2 * this.hintObjectWidth,
        this.hintObjectHeight,
        "left",
        "top",
        this.hintStartX + 3 * this.hintObjectWidth,
        this.hintObjectHeight + i * this.hintObjectHeight
      );
      this.cmd(
        "SetForegroundColor",
        this.highlightRectanglePathID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.highlightRectanglePathID,
        this.backgroundColor
      );
      this.cmd("Step");
      this.cmd("SetLabel", this.hintPathColumnID[i], "NO PATH");
      this.cmd("Setp");
      this.cmd("Delete", this.highlightRectanglePathID);
      this.cmd("Delete", this.highlightRectangleCostID);
      this.cmd("Delete", this.highlightRectangleKnownID);
      this.cmd("Step");
    }
  }
  this.cmd(
    "SetState",
    "The algorithm is executed, and the results are shown below"
  );
  return this.commands;
};
