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

// See https://github.com/jaegertracing/jaeger-ui/issues/115 for details.

var references = [{
  refType: 'FOLLOWS_FROM',
  spanID: 'ea7cfaca83f0724b',
  traceID: '2992f2a5b5d037a8aabffd08ef384237'
}];
export var followsFromRef = {
  processes: {
    p1: {
      serviceName: 'issue115',
      tags: []
    }
  },
  spans: [{
    duration: 1173,
    flags: 1,
    logs: [],
    operationName: 'thread',
    processID: 'p1',
    references: references,
    spanID: '1bdf4201221bb2ac',
    startTime: 1509533706521220,
    tags: [],
    traceID: '2992f2a5b5d037a8aabffd08ef384237',
    warnings: null
  }, {
    duration: 70406,
    flags: 1,
    logs: [],
    operationName: 'demo',
    processID: 'p1',
    references: [],
    spanID: 'ea7cfaca83f0724b',
    startTime: 1509533706470949,
    tags: [],
    traceID: '2992f2a5b5d037a8aabffd08ef384237',
    warnings: null
  }],
  traceID: '2992f2a5b5d037a8aabffd08ef384237',
  warnings: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWZlcmVuY2VzIiwicmVmVHlwZSIsInNwYW5JRCIsInRyYWNlSUQiLCJmb2xsb3dzRnJvbVJlZiIsInByb2Nlc3NlcyIsInAxIiwic2VydmljZU5hbWUiLCJ0YWdzIiwic3BhbnMiLCJkdXJhdGlvbiIsImZsYWdzIiwibG9ncyIsIm9wZXJhdGlvbk5hbWUiLCJwcm9jZXNzSUQiLCJzdGFydFRpbWUiLCJ3YXJuaW5ncyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZWxlY3RvcnMvdHJhY2UuZml4dHVyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYWVnZXJ0cmFjaW5nL2phZWdlci11aS9pc3N1ZXMvMTE1IGZvciBkZXRhaWxzLlxuXG5pbXBvcnQgeyBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5cbmNvbnN0IHJlZmVyZW5jZXM6IFRyYWNlU3BhblJlZmVyZW5jZVtdID0gW1xuICB7XG4gICAgcmVmVHlwZTogJ0ZPTExPV1NfRlJPTScsXG4gICAgc3BhbklEOiAnZWE3Y2ZhY2E4M2YwNzI0YicsXG4gICAgdHJhY2VJRDogJzI5OTJmMmE1YjVkMDM3YThhYWJmZmQwOGVmMzg0MjM3JyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBmb2xsb3dzRnJvbVJlZiA9IHtcbiAgcHJvY2Vzc2VzOiB7XG4gICAgcDE6IHtcbiAgICAgIHNlcnZpY2VOYW1lOiAnaXNzdWUxMTUnLFxuICAgICAgdGFnczogW10sXG4gICAgfSxcbiAgfSxcbiAgc3BhbnM6IFtcbiAgICB7XG4gICAgICBkdXJhdGlvbjogMTE3MyxcbiAgICAgIGZsYWdzOiAxLFxuICAgICAgbG9nczogW10sXG4gICAgICBvcGVyYXRpb25OYW1lOiAndGhyZWFkJyxcbiAgICAgIHByb2Nlc3NJRDogJ3AxJyxcbiAgICAgIHJlZmVyZW5jZXM6IHJlZmVyZW5jZXMsXG4gICAgICBzcGFuSUQ6ICcxYmRmNDIwMTIyMWJiMmFjJyxcbiAgICAgIHN0YXJ0VGltZTogMTUwOTUzMzcwNjUyMTIyMCxcbiAgICAgIHRhZ3M6IFtdLFxuICAgICAgdHJhY2VJRDogJzI5OTJmMmE1YjVkMDM3YThhYWJmZmQwOGVmMzg0MjM3JyxcbiAgICAgIHdhcm5pbmdzOiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgZHVyYXRpb246IDcwNDA2LFxuICAgICAgZmxhZ3M6IDEsXG4gICAgICBsb2dzOiBbXSxcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdkZW1vJyxcbiAgICAgIHByb2Nlc3NJRDogJ3AxJyxcbiAgICAgIHJlZmVyZW5jZXM6IFtdLFxuICAgICAgc3BhbklEOiAnZWE3Y2ZhY2E4M2YwNzI0YicsXG4gICAgICBzdGFydFRpbWU6IDE1MDk1MzM3MDY0NzA5NDksXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHRyYWNlSUQ6ICcyOTkyZjJhNWI1ZDAzN2E4YWFiZmZkMDhlZjM4NDIzNycsXG4gICAgICB3YXJuaW5nczogbnVsbCxcbiAgICB9LFxuICBdLFxuICB0cmFjZUlEOiAnMjk5MmYyYTViNWQwMzdhOGFhYmZmZDA4ZWYzODQyMzcnLFxuICB3YXJuaW5nczogbnVsbCxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUlBLElBQU1BLFVBQWdDLEdBQUcsQ0FDdkM7RUFDRUMsT0FBTyxFQUFFLGNBQWM7RUFDdkJDLE1BQU0sRUFBRSxrQkFBa0I7RUFDMUJDLE9BQU8sRUFBRTtBQUNYLENBQUMsQ0FDRjtBQUVELE9BQU8sSUFBTUMsY0FBYyxHQUFHO0VBQzVCQyxTQUFTLEVBQUU7SUFDVEMsRUFBRSxFQUFFO01BQ0ZDLFdBQVcsRUFBRSxVQUFVO01BQ3ZCQyxJQUFJLEVBQUU7SUFDUjtFQUNGLENBQUM7RUFDREMsS0FBSyxFQUFFLENBQ0w7SUFDRUMsUUFBUSxFQUFFLElBQUk7SUFDZEMsS0FBSyxFQUFFLENBQUM7SUFDUkMsSUFBSSxFQUFFLEVBQUU7SUFDUkMsYUFBYSxFQUFFLFFBQVE7SUFDdkJDLFNBQVMsRUFBRSxJQUFJO0lBQ2ZkLFVBQVUsRUFBRUEsVUFBVTtJQUN0QkUsTUFBTSxFQUFFLGtCQUFrQjtJQUMxQmEsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQlAsSUFBSSxFQUFFLEVBQUU7SUFDUkwsT0FBTyxFQUFFLGtDQUFrQztJQUMzQ2EsUUFBUSxFQUFFO0VBQ1osQ0FBQyxFQUNEO0lBQ0VOLFFBQVEsRUFBRSxLQUFLO0lBQ2ZDLEtBQUssRUFBRSxDQUFDO0lBQ1JDLElBQUksRUFBRSxFQUFFO0lBQ1JDLGFBQWEsRUFBRSxNQUFNO0lBQ3JCQyxTQUFTLEVBQUUsSUFBSTtJQUNmZCxVQUFVLEVBQUUsRUFBRTtJQUNkRSxNQUFNLEVBQUUsa0JBQWtCO0lBQzFCYSxTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCUCxJQUFJLEVBQUUsRUFBRTtJQUNSTCxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDYSxRQUFRLEVBQUU7RUFDWixDQUFDLENBQ0Y7RUFDRGIsT0FBTyxFQUFFLGtDQUFrQztFQUMzQ2EsUUFBUSxFQUFFO0FBQ1osQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==