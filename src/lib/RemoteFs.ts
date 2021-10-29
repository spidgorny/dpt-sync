import { Dirent } from "fs";

let post: any;

export interface BaseResponse {
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

const findFolder = () => {

}

enum Type {
  DOCUMENT = 'document',
  FOLDER = 'folder',
}

interface DptEntry {
  readonly id: string;
  readonly name: string,
  readonly createdDate: Date,
  readonly parentFolder: string;
  readonly type: "document" | "folder"; // TODO enum
}

export class DptFolder implements DptEntry {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdDate: Date,
    public readonly parentFolder: string,
    public readonly type: "document" | "folder",
  ) {}

  static newFromResponse(response: FolderResponse) {
    return new DptFolder(
      response.entry_id,
      response.entry_name,
      new Date(response.created_date),
      response.parent_folder_id,
      response.entry_type,
    )
  }
}

export class DptFile implements DptEntry {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdDate: Date,
    public readonly modifiedDate: Date,
    public readonly parentFolder: string,
    public readonly type: "document" | "folder",
  ) {}

  static newFromResponse(response: FileResponse) {
    return new DptFile(
      response.entry_id,
      response.entry_name,
      new Date(response.created_date),
      new Date(response.modified_date),
      response.parent_folder_id,
      response.entry_type,
    );
  }
}

export type EntryTypeAll = {
  count: number,
  entry_list: (FileResponse | FolderResponse)[],
  entry_list_hash: string,
}

const entryTypeAll = {} as EntryTypeAll;

const folderInRoot = entryTypeAll.entry_list.find((e) => e.parent_folder_id = 'root')

const uploadFile = (file: DptFile, toFolder: DptFolder) => {
  const formData = new FormData();
  // formData.append('file', )

  post({
    file_name: file.id,
    parent_folder_id: toFolder.id,
    document_source: '', // what is this?
  });
};

export class RemoteFs {
  constructor(private entries: (DptFile | DptFolder)[]) {}

  static newFromJson(json: EntryTypeAll) {
    const entries = [];
    for (const entry of json.entry_list) {
      switch (entry.entry_type) {
        case "document":
          entries.push(DptFile.newFromResponse(entry));
          break;
        case "folder":
          entries.push(DptFolder.newFromResponse(entry));
          break;
      }
    }
    return new RemoteFs(entries);
  }

  findDocument(parentFolder: DptFolder, toFind: Dirent) {
    return this.entries.find((entry) => {
      const isInParentFolder = entry.id === parentFolder.id;
      const isDocument = entry.type === "document";
      const nameMatches = entry.name === toFind.name;
      return isInParentFolder && isDocument && nameMatches;
    });
  }
}
