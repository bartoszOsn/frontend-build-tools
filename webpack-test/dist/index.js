"use strict";
exports.__esModule = true;
var circle_area_1 = require("./circle-area");
var PI_1 = require("./PI");
function log(radius) {
    console.log("Area of circle with radius " + radius + " is equal " + circle_area_1.circleArea(radius) + ", while PI ~= " + PI_1.PI);
}
log(1);
log(5);
