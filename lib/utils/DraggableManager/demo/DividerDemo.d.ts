import React from 'react';
import { DraggableBounds, DraggingUpdate } from '..';
import TNil from '../../../types/TNil';
import DraggableManager from '../DraggableManager';
import './DividerDemo.css';
type DividerDemoProps = {
    position: number;
    updateState: (update: {
        dividerPosition: number;
    }) => void;
};
export default class DividerDemo extends React.PureComponent<DividerDemoProps> {
    _dragManager: DraggableManager;
    _realmElm: HTMLElement | TNil;
    constructor(props: DividerDemoProps);
    _setRealm: (elm: HTMLElement | TNil) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleDragEvent: ({ value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
export {};
