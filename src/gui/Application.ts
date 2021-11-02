import { Assistant } from "./Assistant";
import { gi, Gtk } from "./lib/Gtk";

export class Application extends Gtk.Application {
    constructor() {
        super({
            application_id: 'io.gitlab.lesik.mydptsync',
        });
        this.on('activate', this.activate);
    }

    activate = () => {
        const assistant = new Assistant();
        assistant.present();
    }
}

gi.registerClass(Application);
