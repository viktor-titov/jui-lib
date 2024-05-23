import { TNil } from './types';
export interface TweenState {
    done: boolean;
    value: number;
}
type TTweenCallback = (state: TweenState) => void;
export type TTweenOptions = {
    delay?: number;
    duration: number;
    from: number;
    onComplete?: TTweenCallback;
    onUpdate?: TTweenCallback;
    to: number;
};
export default class Tween {
    onComplete: TTweenCallback | TNil;
    onUpdate: TTweenCallback | TNil;
    delay: number | TNil;
    duration: number;
    from: number;
    requestID: number | TNil;
    startTime: number;
    timeoutID: number | TNil;
    to: number;
    constructor({ duration, from, to, delay, onUpdate, onComplete }: TTweenOptions);
    _frameCallback: () => void;
    cancel(): void;
    getCurrent(): TweenState;
}
export {};
