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

export class DptFolder {
  constructor(
    public readonly id: Number,
    
  ) {}

  fromResponse(response: FolderResponse) {

  }
}

export class DptFile {
  constructor(
    public readonly id: string, 
    public readonly createdDate: Date,
    public readonly modifiedDate: Date,
  ) {}

  newFromResponse(response: FileResponse) {
    return new DptFile(
      response.entry_id,
      new Date(response.created_date),
      new Date(response.modified_date),
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
