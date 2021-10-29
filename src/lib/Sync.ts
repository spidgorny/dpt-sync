import { Dir, Dirent, PathLike, promises as fs } from 'fs';
import * as path from 'path';
import { LocalDir } from './LocalFs';
import { DptFolder, EntryTypeAll, RemoteFs } from './RemoteFs';

/**
 * documenting my thoughts: it's smarter to walk through the localdir and find
 * corresponding folders on remote, because finding corresponding folders is slow
 * and we already have all information about remote fetched and sitting in RAM
 */
const sync = async (localRootFolder: string, remoteRootFolder: string = 'root') => {
  const entryTypeAll = {} as EntryTypeAll;
  const remoteFolders: DptFolder[] = [];
  const localFolders = new LocalDir(localRootFolder);

  let currentRemoteFolderId = 'root';

  for await (const localChild of await localFolders.children()) {
    if (localChild.isFile()) {
      const remoteFile = entryTypeAll.entry_list.find((e) => (
        e.parent_folder_id === currentRemoteFolderId 
        && e.entry_name === localChild.name
        && e.entry_type === 'document'
      ));
      if (remoteFile) {
        // found remote file, all is good
        // TODO compare if one of them is newer!
      } else {
        // uploadFile();
      }
    } else if (localChild.isDirectory()) {
      const remoteDirectory = entryTypeAll.entry_list.find((e) => (
        e.parent_folder_id === currentRemoteFolderId
        && e.entry_name === localChild.name
        && e.entry_type === 'folder'
      ));
      if (remoteDirectory) {
        // found remote directory, all is good
      } else {
        // remoteDirectoryId = createRemoteDirectory();
      }

      sync(localChild, remoteDirectoryId);
    }
  }
};

const sync = async (source: FsDir, destination: FsDir) => {


  for await (const localChild of await source.children()) {
    if (localChild.isFile()) {
      const remoteFile = remoteFs.findDocument(currentRemoteFolderId, localChild);
      if (remoteFile) {
        // found remote file, all is good
        // TODO compare if one of them is newer!
      } else {
        // uploadFile();
      }
    } else if (localChild.isDirectory()) {
      const remoteDirectory = remoteFs.findDocument(currentRemoteFolderId, localChild);
      if (remoteDirectory) {
        // found remote directory, all is good
      } else {
        // remoteDirectoryId = createRemoteDirectory();
      }

      sync(localChild, remoteDirectoryId);
    }
  }
};
