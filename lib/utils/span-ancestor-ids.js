// Copyright (c) 2019 Uber Technologies, Inc.
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

import { find as _find, get as _get } from 'lodash';
function getFirstAncestor(span) {
  return _get(_find(span.references, function (_ref) {
    var ref = _ref.span,
      refType = _ref.refType;
    return ref && ref.spanID && (refType === 'CHILD_OF' || refType === 'FOLLOWS_FROM');
  }), 'span');
}
export default function spanAncestorIds(span) {
  var ancestorIDs = [];
  if (!span) {
    return ancestorIDs;
  }
  var ref = getFirstAncestor(span);
  while (ref) {
    ancestorIDs.push(ref.spanID);
    ref = getFirstAncestor(ref);
  }
  return ancestorIDs;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmaW5kIiwiX2ZpbmQiLCJnZXQiLCJfZ2V0IiwiZ2V0Rmlyc3RBbmNlc3RvciIsInNwYW4iLCJyZWZlcmVuY2VzIiwiX3JlZiIsInJlZiIsInJlZlR5cGUiLCJzcGFuSUQiLCJzcGFuQW5jZXN0b3JJZHMiLCJhbmNlc3RvcklEcyIsInB1c2giXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3Bhbi1hbmNlc3Rvci1pZHMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBmaW5kIGFzIF9maW5kLCBnZXQgYXMgX2dldCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZVNwYW4gfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5cbmZ1bmN0aW9uIGdldEZpcnN0QW5jZXN0b3Ioc3BhbjogVHJhY2VTcGFuKTogVHJhY2VTcGFuIHwgVE5pbCB7XG4gIHJldHVybiBfZ2V0KFxuICAgIF9maW5kKFxuICAgICAgc3Bhbi5yZWZlcmVuY2VzLFxuICAgICAgKHsgc3BhbjogcmVmLCByZWZUeXBlIH0pID0+IHJlZiAmJiByZWYuc3BhbklEICYmIChyZWZUeXBlID09PSAnQ0hJTERfT0YnIHx8IHJlZlR5cGUgPT09ICdGT0xMT1dTX0ZST00nKVxuICAgICksXG4gICAgJ3NwYW4nXG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwYW5BbmNlc3RvcklkcyhzcGFuOiBUcmFjZVNwYW4gfCBUTmlsKTogc3RyaW5nW10ge1xuICBjb25zdCBhbmNlc3RvcklEczogc3RyaW5nW10gPSBbXTtcbiAgaWYgKCFzcGFuKSB7XG4gICAgcmV0dXJuIGFuY2VzdG9ySURzO1xuICB9XG4gIGxldCByZWYgPSBnZXRGaXJzdEFuY2VzdG9yKHNwYW4pO1xuICB3aGlsZSAocmVmKSB7XG4gICAgYW5jZXN0b3JJRHMucHVzaChyZWYuc3BhbklEKTtcbiAgICByZWYgPSBnZXRGaXJzdEFuY2VzdG9yKHJlZik7XG4gIH1cbiAgcmV0dXJuIGFuY2VzdG9ySURzO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxJQUFJLElBQUlDLEtBQUssRUFBRUMsR0FBRyxJQUFJQyxJQUFJLFFBQVEsUUFBUTtBQUtuRCxTQUFTQyxnQkFBZ0JBLENBQUNDLElBQWUsRUFBb0I7RUFDM0QsT0FBT0YsSUFBSSxDQUNURixLQUFLLENBQ0hJLElBQUksQ0FBQ0MsVUFBVSxFQUNmLFVBQUFDLElBQUE7SUFBQSxJQUFTQyxHQUFHLEdBQUFELElBQUEsQ0FBVEYsSUFBSTtNQUFPSSxPQUFPLEdBQUFGLElBQUEsQ0FBUEUsT0FBTztJQUFBLE9BQU9ELEdBQUcsSUFBSUEsR0FBRyxDQUFDRSxNQUFNLEtBQUtELE9BQU8sS0FBSyxVQUFVLElBQUlBLE9BQU8sS0FBSyxjQUFjLENBQUM7RUFBQSxDQUN6RyxDQUFDLEVBQ0QsTUFDRixDQUFDO0FBQ0g7QUFFQSxlQUFlLFNBQVNFLGVBQWVBLENBQUNOLElBQXNCLEVBQVk7RUFDeEUsSUFBTU8sV0FBcUIsR0FBRyxFQUFFO0VBQ2hDLElBQUksQ0FBQ1AsSUFBSSxFQUFFO0lBQ1QsT0FBT08sV0FBVztFQUNwQjtFQUNBLElBQUlKLEdBQUcsR0FBR0osZ0JBQWdCLENBQUNDLElBQUksQ0FBQztFQUNoQyxPQUFPRyxHQUFHLEVBQUU7SUFDVkksV0FBVyxDQUFDQyxJQUFJLENBQUNMLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDO0lBQzVCRixHQUFHLEdBQUdKLGdCQUFnQixDQUFDSSxHQUFHLENBQUM7RUFDN0I7RUFDQSxPQUFPSSxXQUFXO0FBQ3BCIiwiaWdub3JlTGlzdCI6W119