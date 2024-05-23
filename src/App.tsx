import React from "react";

import { TProps, UnthemedTraceTimelineViewer } from "./lib/TraceTimelineViewer";
import transformTraceData from "./lib/model/transform-trace-data";
import traceGenerators from "./lib/demo/trace-generators";
import { createTheme } from "@grafana/data";

const trace = transformTraceData(traceGenerators.trace({}));
const props = {
	trace,
	textFilter: null,
	viewRange: {
		time: {
			current: [0, 1],
		},
	},
	traceTimeline: {
		childrenHiddenIDs: new Set(),
		hoverIndentGuideIds: new Set(),
		spanNameColumnWidth: 0.5,
		detailStates: new Map(),
	},
	expandAll: () => { },
	collapseAll: () => { },
	expandOne: () => { },
	registerAccessors: () => { },
	collapseOne: () => { },
	setTrace: () => { },
	theme: createTheme(),
	history: {
		replace: () => { },
	},
	location: {
		search: null,
	},
};

export default function App() {
	return <UnthemedTraceTimelineViewer {...(props as unknown as TProps)}></UnthemedTraceTimelineViewer>;
	// return <TraceName traceName="trace name"></TraceName>
}
