import { Dirent, promises as fs } from "fs";
import * as path from "path";
import { FsDir, FsEntry, FsFile } from './Fs';
import { RemoteFsEntry } from "./RemoteFs";

export abstract class LocalFsEntry implements FsEntry {
    constructor(
        public name: string,
        public dirname: string,
    ) {

    }

    get path() {
        return this.dirname + this.name;
    }

    abstract isFile(): boolean;
    abstract isDir(): boolean;
}

export class LocalFsDir extends LocalFsEntry implements FsDir {


    isFile = () => false;
    isDir = () => true;

    async *children(): AsyncGenerator<LocalFsEntry> {
        for await (const child of await fs.opendir(this.path)) {
            if (child.isDirectory()) {
                yield new LocalFsDir(child.name, this.path);
            }
            else if (child.isFile()) {
                yield new LocalFsFile(child.name, this.path);
            } 
        }
    }

    async findDirectChildByName(name: string) {
        for await (const child of await this.children()) {
            if (child.name === name) {
                return child;
            }
        }
    }

    async newFile(name: string, data: Buffer) {
        const file = new LocalFsFile(name, this.path);
        fs.writeFile(file.path, data);
        return file;
    }
}

export class LocalFsFile extends LocalFsEntry implements FsFile {
    createdDate = async () => (await fs.stat(this.path)).ctime;
    modifiedDate = async () => (await fs.stat(this.path)).atime;
    get isPdf() {
        return path.extname(this.path) === '.pdf';
    }

    read = () => fs.readFile(this.path);
    isFile = () => true;
    isDir = () => false;
}
