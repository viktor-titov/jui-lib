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

import Tween from './Tween';
describe('Tween', function () {
  var oldNow = Date.now;
  var nowFn = jest.fn();
  var oldSetTimeout = window.setTimeout;
  var setTimeoutFn = jest.fn();
  var oldRaf = window.requestAnimationFrame;
  var rafFn = jest.fn();
  var baseOptions = {
    duration: 10,
    from: 0,
    to: 1
  };
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  Date.now = nowFn;
  window.requestAnimationFrame = rafFn;
  beforeEach(function () {
    nowFn.mockReset();
    nowFn.mockReturnValue(0);
    setTimeoutFn.mockReset();
    rafFn.mockReset();
  });
  afterAll(function () {
    Date.now = oldNow;
    window.setTimeout = oldSetTimeout;
    window.requestAnimationFrame = oldRaf;
  });
  describe('ctor', function () {
    it('set startTime to the current time', function () {
      var n = Math.random();
      nowFn.mockReturnValue(n);
      var tween = new Tween(baseOptions);
      expect(tween.startTime).toBe(n);
    });
    it('adds delay to the startTime', function () {
      var n = Math.random();
      nowFn.mockReturnValue(n);
      var tween = new Tween(_extends({}, baseOptions, {
        delay: 10
      }));
      expect(tween.startTime).toBe(n + 10);
    });
    describe('with callbacks', function () {
      it('schedules setTimeout if there is a delay', function () {
        var delay = 10;
        var tween = new Tween(_extends({}, baseOptions, {
          delay: delay,
          onUpdate: jest.fn()
        }));
        expect(setTimeout).lastCalledWith(tween._frameCallback, delay);
      });
      it('schedules animation frame if there is not a delay', function () {
        var tween = new Tween(_extends({}, baseOptions, {
          onUpdate: jest.fn()
        }));
        expect(rafFn).lastCalledWith(tween._frameCallback);
      });
    });
  });
  describe('getCurrent()', function () {
    it('returns `{done: false, value: from}` when time is before the delay is finished', function () {
      var tween = new Tween(_extends({}, baseOptions, {
        delay: 1
      }));
      var current = tween.getCurrent();
      expect(current).toEqual({
        done: false,
        value: baseOptions.from
      });
    });
    describe('in progress tweens', function () {
      it('returns `{done: false...`}', function () {
        var tween = new Tween(baseOptions);
        nowFn.mockReturnValue(1);
        var current = tween.getCurrent();
        expect(current.done).toBe(false);
        expect(nowFn()).toBeLessThan(tween.startTime + tween.duration);
        expect(nowFn()).toBeGreaterThan(tween.startTime);
      });
      it('progresses `{..., value} as time progresses', function () {
        var tween = new Tween(baseOptions);
        var lastValue = tween.getCurrent().value;
        for (var i = 1; i < baseOptions.duration; i++) {
          nowFn.mockReturnValue(i);
          var _tween$getCurrent = tween.getCurrent(),
            done = _tween$getCurrent.done,
            value = _tween$getCurrent.value;
          expect(done).toBe(false);
          expect(value).toBeGreaterThan(lastValue);
          lastValue = value;
        }
      });
    });
    it('returns `{done: true, value: to}` when the time is past the duration', function () {
      var tween = new Tween(baseOptions);
      nowFn.mockReturnValue(baseOptions.duration);
      var current = tween.getCurrent();
      expect(current).toEqual({
        done: true,
        value: baseOptions.to
      });
    });
  });
  describe('_frameCallback', function () {
    it('freezes the callback argument', function () {
      var current;
      var fn = jest.fn(function (_current) {
        current = _current;
      });
      var tween = new Tween(_extends({}, baseOptions, {
        onUpdate: fn
      }));
      tween._frameCallback();
      expect(current).toBeDefined();
      var copy = _extends({}, current);
      try {
        current.done = !current.done;
        // eslint-disable-next-line no-empty
      } catch (_) {}
      expect(current).toEqual(copy);
    });
    it('calls onUpdate if there is an onUpdate callback', function () {
      var fn = jest.fn();
      var tween = new Tween(_extends({}, baseOptions, {
        onUpdate: fn
      }));
      tween._frameCallback();
      var current = tween.getCurrent();
      expect(current).toBeDefined();
      expect(fn).lastCalledWith(current);
    });
    it('does not call onComplete if there is an onComplete callback and the tween is not complete', function () {
      var fn = jest.fn();
      var tween = new Tween(_extends({}, baseOptions, {
        onComplete: fn
      }));
      tween._frameCallback();
      expect(fn.mock.calls.length).toBe(0);
    });
    it('calls onComplete if there is an onComplete callback and the tween is complete', function () {
      var fn = jest.fn();
      var tween = new Tween(_extends({}, baseOptions, {
        onComplete: fn
      }));
      nowFn.mockReturnValue(nowFn() + baseOptions.duration);
      tween._frameCallback();
      var current = tween.getCurrent();
      expect(fn.mock.calls).toEqual([[current]]);
      expect(current.done).toBe(true);
    });
    it('schedules an animatinon frame if the tween is not complete', function () {
      expect(rafFn.mock.calls.length).toBe(0);
      var tween = new Tween(_extends({}, baseOptions, {
        onUpdate: function onUpdate() {}
      }));
      nowFn.mockReturnValue(nowFn() + 0.5 * baseOptions.duration);
      rafFn.mockReset();
      tween._frameCallback();
      expect(rafFn.mock.calls).toEqual([[tween._frameCallback]]);
    });
  });
  describe('cancel()', function () {
    it('cancels scheduled timeouts or animation frames', function () {
      var oldClearTimeout = window.clearTimeout;
      var oldCancelRaf = window.cancelAnimationFrame;
      var clearFn = jest.fn();
      window.clearTimeout = clearFn;
      var cancelFn = jest.fn();
      window.cancelAnimationFrame = cancelFn;
      var tween = new Tween(baseOptions);
      var id = 1;
      tween.timeoutID = id;
      tween.requestID = id;
      tween.cancel();
      expect(clearFn.mock.calls).toEqual([[id]]);
      expect(cancelFn.mock.calls).toEqual([[id]]);
      expect(tween.timeoutID).toBe(undefined);
      expect(tween.requestID).toBe(undefined);
      window.clearTimeout = oldClearTimeout;
      window.cancelAnimationFrame = oldCancelRaf;
    });
    it('releases references to callbacks', function () {
      var tween = new Tween(_extends({}, baseOptions, {
        onComplete: function onComplete() {},
        onUpdate: function onUpdate() {}
      }));
      tween.cancel();
      expect(tween.onComplete).toBe(undefined);
      expect(tween.onUpdate).toBe(undefined);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUd2VlbiIsImRlc2NyaWJlIiwib2xkTm93IiwiRGF0ZSIsIm5vdyIsIm5vd0ZuIiwiamVzdCIsImZuIiwib2xkU2V0VGltZW91dCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzZXRUaW1lb3V0Rm4iLCJvbGRSYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyYWZGbiIsImJhc2VPcHRpb25zIiwiZHVyYXRpb24iLCJmcm9tIiwidG8iLCJ1c2VGYWtlVGltZXJzIiwic3B5T24iLCJnbG9iYWwiLCJiZWZvcmVFYWNoIiwibW9ja1Jlc2V0IiwibW9ja1JldHVyblZhbHVlIiwiYWZ0ZXJBbGwiLCJpdCIsIm4iLCJNYXRoIiwicmFuZG9tIiwidHdlZW4iLCJleHBlY3QiLCJzdGFydFRpbWUiLCJ0b0JlIiwiX2V4dGVuZHMiLCJkZWxheSIsIm9uVXBkYXRlIiwibGFzdENhbGxlZFdpdGgiLCJfZnJhbWVDYWxsYmFjayIsImN1cnJlbnQiLCJnZXRDdXJyZW50IiwidG9FcXVhbCIsImRvbmUiLCJ2YWx1ZSIsInRvQmVMZXNzVGhhbiIsInRvQmVHcmVhdGVyVGhhbiIsImxhc3RWYWx1ZSIsImkiLCJfdHdlZW4kZ2V0Q3VycmVudCIsIl9jdXJyZW50IiwidG9CZURlZmluZWQiLCJjb3B5IiwiXyIsIm9uQ29tcGxldGUiLCJtb2NrIiwiY2FsbHMiLCJsZW5ndGgiLCJvbGRDbGVhclRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJvbGRDYW5jZWxSYWYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFyRm4iLCJjYW5jZWxGbiIsImlkIiwidGltZW91dElEIiwicmVxdWVzdElEIiwiY2FuY2VsIiwidW5kZWZpbmVkIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9Ud2Vlbi50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgVHdlZW4sIHsgVHdlZW5TdGF0ZSB9IGZyb20gJy4vVHdlZW4nO1xuXG5kZXNjcmliZSgnVHdlZW4nLCAoKSA9PiB7XG4gIGNvbnN0IG9sZE5vdyA9IERhdGUubm93O1xuICBjb25zdCBub3dGbiA9IGplc3QuZm4oKTtcbiAgY29uc3Qgb2xkU2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuICBjb25zdCBzZXRUaW1lb3V0Rm4gPSBqZXN0LmZuKCk7XG4gIGNvbnN0IG9sZFJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gIGNvbnN0IHJhZkZuID0gamVzdC5mbigpO1xuXG4gIGNvbnN0IGJhc2VPcHRpb25zID0geyBkdXJhdGlvbjogMTAsIGZyb206IDAsIHRvOiAxIH07XG5cbiAgamVzdC51c2VGYWtlVGltZXJzKCk7XG4gIGplc3Quc3B5T24oZ2xvYmFsLCAnc2V0VGltZW91dCcpO1xuXG4gIERhdGUubm93ID0gbm93Rm47XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByYWZGbjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBub3dGbi5tb2NrUmVzZXQoKTtcbiAgICBub3dGbi5tb2NrUmV0dXJuVmFsdWUoMCk7XG4gICAgc2V0VGltZW91dEZuLm1vY2tSZXNldCgpO1xuICAgIHJhZkZuLm1vY2tSZXNldCgpO1xuICB9KTtcblxuICBhZnRlckFsbCgoKSA9PiB7XG4gICAgRGF0ZS5ub3cgPSBvbGROb3c7XG4gICAgd2luZG93LnNldFRpbWVvdXQgPSBvbGRTZXRUaW1lb3V0O1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBvbGRSYWY7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdzZXQgc3RhcnRUaW1lIHRvIHRoZSBjdXJyZW50IHRpbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBuID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIG5vd0ZuLm1vY2tSZXR1cm5WYWx1ZShuKTtcbiAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFR3ZWVuKGJhc2VPcHRpb25zKTtcbiAgICAgIGV4cGVjdCh0d2Vlbi5zdGFydFRpbWUpLnRvQmUobik7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBkZWxheSB0byB0aGUgc3RhcnRUaW1lJywgKCkgPT4ge1xuICAgICAgY29uc3QgbiA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBub3dGbi5tb2NrUmV0dXJuVmFsdWUobik7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBkZWxheTogMTAgfSk7XG4gICAgICBleHBlY3QodHdlZW4uc3RhcnRUaW1lKS50b0JlKG4gKyAxMCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aCBjYWxsYmFja3MnLCAoKSA9PiB7XG4gICAgICBpdCgnc2NoZWR1bGVzIHNldFRpbWVvdXQgaWYgdGhlcmUgaXMgYSBkZWxheScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVsYXkgPSAxMDtcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oeyAuLi5iYXNlT3B0aW9ucywgZGVsYXksIG9uVXBkYXRlOiBqZXN0LmZuKCkgfSk7XG4gICAgICAgIGV4cGVjdChzZXRUaW1lb3V0KS5sYXN0Q2FsbGVkV2l0aCh0d2Vlbi5fZnJhbWVDYWxsYmFjaywgZGVsYXkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzY2hlZHVsZXMgYW5pbWF0aW9uIGZyYW1lIGlmIHRoZXJlIGlzIG5vdCBhIGRlbGF5JywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBvblVwZGF0ZTogamVzdC5mbigpIH0pO1xuICAgICAgICBleHBlY3QocmFmRm4pLmxhc3RDYWxsZWRXaXRoKHR3ZWVuLl9mcmFtZUNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q3VycmVudCgpJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGB7ZG9uZTogZmFsc2UsIHZhbHVlOiBmcm9tfWAgd2hlbiB0aW1lIGlzIGJlZm9yZSB0aGUgZGVsYXkgaXMgZmluaXNoZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBkZWxheTogMSB9KTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0d2Vlbi5nZXRDdXJyZW50KCk7XG4gICAgICBleHBlY3QoY3VycmVudCkudG9FcXVhbCh7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYmFzZU9wdGlvbnMuZnJvbSB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbiBwcm9ncmVzcyB0d2VlbnMnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBge2RvbmU6IGZhbHNlLi4uYH0nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFR3ZWVuKGJhc2VPcHRpb25zKTtcbiAgICAgICAgbm93Rm4ubW9ja1JldHVyblZhbHVlKDEpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdHdlZW4uZ2V0Q3VycmVudCgpO1xuICAgICAgICBleHBlY3QoY3VycmVudC5kb25lKS50b0JlKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KG5vd0ZuKCkpLnRvQmVMZXNzVGhhbih0d2Vlbi5zdGFydFRpbWUgKyB0d2Vlbi5kdXJhdGlvbik7XG4gICAgICAgIGV4cGVjdChub3dGbigpKS50b0JlR3JlYXRlclRoYW4odHdlZW4uc3RhcnRUaW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncHJvZ3Jlc3NlcyBgey4uLiwgdmFsdWV9IGFzIHRpbWUgcHJvZ3Jlc3NlcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oYmFzZU9wdGlvbnMpO1xuICAgICAgICBsZXQgbGFzdFZhbHVlID0gdHdlZW4uZ2V0Q3VycmVudCgpLnZhbHVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJhc2VPcHRpb25zLmR1cmF0aW9uOyBpKyspIHtcbiAgICAgICAgICBub3dGbi5tb2NrUmV0dXJuVmFsdWUoaSk7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gdHdlZW4uZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGV4cGVjdChkb25lKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICBleHBlY3QodmFsdWUpLnRvQmVHcmVhdGVyVGhhbihsYXN0VmFsdWUpO1xuICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGB7ZG9uZTogdHJ1ZSwgdmFsdWU6IHRvfWAgd2hlbiB0aGUgdGltZSBpcyBwYXN0IHRoZSBkdXJhdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFR3ZWVuKGJhc2VPcHRpb25zKTtcbiAgICAgIG5vd0ZuLm1vY2tSZXR1cm5WYWx1ZShiYXNlT3B0aW9ucy5kdXJhdGlvbik7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdHdlZW4uZ2V0Q3VycmVudCgpO1xuICAgICAgZXhwZWN0KGN1cnJlbnQpLnRvRXF1YWwoeyBkb25lOiB0cnVlLCB2YWx1ZTogYmFzZU9wdGlvbnMudG8gfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdfZnJhbWVDYWxsYmFjaycsICgpID0+IHtcbiAgICBpdCgnZnJlZXplcyB0aGUgY2FsbGJhY2sgYXJndW1lbnQnLCAoKSA9PiB7XG4gICAgICBsZXQgY3VycmVudDogVHdlZW5TdGF0ZSB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGZuID0gamVzdC5mbigoX2N1cnJlbnQpID0+IHtcbiAgICAgICAgY3VycmVudCA9IF9jdXJyZW50O1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBvblVwZGF0ZTogZm4gfSk7XG4gICAgICB0d2Vlbi5fZnJhbWVDYWxsYmFjaygpO1xuICAgICAgZXhwZWN0KGN1cnJlbnQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICBjb25zdCBjb3B5ID0geyAuLi5jdXJyZW50IH07XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50IS5kb25lID0gIWN1cnJlbnQhLmRvbmU7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIGV4cGVjdChjdXJyZW50KS50b0VxdWFsKGNvcHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIG9uVXBkYXRlIGlmIHRoZXJlIGlzIGFuIG9uVXBkYXRlIGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm4gPSBqZXN0LmZuKCk7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBvblVwZGF0ZTogZm4gfSk7XG4gICAgICB0d2Vlbi5fZnJhbWVDYWxsYmFjaygpO1xuICAgICAgY29uc3QgY3VycmVudCA9IHR3ZWVuLmdldEN1cnJlbnQoKTtcbiAgICAgIGV4cGVjdChjdXJyZW50KS50b0JlRGVmaW5lZCgpO1xuICAgICAgZXhwZWN0KGZuKS5sYXN0Q2FsbGVkV2l0aChjdXJyZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBjYWxsIG9uQ29tcGxldGUgaWYgdGhlcmUgaXMgYW4gb25Db21wbGV0ZSBjYWxsYmFjayBhbmQgdGhlIHR3ZWVuIGlzIG5vdCBjb21wbGV0ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGZuID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oeyAuLi5iYXNlT3B0aW9ucywgb25Db21wbGV0ZTogZm4gfSk7XG4gICAgICB0d2Vlbi5fZnJhbWVDYWxsYmFjaygpO1xuICAgICAgZXhwZWN0KGZuLm1vY2suY2FsbHMubGVuZ3RoKS50b0JlKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIG9uQ29tcGxldGUgaWYgdGhlcmUgaXMgYW4gb25Db21wbGV0ZSBjYWxsYmFjayBhbmQgdGhlIHR3ZWVuIGlzIGNvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm4gPSBqZXN0LmZuKCk7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBvbkNvbXBsZXRlOiBmbiB9KTtcbiAgICAgIG5vd0ZuLm1vY2tSZXR1cm5WYWx1ZShub3dGbigpICsgYmFzZU9wdGlvbnMuZHVyYXRpb24pO1xuICAgICAgdHdlZW4uX2ZyYW1lQ2FsbGJhY2soKTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0d2Vlbi5nZXRDdXJyZW50KCk7XG4gICAgICBleHBlY3QoZm4ubW9jay5jYWxscykudG9FcXVhbChbW2N1cnJlbnRdXSk7XG4gICAgICBleHBlY3QoY3VycmVudC5kb25lKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NjaGVkdWxlcyBhbiBhbmltYXRpbm9uIGZyYW1lIGlmIHRoZSB0d2VlbiBpcyBub3QgY29tcGxldGUnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmFmRm4ubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMCk7XG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7IC4uLmJhc2VPcHRpb25zLCBvblVwZGF0ZTogKCkgPT4ge30gfSk7XG4gICAgICBub3dGbi5tb2NrUmV0dXJuVmFsdWUobm93Rm4oKSArIDAuNSAqIGJhc2VPcHRpb25zLmR1cmF0aW9uKTtcbiAgICAgIHJhZkZuLm1vY2tSZXNldCgpO1xuICAgICAgdHdlZW4uX2ZyYW1lQ2FsbGJhY2soKTtcbiAgICAgIGV4cGVjdChyYWZGbi5tb2NrLmNhbGxzKS50b0VxdWFsKFtbdHdlZW4uX2ZyYW1lQ2FsbGJhY2tdXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjYW5jZWwoKScsICgpID0+IHtcbiAgICBpdCgnY2FuY2VscyBzY2hlZHVsZWQgdGltZW91dHMgb3IgYW5pbWF0aW9uIGZyYW1lcycsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZENsZWFyVGltZW91dCA9IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG4gICAgICBjb25zdCBvbGRDYW5jZWxSYWYgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgICBjb25zdCBjbGVhckZuID0gamVzdC5mbigpO1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCA9IGNsZWFyRm47XG4gICAgICBjb25zdCBjYW5jZWxGbiA9IGplc3QuZm4oKTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEZuO1xuXG4gICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2VlbihiYXNlT3B0aW9ucyk7XG4gICAgICBjb25zdCBpZCA9IDE7XG4gICAgICB0d2Vlbi50aW1lb3V0SUQgPSBpZDtcbiAgICAgIHR3ZWVuLnJlcXVlc3RJRCA9IGlkO1xuICAgICAgdHdlZW4uY2FuY2VsKCk7XG4gICAgICBleHBlY3QoY2xlYXJGbi5tb2NrLmNhbGxzKS50b0VxdWFsKFtbaWRdXSk7XG4gICAgICBleHBlY3QoY2FuY2VsRm4ubW9jay5jYWxscykudG9FcXVhbChbW2lkXV0pO1xuICAgICAgZXhwZWN0KHR3ZWVuLnRpbWVvdXRJRCkudG9CZSh1bmRlZmluZWQpO1xuICAgICAgZXhwZWN0KHR3ZWVuLnJlcXVlc3RJRCkudG9CZSh1bmRlZmluZWQpO1xuXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0ID0gb2xkQ2xlYXJUaW1lb3V0O1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gb2xkQ2FuY2VsUmFmO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbGVhc2VzIHJlZmVyZW5jZXMgdG8gY2FsbGJhY2tzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oeyAuLi5iYXNlT3B0aW9ucywgb25Db21wbGV0ZTogKCkgPT4ge30sIG9uVXBkYXRlOiAoKSA9PiB7fSB9KTtcbiAgICAgIHR3ZWVuLmNhbmNlbCgpO1xuICAgICAgZXhwZWN0KHR3ZWVuLm9uQ29tcGxldGUpLnRvQmUodW5kZWZpbmVkKTtcbiAgICAgIGV4cGVjdCh0d2Vlbi5vblVwZGF0ZSkudG9CZSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFzQixTQUFTO0FBRTNDQyxRQUFRLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDdEIsSUFBTUMsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEdBQUc7RUFDdkIsSUFBTUMsS0FBSyxHQUFHQyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZCLElBQU1DLGFBQWEsR0FBR0MsTUFBTSxDQUFDQyxVQUFV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