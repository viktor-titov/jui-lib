import React from "react";

import { TProps, UnthemedTraceTimelineViewer } from "./TraceTimelineViewer";
import traceGenerators from "./demo/trace-generators";
import transformTraceData from "./model/transform-trace-data";
import { createTheme } from "@grafana/data";
import { TraceName } from "./common";

console.log(traceGenerators.trace({}));

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
    shouldScrollToFirstUiFindMatch: true,
    traceID: "0000",
    childrenHiddenIDs: new Set(),
    hoverIndentGuideIds: new Set(),
    spanNameColumnWidth: 0.5,
    detailStates: new Map(),
  },
  expandAll: () => {},
  collapseAll: () => {},
  expandOne: () => {},
  registerAccessors: () => {},
  collapseOne: () => {},
  setTrace: () => {},
  theme: createTheme(),
  history: {
    replace: () => {},
  },
  location: {
    search: null,
  },
};

export default function App() {
  return <UnthemedTraceTimelineViewer {...(props as unknown as TProps)}></UnthemedTraceTimelineViewer>;
  // return <TraceName traceName="trace name"></TraceName>
}
