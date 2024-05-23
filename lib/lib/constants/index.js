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

export var FALLBACK_DAG_MAX_NUM_SERVICES = 100;
export var FALLBACK_TRACE_NAME = '<trace-without-root-span>';
export var FETCH_DONE = 'FETCH_DONE';
export var FETCH_ERROR = 'FETCH_ERROR';
export var FETCH_LOADING = 'FETCH_LOADING';
export var fetchedState = {
  DONE: FETCH_DONE,
  ERROR: FETCH_ERROR,
  LOADING: FETCH_LOADING
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGQUxMQkFDS19EQUdfTUFYX05VTV9TRVJWSUNFUyIsIkZBTExCQUNLX1RSQUNFX05BTUUiLCJGRVRDSF9ET05FIiwiRkVUQ0hfRVJST1IiLCJGRVRDSF9MT0FESU5HIiwiZmV0Y2hlZFN0YXRlIiwiRE9ORSIsIkVSUk9SIiwiTE9BRElORyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29uc3RhbnRzL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuZXhwb3J0IGNvbnN0IEZBTExCQUNLX0RBR19NQVhfTlVNX1NFUlZJQ0VTID0gMTAwIGFzIDEwMDtcbmV4cG9ydCBjb25zdCBGQUxMQkFDS19UUkFDRV9OQU1FID0gJzx0cmFjZS13aXRob3V0LXJvb3Qtc3Bhbj4nIGFzICc8dHJhY2Utd2l0aG91dC1yb290LXNwYW4+JztcblxuZXhwb3J0IGNvbnN0IEZFVENIX0RPTkUgPSAnRkVUQ0hfRE9ORScgYXMgJ0ZFVENIX0RPTkUnO1xuZXhwb3J0IGNvbnN0IEZFVENIX0VSUk9SID0gJ0ZFVENIX0VSUk9SJyBhcyAnRkVUQ0hfRVJST1InO1xuZXhwb3J0IGNvbnN0IEZFVENIX0xPQURJTkcgPSAnRkVUQ0hfTE9BRElORycgYXMgJ0ZFVENIX0xPQURJTkcnO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hlZFN0YXRlID0ge1xuICBET05FOiBGRVRDSF9ET05FLFxuICBFUlJPUjogRkVUQ0hfRVJST1IsXG4gIExPQURJTkc6IEZFVENIX0xPQURJTkcsXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLElBQU1BLDZCQUE2QixHQUFHLEdBQVU7QUFDdkQsT0FBTyxJQUFNQyxtQkFBbUIsR0FBRywyQkFBMEQ7QUFFN0YsT0FBTyxJQUFNQyxVQUFVLEdBQUcsWUFBNEI7QUFDdEQsT0FBTyxJQUFNQyxXQUFXLEdBQUcsYUFBOEI7QUFDekQsT0FBTyxJQUFNQyxhQUFhLEdBQUcsZUFBa0M7QUFFL0QsT0FBTyxJQUFNQyxZQUFZLEdBQUc7RUFDMUJDLElBQUksRUFBRUosVUFBVTtFQUNoQkssS0FBSyxFQUFFSixXQUFXO0VBQ2xCSyxPQUFPLEVBQUVKO0FBQ1gsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==