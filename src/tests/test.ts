import { opendir } from "fs/promises";

(async function () {
    const dir = await opendir('/home/alice/Documents/Uni');
    for await (const child of dir) {
        console.log(child);
    }
})();
