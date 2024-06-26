import _extends from "@babel/runtime/helpers/extends";
import React from "react";
import { UnthemedTraceTimelineViewer } from "./TraceTimelineViewer";
import traceGenerators from "./demo/trace-generators";
import transformTraceData from "./model/transform-trace-data";
import { createTheme } from "@grafana/data";
import { jsx as _jsx } from "react/jsx-runtime";
console.log(traceGenerators.trace({}));
var trace = transformTraceData(traceGenerators.trace({}));
var props = {
  trace: trace,
  textFilter: null,
  viewRange: {
    time: {
      current: [0, 1]
    }
  },
  traceTimeline: {
    shouldScrollToFirstUiFindMatch: true,
    traceID: "0000",
    childrenHiddenIDs: new Set(),
    hoverIndentGuideIds: new Set(),
    spanNameColumnWidth: 0.5,
    detailStates: new Map()
  },
  expandAll: function expandAll() {},
  collapseAll: function collapseAll() {},
  expandOne: function expandOne() {},
  registerAccessors: function registerAccessors() {},
  collapseOne: function collapseOne() {},
  setTrace: function setTrace() {},
  theme: createTheme(),
  history: {
    replace: function replace() {}
  },
  location: {
    search: null
  }
};
export default function App() {
  return /*#__PURE__*/_jsx(UnthemedTraceTimelineViewer, _extends({}, props));
  // return <TraceName traceName="trace name"></TraceName>
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIlVudGhlbWVkVHJhY2VUaW1lbGluZVZpZXdlciIsInRyYWNlR2VuZXJhdG9ycyIsInRyYW5zZm9ybVRyYWNlRGF0YSIsImNyZWF0ZVRoZW1lIiwianN4IiwiX2pzeCIsImNvbnNvbGUiLCJsb2ciLCJ0cmFjZSIsInByb3BzIiwidGV4dEZpbHRlciIsInZpZXdSYW5nZSIsInRpbWUiLCJjdXJyZW50IiwidHJhY2VUaW1lbGluZSIsInNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaCIsInRyYWNlSUQiLCJjaGlsZHJlbkhpZGRlbklEcyIsIlNldCIsImhvdmVySW5kZW50R3VpZGVJZHMiLCJzcGFuTmFtZUNvbHVtbldpZHRoIiwiZGV0YWlsU3RhdGVzIiwiTWFwIiwiZXhwYW5kQWxsIiwiY29sbGFwc2VBbGwiLCJleHBhbmRPbmUiLCJyZWdpc3RlckFjY2Vzc29ycyIsImNvbGxhcHNlT25lIiwic2V0VHJhY2UiLCJ0aGVtZSIsImhpc3RvcnkiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJBcHAiLCJfZXh0ZW5kcyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgVFByb3BzLCBVbnRoZW1lZFRyYWNlVGltZWxpbmVWaWV3ZXIgfSBmcm9tIFwiLi9UcmFjZVRpbWVsaW5lVmlld2VyXCI7XG5pbXBvcnQgdHJhY2VHZW5lcmF0b3JzIGZyb20gXCIuL2RlbW8vdHJhY2UtZ2VuZXJhdG9yc1wiO1xuaW1wb3J0IHRyYW5zZm9ybVRyYWNlRGF0YSBmcm9tIFwiLi9tb2RlbC90cmFuc2Zvcm0tdHJhY2UtZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlVGhlbWUgfSBmcm9tIFwiQGdyYWZhbmEvZGF0YVwiO1xuaW1wb3J0IHsgVHJhY2VOYW1lIH0gZnJvbSBcIi4vY29tbW9uXCI7XG5cbmNvbnNvbGUubG9nKHRyYWNlR2VuZXJhdG9ycy50cmFjZSh7fSkpO1xuXG5jb25zdCB0cmFjZSA9IHRyYW5zZm9ybVRyYWNlRGF0YSh0cmFjZUdlbmVyYXRvcnMudHJhY2Uoe30pKTtcblxuY29uc3QgcHJvcHMgPSB7XG4gIHRyYWNlLFxuICB0ZXh0RmlsdGVyOiBudWxsLFxuICB2aWV3UmFuZ2U6IHtcbiAgICB0aW1lOiB7XG4gICAgICBjdXJyZW50OiBbMCwgMV0sXG4gICAgfSxcbiAgfSxcbiAgdHJhY2VUaW1lbGluZToge1xuICAgIHNob3VsZFNjcm9sbFRvRmlyc3RVaUZpbmRNYXRjaDogdHJ1ZSxcbiAgICB0cmFjZUlEOiBcIjAwMDBcIixcbiAgICBjaGlsZHJlbkhpZGRlbklEczogbmV3IFNldCgpLFxuICAgIGhvdmVySW5kZW50R3VpZGVJZHM6IG5ldyBTZXQoKSxcbiAgICBzcGFuTmFtZUNvbHVtbldpZHRoOiAwLjUsXG4gICAgZGV0YWlsU3RhdGVzOiBuZXcgTWFwKCksXG4gIH0sXG4gIGV4cGFuZEFsbDogKCkgPT4ge30sXG4gIGNvbGxhcHNlQWxsOiAoKSA9PiB7fSxcbiAgZXhwYW5kT25lOiAoKSA9PiB7fSxcbiAgcmVnaXN0ZXJBY2Nlc3NvcnM6ICgpID0+IHt9LFxuICBjb2xsYXBzZU9uZTogKCkgPT4ge30sXG4gIHNldFRyYWNlOiAoKSA9PiB7fSxcbiAgdGhlbWU6IGNyZWF0ZVRoZW1lKCksXG4gIGhpc3Rvcnk6IHtcbiAgICByZXBsYWNlOiAoKSA9PiB7fSxcbiAgfSxcbiAgbG9jYXRpb246IHtcbiAgICBzZWFyY2g6IG51bGwsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiA8VW50aGVtZWRUcmFjZVRpbWVsaW5lVmlld2VyIHsuLi4ocHJvcHMgYXMgdW5rbm93biBhcyBUUHJvcHMpfT48L1VudGhlbWVkVHJhY2VUaW1lbGluZVZpZXdlcj47XG4gIC8vIHJldHVybiA8VHJhY2VOYW1lIHRyYWNlTmFtZT1cInRyYWNlIG5hbWVcIj48L1RyYWNlTmFtZT5cbn1cbiJdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU9BLEtBQUssTUFBTSxPQUFPO0FBRXpCLFNBQWlCQywyQkFBMkIsUUFBUSx1QkFBdUI7QUFDM0UsT0FBT0MsZUFBZSxNQUFNLHlCQUF5QjtBQUNyRCxPQUFPQyxrQkFBa0IsTUFBTSw4QkFBOEI7QUFDN0QsU0FBU0MsV0FBVyxRQUFRLGVBQWU7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFHNUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTixlQUFlLENBQUNPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRDLElBQU1BLEtBQUssR0FBR04sa0JBQWtCLENBQUNELGVBQWUsQ0FBQ08sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFM0QsSUFBTUMsS0FBSyxHQUFHO0VBQ1pELEtBQUssRUFBTEEsS0FBSztFQUNMRSxVQUFVLEVBQUUsSUFBSTtFQUNoQkMsU0FBUyxFQUFFO0lBQ1RDLElBQUksRUFBRTtNQUNKQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoQjtFQUNGLENBQUM7RUFDREMsYUFBYSxFQUFFO0lBQ2JDLDhCQUE4QixFQUFFLElBQUk7SUFDcENDLE9BQU8sRUFBRSxNQUFNO0lBQ2ZDLGlCQUFpQixFQUFFLElBQUlDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCQyxtQkFBbUIsRUFBRSxJQUFJRCxHQUFHLENBQUMsQ0FBQztJQUM5QkUsbUJBQW1CLEVBQUUsR0FBRztJQUN4QkMsWUFBWSxFQUFFLElBQUlDLEdBQUcsQ0FBQztFQUN4QixDQUFDO0VBQ0RDLFNBQVMsRUFBRSxTQUFBQSxVQUFBLEVBQU0sQ0FBQyxDQUFDO0VBQ25CQyxXQUFXLEVBQUUsU0FBQUEsWUFBQSxFQUFNLENBQUMsQ0FBQztFQUNyQkMsU0FBUyxFQUFFLFNBQUFBLFVBQUEsRUFBTSxDQUFDLENBQUM7RUFDbkJDLGlCQUFpQixFQUFFLFNBQUFBLGtCQUFBLEVBQU0sQ0FBQyxDQUFDO0VBQzNCQyxXQUFXLEVBQUUsU0FBQUEsWUFBQSxFQUFNLENBQUMsQ0FBQztFQUNyQkMsUUFBUSxFQUFFLFNBQUFBLFNBQUEsRUFBTSxDQUFDLENBQUM7RUFDbEJDLEtBQUssRUFBRTFCLFdBQVcsQ0FBQyxDQUFDO0VBQ3BCMkIsT0FBTyxFQUFFO0lBQ1BDLE9BQU8sRUFBRSxTQUFBQSxRQUFBLEVBQU0sQ0FBQztFQUNsQixDQUFDO0VBQ0RDLFFBQVEsRUFBRTtJQUNSQyxNQUFNLEVBQUU7RUFDVjtBQUNGLENBQUM7QUFFRCxlQUFlLFNBQVNDLEdBQUdBLENBQUEsRUFBRztFQUM1QixvQkFBTzdCLElBQUEsQ0FBQ0wsMkJBQTJCLEVBQUFtQyxRQUFBLEtBQU0xQixLQUFLLENBQXFELENBQUM7RUFDcEc7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==