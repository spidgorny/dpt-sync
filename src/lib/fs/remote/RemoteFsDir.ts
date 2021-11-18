import axios from "axios";
import {RemoteFsEntry, RemoteFsFile} from ".";
import {FsDir} from "../Fs";
import {RemoteFsBase} from "./RemoteFsBase";
import {EntryTypeAll, Response} from "./responses";
import {toArray} from "../../helper/generator";

export class RemoteFsDir extends RemoteFsBase implements FsDir {
    isFile: false = false;
    isDir: true = true;

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
        // return new RemoteFsDir(

        // )
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
        return;

        // alternative? will await all items instead of up until searched
        return (await toArray(this.children())).find(x => x.name === name);
    }

    async delete() {
        return axios.delete(`/folders/${this.id}`);
    }

    async newSubfolder(name: string) {
        await axios.post('/folders2', {
            folder_name: name,
            parent_folder_id: this.id,
        });

        // or, if support for nesting is desired
        const [first, ...other] = name.split('/');
        let firstChild = await this.findDirectChildByName('first');
        if (!firstChild?.isDir) {
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

        const res = await axios.put(`/documents/${response.data.document_id}/file`, data);
        // file.data
        // TODO what to do here? should I add the response to this.json array?

        return new RemoteFsFile(res.data.name, res.data.name, this.id);
    }
}
