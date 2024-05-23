type Props = {
    text: string;
    className?: string;
    wordRegexp?: RegExp;
};
declare function BreakableText(props: Props): any;
declare namespace BreakableText {
    var defaultProps: {
        wordRegexp: RegExp;
    };
}
export default BreakableText;
