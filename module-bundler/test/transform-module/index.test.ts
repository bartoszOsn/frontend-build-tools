import { importsSuite } from "./importsSuite";
import { MockedFunction } from "ts-jest/dist/utils/testing";

jest.mock('../../src/path-utils');
import { resolvePath, hashPath } from "../../src/path-utils";
import { exportsSuite } from "./exportsSuite";

(resolvePath as MockedFunction<any>).mockImplementation(val => val);
(hashPath as MockedFunction<any>).mockImplementation(val => val);

describe('transform-module', function () {
	describe('imports', importsSuite);
	describe('exports', exportsSuite);
});
