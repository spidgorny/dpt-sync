import { quit } from './index';
import { gi, Gtk } from './lib/Gtk';
import {PageDiscovery} from './pages/PageDiscovery';

export class Assistant extends Gtk.Assistant {
    constructor() {
        super({
            title: "My DPT Sync",
            // default_height: 800,    // TODO: file bug report about underscore
            // default_width: 500,
        });

        this.setDefaultSize(800, 500);
        this.on('cancel', () => this.close());
        this.on('delete-event', () => false); // what does this do?
        // this.on('close', () => quit());
        this.setupPages();
        this.showAll();
    }

    setupPages() {
        this.pageDiscovery = new PageDiscovery();
        this.pageDiscovery.deviceList.on('row-activated', (
            () => this.setPageComplete(this.pageDiscovery, true)
        ));
        this.appendPage(this.pageDiscovery);
        this.setPageTitle(this.pageDiscovery, 'hi');
    }
}

gi.registerClass(Assistant);
