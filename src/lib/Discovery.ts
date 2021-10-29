import * as bonjour from "bonjour";

export class DiscoveredDevice {
    constructor(private ip: string) {}
}

export class Discovery {
    private browser?: bonjour.Browser;

    constructor() {
        this.stopSearch();
    }

    startSearch(callback: (arg0: DiscoveredDevice) => any) {
        this.browser = bonjour().find({ type: 'digitalpaper' }, (service) => {
            callback(new DiscoveredDevice(service.addresses[0]));
        });
    }

    stopSearch() {
        this.browser?.stop();
    }
}
