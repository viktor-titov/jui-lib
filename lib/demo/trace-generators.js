import _extends from "@babel/runtime/helpers/extends";
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

import Chance from 'chance';
import { getSpanId } from '../selectors/span';
var chance = new Chance();
export var SERVICE_LIST = ['serviceA', 'serviceB', 'serviceC', 'serviceD', 'serviceE', 'serviceF'];
export var OPERATIONS_LIST = ['GET', 'PUT', 'POST', 'DELETE', 'MySQL::SELECT', 'MySQL::INSERT', 'MongoDB::find', 'MongoDB::update'];
function setupParentSpan(spans, parentSpanValues) {
  Object.assign(spans[0], parentSpanValues);
  return spans;
}
function getParentSpanId(span, levels) {
  var nestingLevel = chance.integer({
    min: 1,
    max: levels.length
  });

  // pick the correct nesting level if allocated by the levels calculation
  levels.forEach(function (level, idx) {
    if (level.indexOf(getSpanId(span)) >= 0) {
      nestingLevel = idx;
    }
  });
  return nestingLevel - 1 >= 0 ? chance.pickone(levels[nestingLevel - 1]) : null;
}

/* this simulates the hierarchy created by CHILD_OF tags */
function attachReferences(spans, depth, spansPerLevel) {
  var levels = [[getSpanId(spans[0])]];
  var duplicateLevelFilter = function duplicateLevelFilter(currentLevels) {
    return function (span) {
      return !currentLevels.find(function (level) {
        return level.indexOf(span.spanID) >= 0;
      });
    };
  };
  while (levels.length < depth) {
    var remainingSpans = spans.filter(duplicateLevelFilter(levels));
    if (remainingSpans.length <= 0) {
      break;
    }
    var newLevel = chance.pickset(remainingSpans, spansPerLevel || chance.integer({
      min: 4,
      max: 8
    })).map(getSpanId);
    levels.push(newLevel);
  }

  // filter out empty levels
  levels = levels.filter(function (level) {
    return level.length > 0;
  });
  return spans.map(function (span) {
    var parentSpanId = getParentSpanId(span, levels);
    return parentSpanId ? _extends({}, span, {
      references: [{
        refType: 'CHILD_OF',
        traceID: span.traceID,
        spanID: parentSpanId
      }]
    }) : span;
  });
}
export default chance.mixin({
  trace: function trace(_ref) {
    var _ref$numberOfSpans = _ref.numberOfSpans,
      numberOfSpans = _ref$numberOfSpans === void 0 ? chance.pickone([Math.ceil(chance.normal({
        mean: 200,
        dev: 10
      })) + 1, Math.ceil(chance.integer({
        min: 3,
        max: 10
      })), Math.ceil(chance.normal({
        mean: 45,
        dev: 15
      })) + 1]) : _ref$numberOfSpans,
      _ref$numberOfProcesse = _ref.numberOfProcesses,
      numberOfProcesses = _ref$numberOfProcesse === void 0 ? chance.integer({
        min: 1,
        max: 10
      }) : _ref$numberOfProcesse,
      _ref$maxDepth = _ref.maxDepth,
      maxDepth = _ref$maxDepth === void 0 ? chance.integer({
        min: 1,
        max: 10
      }) : _ref$maxDepth,
      _ref$spansPerLevel = _ref.spansPerLevel,
      spansPerLevel = _ref$spansPerLevel === void 0 ? null : _ref$spansPerLevel;
    var traceID = chance.guid();
    var duration = chance.integer({
      min: 10000,
      max: 5000000
    });
    var timestamp = (new Date().getTime() - chance.integer({
      min: 0,
      max: 1000
    }) * 1000) * 1000;
    var processArray = chance.processes({
      numberOfProcesses: numberOfProcesses
    });
    var processes = processArray.reduce(function (pMap, p) {
      var _extends2;
      return _extends({}, pMap, (_extends2 = {}, _extends2[p.processID] = p, _extends2));
    }, {});
    var spans = chance.n(chance.span, numberOfSpans, {
      traceID: traceID,
      processes: processes,
      traceStartTime: timestamp,
      traceEndTime: timestamp + duration
    });
    spans = attachReferences(spans, maxDepth, spansPerLevel);
    if (spans.length > 1) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      spans = setupParentSpan(spans, {
        startTime: timestamp,
        duration: duration
      });
    }
    return {
      traceID: traceID,
      spans: spans,
      processes: processes
    };
  },
  tag: function tag() {
    return {
      key: 'http.url',
      type: 'String',
      value: "/v2/" + chance.pickone(['alpha', 'beta', 'gamma']) + "/" + chance.guid()
    };
  },
  span: function span(_ref2) {
    var _ref2$traceID = _ref2.traceID,
      traceID = _ref2$traceID === void 0 ? chance.guid() : _ref2$traceID,
      _ref2$processes = _ref2.processes,
      processes = _ref2$processes === void 0 ? {} : _ref2$processes,
      _ref2$traceStartTime = _ref2.traceStartTime,
      traceStartTime = _ref2$traceStartTime === void 0 ? 0 : _ref2$traceStartTime,
      _ref2$traceEndTime = _ref2.traceEndTime,
      traceEndTime = _ref2$traceEndTime === void 0 ? 0 : _ref2$traceEndTime,
      _ref2$operations = _ref2.operations,
      operations = _ref2$operations === void 0 ? OPERATIONS_LIST : _ref2$operations;
    // Set default values for trace start/end time.
    traceStartTime = traceStartTime || chance.timestamp() * 1000 * 1000;
    traceEndTime = traceEndTime || traceStartTime + 100000;
    var startTime = chance.integer({
      min: traceStartTime,
      max: traceEndTime
    });
    var maxDuration = traceEndTime - startTime;
    return {
      traceID: traceID,
      processID: chance.pickone(Object.keys(processes)),
      spanID: chance.guid(),
      flags: 0,
      operationName: chance.pickone(operations),
      references: [],
      startTime: startTime,
      duration: chance.integer({
        min: 1,
        max: maxDuration <= 1 ? 2 : maxDuration
      }),
      tags: chance.tags(),
      logs: []
    };
  },
  process: function process(_ref3) {
    var _ref3$services = _ref3.services,
      services = _ref3$services === void 0 ? SERVICE_LIST : _ref3$services;
    return {
      processID: chance.guid(),
      serviceName: chance.pickone(services),
      tags: chance.tags()
    };
  },
  traces: function traces(_ref4) {
    var _ref4$numberOfTraces = _ref4.numberOfTraces,
      numberOfTraces = _ref4$numberOfTraces === void 0 ? chance.integer({
        min: 5,
        max: 15
      }) : _ref4$numberOfTraces;
    return chance.n(chance.trace, numberOfTraces, {});
  },
  tags: function tags() {
    return chance.n(chance.tag, chance.integer({
      min: 1,
      max: 10
    }), {});
  },
  processes: function processes(_ref5) {
    var _ref5$numberOfProcess = _ref5.numberOfProcesses,
      numberOfProcesses = _ref5$numberOfProcess === void 0 ? chance.integer({
        min: 1,
        max: 25
      }) : _ref5$numberOfProcess;
    return chance.n(chance.process, numberOfProcesses, {});
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDaGFuY2UiLCJnZXRTcGFuSWQiLCJjaGFuY2UiLCJTRVJWSUNFX0xJU1QiLCJPUEVSQVRJT05TX0xJU1QiLCJzZXR1cFBhcmVudFNwYW4iLCJzcGFucyIsInBhcmVudFNwYW5WYWx1ZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXRQYXJlbnRTcGFuSWQiLCJzcGFuIiwibGV2ZWxzIiwibmVzdGluZ0xldmVsIiwiaW50ZWdlciIsIm1pbiIsIm1heCIsImxlbmd0aCIsImZvckVhY2giLCJsZXZlbCIsImlkeCIsImluZGV4T2YiLCJwaWNrb25lIiwiYXR0YWNoUmVmZXJlbmNlcyIsImRlcHRoIiwic3BhbnNQZXJMZXZlbCIsImR1cGxpY2F0ZUxldmVsRmlsdGVyIiwiY3VycmVudExldmVscyIsImZpbmQiLCJzcGFuSUQiLCJyZW1haW5pbmdTcGFucyIsImZpbHRlciIsIm5ld0xldmVsIiwicGlja3NldCIsIm1hcCIsInB1c2giLCJwYXJlbnRTcGFuSWQiLCJfZXh0ZW5kcyIsInJlZmVyZW5jZXMiLCJyZWZUeXBlIiwidHJhY2VJRCIsIm1peGluIiwidHJhY2UiLCJfcmVmIiwiX3JlZiRudW1iZXJPZlNwYW5zIiwibnVtYmVyT2ZTcGFucyIsIk1hdGgiLCJjZWlsIiwibm9ybWFsIiwibWVhbiIsImRldiIsIl9yZWYkbnVtYmVyT2ZQcm9jZXNzZSIsIm51bWJlck9mUHJvY2Vzc2VzIiwiX3JlZiRtYXhEZXB0aCIsIm1heERlcHRoIiwiX3JlZiRzcGFuc1BlckxldmVsIiwiZ3VpZCIsImR1cmF0aW9uIiwidGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJwcm9jZXNzQXJyYXkiLCJwcm9jZXNzZXMiLCJyZWR1Y2UiLCJwTWFwIiwicCIsIl9leHRlbmRzMiIsInByb2Nlc3NJRCIsIm4iLCJ0cmFjZVN0YXJ0VGltZSIsInRyYWNlRW5kVGltZSIsInN0YXJ0VGltZSIsInRhZyIsImtleSIsInR5cGUiLCJ2YWx1ZSIsIl9yZWYyIiwiX3JlZjIkdHJhY2VJRCIsIl9yZWYyJHByb2Nlc3NlcyIsIl9yZWYyJHRyYWNlU3RhcnRUaW1lIiwiX3JlZjIkdHJhY2VFbmRUaW1lIiwiX3JlZjIkb3BlcmF0aW9ucyIsIm9wZXJhdGlvbnMiLCJtYXhEdXJhdGlvbiIsImtleXMiLCJmbGFncyIsIm9wZXJhdGlvbk5hbWUiLCJ0YWdzIiwibG9ncyIsInByb2Nlc3MiLCJfcmVmMyIsIl9yZWYzJHNlcnZpY2VzIiwic2VydmljZXMiLCJzZXJ2aWNlTmFtZSIsInRyYWNlcyIsIl9yZWY0IiwiX3JlZjQkbnVtYmVyT2ZUcmFjZXMiLCJudW1iZXJPZlRyYWNlcyIsIl9yZWY1IiwiX3JlZjUkbnVtYmVyT2ZQcm9jZXNzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlbW8vdHJhY2UtZ2VuZXJhdG9ycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IENoYW5jZSBmcm9tICdjaGFuY2UnO1xuaW1wb3J0IHsgVHJhY2VTcGFuRGF0YSwgVHJhY2VQcm9jZXNzIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgeyBnZXRTcGFuSWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvc3Bhbic7XG5cbmNvbnN0IGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuZXhwb3J0IGNvbnN0IFNFUlZJQ0VfTElTVCA9IFsnc2VydmljZUEnLCAnc2VydmljZUInLCAnc2VydmljZUMnLCAnc2VydmljZUQnLCAnc2VydmljZUUnLCAnc2VydmljZUYnXTtcbmV4cG9ydCBjb25zdCBPUEVSQVRJT05TX0xJU1QgPSBbXG4gICdHRVQnLFxuICAnUFVUJyxcbiAgJ1BPU1QnLFxuICAnREVMRVRFJyxcbiAgJ015U1FMOjpTRUxFQ1QnLFxuICAnTXlTUUw6OklOU0VSVCcsXG4gICdNb25nb0RCOjpmaW5kJyxcbiAgJ01vbmdvREI6OnVwZGF0ZScsXG5dO1xuXG50eXBlIFByb2Nlc3MgPSBUcmFjZVByb2Nlc3MgJiB7XG4gIHByb2Nlc3NJRDogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gc2V0dXBQYXJlbnRTcGFuKHNwYW5zOiBUcmFjZVNwYW5EYXRhW10sIHBhcmVudFNwYW5WYWx1ZXM6IFRyYWNlU3BhbkRhdGEpIHtcbiAgT2JqZWN0LmFzc2lnbihzcGFuc1swXSwgcGFyZW50U3BhblZhbHVlcyk7XG4gIHJldHVybiBzcGFucztcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50U3BhbklkKHNwYW46IFRyYWNlU3BhbkRhdGEsIGxldmVsczogc3RyaW5nW11bXSkge1xuICBsZXQgbmVzdGluZ0xldmVsID0gY2hhbmNlLmludGVnZXIoeyBtaW46IDEsIG1heDogbGV2ZWxzLmxlbmd0aCB9KTtcblxuICAvLyBwaWNrIHRoZSBjb3JyZWN0IG5lc3RpbmcgbGV2ZWwgaWYgYWxsb2NhdGVkIGJ5IHRoZSBsZXZlbHMgY2FsY3VsYXRpb25cbiAgbGV2ZWxzLmZvckVhY2goKGxldmVsLCBpZHgpID0+IHtcbiAgICBpZiAobGV2ZWwuaW5kZXhPZihnZXRTcGFuSWQoc3BhbikpID49IDApIHtcbiAgICAgIG5lc3RpbmdMZXZlbCA9IGlkeDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuZXN0aW5nTGV2ZWwgLSAxID49IDAgPyBjaGFuY2UucGlja29uZShsZXZlbHNbbmVzdGluZ0xldmVsIC0gMV0pIDogbnVsbDtcbn1cblxuLyogdGhpcyBzaW11bGF0ZXMgdGhlIGhpZXJhcmNoeSBjcmVhdGVkIGJ5IENISUxEX09GIHRhZ3MgKi9cbmZ1bmN0aW9uIGF0dGFjaFJlZmVyZW5jZXMoc3BhbnM6IFRyYWNlU3BhbkRhdGFbXSwgZGVwdGg6IG51bWJlciwgc3BhbnNQZXJMZXZlbDogbnVsbCkge1xuICBsZXQgbGV2ZWxzOiBzdHJpbmdbXVtdID0gW1tnZXRTcGFuSWQoc3BhbnNbMF0pXV07XG5cbiAgY29uc3QgZHVwbGljYXRlTGV2ZWxGaWx0ZXIgPSAoY3VycmVudExldmVsczogc3RyaW5nW11bXSkgPT4gKHNwYW46IFRyYWNlU3BhbkRhdGEpID0+XG4gICAgIWN1cnJlbnRMZXZlbHMuZmluZCgobGV2ZWwpID0+IGxldmVsLmluZGV4T2Yoc3Bhbi5zcGFuSUQpID49IDApO1xuXG4gIHdoaWxlIChsZXZlbHMubGVuZ3RoIDwgZGVwdGgpIHtcbiAgICBjb25zdCByZW1haW5pbmdTcGFucyA9IHNwYW5zLmZpbHRlcihkdXBsaWNhdGVMZXZlbEZpbHRlcihsZXZlbHMpKTtcbiAgICBpZiAocmVtYWluaW5nU3BhbnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0xldmVsID0gY2hhbmNlLnBpY2tzZXQocmVtYWluaW5nU3BhbnMsIHNwYW5zUGVyTGV2ZWwgfHwgY2hhbmNlLmludGVnZXIoeyBtaW46IDQsIG1heDogOCB9KSkubWFwKGdldFNwYW5JZCk7XG4gICAgbGV2ZWxzLnB1c2gobmV3TGV2ZWwpO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBlbXB0eSBsZXZlbHNcbiAgbGV2ZWxzID0gbGV2ZWxzLmZpbHRlcigobGV2ZWwpID0+IGxldmVsLmxlbmd0aCA+IDApO1xuXG4gIHJldHVybiBzcGFucy5tYXAoKHNwYW4pID0+IHtcbiAgICBjb25zdCBwYXJlbnRTcGFuSWQgPSBnZXRQYXJlbnRTcGFuSWQoc3BhbiwgbGV2ZWxzKTtcbiAgICByZXR1cm4gcGFyZW50U3BhbklkXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zcGFuLFxuICAgICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVmVHlwZTogJ0NISUxEX09GJyxcbiAgICAgICAgICAgICAgdHJhY2VJRDogc3Bhbi50cmFjZUlELFxuICAgICAgICAgICAgICBzcGFuSUQ6IHBhcmVudFNwYW5JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfVxuICAgICAgOiBzcGFuO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2hhbmNlLm1peGluKHtcbiAgdHJhY2Uoe1xuICAgIC8vIGxvbmcgdHJhY2VcbiAgICAvLyB2ZXJ5IHNob3J0IHRyYWNlXG4gICAgLy8gYXZlcmFnZSBjYXNlXG4gICAgbnVtYmVyT2ZTcGFucyA9IGNoYW5jZS5waWNrb25lKFtcbiAgICAgIE1hdGguY2VpbChjaGFuY2Uubm9ybWFsKHsgbWVhbjogMjAwLCBkZXY6IDEwIH0pKSArIDEsXG4gICAgICBNYXRoLmNlaWwoY2hhbmNlLmludGVnZXIoeyBtaW46IDMsIG1heDogMTAgfSkpLFxuICAgICAgTWF0aC5jZWlsKGNoYW5jZS5ub3JtYWwoeyBtZWFuOiA0NSwgZGV2OiAxNSB9KSkgKyAxLFxuICAgIF0pLFxuICAgIG51bWJlck9mUHJvY2Vzc2VzID0gY2hhbmNlLmludGVnZXIoeyBtaW46IDEsIG1heDogMTAgfSksXG4gICAgbWF4RGVwdGggPSBjaGFuY2UuaW50ZWdlcih7IG1pbjogMSwgbWF4OiAxMCB9KSxcbiAgICBzcGFuc1BlckxldmVsID0gbnVsbCxcbiAgfSkge1xuICAgIGNvbnN0IHRyYWNlSUQgPSBjaGFuY2UuZ3VpZCgpO1xuICAgIGNvbnN0IGR1cmF0aW9uOiBudW1iZXIgPSBjaGFuY2UuaW50ZWdlcih7IG1pbjogMTAwMDAsIG1heDogNTAwMDAwMCB9KTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjaGFuY2UuaW50ZWdlcih7IG1pbjogMCwgbWF4OiAxMDAwIH0pICogMTAwMCkgKiAxMDAwO1xuXG4gICAgY29uc3QgcHJvY2Vzc0FycmF5OiBQcm9jZXNzW10gPSBjaGFuY2UucHJvY2Vzc2VzKHsgbnVtYmVyT2ZQcm9jZXNzZXMgfSk7XG4gICAgY29uc3QgcHJvY2Vzc2VzID0gcHJvY2Vzc0FycmF5LnJlZHVjZSgocE1hcCwgcCkgPT4gKHsgLi4ucE1hcCwgW3AucHJvY2Vzc0lEXTogcCB9KSwge30pO1xuXG4gICAgbGV0IHNwYW5zID0gY2hhbmNlLm4oY2hhbmNlLnNwYW4sIG51bWJlck9mU3BhbnMsIHtcbiAgICAgIHRyYWNlSUQsXG4gICAgICBwcm9jZXNzZXMsXG4gICAgICB0cmFjZVN0YXJ0VGltZTogdGltZXN0YW1wLFxuICAgICAgdHJhY2VFbmRUaW1lOiB0aW1lc3RhbXAgKyBkdXJhdGlvbixcbiAgICB9KTtcbiAgICBzcGFucyA9IGF0dGFjaFJlZmVyZW5jZXMoc3BhbnMsIG1heERlcHRoLCBzcGFuc1BlckxldmVsKTtcbiAgICBpZiAoc3BhbnMubGVuZ3RoID4gMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtYXNzZXJ0aW9uc1xuICAgICAgc3BhbnMgPSBzZXR1cFBhcmVudFNwYW4oc3BhbnMsIHsgc3RhcnRUaW1lOiB0aW1lc3RhbXAsIGR1cmF0aW9uIH0gYXMgVHJhY2VTcGFuRGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYWNlSUQsXG4gICAgICBzcGFucyxcbiAgICAgIHByb2Nlc3NlcyxcbiAgICB9O1xuICB9LFxuICB0YWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogJ2h0dHAudXJsJyxcbiAgICAgIHR5cGU6ICdTdHJpbmcnLFxuICAgICAgdmFsdWU6IGAvdjIvJHtjaGFuY2UucGlja29uZShbJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnXSl9LyR7Y2hhbmNlLmd1aWQoKX1gLFxuICAgIH07XG4gIH0sXG4gIHNwYW4oe1xuICAgIHRyYWNlSUQgPSBjaGFuY2UuZ3VpZCgpLFxuICAgIHByb2Nlc3NlcyA9IHt9LFxuICAgIHRyYWNlU3RhcnRUaW1lID0gMCxcbiAgICB0cmFjZUVuZFRpbWUgPSAwLFxuICAgIG9wZXJhdGlvbnMgPSBPUEVSQVRJT05TX0xJU1QsXG4gIH0pIHtcbiAgICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIHRyYWNlIHN0YXJ0L2VuZCB0aW1lLlxuICAgIHRyYWNlU3RhcnRUaW1lID0gdHJhY2VTdGFydFRpbWUgfHwgY2hhbmNlLnRpbWVzdGFtcCgpICogMTAwMCAqIDEwMDA7XG4gICAgdHJhY2VFbmRUaW1lID0gdHJhY2VFbmRUaW1lIHx8IHRyYWNlU3RhcnRUaW1lICsgMTAwMDAwO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gY2hhbmNlLmludGVnZXIoe1xuICAgICAgbWluOiB0cmFjZVN0YXJ0VGltZSxcbiAgICAgIG1heDogdHJhY2VFbmRUaW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbWF4RHVyYXRpb24gPSB0cmFjZUVuZFRpbWUgLSBzdGFydFRpbWU7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHJhY2VJRCxcbiAgICAgIHByb2Nlc3NJRDogY2hhbmNlLnBpY2tvbmUoT2JqZWN0LmtleXMocHJvY2Vzc2VzKSksXG4gICAgICBzcGFuSUQ6IGNoYW5jZS5ndWlkKCksXG4gICAgICBmbGFnczogMCxcbiAgICAgIG9wZXJhdGlvbk5hbWU6IGNoYW5jZS5waWNrb25lKG9wZXJhdGlvbnMpLFxuICAgICAgcmVmZXJlbmNlczogW10sXG4gICAgICBzdGFydFRpbWUsXG4gICAgICBkdXJhdGlvbjogY2hhbmNlLmludGVnZXIoeyBtaW46IDEsIG1heDogbWF4RHVyYXRpb24gPD0gMSA/IDIgOiBtYXhEdXJhdGlvbiB9KSxcbiAgICAgIHRhZ3M6IGNoYW5jZS50YWdzKCksXG4gICAgICBsb2dzOiBbXSxcbiAgICB9O1xuICB9LFxuICBwcm9jZXNzKHsgc2VydmljZXMgPSBTRVJWSUNFX0xJU1QgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9jZXNzSUQ6IGNoYW5jZS5ndWlkKCksXG4gICAgICBzZXJ2aWNlTmFtZTogY2hhbmNlLnBpY2tvbmUoc2VydmljZXMpLFxuICAgICAgdGFnczogY2hhbmNlLnRhZ3MoKSxcbiAgICB9O1xuICB9LFxuICB0cmFjZXMoeyBudW1iZXJPZlRyYWNlcyA9IGNoYW5jZS5pbnRlZ2VyKHsgbWluOiA1LCBtYXg6IDE1IH0pIH0pIHtcbiAgICByZXR1cm4gY2hhbmNlLm4oY2hhbmNlLnRyYWNlLCBudW1iZXJPZlRyYWNlcywge30pO1xuICB9LFxuICB0YWdzKCkge1xuICAgIHJldHVybiBjaGFuY2UubihjaGFuY2UudGFnLCBjaGFuY2UuaW50ZWdlcih7IG1pbjogMSwgbWF4OiAxMCB9KSwge30pO1xuICB9LFxuICBwcm9jZXNzZXMoeyBudW1iZXJPZlByb2Nlc3NlcyA9IGNoYW5jZS5pbnRlZ2VyKHsgbWluOiAxLCBtYXg6IDI1IH0pIH0pIHtcbiAgICByZXR1cm4gY2hhbmNlLm4oY2hhbmNlLnByb2Nlc3MsIG51bWJlck9mUHJvY2Vzc2VzLCB7fSk7XG4gIH0sXG59KTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE1B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