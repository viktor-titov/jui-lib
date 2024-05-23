import { ReactElement } from 'react';
export type PopoverProps = {
    children: ReactElement;
    content: ReactElement;
    overlayClassName?: string;
};
export declare function Popover({ children, content, overlayClassName }: PopoverProps): JSX.Element;
