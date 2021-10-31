export interface FsEntry {
    name: string;
    dirname: string; // parent name
    isFile(): boolean;
    isDir(): boolean;
    // type: FsFile | FsDir;
}

export interface FsFile extends FsEntry {
    // isFile(): true;
    // isDir(): false;
    read(): Promise<Buffer>;
    createdDate(): Promise<Date>;
    modifiedDate(): Promise<Date>;
    isPdf: boolean;
}

export interface FsDir extends FsEntry {
    // isFile(): false;
    // isDir(): true;
    newFile(name: string, data: Buffer): Promise<FsFile>;
    children(): AsyncGenerator<FsEntry>;
    findDirectChildByName(name: string): Promise<FsEntry | undefined>;
}
