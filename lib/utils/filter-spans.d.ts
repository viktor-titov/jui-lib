import { TNil } from '../types';
import { TraceSpan } from '../types/trace';
export default function filterSpans(textFilter: string, spans: TraceSpan[] | TNil): Set<string>;
