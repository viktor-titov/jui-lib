/// <reference types="react" />
import { TNil } from '../types';
type TicksProps = {
    endTime?: number | TNil;
    numTicks: number;
    showLabels?: boolean | TNil;
    startTime?: number | TNil;
};
declare function Ticks(props: TicksProps): JSX.Element;
declare namespace Ticks {
    var defaultProps: {
        endTime: any;
        showLabels: any;
        startTime: any;
    };
}
export default Ticks;
