const gi = require('node-gtk')
const Gtk = gi.require('Gtk', '3.0')

import {PageDiscovery} from './pages/PageDiscovery';

gi.startLoop()
Gtk.init()

const assistant = new Gtk.Assistant()
assistant.on('cancel', () => Gtk.mainQuit())
assistant.on('delete-event', () => false)

const pageDiscovery = new PageDiscovery();
assistant.appendPage(pageDiscovery);
assistant.setDefaultSize(800, 500)
// assistant.add(new Gtk.Label({ label: 'Hello Gtk+' }))

assistant.showAll()
Gtk.main()

export {};
