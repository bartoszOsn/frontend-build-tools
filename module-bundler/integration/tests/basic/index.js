import {numberA, getNumberB} from "./b";

const numberB = getNumberB();

global.expect(numberA).toBe(5);
global.expect(numberB).toBe(3.14);
