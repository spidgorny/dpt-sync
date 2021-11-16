import axios from "axios";
import path = require("path/posix");
import { FsFile } from "../Fs";
import { RemoteFsBase } from "./RemoteFsBase";


export class RemoteFsFile extends RemoteFsBase implements FsFile {
  isFile: true = true;
  isDir: false = false;
  
  constructor(
  ) {
    super('asd', 'asd', 'asd');
  }

  createdDate(): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  modifiedDate(): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  isPdf: boolean;

  async delete() {
    axios.delete(`/documents/${this.id}`);
  }

  read(): Promise<Buffer> {
    // do some networking
    throw new Error("Method not implemented.");
  }
}
