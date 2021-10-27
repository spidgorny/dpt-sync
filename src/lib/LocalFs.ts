import { promises as fs } from "fs";
import * as path from "path";

export class LocalFile {
    constructor(private filename: string, private parentDir: LocalDir) {}
    
    read = () => fs.readFile(this.parentDir.path);
    
    get extension() {
        return path.extname(this.parentDir.path);
    }

    get isPdf() {
        return path.extname(this.filename) === 'pdf';
    }
}

export class LocalDir {
    constructor(public path: string) {}

    newChild(childPath: string) {
        return new LocalDir(path.join(this.path, childPath));
    }

    async *walk(): AsyncGenerator<LocalFile> {
        for await (const child of await fs.opendir(this.path)) {
            const fullPath = path.join(this.path, child.name);
            if (child.isDirectory()) yield* new LocalDir(fullPath).walk();
            else if (child.isFile()) yield new LocalFile(fullPath, this);
        }
    }

    children = () => fs.opendir(this.path);

    async *childrenObj() {
        for await (const child of await fs.opendir(this.path)) {
            if (child.isDirectory()) yield new LocalDir()
        }
    }
}
