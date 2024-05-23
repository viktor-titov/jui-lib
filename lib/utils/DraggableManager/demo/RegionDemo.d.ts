import React from 'react';
import DraggableManager, { DraggableBounds, DraggingUpdate } from '..';
import { TNil } from '../../../types';
import './RegionDemo.css';
type TUpdate = {
    regionCursor?: number | null;
    regionDragging?: number[] | null;
};
type RegionDemoProps = {
    regionCursor: number | TNil;
    regionDragging: [number, number] | TNil;
    updateState: (update: TUpdate) => void;
};
export default class RegionDemo extends React.PureComponent<RegionDemoProps> {
    _dragManager: DraggableManager;
    _realmElm: HTMLElement | TNil;
    constructor(props: RegionDemoProps);
    _setRealm: (elm: HTMLElement | TNil) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleMouseMove: ({ value }: DraggingUpdate) => void;
    _handleMouseLeave: () => void;
    _handleDragUpdate: ({ value }: DraggingUpdate) => void;
    _handleDragEnd: ({ value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
export {};
