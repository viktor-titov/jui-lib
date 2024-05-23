import { TNil } from '../types';
interface TimeCursorUpdate {
    cursor: number | TNil;
}
interface TimeReframeUpdate {
    reframe: {
        anchor: number;
        shift: number;
    };
}
interface TimeShiftEndUpdate {
    shiftEnd: number;
}
interface TimeShiftStartUpdate {
    shiftStart: number;
}
export type TUpdateViewRangeTimeFunction = (start: number, end: number, trackSrc?: string) => void;
export type ViewRangeTimeUpdate = TimeCursorUpdate | TimeReframeUpdate | TimeShiftEndUpdate | TimeShiftStartUpdate;
export interface ViewRangeTime {
    current: [number, number];
    cursor?: number | TNil;
    reframe?: {
        anchor: number;
        shift: number;
    };
    shiftEnd?: number;
    shiftStart?: number;
}
export interface ViewRange {
    time: ViewRangeTime;
}
export {};
