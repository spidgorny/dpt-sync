interface Fs {

}

interface FsEntry {
    name: string;
    basename: string; // parent name
    children(): AsyncGenerator<FsEntry>;
    isFile(): boolean;
    isDir(): boolean;
}

interface FsFile extends FsEntry {

}

interface FsDir extends FsEntry {
}
