export interface Module {
    hash: string;
    content: string;
    requireFunction: string;
    moduleName: string;
    exportsName: string;
    moduleExportsName: string;
    importPaths: string[];
}
