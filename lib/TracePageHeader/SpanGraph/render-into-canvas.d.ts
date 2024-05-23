export declare const ITEM_ALPHA = 0.8;
export declare const MIN_ITEM_HEIGHT = 2;
export declare const MAX_TOTAL_HEIGHT = 200;
export declare const MIN_ITEM_WIDTH = 10;
export declare const MIN_TOTAL_HEIGHT = 60;
export declare const MAX_ITEM_HEIGHT = 6;
export default function renderIntoCanvas(canvas: HTMLCanvasElement, items: Array<{
    valueWidth: number;
    valueOffset: number;
    serviceName: string;
}>, totalValueWidth: number, getFillColor: (serviceName: string) => [number, number, number], bgColor: string): void;
