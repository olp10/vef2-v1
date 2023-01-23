import { parse } from "./parser.js";
import { readFile, readFilesFromDir } from "./file.js";

const DATA_DIR = './data/'

const dataFiles = await readFilesFromDir(DATA_DIR);
console.log(dataFiles);


const x = parse(dataFiles)

console.log(x);
