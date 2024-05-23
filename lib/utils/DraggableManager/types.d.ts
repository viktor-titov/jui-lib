import * as React from 'react';
import { TNil } from '../../types';
import DraggableManager from './DraggableManager';
import EUpdateTypes from './EUpdateTypes';
export type DraggableBounds = {
    clientXLeft: number;
    maxValue?: number;
    minValue?: number;
    width: number;
};
export type DraggingUpdate = {
    event: React.MouseEvent<any> | MouseEvent;
    manager: DraggableManager;
    tag: string | TNil;
    type: EUpdateTypes;
    value: number;
    x: number;
};
