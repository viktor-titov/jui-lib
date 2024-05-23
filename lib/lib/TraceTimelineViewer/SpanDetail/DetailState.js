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
 * Which items of a {@link SpanDetail} component are expanded.
 */
var DetailState = /*#__PURE__*/function () {
  function DetailState(oldState) {
    var _ref = oldState || {},
      isTagsOpen = _ref.isTagsOpen,
      isProcessOpen = _ref.isProcessOpen,
      isReferencesOpen = _ref.isReferencesOpen,
      isWarningsOpen = _ref.isWarningsOpen,
      isStackTracesOpen = _ref.isStackTracesOpen,
      logs = _ref.logs,
      references = _ref.references;
    this.isTagsOpen = Boolean(isTagsOpen);
    this.isProcessOpen = Boolean(isProcessOpen);
    this.isReferencesOpen = Boolean(isReferencesOpen);
    this.isWarningsOpen = Boolean(isWarningsOpen);
    this.isStackTracesOpen = Boolean(isStackTracesOpen);
    this.logs = {
      isOpen: Boolean(logs && logs.isOpen),
      openedItems: logs && logs.openedItems ? new Set(logs.openedItems) : new Set()
    };
    this.references = {
      isOpen: Boolean(references && references.isOpen),
      openedItems: references && references.openedItems ? new Set(references.openedItems) : new Set()
    };
  }
  var _proto = DetailState.prototype;
  _proto.toggleTags = function toggleTags() {
    var next = new DetailState(this);
    next.isTagsOpen = !this.isTagsOpen;
    return next;
  };
  _proto.toggleProcess = function toggleProcess() {
    var next = new DetailState(this);
    next.isProcessOpen = !this.isProcessOpen;
    return next;
  };
  _proto.toggleReferences = function toggleReferences() {
    var next = new DetailState(this);
    next.references.isOpen = !this.references.isOpen;
    return next;
  };
  _proto.toggleReferenceItem = function toggleReferenceItem(reference) {
    var next = new DetailState(this);
    if (next.references.openedItems.has(reference)) {
      next.references.openedItems["delete"](reference);
    } else {
      next.references.openedItems.add(reference);
    }
    return next;
  };
  _proto.toggleWarnings = function toggleWarnings() {
    var next = new DetailState(this);
    next.isWarningsOpen = !this.isWarningsOpen;
    return next;
  };
  _proto.toggleStackTraces = function toggleStackTraces() {
    var next = new DetailState(this);
    next.isStackTracesOpen = !this.isStackTracesOpen;
    return next;
  };
  _proto.toggleLogs = function toggleLogs() {
    var next = new DetailState(this);
    next.logs.isOpen = !this.logs.isOpen;
    return next;
  };
  _proto.toggleLogItem = function toggleLogItem(logItem) {
    var next = new DetailState(this);
    if (next.logs.openedItems.has(logItem)) {
      next.logs.openedItems["delete"](logItem);
    } else {
      next.logs.openedItems.add(logItem);
    }
    return next;
  };
  return DetailState;
}();
export { DetailState as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXRhaWxTdGF0ZSIsIm9sZFN0YXRlIiwiX3JlZiIsImlzVGFnc09wZW4iLCJpc1Byb2Nlc3NPcGVuIiwiaXNSZWZlcmVuY2VzT3BlbiIsImlzV2FybmluZ3NPcGVuIiwiaXNTdGFja1RyYWNlc09wZW4iLCJsb2dzIiwicmVmZXJlbmNlcyIsIkJvb2xlYW4iLCJpc09wZW4iLCJvcGVuZWRJdGVtcyIsIlNldCIsIl9wcm90byIsInByb3RvdHlwZSIsInRvZ2dsZVRhZ3MiLCJuZXh0IiwidG9nZ2xlUHJvY2VzcyIsInRvZ2dsZVJlZmVyZW5jZXMiLCJ0b2dnbGVSZWZlcmVuY2VJdGVtIiwicmVmZXJlbmNlIiwiaGFzIiwiYWRkIiwidG9nZ2xlV2FybmluZ3MiLCJ0b2dnbGVTdGFja1RyYWNlcyIsInRvZ2dsZUxvZ3MiLCJ0b2dnbGVMb2dJdGVtIiwibG9nSXRlbSIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkRldGFpbC9EZXRhaWxTdGF0ZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRyYWNlTG9nLCBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5cbi8qKlxuICogV2hpY2ggaXRlbXMgb2YgYSB7QGxpbmsgU3BhbkRldGFpbH0gY29tcG9uZW50IGFyZSBleHBhbmRlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0YWlsU3RhdGUge1xuICBpc1RhZ3NPcGVuOiBib29sZWFuO1xuICBpc1Byb2Nlc3NPcGVuOiBib29sZWFuO1xuICBsb2dzOiB7IGlzT3BlbjogYm9vbGVhbjsgb3BlbmVkSXRlbXM6IFNldDxUcmFjZUxvZz4gfTtcbiAgcmVmZXJlbmNlczogeyBpc09wZW46IGJvb2xlYW47IG9wZW5lZEl0ZW1zOiBTZXQ8VHJhY2VTcGFuUmVmZXJlbmNlPiB9O1xuICBpc1dhcm5pbmdzT3BlbjogYm9vbGVhbjtcbiAgaXNTdGFja1RyYWNlc09wZW46IGJvb2xlYW47XG4gIGlzUmVmZXJlbmNlc09wZW46IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Iob2xkU3RhdGU/OiBEZXRhaWxTdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzVGFnc09wZW4sXG4gICAgICBpc1Byb2Nlc3NPcGVuLFxuICAgICAgaXNSZWZlcmVuY2VzT3BlbixcbiAgICAgIGlzV2FybmluZ3NPcGVuLFxuICAgICAgaXNTdGFja1RyYWNlc09wZW4sXG4gICAgICBsb2dzLFxuICAgICAgcmVmZXJlbmNlcyxcbiAgICB9OiBEZXRhaWxTdGF0ZSB8IFJlY29yZDxzdHJpbmcsIHVuZGVmaW5lZD4gPSBvbGRTdGF0ZSB8fCB7fTtcbiAgICB0aGlzLmlzVGFnc09wZW4gPSBCb29sZWFuKGlzVGFnc09wZW4pO1xuICAgIHRoaXMuaXNQcm9jZXNzT3BlbiA9IEJvb2xlYW4oaXNQcm9jZXNzT3Blbik7XG4gICAgdGhpcy5pc1JlZmVyZW5jZXNPcGVuID0gQm9vbGVhbihpc1JlZmVyZW5jZXNPcGVuKTtcbiAgICB0aGlzLmlzV2FybmluZ3NPcGVuID0gQm9vbGVhbihpc1dhcm5pbmdzT3Blbik7XG4gICAgdGhpcy5pc1N0YWNrVHJhY2VzT3BlbiA9IEJvb2xlYW4oaXNTdGFja1RyYWNlc09wZW4pO1xuICAgIHRoaXMubG9ncyA9IHtcbiAgICAgIGlzT3BlbjogQm9vbGVhbihsb2dzICYmIGxvZ3MuaXNPcGVuKSxcbiAgICAgIG9wZW5lZEl0ZW1zOiBsb2dzICYmIGxvZ3Mub3BlbmVkSXRlbXMgPyBuZXcgU2V0KGxvZ3Mub3BlbmVkSXRlbXMpIDogbmV3IFNldCgpLFxuICAgIH07XG4gICAgdGhpcy5yZWZlcmVuY2VzID0ge1xuICAgICAgaXNPcGVuOiBCb29sZWFuKHJlZmVyZW5jZXMgJiYgcmVmZXJlbmNlcy5pc09wZW4pLFxuICAgICAgb3BlbmVkSXRlbXM6IHJlZmVyZW5jZXMgJiYgcmVmZXJlbmNlcy5vcGVuZWRJdGVtcyA/IG5ldyBTZXQocmVmZXJlbmNlcy5vcGVuZWRJdGVtcykgOiBuZXcgU2V0KCksXG4gICAgfTtcbiAgfVxuXG4gIHRvZ2dsZVRhZ3MoKSB7XG4gICAgY29uc3QgbmV4dCA9IG5ldyBEZXRhaWxTdGF0ZSh0aGlzKTtcbiAgICBuZXh0LmlzVGFnc09wZW4gPSAhdGhpcy5pc1RhZ3NPcGVuO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgdG9nZ2xlUHJvY2VzcygpIHtcbiAgICBjb25zdCBuZXh0ID0gbmV3IERldGFpbFN0YXRlKHRoaXMpO1xuICAgIG5leHQuaXNQcm9jZXNzT3BlbiA9ICF0aGlzLmlzUHJvY2Vzc09wZW47XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICB0b2dnbGVSZWZlcmVuY2VzKCkge1xuICAgIGNvbnN0IG5leHQgPSBuZXcgRGV0YWlsU3RhdGUodGhpcyk7XG4gICAgbmV4dC5yZWZlcmVuY2VzLmlzT3BlbiA9ICF0aGlzLnJlZmVyZW5jZXMuaXNPcGVuO1xuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgdG9nZ2xlUmVmZXJlbmNlSXRlbShyZWZlcmVuY2U6IFRyYWNlU3BhblJlZmVyZW5jZSkge1xuICAgIGNvbnN0IG5leHQgPSBuZXcgRGV0YWlsU3RhdGUodGhpcyk7XG4gICAgaWYgKG5leHQucmVmZXJlbmNlcy5vcGVuZWRJdGVtcy5oYXMocmVmZXJlbmNlKSkge1xuICAgICAgbmV4dC5yZWZlcmVuY2VzLm9wZW5lZEl0ZW1zLmRlbGV0ZShyZWZlcmVuY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0LnJlZmVyZW5jZXMub3BlbmVkSXRlbXMuYWRkKHJlZmVyZW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgdG9nZ2xlV2FybmluZ3MoKSB7XG4gICAgY29uc3QgbmV4dCA9IG5ldyBEZXRhaWxTdGF0ZSh0aGlzKTtcbiAgICBuZXh0LmlzV2FybmluZ3NPcGVuID0gIXRoaXMuaXNXYXJuaW5nc09wZW47XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICB0b2dnbGVTdGFja1RyYWNlcygpIHtcbiAgICBjb25zdCBuZXh0ID0gbmV3IERldGFpbFN0YXRlKHRoaXMpO1xuICAgIG5leHQuaXNTdGFja1RyYWNlc09wZW4gPSAhdGhpcy5pc1N0YWNrVHJhY2VzT3BlbjtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuXG4gIHRvZ2dsZUxvZ3MoKSB7XG4gICAgY29uc3QgbmV4dCA9IG5ldyBEZXRhaWxTdGF0ZSh0aGlzKTtcbiAgICBuZXh0LmxvZ3MuaXNPcGVuID0gIXRoaXMubG9ncy5pc09wZW47XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICB0b2dnbGVMb2dJdGVtKGxvZ0l0ZW06IFRyYWNlTG9nKSB7XG4gICAgY29uc3QgbmV4dCA9IG5ldyBEZXRhaWxTdGF0ZSh0aGlzKTtcbiAgICBpZiAobmV4dC5sb2dzLm9wZW5lZEl0ZW1zLmhhcyhsb2dJdGVtKSkge1xuICAgICAgbmV4dC5sb2dzLm9wZW5lZEl0ZW1zLmRlbGV0ZShsb2dJdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dC5sb2dzLm9wZW5lZEl0ZW1zLmFkZChsb2dJdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQSxJQUdxQkEsV0FBVztFQVM5QixTQUFBQSxZQUFZQyxRQUFzQixFQUFFO0lBQ2xDLElBQUFDLElBQUEsR0FRNkNELFFBQVEsSUFBSSxDQUFDLENBQUM7TUFQekRFLFVBQVUsR0FBQUQsSUFBQSxDQUFWQyxVQUFVO01BQ1ZDLGFBQWEsR0FBQUYsSUFBQSxDQUFiRSxhQUFhO01BQ2JDLGdCQUFnQixHQUFBSCxJQUFBLENBQWhCRyxnQkFBZ0I7TUFDaEJDLGNBQWMsR0FBQUosSUFBQSxDQUFkSSxjQUFjO01BQ2RDLGlCQUFpQixHQUFBTCxJQUFBLENBQWpCSyxpQkFBaUI7TUFDakJDLElBQUksR0FBQU4sSUFBQSxDQUFKTSxJQUFJO01BQ0pDLFVBQVUsR0FBQVAsSUFBQSxDQUFWTyxVQUFVO0lBRVosSUFBSSxDQUFDTixVQUFVLEdBQUdPLE9BQU8sQ0FBQ1AsVUFBVSxDQUFDO0lBQ3JDLElBQUksQ0FBQ0MsYUFBYSxHQUFHTSxPQUFPLENBQUNOLGFBQWEsQ0FBQztJQUMzQyxJQUFJLENBQUNDLGdCQUFnQixHQUFHSyxPQUFPLENBQUNMLGdCQUFnQixDQUFDO0lBQ2pELElBQUksQ0FBQ0MsY0FBYyxHQUFHSSxPQUFPLENBQUNKLGNBQWMsQ0FBQztJQUM3QyxJQUFJLENBQUNDLGlCQUFpQixHQUFH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