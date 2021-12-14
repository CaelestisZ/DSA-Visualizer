// JavaScript Document
/*
 **	init()function
 **	GraphEdge
 **	Graph
 */
// Initialization function
var currentGraph;
var directedGraphCurve = 0.25;
var undirectedGraphCurve = 0.0;
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentGraph = new Graph(animationManager, drawing.width, drawing.height);
  currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), 5);

  //alert(currentGraph);
  //currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 4, 2]) ;
  //currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 4, 2]) ;
  //currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 3, 2]) ;
  //currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 4, 2]) ;
  //currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), 3) ;

  //randomGraphButton.onclick = currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), 3) ;

  //currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [0, 4]) ;
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
  this.directed = false; // Whether there is a direction
  // Graphics part
  this.objectID = 0; // Sequence number of graphics
  this.radius = 26; // Vertence round radius
  // Determination of vertex position
  this.R = 150; // All vertices are distributed on the circle
  this.X0 = 250; // Distributed round coordinate
  this.Y0 = 250; // Distributed round sleel

  this.foregroundColor = "#1E90FF"; // Foreground
  this.backgroundColor = "#B0E0E6"; // Background color
  // Add algorithm control button
  this.addControls();
};

// Add a side call function
addEdgeCallBack = function () {
  var startVertex = parseInt(startVertexText.value);
  var endVertex = parseInt(endVertexText.value);
  //alert(startVertex+","+endVertex);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    startVertex,
    endVertex,
    1,
  ]);
};
// Delete edge call functions
delEdgeCallBack = function () {
  var startVertex = parseInt(startVertexText.value);
  var endVertex = parseInt(endVertexText.value);
  currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [
    startVertex,
    endVertex,
  ]);
};
// DFSTraverse call function
runDFSCallBack = function () {
  //alert("runDFSCallBack");
  var startVertex = parseInt(DFSStartVertexText.value);
  //alert(startVertex);
  startVertex = startVertex == "" ? 0 : startVertex;
  startVertex = isNaN(startVertex) ? 0 : startVertex;
  //alert(startVertex);
  currentGraph.implementAction(
    currentGraph.DFSTraverse.bind(currentGraph),
    startVertex
  );
};
// Generate random map call function
randomGraphCallBack = function () {
  //alert("randomGraphCallBack");
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
showEdgeWeightSwitch = function () {
  //alert(currentGraph.matrix);
  currentGraph.implementAction(
    currentGraph.showEdgeWeight.bind(currentGraph),
    showEdgeWeight.checked
  );
};
// Dynamic map and conversion of no picture
directedGraphSwitch = function () {
  // Clear all the edges first
  currentGraph.implementAction(
    currentGraph.clearAllEdges.bind(currentGraph),
    0
  );
  //
  if (directedGraph.checked) {
    currentGraph.directed = true;
  } else {
    currentGraph.directed = false;
  }
  // Get random maps
  currentGraph.implementAction(
    currentGraph.getRandomGraph.bind(currentGraph),
    0
  );
};

var randomGraphButton;
var startVertexText;
var endVertexText;
var addEdgeButton;
var delEdgeButton;
var DFSTraverseButton;
var DFSStartVertexText;
var showEdgeWeight;
var directedGraph;
var undirectedGraph;

// Add control button
Graph.prototype.addControls = function () {
  //this.randomGraphButton = addInputToAlgorithmBar("button", "Generate random maps");
  //this.randomGraphButton.onclick = this.getRandomGraph.bind(this);
  randomGraphButton = addInputToAlgorithmBar("button", "Generate random maps");
  //randomGraphButton.onclick = this.getRandomGraph.bind(this);
  //randomGraphButton.onclick = this.implementAction(this.DFSTraverse.bind(this), 0);
  randomGraphButton.onclick = randomGraphCallBack;
  addLabelToAlgorithmBar("starting point");
  startVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("end");
  endVertexText = addInputToAlgorithmBar("text", "");
  //addLabelToAlgorithmBar("Weights");
  //addInputToAlgorithmBar("text", "");
  addEdgeButton = addInputToAlgorithmBar("button", "Add edge");
  addEdgeButton.onclick = addEdgeCallBack;
  delEdgeButton = addInputToAlgorithmBar("button", "Delete");
  delEdgeButton.onclick = delEdgeCallBack;

  addLabelToAlgorithmBar("DFSStarting top");
  DFSStartVertexText = addInputToAlgorithmBar("text", "0");

  DFSTraverseButton = addInputToAlgorithmBar("button", "Run DFS");
  DFSTraverseButton.onclick = runDFSCallBack;

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
Graph.prototype.showEdgeWeight = function (show) {
  //alert("show Edge weight");
  var graphType = undirectedGraph.checked;
  var upperBound;
  for (var i = 0; i < this.vertexNum; i++) {
    upperBound = graphType ? i : this.vertexNum;
    for (var j = 0; j < upperBound; j++) {
      if (this.matrix[i][j]) {
        this.cmd("Disconnect", i, j);
      }
    }
  }
  for (var i = 0; i < this.vertexNum; i++) {
    upperBound = graphType ? i : this.vertexNum;
    for (var j = 0; j < upperBound; j++) {
      if (this.matrix[i][j]) {
        var curve = directedGraph.checked
          ? directedGraphCurve
          : undirectedGraphCurve;
        if (show) {
          this.cmd(
            "Connect",
            i,
            j,
            this.foregroundColor,
            curve,
            this.directed,
            this.matrix[i][j]
          );
        } else {
          this.cmd("Connect", i, j, this.foregroundColor, curve, this.directed);
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
          this.cmd("Disconnect", i, j);
          this.matrix[i][j] = 0;
          this.matrix[j][i] = 0;
        }
      }
    }
  }
  this.edgeNum = 0;
  return this.commands;
};

// Generate a random map
Graph.prototype.getRandomGraph = function () {
  //alert("getRandomGraph");
  //alert(this.matrix);
  // Generated no map
  if (undirectedGraph.checked) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        this.matrix[i][j] = getRandomNumber(0, 1);
        this.matrix[j][i] = this.matrix[i][j];
        this.edgeNum++;
        if (this.matrix[i][j]) {
          if (showEdgeWeight.checked) {
            this.cmd(
              "Connect",
              i,
              j,
              this.foregroundColor,
              undirectedGraphCurve,
              false,
              this.matrix[i][j]
            );
          } else {
            this.cmd(
              "Connect",
              i,
              j,
              this.foregroundColor,
              undirectedGraphCurve,
              false
            );
          }
        }
      }
    }
  }
  // Generation map
  else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (i != j) {
          this.matrix[i][j] = getRandomNumber(0, 1);
          this.edgeNum++;
          if (this.matrix[i][j]) {
            if (showEdgeWeight.checked) {
              this.cmd(
                "Connect",
                i,
                j,
                this.foregroundColor,
                directedGraphCurve,
                true,
                this.matrix[i][j]
              );
              /*
							this.cmd("SetLineHighlight", i, j, true) ;
							this.cmd("Step") ;
							this.cmd("SetLineHighlight", i, j, false) ;
							this.cmd("Step") ;
							*/
            } else {
              this.cmd(
                "Connect",
                i,
                j,
                this.foregroundColor,
                directedGraphCurve,
                true
              );
            }
            //alert("connect "+i+" to "+j +"curve:"+curve);
          }
        }
      }
    }
  }
  //alert(this.matrix);
  return this.commands;
};

// Add edge
Graph.prototype.addEdge = function () {
  // Introducing parameters, starting point, end point, weight
  startVertex = parseInt(arguments[0][0]);
  endVertex = parseInt(arguments[0][1]);
  weight = parseInt(arguments[0][2]);
  // The legality judgment of incoming parameters
  if (startVertex < 0 && startVertex >= this.vertexNum) {
    alert("start Vertex illegal");
    return this.commands;
  }
  if (endVertex < 0 && endVertex >= this.vertexNum) {
    alert("end Vertex illegal");
    return this.commands;
  }
  if (weight <= 0) {
    alert("weight illegal");
    return this.commands;
  }
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

  this.cmd("SetHighlight", startVertex, true);
  this.cmd("SetHighlight", endVertex, true);
  this.cmd("Step");
  this.cmd("SetHighlight", startVertex, false);
  this.cmd("SetHighlight", endVertex, false);
  this.cmd("Step");
  //this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

  // Map
  if (this.directed) {
    this.cmd(
      "Connect",
      startVertex,
      endVertex,
      this.foregroundColor,
      directedGraphCurve,
      this.directed,
      weight
    );
    this.matrix[startVertex][endVertex] = weight;
  }
  // Undirected graph
  else {
    this.cmd(
      "Connect",
      startVertex,
      endVertex,
      this.foregroundColor,
      undirectedGraphCurve,
      this.directed,
      weight
    );
    this.matrix[startVertex][endVertex] = weight;
    this.matrix[endVertex][startVertex] = weight;
  }
  return this.commands;
};

// Delete
Graph.prototype.delEdge = function () {
  // Parameters, to delete the edge
  startVertex = arguments[0][0];
  endVertex = arguments[0][1];
  // The legality judgment of incoming parameters
  if (startVertex < 0 && startVertex >= this.vertexNum) {
    alert("start Vertex illegal");
    return this.commands;
  }
  if (endVertex < 0 && endVertex >= this.vertexNum) {
    alert("end Vertex illegal");
    return this.commands;
  }
  {
    this.cmd("SetHighlight", startVertex, true);
    this.cmd("SetHighlight", endVertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", startVertex, false);
    this.cmd("SetHighlight", endVertex, false);
    this.cmd("Step");
    this.cmd("Disconnect", startVertex, endVertex);
  }
  // Map
  if (this.directed) {
    this.matrix[startVertex][endVertex] = 0;
  } else {
    this.matrix[startVertex][endVertex] = 0;
    this.matrix[endVertex][startVertex] = 0;
  }
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
  return null; // NonextEdge
};

// DFS
Graph.prototype.DFSTraverse = function (startVertex) {
  //alert("start DFSTraverse()");
  this.visited = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.visited[i] = false;
  }
  if (!this.visited[startVertex]) {
    this.DFS(startVertex);
  }
  return this.commands;
};

Graph.prototype.DFS = function (vertex) {
  this.visited[vertex] = true;
  {
    //alert("visit "+ vertex);
    this.cmd("SetHighlight", vertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", vertex, false);
    this.cmd("Step");
    //this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);
  }
  for (var edge = this.firstEdge(vertex); ; edge = this.nextEdge(edge)) {
    if (edge == null) {
      // edge Not, quit
      return null;
    }
    if (!this.visited[edge.endVertex]) {
      /*			{
				this.cmd("Disconnect", edge.startVertex, edge.endVertex);
				this.cmd("Connect", edge.startVertex, edge.endVertex, this.foregroundColor, 0.0, false, "1");
				this.cmd("Step");
			}
*/ this.DFS(edge.endVertex);
    }
  }
};
