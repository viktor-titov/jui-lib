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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjcmVhdGVWaWV3ZWRCb3VuZHNGdW5jIiwidmlld1JhbmdlIiwibWluIiwibWF4Iiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImR1cmF0aW9uIiwidmlld01pbiIsInZpZXdNYXgiLCJ2aWV3V2luZG93Iiwic3RhcnQiLCJlbmQiLCJzcGFuSGFzVGFnIiwia2V5IiwidmFsdWUiLCJzcGFuIiwiQXJyYXkiLCJpc0FycmF5IiwidGFncyIsImxlbmd0aCIsInNvbWUiLCJ0YWciLCJpc0NsaWVudFNwYW4iLCJiaW5kIiwiaXNTZXJ2ZXJTcGFuIiwiaXNFcnJvckJvb2wiLCJpc0Vycm9yU3RyIiwiaXNFcnJvclNwYW4iLCJzcGFuQ29udGFpbnNFcnJlZFNwYW4iLCJzcGFucyIsInBhcmVudFNwYW5JbmRleCIsImRlcHRoIiwiaSIsImZpbmRTZXJ2ZXJDaGlsZFNwYW4iLCJzcGFuQ2hpbGREZXB0aCIsImlzS2luZENsaWVudCIsIl9yZWYiLCJmb3JtYXREdXJhdGlvbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci91dGlscy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRyYWNlU3BhbiB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcblxuZXhwb3J0IHR5cGUgVmlld2VkQm91bmRzRnVuY3Rpb25UeXBlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSA9PiB7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyIH07XG4vKipcbiAqIEdpdmVuIGEgcmFuZ2UgKGBtaW5gLCBgbWF4YCkgYW5kIGZhY3RvcmluZyBpbiBhIHpvb20gKGB2aWV3U3RhcnRgLCBgdmlld0VuZGApXG4gKiBhIGZ1bmN0aW9uIGlzIGNyZWF0ZWQgdGhhdCB3aWxsIGZpbmQgdGhlIHBvc2l0aW9uIG9mIGEgc3ViLXJhbmdlIChgc3RhcnRgLCBgZW5kYCkuXG4gKiBUaGUgY2FsbGluZyB0aGUgZ2VuZXJhdGVkIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgcmVzdWx0IGFzIGEgYHsgc3RhcnQsIGVuZCB9YFxuICogb2JqZWN0IHdpdGggdmFsdWVzIHJhbmdpbmcgaW4gWzAsIDFdLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gbWluICAgICAgIFRoZSBzdGFydCBvZiB0aGUgb3V0ZXIgcmFuZ2UuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG1heCAgICAgICBUaGUgZW5kIG9mIHRoZSBvdXRlciByYW5nZS5cbiAqIEBwYXJhbSAge251bWJlcn0gdmlld1N0YXJ0IFRoZSBzdGFydCBvZiB0aGUgem9vbSwgb24gYSByYW5nZSBvZiBbMCwgMV0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZSB0byB0aGUgYG1pbmAsIGBtYXhgLlxuICogQHBhcmFtICB7bnVtYmVyfSB2aWV3RW5kICAgVGhlIGVuZCBvZiB0aGUgem9vbSwgb24gYSByYW5nZSBvZiBbMCwgMV0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZSB0byB0aGUgYG1pbmAsIGBtYXhgLlxuICogQHJldHVybnMgeyhudW1iZXIsIG51bWJlcikgPT4gT2JqZWN0fSBDcmVhdGVkIHZpZXcgYm91bmRzIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaWV3ZWRCb3VuZHNGdW5jKHZpZXdSYW5nZTogeyBtaW46IG51bWJlcjsgbWF4OiBudW1iZXI7IHZpZXdTdGFydDogbnVtYmVyOyB2aWV3RW5kOiBudW1iZXIgfSkge1xuICBjb25zdCB7IG1pbiwgbWF4LCB2aWV3U3RhcnQsIHZpZXdFbmQgfSA9IHZpZXdSYW5nZTtcbiAgY29uc3QgZHVyYXRpb24gPSBtYXggLSBtaW47XG4gIGNvbnN0IHZpZXdNaW4gPSBtaW4gKyB2aWV3U3RhcnQgKiBkdXJhdGlvbjtcbiAgY29uc3Qgdmlld01heCA9IG1heCAtICgxIC0gdmlld0VuZCkgKiBkdXJhdGlvbjtcbiAgY29uc3Qgdmlld1dpbmRvdyA9IHZpZXdNYXggLSB2aWV3TWluO1xuXG4gIC8qKlxuICAgKiBWaWV3IGJvdW5kcyBmdW5jdGlvblxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IHN0YXJ0ICAgICBUaGUgc3RhcnQgb2YgdGhlIHN1Yi1yYW5nZS5cbiAgICogQHBhcmFtICB7bnVtYmVyfSBlbmQgICAgICAgVGhlIGVuZCBvZiB0aGUgc3ViLXJhbmdlLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3VsdGFudCByYW5nZS5cbiAgICovXG4gIHJldHVybiAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpID0+ICh7XG4gICAgc3RhcnQ6IChzdGFydCAtIHZpZXdNaW4pIC8gdmlld1dpbmRvdyxcbiAgICBlbmQ6IChlbmQgLSB2aWV3TWluKSAvIHZpZXdXaW5kb3csXG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBgc3BhbmAgaGFzIGEgdGFnIG1hdGNoaW5nIGBrZXlgID0gYHZhbHVlYC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGtleSAgIFRoZSB0YWcga2V5IHRvIG1hdGNoIG9uLlxuICogQHBhcmFtICB7YW55fSAgICB2YWx1ZSBUaGUgdGFnIHZhbHVlIHRvIG1hdGNoLlxuICogQHBhcmFtICB7e3RhZ3N9fSBzcGFuICBBbiBvYmplY3Qgd2l0aCBhIGB0YWdzYCBwcm9wZXJ0eSBvZiB7IGtleSwgdmFsdWUgfVxuICogICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSAgICAgIFRydWUgaWYgYSBtYXRjaCB3YXMgZm91bmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGFuSGFzVGFnKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBzcGFuOiBUcmFjZVNwYW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHNwYW4udGFncykgfHwgIXNwYW4udGFncy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHNwYW4udGFncy5zb21lKCh0YWcpID0+IHRhZy5rZXkgPT09IGtleSAmJiB0YWcudmFsdWUgPT09IHZhbHVlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzQ2xpZW50U3BhbiA9IHNwYW5IYXNUYWcuYmluZChudWxsLCAnc3Bhbi5raW5kJywgJ2NsaWVudCcpO1xuZXhwb3J0IGNvbnN0IGlzU2VydmVyU3BhbiA9IHNwYW5IYXNUYWcuYmluZChudWxsLCAnc3Bhbi5raW5kJywgJ3NlcnZlcicpO1xuXG5jb25zdCBpc0Vycm9yQm9vbCA9IHNwYW5IYXNUYWcuYmluZChudWxsLCAnZXJyb3InLCB0cnVlKTtcbmNvbnN0IGlzRXJyb3JTdHIgPSBzcGFuSGFzVGFnLmJpbmQobnVsbCwgJ2Vycm9yJywgJ3RydWUnKTtcbmV4cG9ydCBjb25zdCBpc0Vycm9yU3BhbiA9IChzcGFuOiBUcmFjZVNwYW4pID0+IGlzRXJyb3JCb29sKHNwYW4pIHx8IGlzRXJyb3JTdHIoc3Bhbik7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZSBkZXNjZW5kYW50cyBvZiB0aGUgYHBhcmVudFNwYW5JbmRleGBcbiAqIHNwYW4gY29udGFpbnMgYW4gZXJyb3IgdGFnLlxuICpcbiAqIEBwYXJhbSAgICAgIHtUcmFjZVNwYW5bXX0gICBzcGFucyAgICAgICAgICAgIFRoZSBzcGFucyBmb3IgYSB0cmFjZSAtIHNob3VsZCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCB3aXRoIGNoaWxkcmVuIGZvbGxvd2luZyBwYXJlbnRzLlxuICogQHBhcmFtICAgICAge251bWJlcn0gICBwYXJlbnRTcGFuSW5kZXggIFRoZSBpbmRleCBvZiB0aGUgcGFyZW50IHNwYW4gLSBvbmx5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2VxdWVudCBzcGFucyB3aXRoIGRlcHRoIGxlc3MgdGhhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBwYXJlbnQgc3BhbiB3aWxsIGJlIGNoZWNrZWQuXG4gKiBAcmV0dXJucyAgICAge2Jvb2xlYW59ICBSZXR1cm5zIGB0cnVlYCBpZiBhIGRlc2NlbmRhbnQgY29udGFpbnMgYW4gZXJyb3IgdGFnLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BhbkNvbnRhaW5zRXJyZWRTcGFuKHNwYW5zOiBUcmFjZVNwYW5bXSwgcGFyZW50U3BhbkluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgeyBkZXB0aCB9ID0gc3BhbnNbcGFyZW50U3BhbkluZGV4XTtcbiAgbGV0IGkgPSBwYXJlbnRTcGFuSW5kZXggKyAxO1xuICBmb3IgKDsgaSA8IHNwYW5zLmxlbmd0aCAmJiBzcGFuc1tpXS5kZXB0aCA+IGRlcHRoOyBpKyspIHtcbiAgICBpZiAoaXNFcnJvclNwYW4oc3BhbnNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEV4cGVjdHMgdGhlIGZpcnN0IHNwYW4gdG8gYmUgdGhlIHBhcmVudCBzcGFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZFNlcnZlckNoaWxkU3BhbihzcGFuczogVHJhY2VTcGFuW10pIHtcbiAgaWYgKHNwYW5zLmxlbmd0aCA8PSAxIHx8ICFpc0NsaWVudFNwYW4oc3BhbnNbMF0pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHNwYW4gPSBzcGFuc1swXTtcbiAgY29uc3Qgc3BhbkNoaWxkRGVwdGggPSBzcGFuLmRlcHRoICsgMTtcbiAgbGV0IGkgPSAxO1xuICB3aGlsZSAoaSA8IHNwYW5zLmxlbmd0aCAmJiBzcGFuc1tpXS5kZXB0aCA9PT0gc3BhbkNoaWxkRGVwdGgpIHtcbiAgICBpZiAoaXNTZXJ2ZXJTcGFuKHNwYW5zW2ldKSkge1xuICAgICAgcmV0dXJuIHNwYW5zW2ldO1xuICAgIH1cbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBpc0tpbmRDbGllbnQgPSAoc3BhbjogVHJhY2VTcGFuKTogQm9vbGVhbiA9PlxuICBzcGFuLnRhZ3Muc29tZSgoeyBrZXksIHZhbHVlIH0pID0+IGtleSA9PT0gJ3NwYW4ua2luZCcgJiYgdmFsdWUgPT09ICdjbGllbnQnKTtcblxuZXhwb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi91dGlscy9kYXRlJztcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sU0FBU0Esc0JBQXNCQSxDQUFDQyxTQUEyRSxFQUFFO0VBQ2xILElBQVFDLEdBQUcsR0FBOEJELFNBQVMsQ0FBMUNDLEdBQUc7SUFBRUMsR0FBRyxHQUF5QkYsU0FBUyxDQUFyQ0UsR0FBRztJQUFFQyxTQUFTLEdBQWNILFNBQVMsQ0FBaENHLFNBQVM7SUFBRUMsT0FBTyxHQUFLSixTQUFTLENBQXJCSSxPQUFPO0VBQ3BDLElBQU1DLFFBQVEsR0FBR0gsR0FBRyxHQUFHRCxHQUFHO0VBQzFCLElBQU1LLE9BQU8sR0FBR0wsR0FBRyxHQUFHRSxTQUFTLEdBQUdFLFFBQVE7RUFDMUMsSUFBTUUsT0FBTyxHQUFHTCxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUdFLE9BQU8sSUFBSUMsUUFBUTtFQUM5QyxJQUFNRyxVQUFVLEdBQUdELE9BQU8sR0FBR0QsT0FBTzs7RUFFcEM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsT0FBTyxVQUFDRyxLQUFhLEVBQUVDLEdBQVc7SUFBQSxPQUFNO01BQ3RDRCxLQUFLLEVBQUUsQ0FBQ0EsS0FBSyxHQUFHSCxPQUFPLElBQUlFLFVBQVU7TUFDckNFLEdBQUcsRUFBRSxDQUFDQSxHQUFHLEdBQUdKLE9BQU8sSUFBSUU7SUFDekIsQ0FBQztFQUFBLENBQUM7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFNBQVNHLFVBQVVBLENBQUNDLEdBQVcsRUFBRUMsS0FBVSxFQUFFQyxJQUFlLEVBQUU7RUFDbkUsSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ0YsSUFBSSxDQUFDRyxJQUFJLENBQUMsSUFBSSxDQUFDSCxJQUFJLENBQUNHLElBQUksQ0FBQ0MsTUFBTSxFQUFFO0lBQ2xELE9BQU8sS0FBSztFQUNkO0VBQ0EsT0FBT0osSUFBSSxDQUFDRyxJQUFJLENBQUNFLElBQUksQ0FBQyxVQUFDQyxHQUFHO0lBQUEsT0FBS0EsR0FBRyxDQUFDUixHQUFHLEtBQUtBLEdBQUcsSUFBSVEsR0FBRyxDQUFDUCxLQUFLLEtBQUtBLEtBQUs7RUFBQSxFQUFDO0FBQ3hFO0FBRUEsT0FBTyxJQUFNUSxZQUFZLEdBQUdWLFVBQVUsQ0FBQ1csSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDO0FBQ3hFLE9BQU8sSUFBTUMsWUFBWSxHQUFHWixVQUFVLENBQUNXLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQztBQUV4RSxJQUFNRSxXQUFXLEdBQUdiLFVBQVUsQ0FBQ1csSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO0FBQ3hELElBQU1HLFVBQVUsR0FBR2QsVUFBVSxDQUFDVyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFDekQsT0FBTyxJQUFNSSxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSVosSUFBZTtFQUFBLE9BQUtVLFdBQVcsQ0FBQ1YsSUFBSSxDQUFDLElBQUlXLFVBQVUsQ0FBQ1gsSUFBSSxDQUFDO0FBQUE7O0FBRXJGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFNBQVNhLHFCQUFxQkEsQ0FBQ0MsS0FBa0IsRUFBRUMsZUFBdUIsRUFBRTtFQUNqRixJQUFRQyxLQUFLLEdBQUtGLEtBQUssQ0FBQ0MsZUFBZSxDQUFDLENBQWhDQyxLQUFLO0VBQ2IsSUFBSUMsQ0FBQyxHQUFHRixlQUFlLEdBQUcsQ0FBQztFQUMzQixPQUFPRSxDQUFDLEdBQUdILEtBQUssQ0FBQ1YsTUFBTSxJQUFJVSxLQUFLLENBQUNHLENBQUMsQ0FBQyxDQUFDRCxLQUFLLEdBQUdBLEtBQUssRUFBRUMsQ0FBQyxFQUFFLEVBQUU7SUFDdEQsSUFBSUwsV0FBVyxDQUFDRSxLQUFLLENBQUNHLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDekIsT0FBTyxJQUFJO0lBQ2I7RUFDRjtFQUNBLE9BQU8sS0FBSztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sU0FBU0MsbUJBQW1CQSxDQUFDSixLQUFrQixFQUFFO0VBQ3RELElBQUlBLEtBQUssQ0FBQ1YsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDRyxZQUFZLENBQUNPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ2hELE9BQU8sS0FBSztFQUNkO0VBQ0EsSUFBTWQsSUFBSSxHQUFHYyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLElBQU1LLGNBQWMsR0FBR25CLElBQUksQ0FBQ2dCLEtBQUssR0FBRyxDQUFDO0VBQ3JDLElBQUlDLENBQUMsR0FBRyxDQUFDO0VBQ1QsT0FBT0EsQ0FBQyxHQUFHSCxLQUFLLENBQUNWLE1BQU0sSUFBSVUsS0FBSyxDQUFDRyxDQUFDLENBQUMsQ0FBQ0QsS0FBSyxLQUFLRyxjQUFjLEVBQUU7SUFDNUQsSUFBSVYsWUFBWSxDQUFDSyxLQUFLLENBQUNHLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDMUIsT0FBT0gsS0FBSyxDQUFDRyxDQUFDLENBQUM7SUFDakI7SUFDQUEsQ0FBQyxFQUFFO0VBQ0w7RUFDQSxPQUFPLElBQUk7QUFDYjtBQUVBLE9BQU8sSUFBTUcsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUlwQixJQUFlO0VBQUEsT0FDMUNBLElBQUksQ0FBQ0csSUFBSSxDQUFDRSxJQUFJLENBQUMsVUFBQWdCLElBQUE7SUFBQSxJQUFHdkIsR0FBRyxHQUFBdUIsSUFBQSxDQUFIdkIsR0FBRztNQUFFQyxLQUFLLEdBQUFzQixJQUFBLENBQUx0QixLQUFLO0lBQUEsT0FBT0QsR0FBRyxLQUFLLFdBQVcsSUFBSUMsS0FBSyxLQUFLLFFBQVE7RUFBQSxFQUFDO0FBQUE7QUFFL0UsU0FBU3VCLGNBQWMsUUFBUSxlQUFlIiwiaWdub3JlTGlzdCI6W119