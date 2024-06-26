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

import Combokeys from 'combokeys';
import keyboardMappings from './keyboard-mappings';
var instance;
function getInstance() {
  if (instance) {
    return instance;
  }
  var local = new Combokeys(document.body);
  instance = local;
  return local;
}
export function merge(callbacks) {
  var inst = getInstance();
  Object.keys(callbacks).forEach(function (name) {
    var keysHandler = callbacks[name];
    if (keysHandler) {
      inst.bind(keyboardMappings[name].binding, keysHandler);
    }
  });
}
export function reset() {
  var combokeys = getInstance();
  combokeys.reset();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21ib2tleXMiLCJrZXlib2FyZE1hcHBpbmdzIiwiaW5zdGFuY2UiLCJnZXRJbnN0YW5jZSIsImxvY2FsIiwiZG9jdW1lbnQiLCJib2R5IiwibWVyZ2UiLCJjYWxsYmFja3MiLCJpbnN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwia2V5c0hhbmRsZXIiLCJiaW5kIiwiYmluZGluZyIsInJlc2V0IiwiY29tYm9rZXlzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2tleWJvYXJkLXNob3J0Y3V0cy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBDb21ib2tleXMgZnJvbSAnY29tYm9rZXlzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGtleWJvYXJkTWFwcGluZ3MgZnJvbSAnLi9rZXlib2FyZC1tYXBwaW5ncyc7XG5cbmV4cG9ydCB0eXBlIENvbWJva2V5c0hhbmRsZXIgPVxuICB8ICgoKSA9PiB2b2lkKVxuICB8ICgoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8YW55PikgPT4gdm9pZClcbiAgfCAoKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PGFueT4sIHM6IHN0cmluZykgPT4gdm9pZCk7XG5cbmV4cG9ydCB0eXBlIFNob3J0Y3V0Q2FsbGJhY2tzID0ge1xuICBbbmFtZTogc3RyaW5nXTogQ29tYm9rZXlzSGFuZGxlcjtcbn07XG5cbmxldCBpbnN0YW5jZTogQ29tYm9rZXlzIHwgdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBnZXRJbnN0YW5jZSgpOiBDb21ib2tleXMge1xuICBpZiAoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbiAgY29uc3QgbG9jYWwgPSBuZXcgQ29tYm9rZXlzKGRvY3VtZW50LmJvZHkpO1xuICBpbnN0YW5jZSA9IGxvY2FsO1xuICByZXR1cm4gbG9jYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShjYWxsYmFja3M6IFNob3J0Y3V0Q2FsbGJhY2tzKSB7XG4gIGNvbnN0IGluc3QgPSBnZXRJbnN0YW5jZSgpO1xuICBPYmplY3Qua2V5cyhjYWxsYmFja3MpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBjb25zdCBrZXlzSGFuZGxlciA9IGNhbGxiYWNrc1tuYW1lXTtcbiAgICBpZiAoa2V5c0hhbmRsZXIpIHtcbiAgICAgIGluc3QuYmluZChrZXlib2FyZE1hcHBpbmdzW25hbWVdLmJpbmRpbmcsIGtleXNIYW5kbGVyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnN0IGNvbWJva2V5cyA9IGdldEluc3RhbmNlKCk7XG4gIGNvbWJva2V5cy5yZXNldCgpO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxTQUFTLE1BQU0sV0FBVztBQUdqQyxPQUFPQyxnQkFBZ0IsTUFBTSxxQkFBcUI7QUFXbEQsSUFBSUMsUUFBK0I7QUFFbkMsU0FBU0MsV0FBV0EsQ0FBQSxFQUFjO0VBQ2hDLElBQUlELFFBQVEsRUFBRTtJQUNaLE9BQU9BLFFBQVE7RUFDakI7RUFDQSxJQUFNRSxLQUFLLEdBQUcsSUFBSUosU0FBUyxDQUFDSyxRQUFRLENBQUNDLElBQUksQ0FBQztFQUMxQ0osUUFBUSxHQUFHRSxLQUFLO0VBQ2hCLE9BQU9BLEtBQUs7QUFDZDtBQUVBLE9BQU8sU0FBU0csS0FBS0EsQ0FBQ0MsU0FBNEIsRUFBRTtFQUNsRCxJQUFNQyxJQUFJLEdBQUdOLFdBQVcsQ0FBQyxDQUFDO0VBQzFCTyxNQUFNLENBQUNDLElBQUksQ0FBQ0gsU0FBUyxDQUFDLENBQUNJLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUs7SUFDdkMsSUFBTUMsV0FBVyxHQUFHTixTQUFTLENBQUNLLElBQUksQ0FBQztJQUNuQyxJQUFJQyxXQUFXLEVBQUU7TUFDZkwsSUFBSSxDQUFDTSxJQUFJLENBQUNkLGdCQUFnQixDQUFDWSxJQUFJLENBQUMsQ0FBQ0csT0FBTyxFQUFFRixXQUFXLENBQUM7SUFDeEQ7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLE9BQU8sU0FBU0csS0FBS0EsQ0FBQSxFQUFHO0VBQ3RCLElBQU1DLFNBQVMsR0FBR2YsV0FBVyxDQUFDLENBQUM7RUFDL0JlLFNBQVMsQ0FBQ0QsS0FBSyxDQUFDLENBQUM7QUFDbkIiLCJpZ25vcmVMaXN0IjpbXX0=