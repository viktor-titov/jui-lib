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
import traceGenerator from '../demo/trace-generators';
import * as processSelectors from './process';
var generatedTrace = traceGenerator.trace({
  numberOfSpans: 45
});
it('getProcessServiceName() should return the serviceName of the process', function () {
  var proc = generatedTrace.processes[Object.keys(generatedTrace.processes)[0]];
  expect(processSelectors.getProcessServiceName(proc)).toBe(proc.serviceName);
});
it('getProcessTags() should return the tags on the process', function () {
  var proc = generatedTrace.processes[Object.keys(generatedTrace.processes)[0]];
  expect(processSelectors.getProcessTags(proc)).toBe(proc.tags);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0cmFjZUdlbmVyYXRvciIsInByb2Nlc3NTZWxlY3RvcnMiLCJnZW5lcmF0ZWRUcmFjZSIsInRyYWNlIiwibnVtYmVyT2ZTcGFucyIsIml0IiwicHJvYyIsInByb2Nlc3NlcyIsIk9iamVjdCIsImtleXMiLCJleHBlY3QiLCJnZXRQcm9jZXNzU2VydmljZU5hbWUiLCJ0b0JlIiwic2VydmljZU5hbWUiLCJnZXRQcm9jZXNzVGFncyIsInRhZ3MiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VsZWN0b3JzL3Byb2Nlc3MudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbmltcG9ydCB0cmFjZUdlbmVyYXRvciBmcm9tICcuLi9kZW1vL3RyYWNlLWdlbmVyYXRvcnMnO1xuaW1wb3J0IHsgVHJhY2VQcm9jZXNzIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgKiBhcyBwcm9jZXNzU2VsZWN0b3JzIGZyb20gJy4vcHJvY2Vzcyc7XG5cbmNvbnN0IGdlbmVyYXRlZFRyYWNlID0gdHJhY2VHZW5lcmF0b3IudHJhY2UoeyBudW1iZXJPZlNwYW5zOiA0NSB9KTtcblxuaXQoJ2dldFByb2Nlc3NTZXJ2aWNlTmFtZSgpIHNob3VsZCByZXR1cm4gdGhlIHNlcnZpY2VOYW1lIG9mIHRoZSBwcm9jZXNzJywgKCkgPT4ge1xuICBjb25zdCBwcm9jOiBUcmFjZVByb2Nlc3MgPSBnZW5lcmF0ZWRUcmFjZS5wcm9jZXNzZXNbT2JqZWN0LmtleXMoZ2VuZXJhdGVkVHJhY2UucHJvY2Vzc2VzKVswXV07XG4gIGV4cGVjdChwcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTZXJ2aWNlTmFtZShwcm9jKSkudG9CZShwcm9jLnNlcnZpY2VOYW1lKTtcbn0pO1xuXG5pdCgnZ2V0UHJvY2Vzc1RhZ3MoKSBzaG91bGQgcmV0dXJuIHRoZSB0YWdzIG9uIHRoZSBwcm9jZXNzJywgKCkgPT4ge1xuICBjb25zdCBwcm9jOiBUcmFjZVByb2Nlc3MgPSBnZW5lcmF0ZWRUcmFjZS5wcm9jZXNzZXNbT2JqZWN0LmtleXMoZ2VuZXJhdGVkVHJhY2UucHJvY2Vzc2VzKVswXV07XG4gIGV4cGVjdChwcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NUYWdzKHByb2MpKS50b0JlKHByb2MudGFncyk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPQSxjQUFjLE1BQU0sMEJBQTBCO0FBR3JELE9BQU8sS0FBS0MsZ0JBQWdCLE1BQU0sV0FBVztBQUU3QyxJQUFNQyxjQUFjLEdBQUdGLGNBQWMsQ0FBQ0csS0FBSyxDQUFDO0VBQUVDLGFBQWEsRUFBRTtBQUFHLENBQUMsQ0FBQztBQUVsRUMsRUFBRSxDQUFDLHNFQUFzRSxFQUFFLFlBQU07RUFDL0UsSUFBTUMsSUFBa0IsR0FBR0osY0FBYyxDQUFDSyxTQUFTLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDUCxjQUFjLENBQUNLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdGRyxNQUFNLENBQUNULGdCQUFnQixDQUFDVSxxQkFBcUIsQ0FBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQ00sSUFBSSxDQUFDTixJQUFJLENBQUNPLFdBQVcsQ0FBQztBQUM3RSxDQUFDLENBQUM7QUFFRlIsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLFlBQU07RUFDakUsSUFBTUMsSUFBa0IsR0FBR0osY0FBYyxDQUFDSyxTQUFTLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDUCxjQUFjLENBQUNLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdGRyxNQUFNLENBQUNULGdCQUFnQixDQUFDYSxjQUFjLENBQUNSLElBQUksQ0FBQyxDQUFDLENBQUNNLElBQUksQ0FBQ04sSUFBSSxDQUFDUyxJQUFJLENBQUM7QUFDL0QsQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119