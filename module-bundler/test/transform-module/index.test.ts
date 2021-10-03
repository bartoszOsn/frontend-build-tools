import { imports } from "./imports";
import { MockedFunction } from "ts-jest/dist/utils/testing";

jest.mock('../../src/path-utils');
import { resolvePath, hashPath } from "../../src/path-utils";

(resolvePath as MockedFunction<any>).mockImplementation(val => val);
(hashPath as MockedFunction<any>).mockImplementation(val => val);

describe('transform-module', function () {
	describe('imports', imports);
});
