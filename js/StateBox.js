// JavaScript Document
// Animation rectangle
var StateBox = function (objectID, state, width, height) {
  this.objectID = objectID; // ObjectiveID
  this.state = state; // Object of the object
  this.width = width; // width
  this.height = height; // high
  this.addToScene = true; // Do you join a canvas?
};

// Inheritance and constructor
StateBox.prototype = new AnimatedObject();
StateBox.prototype.constructor = StateBox;

// Setting status
StateBox.prototype.setState = function (state) {
  this.state = state;
};

// Drawing
StateBox.prototype.draw = function (ctx) {
  // Start drawing
  ctx.beginPath();
  // Set transparency
  ctx.globalAlpha = 1.0;
  // Background
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.width, this.y);
  ctx.lineTo(this.x + this.width, this.y + this.height);
  ctx.lineTo(this.x, this.y + this.height);
  ctx.fillStyle = this.backgroundColor;
  ctx.fill();
  // Write a text
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;
  ctx.fillText(this.state, this.x + 20, parseInt(this.y + this.height / 2));
};
