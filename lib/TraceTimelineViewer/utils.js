// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Given a range (`min`, `max`) and factoring in a zoom (`viewStart`, `viewEnd`)
 * a function is created that will find the position of a sub-range (`start`, `end`).
 * The calling the generated method will return the result as a `{ start, end }`
 * object with values ranging in [0, 1].
 *
 * @param  {number} min       The start of the outer range.
 * @param  {number} max       The end of the outer range.
 * @param  {number} viewStart The start of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @param  {number} viewEnd   The end of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @returns {(number, number) => Object} Created view bounds function
 */
export function createViewedBoundsFunc(viewRange) {
  var min = viewRange.min,
    max = viewRange.max,
    viewStart = viewRange.viewStart,
    viewEnd = viewRange.viewEnd;
  var duration = max - min;
  var viewMin = min + viewStart * duration;
  var viewMax = max - (1 - viewEnd) * duration;
  var viewWindow = viewMax - viewMin;

  /**
   * View bounds function
   * @param  {number} start     The start of the sub-range.
   * @param  {number} end       The end of the sub-range.
   * @returns {Object}           The resultant range.
   */
  return function (start, end) {
    return {
      start: (start - viewMin) / viewWindow,
      end: (end - viewMin) / viewWindow
    };
  };
}

/**
 * Returns `true` if the `span` has a tag matching `key` = `value`.
 *
 * @param  {string} key   The tag key to match on.
 * @param  {any}    value The tag value to match.
 * @param  {{tags}} span  An object with a `tags` property of { key, value }
 *                        items.
 * @returns {boolean}      True if a match was found.
 */
export function spanHasTag(key, value, span) {
  if (!Array.isArray(span.tags) || !span.tags.length) {
    return false;
  }
  return span.tags.some(function (tag) {
    return tag.key === key && tag.value === value;
  });
}
export var isClientSpan = spanHasTag.bind(null, 'span.kind', 'client');
export var isServerSpan = spanHasTag.bind(null, 'span.kind', 'server');
var isErrorBool = spanHasTag.bind(null, 'error', true);
var isErrorStr = spanHasTag.bind(null, 'error', 'true');
export var isErrorSpan = function isErrorSpan(span) {
  return isErrorBool(span) || isErrorStr(span);
};

/**
 * Returns `true` if at least one of the descendants of the `parentSpanIndex`
 * span contains an error tag.
 *
 * @param      {TraceSpan[]}   spans            The spans for a trace - should be
 *                                         sorted with children following parents.
 * @param      {number}   parentSpanIndex  The index of the parent span - only
 *                                         subsequent spans with depth less than
 *                                         the parent span will be checked.
 * @returns     {boolean}  Returns `true` if a descendant contains an error tag.
 */
export function spanContainsErredSpan(spans, parentSpanIndex) {
  var depth = spans[parentSpanIndex].depth;
  var i = parentSpanIndex + 1;
  for (; i < spans.length && spans[i].depth > depth; i++) {
    if (isErrorSpan(spans[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Expects the first span to be the parent span.
 */
export function findServerChildSpan(spans) {
  if (spans.length <= 1 || !isClientSpan(spans[0])) {
    return false;
  }
  var span = spans[0];
  var spanChildDepth = span.depth + 1;
  var i = 1;
  while (i < spans.length && spans[i].depth === spanChildDepth) {
    if (isServerSpan(spans[i])) {
      return spans[i];
    }
    i++;
  }
  return null;
}
export var isKindClient = function isKindClient(span) {
  return span.tags.some(function (_ref) {
    var key = _ref.key,
      value = _ref.value;
    return key === 'span.kind' && value === 'client';
  });
};
export { formatDuration } from '../utils/date';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjcmVhdGVWaWV3ZWRCb3VuZHNGdW5jIiwidmlld1JhbmdlIiwibWluIiwibWF4Iiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImR1cmF0aW9uIiwidmlld01pbiIsInZpZXdNYXgiLCJ2aWV3V2luZG93Iiwic3RhcnQiLCJlbmQiLCJzcGFuSGFzVGFnIiwia2V5IiwidmFsdWUiLCJzcGFuIiwiQXJyYXkiLCJpc0FycmF5IiwidGFncyIsImxlbmd0aCIsInNvbWUiLCJ0YWciLCJpc0NsaWVudFNwYW4iLCJiaW5kIiwiaXNTZXJ2ZXJTcGFuIiwiaXNFcnJvckJvb2wiLCJpc0Vycm9yU3RyIiwiaXNFcnJvclNwYW4iLCJzcGFuQ29udGFpbnNFcnJlZFNwYW4iLCJzcGFucyIsInBhcmVudFNwYW5JbmRleCIsImRlcHRoIiwiaSIsImZpbmRTZXJ2ZXJDaGlsZFNwYW4iLCJzcGFuQ2hpbGREZXB0aCIsImlzS2luZENsaWVudCIsIl9yZWYiLCJmb3JtYXREdXJhdGlvbiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL3V0aWxzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgVHJhY2VTcGFuIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5leHBvcnQgdHlwZSBWaWV3ZWRCb3VuZHNGdW5jdGlvblR5cGUgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpID0+IHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfTtcbi8qKlxuICogR2l2ZW4gYSByYW5nZSAoYG1pbmAsIGBtYXhgKSBhbmQgZmFjdG9yaW5nIGluIGEgem9vbSAoYHZpZXdTdGFydGAsIGB2aWV3RW5kYClcbiAqIGEgZnVuY3Rpb24gaXMgY3JlYXRlZCB0aGF0IHdpbGwgZmluZCB0aGUgcG9zaXRpb24gb2YgYSBzdWItcmFuZ2UgKGBzdGFydGAsIGBlbmRgKS5cbiAqIFRoZSBjYWxsaW5nIHRoZSBnZW5lcmF0ZWQgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgYXMgYSBgeyBzdGFydCwgZW5kIH1gXG4gKiBvYmplY3Qgd2l0aCB2YWx1ZXMgcmFuZ2luZyBpbiBbMCwgMV0uXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBtaW4gICAgICAgVGhlIHN0YXJ0IG9mIHRoZSBvdXRlciByYW5nZS5cbiAqIEBwYXJhbSAge251bWJlcn0gbWF4ICAgICAgIFRoZSBlbmQgb2YgdGhlIG91dGVyIHJhbmdlLlxuICogQHBhcmFtICB7bnVtYmVyfSB2aWV3U3RhcnQgVGhlIHN0YXJ0IG9mIHRoZSB6b29tLCBvbiBhIHJhbmdlIG9mIFswLCAxXSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlIHRvIHRoZSBgbWluYCwgYG1heGAuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHZpZXdFbmQgICBUaGUgZW5kIG9mIHRoZSB6b29tLCBvbiBhIHJhbmdlIG9mIFswLCAxXSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlIHRvIHRoZSBgbWluYCwgYG1heGAuXG4gKiBAcmV0dXJucyB7KG51bWJlciwgbnVtYmVyKSA9PiBPYmplY3R9IENyZWF0ZWQgdmlldyBib3VuZHMgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpZXdlZEJvdW5kc0Z1bmModmlld1JhbmdlOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlcjsgdmlld1N0YXJ0OiBudW1iZXI7IHZpZXdFbmQ6IG51bWJlciB9KSB7XG4gIGNvbnN0IHsgbWluLCBtYXgsIHZpZXdTdGFydCwgdmlld0VuZCB9ID0gdmlld1JhbmdlO1xuICBjb25zdCBkdXJhdGlvbiA9IG1heCAtIG1pbjtcbiAgY29uc3Qgdmlld01pbiA9IG1pbiArIHZpZXdTdGFydCAqIGR1cmF0aW9uO1xuICBjb25zdCB2aWV3TWF4ID0gbWF4IC0gKDEgLSB2aWV3RW5kKSAqIGR1cmF0aW9uO1xuICBjb25zdCB2aWV3V2luZG93ID0gdmlld01heCAtIHZpZXdNaW47XG5cbiAgLyoqXG4gICAqIFZpZXcgYm91bmRzIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSAge251bWJlcn0gc3RhcnQgICAgIFRoZSBzdGFydCBvZiB0aGUgc3ViLXJhbmdlLlxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IGVuZCAgICAgICBUaGUgZW5kIG9mIHRoZSBzdWItcmFuZ2UuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9ICAgICAgICAgICBUaGUgcmVzdWx0YW50IHJhbmdlLlxuICAgKi9cbiAgcmV0dXJuIChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikgPT4gKHtcbiAgICBzdGFydDogKHN0YXJ0IC0gdmlld01pbikgLyB2aWV3V2luZG93LFxuICAgIGVuZDogKGVuZCAtIHZpZXdNaW4pIC8gdmlld1dpbmRvdyxcbiAgfSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGBzcGFuYCBoYXMgYSB0YWcgbWF0Y2hpbmcgYGtleWAgPSBgdmFsdWVgLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30ga2V5ICAgVGhlIHRhZyBrZXkgdG8gbWF0Y2ggb24uXG4gKiBAcGFyYW0gIHthbnl9ICAgIHZhbHVlIFRoZSB0YWcgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcGFyYW0gIHt7dGFnc319IHNwYW4gIEFuIG9iamVjdCB3aXRoIGEgYHRhZ3NgIHByb3BlcnR5IG9mIHsga2V5LCB2YWx1ZSB9XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLlxuICogQHJldHVybnMge2Jvb2xlYW59ICAgICAgVHJ1ZSBpZiBhIG1hdGNoIHdhcyBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwYW5IYXNUYWcoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHNwYW46IFRyYWNlU3Bhbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoc3Bhbi50YWdzKSB8fCAhc3Bhbi50YWdzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3Bhbi50YWdzLnNvbWUoKHRhZykgPT4gdGFnLmtleSA9PT0ga2V5ICYmIHRhZy52YWx1ZSA9PT0gdmFsdWUpO1xufVxuXG5leHBvcnQgY29uc3QgaXNDbGllbnRTcGFuID0gc3Bhbkhhc1RhZy5iaW5kKG51bGwsICdzcGFuLmtpbmQnLCAnY2xpZW50Jyk7XG5leHBvcnQgY29uc3QgaXNTZXJ2ZXJTcGFuID0gc3Bhbkhhc1RhZy5iaW5kKG51bGwsICdzcGFuLmtpbmQnLCAnc2VydmVyJyk7XG5cbmNvbnN0IGlzRXJyb3JCb29sID0gc3Bhbkhhc1RhZy5iaW5kKG51bGwsICdlcnJvcicsIHRydWUpO1xuY29uc3QgaXNFcnJvclN0ciA9IHNwYW5IYXNUYWcuYmluZChudWxsLCAnZXJyb3InLCAndHJ1ZScpO1xuZXhwb3J0IGNvbnN0IGlzRXJyb3JTcGFuID0gKHNwYW46IFRyYWNlU3BhbikgPT4gaXNFcnJvckJvb2woc3BhbikgfHwgaXNFcnJvclN0cihzcGFuKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBgcGFyZW50U3BhbkluZGV4YFxuICogc3BhbiBjb250YWlucyBhbiBlcnJvciB0YWcuXG4gKlxuICogQHBhcmFtICAgICAge1RyYWNlU3BhbltdfSAgIHNwYW5zICAgICAgICAgICAgVGhlIHNwYW5zIGZvciBhIHRyYWNlIC0gc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGVkIHdpdGggY2hpbGRyZW4gZm9sbG93aW5nIHBhcmVudHMuXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgIHBhcmVudFNwYW5JbmRleCAgVGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgc3BhbiAtIG9ubHlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzZXF1ZW50IHNwYW5zIHdpdGggZGVwdGggbGVzcyB0aGFuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHBhcmVudCBzcGFuIHdpbGwgYmUgY2hlY2tlZC5cbiAqIEByZXR1cm5zICAgICB7Ym9vbGVhbn0gIFJldHVybnMgYHRydWVgIGlmIGEgZGVzY2VuZGFudCBjb250YWlucyBhbiBlcnJvciB0YWcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGFuQ29udGFpbnNFcnJlZFNwYW4oc3BhbnM6IFRyYWNlU3BhbltdLCBwYXJlbnRTcGFuSW5kZXg6IG51bWJlcikge1xuICBjb25zdCB7IGRlcHRoIH0gPSBzcGFuc1twYXJlbnRTcGFuSW5kZXhdO1xuICBsZXQgaSA9IHBhcmVudFNwYW5JbmRleCArIDE7XG4gIGZvciAoOyBpIDwgc3BhbnMubGVuZ3RoICYmIHNwYW5zW2ldLmRlcHRoID4gZGVwdGg7IGkrKykge1xuICAgIGlmIChpc0Vycm9yU3BhbihzcGFuc1tpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogRXhwZWN0cyB0aGUgZmlyc3Qgc3BhbiB0byBiZSB0aGUgcGFyZW50IHNwYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kU2VydmVyQ2hpbGRTcGFuKHNwYW5zOiBUcmFjZVNwYW5bXSkge1xuICBpZiAoc3BhbnMubGVuZ3RoIDw9IDEgfHwgIWlzQ2xpZW50U3BhbihzcGFuc1swXSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qgc3BhbiA9IHNwYW5zWzBdO1xuICBjb25zdCBzcGFuQ2hpbGREZXB0aCA9IHNwYW4uZGVwdGggKyAxO1xuICBsZXQgaSA9IDE7XG4gIHdoaWxlIChpIDwgc3BhbnMubGVuZ3RoICYmIHNwYW5zW2ldLmRlcHRoID09PSBzcGFuQ2hpbGREZXB0aCkge1xuICAgIGlmIChpc1NlcnZlclNwYW4oc3BhbnNbaV0pKSB7XG4gICAgICByZXR1cm4gc3BhbnNbaV07XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzS2luZENsaWVudCA9IChzcGFuOiBUcmFjZVNwYW4pOiBCb29sZWFuID0+XG4gIHNwYW4udGFncy5zb21lKCh7IGtleSwgdmFsdWUgfSkgPT4ga2V5ID09PSAnc3Bhbi5raW5kJyAmJiB2YWx1ZSA9PT0gJ2NsaWVudCcpO1xuXG5leHBvcnQgeyBmb3JtYXREdXJhdGlvbiB9IGZyb20gJy4uL3V0aWxzL2RhdGUnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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