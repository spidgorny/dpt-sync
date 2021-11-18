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
