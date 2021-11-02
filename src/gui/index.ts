import { Application } from "./Application";
import { gi, GLib, Gtk } from "./lib/Gtk";

Gtk.init();
const loop = GLib.MainLoop.new(null, false);

const application = new Application();
application.run();

// export this before running the loop below, otherwise the export never happens
export const quit = () => {
    Gtk.mainQuit();
}

gi.startLoop();
loop.run();
