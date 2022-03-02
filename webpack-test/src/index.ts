import {circleArea, a} from "./circle-area";
import circleLength from "./circle-area";
import {PI} from "./PI";

function log(radius: number) {
    console.log(`Area of circle with radius ${radius} is equal ${ circleArea(radius) }, while PI ~= ${ PI }`);
    console.log(`Length of circle with radius ${radius} is equal ${ circleLength(radius) }, while PI ~= ${ PI }`);
}

log(1);
log(5);
log(a);
