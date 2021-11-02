import { DiscoveredDevice } from "../../lib/Discoverer";
import { AttrListBuilder } from "../helpers/Pango";
import { gi, Gtk, Pango } from "../lib/Gtk";

export class DeviceWidget extends Gtk.Grid {
    constructor(device: DiscoveredDevice) {
        super();

        this.attach(new Gtk.Image({
            "icon_name": "ebook-reader",
            "icon_size": Gtk.IconSize.LARGE_TOOLBAR,
            "pixel_size": 64,
        }), 0, 0, 1, 2);
        
        this.attach(new Gtk.Label({
            label: "DPT-CP1",
            attributes: new AttrListBuilder([
                Pango.attrWeightNew(Pango.Weight.BOLD),
                Pango.attrScaleNew(2),
            ]),
        }), 1, 0, 1, 1);
        
        this.attach(new Gtk.Label({
            label: device.ip,
            attributes: new AttrListBuilder([
                // Pango.attrWeightNew(Pango.Weight.BOLD),
                // Pango.attrScaleNew(2),
            ]),
        }), 1, 1, 1, 1);
    }
}

gi.registerClass(DeviceWidget);
