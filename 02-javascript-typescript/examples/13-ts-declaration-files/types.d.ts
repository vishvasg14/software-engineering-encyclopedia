// types.d.ts — declares a third-party-looking module

declare module 'my-lib' {
    export interface Options {
        timeout?: number;
        retries?: number;
    }

    export function hello(name: string): string;
    export const version: string;

    export default class Client {
        constructor(opts?: Options);
        send(msg: string): Promise<void>;
        close(): void;
    }
}