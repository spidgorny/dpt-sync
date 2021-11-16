import { FsDir } from './fs/Fs';

export const sync = async (source: FsDir, destination: FsDir) => {
  for await (const sourceChild of await source.children()) {
    let correspondingChild = await destination.findDirectChildByName(sourceChild.name);

    if (sourceChild.isFile) {
      if (correspondingChild && correspondingChild.isFile) {
        // found remote file, all is good
        // TODO compare if one of them is newer!
      } else {
        // uploadFile();
      }
    } else if (sourceChild.isDir) {
      if (correspondingChild && correspondingChild.isDir) {
        // found remote directory, all is good
      } else {
        // remoteDirectoryId = createRemoteDirectory();
        correspondingChild = null as FsDir; // null will be function to create dir
      }
      const x = correspondingChild;

      sync(sourceChild, correspondingChild);
    }
  }
};
