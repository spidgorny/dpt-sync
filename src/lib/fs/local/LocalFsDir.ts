import { promises as fs } from 'fs';
import { LocalFsBase, LocalFsEntry, LocalFsFile } from ".";
import { FsDir } from '../Fs';

export class LocalFsDir extends LocalFsBase implements FsDir {
    isFile: false = false;
    isDir: true = true;

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

    async findDirectChildByName(name: string): Promise<LocalFsEntry | undefined> {
        for await (const child of this.children()) {
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
