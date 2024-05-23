/// <reference types="react" />
type Link = {
    text: string;
    url: string;
};
type ExternalLinksProps = {
    links: Link[];
    className?: string;
};
export default function ExternalLinks(props: ExternalLinksProps): JSX.Element;
export {};
