import { promises as fs } from "fs";
import * as path from "path";
import { FsFile } from "../Fs";
import { LocalFsBase } from "./LocalFsBase";


export class LocalFsFile extends LocalFsBase implements FsFile {
    isFile: true = true;
    isDir: false = false;

    createdDate = async () => (await fs.stat(this.path)).ctime;
    modifiedDate = async () => (await fs.stat(this.path)).atime;
    get isPdf() {
        return path.extname(this.path) === '.pdf';
    }

    read = () => fs.readFile(this.path);
}
