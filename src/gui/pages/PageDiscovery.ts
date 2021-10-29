import {require as requireVersion, registerClass} from 'node-gtk';
const Gtk = requireVersion('Gtk', '3.0')
const Pango = requireVersion('Pango')
import { AttrListBuilder } from '../helpers/Pango';

export class PageDiscovery extends Gtk.Grid {
    constructor() {
        super({
            hexpand: true,
            vexpand: true,
        });

        this.setRowHomogeneous(true);
        this.setColumnHomogeneous(true); // why not taken in super()?

        this.attach(new Gtk.Label({
            label: "Welcome!",
            attributes: new AttrListBuilder([
                Pango.attrWeightNew(Pango.Weight.BOLD),
                Pango.attrScaleNew(5),    
            ]),
        }), 0, 0, 1, 1);

        this.attach(new Gtk.Image({
            "icon_name": "ebook-reader",
            "icon_size": Gtk.IconSize.LARGE_TOOLBAR,
            "pixel_size": 64,
        }), 1, 0, 1, 1);
    }
}

registerClass(PageDiscovery);
