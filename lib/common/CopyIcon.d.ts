/// <reference types="react" />
import { IconName } from '@grafana/ui';
type PropsType = {
    className?: string;
    copyText: string;
    icon?: IconName;
    tooltipTitle: string;
};
declare function CopyIcon(props: PropsType): JSX.Element;
declare namespace CopyIcon {
    var defaultProps: {
        icon: string;
        className: any;
    };
}
export default CopyIcon;
