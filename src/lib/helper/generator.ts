// https://stackoverflow.com/questions/58668361/how-can-i-convert-an-async-iterator-to-an-array
import {RemoteFsEntry} from "../fs/remote";

export async function toArray(asyncIterator: AsyncGenerator<any>) {
    const arr = [];
    for await(const i of asyncIterator) arr.push(i);
    return arr;
}
