import { DiscoveredDevice, Discoverer } from '../../lib/Discoverer';
import { DeviceWidget } from '../elements/DeviceWidget';
import { AttrListBuilder } from '../helpers/Pango';
import { gi, Gtk, Pango } from '../lib/Gtk';

export class PageDiscovery extends Gtk.Grid {
    public deviceList: any; // Gtk.ListBox

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

        this.deviceList = new Gtk.ListBox();
        this.deviceList.setPlaceholder(new Gtk.Label({
            label: "Loading, please wait..."
        }));
        this.attach(this.deviceList, 1, 0, 1, 1);
        this.on('show', this.onLoaded);
    }
    
    private onLoaded = () => {
        // this.deviceList.getChildren().map((c: any) => this.deviceList.remove(c));
        this.deviceList.on('selected-rows-changed', () => console.log('sel'));
        this.registerListeners();
    }

    private registerListeners = () => {
        const discovery = new Discoverer();
        discovery.startSearch((device) => {
            this.deviceList.add(new DeviceWidget(device));
            this.showAll();
        });
    }
}

gi.registerClass(PageDiscovery);
