export interface FsBase {
    name: string;
    dirname: string; // parent name
    isFile: boolean;
    isDir: boolean;
}

export interface FsFile extends FsBase {
    isFile: true;
    isDir: false;
    read(): Promise<Buffer>;
    createdDate(): Promise<Date>;
    modifiedDate(): Promise<Date>;
    isPdf: boolean;
}

export interface FsDir extends FsBase {
    isFile: false;
    isDir: true;
    newFile(name: string, data: Buffer): Promise<FsFile>;
    children(): AsyncGenerator<FsEntry>;
    findDirectChildByName(name: string): Promise<FsEntry | undefined>;
}

export type FsEntry = FsFile | FsDir;
