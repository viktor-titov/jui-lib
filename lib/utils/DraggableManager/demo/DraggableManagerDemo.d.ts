import React from 'react';
import { TNil } from '../../../types';
import './DraggableManagerDemo.css';
export type DraggableManagerDemoState = {
    dividerPosition: number;
    regionCursor: number | TNil;
    regionDragging: [number, number] | TNil;
};
export default class DraggableManagerDemo extends React.PureComponent<{}, DraggableManagerDemoState> {
    state: DraggableManagerDemoState;
    constructor(props: {});
    _updateState: (nextState: {}) => void;
    render(): JSX.Element;
}
