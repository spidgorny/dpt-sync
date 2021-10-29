import {require as requireVersion} from 'node-gtk';
const Pango = requireVersion('Pango')

export class AttrListBuilder {
    constructor(attrs: any[]) {
        const attrList = new Pango.AttrList();
        attrs.map((attr) => attrList.insert(attr));
        return attrList;
    }
}
