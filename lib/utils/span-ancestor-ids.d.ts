import { TNil } from '../types';
import { TraceSpan } from '../types/trace';
export default function spanAncestorIds(span: TraceSpan | TNil): string[];
