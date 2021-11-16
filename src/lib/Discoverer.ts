import * as bonjour from "bonjour";

export class DiscoveredDevice {
    constructor(public ip: string) {}
}

export class Discoverer {
    private browser?: bonjour.Browser;

    constructor() {
        this.stopSearch();
    }

    startSearch(callback: (arg0: DiscoveredDevice) => any) {
        console.log(`Looking for devices...`);
        this.browser = bonjour().find({}, (service) => {
            console.log(`I found device ${service}`);
            callback(new DiscoveredDevice(service.fqdn));
        });
    }

    stopSearch() {
        this.browser?.stop();
    }
}
