import { FsBase, FsDir, FsFile } from "../Fs";

export abstract class RemoteFsBase implements FsBase {
  abstract isFile: boolean;
  abstract isDir: boolean;

  constructor(
    protected id: string,
    public name: string,
    public dirname: string,
  ) { }
}
