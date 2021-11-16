import { FsBase } from "../Fs";

export abstract class LocalFsBase implements FsBase {
    abstract isFile: boolean;
    abstract isDir: boolean;

    constructor(
        public name: string,
        public dirname: string,
    ) {

    }

    get path() {
        return this.dirname + this.name;
    }
}
