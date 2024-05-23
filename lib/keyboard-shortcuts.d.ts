import * as React from 'react';
export type CombokeysHandler = (() => void) | ((event: React.KeyboardEvent<any>) => void) | ((event: React.KeyboardEvent<any>, s: string) => void);
export type ShortcutCallbacks = {
    [name: string]: CombokeysHandler;
};
export declare function merge(callbacks: ShortcutCallbacks): void;
export declare function reset(): void;
