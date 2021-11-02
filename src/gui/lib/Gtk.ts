import * as gi from 'node-gtk';

const Gtk: any = gi.require('Gtk', '3.0');
const Pango: any = gi.require('Pango');
const GLib: any = gi.require('GLib');

export {
    gi,
    Gtk,
    Pango,
    GLib,
};
