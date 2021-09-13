/*
// ========================== ORIGINAL ===========================
import { PI } from './PI';

export function squareRadius(radius) {
    return radius * radius;
}

export default function area(radius) {
    return squareRadius(radius) * PI;
}

// ======================== TRANSFORMED TO ========================

const { PI } = require_SOMEHASH('PI_HASH');

module_SOMEHASH.exports.squareRadius = function squareRadius(radius) {
    return radius * radius;
}

module_SOMEHASH.exports.default = function area(radius) {
    return squareRadius(radius) * PI;
}
*/
