import axios from "axios";
import path = require("path/posix");
import { FsDir, FsEntry, FsFile } from "./Fs";

export abstract class RemoteFsEntry implements FsEntry {
  abstract isFile(): boolean;
  abstract isDir(): boolean;
  abstract type: FsDir | FsFile;
  constructor(
    protected id: string,
    public name: string,
    public dirname: string,
  ) { }
;
}

export class RemoteFsDir extends RemoteFsEntry implements FsDir {
  constructor(
    id: string,
    name: string,
    basename: string,
    private json: Response[],
  ) {
    super(
      id,
      name,
      basename,
    );
  }

  public static newFromJson(json: Response[]) {
    return new RemoteFsDir(
      
    )
  }

  public static newRootFromJson(json: EntryTypeAll) {
    const myId = 'root';
    const myJson = json.entry_list.filter((entry) => entry.parent_folder_id === myId);
    return new RemoteFsDir(
      myId,
      '',
      'Document/',
      myJson,
    );
  }

  public static newFromNetwork() {

  }

  public async *children(): AsyncGenerator<RemoteFsEntry> {
    const jsonChildren: Response[] = [], jsonNonChildren: Response[] = [];

    for (const child of this.json) {
      (child.parent_folder_id === this.id ? jsonChildren : jsonNonChildren).push(child);
    }

    for (const child of jsonChildren) {
      switch (child.entry_type) {
        case 'document':
          yield new RemoteFsFile();
          break;
        case "folder":
          yield new RemoteFsDir(
            child.entry_id,
            child.entry_name,
            this.dirname,
            jsonNonChildren,
          );
          break;
      }
    }
  }

  async findDirectChildByName(name: string): Promise<RemoteFsEntry | undefined> {
    // TODO this is a lot of overhead if most children will be just thrown away
    for await (const child of await this.children()) {
      if (child.name === name) {
        return child;
      }
    }
  }

  isFile(): boolean {
    throw new Error("Method not implemented.");
  }
  isDir(): boolean {
    throw new Error("Method not implemented.");
  }

  async delete() {
    axios.delete(`/folders/${this.id}`);
  }

  async newSubfolder(name: string) {
    axios.post('/folders2', {
      folder_name: name,
      parent_folder_id: this.id,
    });

    // or, if support for nesting is desired
    const [first, ...other] = name.split('/');
    if (!(await this.findDirectChildByName('first'))?.isDir()) {
      const post = axios.post('...');
      // new.newSubfolder(other.join('/'));
    }
  }

  async newFile(name: string, data: Buffer) {
    const response = await axios.post<{
      document_id: string, // TODO find out whole type, define somewhere global
    }>('/documents2', {
      file_name: name,
      parent_folder_id: this.id,
      document_source: "", // what is this?
    });

    const file = await axios.put(`/documents/${response.data.document_id}/file`, data);
    // file.data
    // TODO what to do here? should I add the response to this.json array?
  }
}

export class RemoteFsFile extends RemoteFsEntry, FsFile {
  constructor(
  ) {
    super('asd', 'asd', 'asd');
  }

  async delete() {
    axios.delete(`/documents/${this.id}`);
  }

  read(): Promise<Buffer> {
    // do some networking
    throw new Error("Method not implemented.");
  }
  isFile(): boolean {
    throw new Error("Method not implemented.");
  }
  isDir(): boolean {
    throw new Error("Method not implemented.");
  }
}

interface BaseResponse {
  created_date: string;
  document_source: string;
  entry_id: string;
  entry_name: string;
  entry_path: string;
  entry_type: 'document' | 'folder';
  is_new: string;
  parent_folder_id: string;
}

export interface FileResponse extends BaseResponse {
  author: string;
  current_page: string;
  document_type: string;
  entry_type: 'document';
  ext_id: string;
  file_revision: string;
  file_size: string;
  mime_type: string;
  modified_date: string;
  reading_date: string;
  title: string;
  total_page: string;
}

export interface FolderResponse extends BaseResponse {
  entry_type: 'folder';
  ext_id: string,
}

export type Response = FileResponse | FolderResponse;

export type EntryTypeAll = {
  count: number,
  entry_list: (FileResponse | FolderResponse)[],
  entry_list_hash: string,
}
