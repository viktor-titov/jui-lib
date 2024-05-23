/// <reference types="node" />
export default function requestAnimationFrame(callback: FrameRequestCallback): number;
export declare function cancelAnimationFrame(id: string | number | NodeJS.Timeout | undefined): void;
export declare function polyfill(target: Window & typeof globalThis, msElapse?: number): void;
