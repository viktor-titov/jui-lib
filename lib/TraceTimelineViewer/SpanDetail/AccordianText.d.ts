import * as React from 'react';
import { TNil } from '../../types';
type AccordianTextProps = {
    className?: string | TNil;
    headerClassName?: string | TNil;
    data: string[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    label: React.ReactNode | string;
    onToggle?: null | (() => void);
    TextComponent?: React.ElementType<{
        data: string[];
    }>;
};
declare function AccordianText(props: AccordianTextProps): JSX.Element;
declare namespace AccordianText {
    var defaultProps: {
        className: any;
        highContrast: boolean;
        interactive: boolean;
        onToggle: any;
    };
}
export default AccordianText;
