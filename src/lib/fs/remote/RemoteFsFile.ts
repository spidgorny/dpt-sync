import axios from "axios";
import path = require("path/posix");
import { FsFile } from "../Fs";
import { RemoteFsBase } from "./RemoteFsBase";


export class RemoteFsFile extends RemoteFsBase implements FsFile {
  isFile: true = true;
  isDir: false = false;

  // @todo make getter
  isPdf: boolean = false;

  constructor(id = 'asd', name = 'asd', dirname = 'asd') {
    super(id, name, dirname);
  }

  createdDate(): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  modifiedDate(): Promise<Date> {
    throw new Error("Method not implemented.");
  }

  async delete() {
    return axios.delete(`/documents/${this.id}`);
  }

  read(): Promise<Buffer> {
    // do some networking
    throw new Error("Method not implemented.");
  }
}
