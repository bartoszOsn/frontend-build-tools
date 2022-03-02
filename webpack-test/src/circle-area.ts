import {PI} from "./PI";

export function circleArea(radius: number): number {
    return radius * radius * PI;
}

export default function circleLength(radius: number): number {
    return 2 * PI * radius;
}

export let a: number;

a = 2;
for(let i = 0; i < 10; i++){
    a = a * 2;
}

