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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0cmFjZUdlbmVyYXRvciIsInByb2Nlc3NTZWxlY3RvcnMiLCJnZW5lcmF0ZWRUcmFjZSIsInRyYWNlIiwibnVtYmVyT2ZTcGFucyIsIml0IiwicHJvYyIsInByb2Nlc3NlcyIsIk9iamVjdCIsImtleXMiLCJleHBlY3QiLCJnZXRQcm9jZXNzU2VydmljZU5hbWUiLCJ0b0JlIiwic2VydmljZU5hbWUiLCJnZXRQcm9jZXNzVGFncyIsInRhZ3MiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlbGVjdG9ycy9wcm9jZXNzLnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5pbXBvcnQgdHJhY2VHZW5lcmF0b3IgZnJvbSAnLi4vZGVtby90cmFjZS1nZW5lcmF0b3JzJztcbmltcG9ydCB7IFRyYWNlUHJvY2VzcyB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0ICogYXMgcHJvY2Vzc1NlbGVjdG9ycyBmcm9tICcuL3Byb2Nlc3MnO1xuXG5jb25zdCBnZW5lcmF0ZWRUcmFjZSA9IHRyYWNlR2VuZXJhdG9yLnRyYWNlKHsgbnVtYmVyT2ZTcGFuczogNDUgfSk7XG5cbml0KCdnZXRQcm9jZXNzU2VydmljZU5hbWUoKSBzaG91bGQgcmV0dXJuIHRoZSBzZXJ2aWNlTmFtZSBvZiB0aGUgcHJvY2VzcycsICgpID0+IHtcbiAgY29uc3QgcHJvYzogVHJhY2VQcm9jZXNzID0gZ2VuZXJhdGVkVHJhY2UucHJvY2Vzc2VzW09iamVjdC5rZXlzKGdlbmVyYXRlZFRyYWNlLnByb2Nlc3NlcylbMF1dO1xuICBleHBlY3QocHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzU2VydmljZU5hbWUocHJvYykpLnRvQmUocHJvYy5zZXJ2aWNlTmFtZSk7XG59KTtcblxuaXQoJ2dldFByb2Nlc3NUYWdzKCkgc2hvdWxkIHJldHVybiB0aGUgdGFncyBvbiB0aGUgcHJvY2VzcycsICgpID0+IHtcbiAgY29uc3QgcHJvYzogVHJhY2VQcm9jZXNzID0gZ2VuZXJhdGVkVHJhY2UucHJvY2Vzc2VzW09iamVjdC5rZXlzKGdlbmVyYXRlZFRyYWNlLnByb2Nlc3NlcylbMF1dO1xuICBleHBlY3QocHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzVGFncyhwcm9jKSkudG9CZShwcm9jLnRhZ3MpO1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBT0EsY0FBYyxNQUFNLDBCQUEwQjtBQUdyRCxPQUFPLEtBQUtDLGdCQUFnQixNQUFNLFdBQVc7QUFFN0MsSUFBTUMsY0FBYyxHQUFHRixjQUFjLENBQUNHLEtBQUssQ0FBQztFQUFFQyxhQUFhLEVBQUU7QUFBRyxDQUFDLENBQUM7QUFFbEVDLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxZQUFNO0VBQy9FLElBQU1DLElBQWtCLEdBQUdKLGNBQWMsQ0FBQ0ssU0FBUyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ1AsY0FBYyxDQUFDSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RkcsTUFBTSxDQUFDVCxnQkFBZ0IsQ0FBQ1UscUJBQXFCLENBQUNMLElBQUksQ0FBQyxDQUFDLENBQUNNLElBQUksQ0FBQ04sSUFBSSxDQUFDTyxXQUFXLENBQUM7QUFDN0UsQ0FBQyxDQUFDO0FBRUZSLEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxZQUFNO0VBQ2pFLElBQU1DLElBQWtCLEdBQUdKLGNBQWMsQ0FBQ0ssU0FBUyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ1AsY0FBYyxDQUFDSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RkcsTUFBTSxDQUFDVCxnQkFBZ0IsQ0FBQ2EsY0FBYyxDQUFDUixJQUFJLENBQUMsQ0FBQyxDQUFDTSxJQUFJLENBQUNOLElBQUksQ0FBQ1MsSUFBSSxDQUFDO0FBQy9ELENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==