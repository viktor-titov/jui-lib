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

jest.mock('./Tween');
import Tween from './Tween';
import { scrollBy, scrollTo, cancel } from './scroll-page';

// keep track of instances, manually
// https://github.com/facebook/jest/issues/5019
var tweenInstances = [];
describe('scroll-by', function () {
  beforeEach(function () {
    window.scrollY = 100;
    tweenInstances.length = 0;
    jest.mocked(Tween).mockClear();
    jest.mocked(Tween).mockImplementation(function (opts) {
      var rv = {
        to: opts.to,
        onUpdate: opts.onUpdate,
        cancel: jest.fn(),
        getCurrent: jest.fn()
      };
      tweenInstances.push(rv);
      return rv;
    });
  });
  afterEach(function () {
    cancel();
  });
  describe('scrollBy()', function () {
    describe('when `appendToLast` is `false`', function () {
      it('scrolls from `window.scrollY` to `window.scrollY + yDelta`', function () {
        var yDelta = 10;
        scrollBy(yDelta);
        var spec = expect.objectContaining({
          to: window.scrollY + yDelta
        });
        expect(jest.mocked(Tween).mock.calls).toEqual([[spec]]);
      });
    });
    describe('when `appendToLast` is true', function () {
      it('is the same as `appendToLast === false` without an in-progress scroll', function () {
        var yDelta = 10;
        scrollBy(yDelta, true);
        expect(jest.mocked(Tween).mock.calls.length).toBe(1);
        scrollBy(yDelta, false);
        expect(jest.mocked(Tween).mock.calls[0]).toEqual(jest.mocked(Tween).mock.calls[1]);
      });
      it('is additive when an in-progress scroll is the same direction', function () {
        var yDelta = 10;
        var spec = expect.objectContaining({
          to: window.scrollY + 2 * yDelta
        });
        scrollBy(yDelta);
        scrollBy(yDelta, true);
        expect(jest.mocked(Tween).mock.calls.length).toBe(2);
        expect(jest.mocked(Tween).mock.calls[1]).toEqual([spec]);
      });
      it('ignores the in-progress scroll is the other direction', function () {
        var yDelta = 10;
        var spec = expect.objectContaining({
          to: window.scrollY - yDelta
        });
        scrollBy(yDelta);
        scrollBy(-yDelta, true);
        expect(jest.mocked(Tween).mock.calls.length).toBe(2);
        expect(jest.mocked(Tween).mock.calls[1]).toEqual([spec]);
      });
    });
  });
  describe('scrollTo', function () {
    it('scrolls to `y`', function () {
      var to = 10;
      var spec = expect.objectContaining({
        to: to
      });
      scrollTo(to);
      expect(jest.mocked(Tween).mock.calls).toEqual([[spec]]);
    });
    it('ignores the in-progress scroll', function () {
      var to = 10;
      var spec = expect.objectContaining({
        to: to
      });
      scrollTo(Math.random());
      scrollTo(to);
      expect(jest.mocked(Tween).mock.calls.length).toBe(2);
      expect(jest.mocked(Tween).mock.calls[1]).toEqual([spec]);
    });
  });
  describe('cancel', function () {
    it('cancels the in-progress scroll', function () {
      scrollTo(10);
      // there is now an in-progress tween
      expect(tweenInstances.length).toBe(1);
      var tw = tweenInstances[0];
      cancel();
      expect(jest.mocked(tw.cancel).mock.calls).toEqual([[]]);
    });
    it('is a noop if there is not an in-progress scroll', function () {
      scrollTo(10);
      // there is now an in-progress tween
      expect(tweenInstances.length).toBe(1);
      var tw = tweenInstances[0];
      cancel();
      expect(jest.mocked(tw.cancel).mock.calls).toEqual([[]]);
      jest.mocked(tw.cancel).mockReset();
      // now, we check to see if `cancel()` has an effect on the last created tween
      cancel();
      expect(jest.mocked(tw.cancel).mock.calls.length).toBe(0);
    });
  });
  describe('_onTweenUpdate', function () {
    var oldScrollTo;
    beforeEach(function () {
      oldScrollTo = window.scrollTo;
      window.scrollTo = jest.fn();
    });
    afterEach(function () {
      window.scrollTo = oldScrollTo;
    });
    it('scrolls to `value`', function () {
      var value = 123;
      // cause a `Tween` to be created to get a reference to _onTweenUpdate
      scrollTo(10);
      var onUpdate = tweenInstances[0].onUpdate;
      onUpdate == null || onUpdate({
        value: value,
        done: false
      });
      expect(jest.mocked(window.scrollTo).mock.calls.length).toBe(1);
      expect(jest.mocked(window.scrollTo).mock.calls[0][1]).toBe(value);
    });
    it('discards the in-progress scroll if the scroll is done', function () {
      // cause a `Tween` to be created to get a reference to _onTweenUpdate
      scrollTo(10);
      var _tweenInstances$ = tweenInstances[0],
        onUpdate = _tweenInstances$.onUpdate,
        twCancel = _tweenInstances$.cancel;
      onUpdate == null || onUpdate({
        value: 123,
        done: true
      });
      // if the tween is not discarded, `cancel()` will cancel it
      cancel();
      expect(jest.mocked(twCancel).mock.calls.length).toBe(0);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqZXN0IiwibW9jayIsIlR3ZWVuIiwic2Nyb2xsQnkiLCJzY3JvbGxUbyIsImNhbmNlbCIsInR3ZWVuSW5zdGFuY2VzIiwiZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwid2luZG93Iiwic2Nyb2xsWSIsImxlbmd0aCIsIm1vY2tlZCIsIm1vY2tDbGVhciIsIm1vY2tJbXBsZW1lbnRhdGlvbiIsIm9wdHMiLCJydiIsInRvIiwib25VcGRhdGUiLCJmbiIsImdldEN1cnJlbnQiLCJwdXNoIiwiYWZ0ZXJFYWNoIiwiaXQiLCJ5RGVsdGEiLCJzcGVjIiwiZXhwZWN0Iiwib2JqZWN0Q29udGFpbmluZyIsImNhbGxzIiwidG9FcXVhbCIsInRvQmUiLCJNYXRoIiwicmFuZG9tIiwidHciLCJtb2NrUmVzZXQiLCJvbGRTY3JvbGxUbyIsInZhbHVlIiwiZG9uZSIsIl90d2Vlbkluc3RhbmNlcyQiLCJ0d0NhbmNlbCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JvbGwtcGFnZS50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5qZXN0Lm1vY2soJy4vVHdlZW4nKTtcblxuaW1wb3J0IFR3ZWVuIGZyb20gJy4vVHdlZW4nO1xuaW1wb3J0IHsgc2Nyb2xsQnksIHNjcm9sbFRvLCBjYW5jZWwgfSBmcm9tICcuL3Njcm9sbC1wYWdlJztcblxuLy8ga2VlcCB0cmFjayBvZiBpbnN0YW5jZXMsIG1hbnVhbGx5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svamVzdC9pc3N1ZXMvNTAxOVxuY29uc3QgdHdlZW5JbnN0YW5jZXM6IFR3ZWVuW10gPSBbXTtcblxuZGVzY3JpYmUoJ3Njcm9sbC1ieScsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgd2luZG93LnNjcm9sbFkgPSAxMDA7XG4gICAgdHdlZW5JbnN0YW5jZXMubGVuZ3RoID0gMDtcbiAgICBqZXN0Lm1vY2tlZChUd2VlbikubW9ja0NsZWFyKCk7XG4gICAgamVzdC5tb2NrZWQoVHdlZW4pLm1vY2tJbXBsZW1lbnRhdGlvbigob3B0cykgPT4ge1xuICAgICAgY29uc3QgcnYgPSB7IHRvOiBvcHRzLnRvLCBvblVwZGF0ZTogb3B0cy5vblVwZGF0ZSwgY2FuY2VsOiBqZXN0LmZuKCksIGdldEN1cnJlbnQ6IGplc3QuZm4oKSB9IGFzIHVua25vd24gYXMgVHdlZW47XG4gICAgICB0d2Vlbkluc3RhbmNlcy5wdXNoKHJ2KTtcbiAgICAgIHJldHVybiBydjtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBjYW5jZWwoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Njcm9sbEJ5KCknLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ3doZW4gYGFwcGVuZFRvTGFzdGAgaXMgYGZhbHNlYCcsICgpID0+IHtcbiAgICAgIGl0KCdzY3JvbGxzIGZyb20gYHdpbmRvdy5zY3JvbGxZYCB0byBgd2luZG93LnNjcm9sbFkgKyB5RGVsdGFgJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB5RGVsdGEgPSAxMDtcbiAgICAgICAgc2Nyb2xsQnkoeURlbHRhKTtcbiAgICAgICAgY29uc3Qgc3BlYyA9IGV4cGVjdC5vYmplY3RDb250YWluaW5nKHsgdG86IHdpbmRvdy5zY3JvbGxZICsgeURlbHRhIH0pO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHMpLnRvRXF1YWwoW1tzcGVjXV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiBgYXBwZW5kVG9MYXN0YCBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIHRoZSBzYW1lIGFzIGBhcHBlbmRUb0xhc3QgPT09IGZhbHNlYCB3aXRob3V0IGFuIGluLXByb2dyZXNzIHNjcm9sbCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgeURlbHRhID0gMTA7XG4gICAgICAgIHNjcm9sbEJ5KHlEZWx0YSwgdHJ1ZSk7XG4gICAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZChUd2VlbikubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIHNjcm9sbEJ5KHlEZWx0YSwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHNbMF0pLnRvRXF1YWwoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHNbMV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpcyBhZGRpdGl2ZSB3aGVuIGFuIGluLXByb2dyZXNzIHNjcm9sbCBpcyB0aGUgc2FtZSBkaXJlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHlEZWx0YSA9IDEwO1xuICAgICAgICBjb25zdCBzcGVjID0gZXhwZWN0Lm9iamVjdENvbnRhaW5pbmcoeyB0bzogd2luZG93LnNjcm9sbFkgKyAyICogeURlbHRhIH0pO1xuICAgICAgICBzY3JvbGxCeSh5RGVsdGEpO1xuICAgICAgICBzY3JvbGxCeSh5RGVsdGEsIHRydWUpO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHMubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHNbMV0pLnRvRXF1YWwoW3NwZWNdKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaWdub3JlcyB0aGUgaW4tcHJvZ3Jlc3Mgc2Nyb2xsIGlzIHRoZSBvdGhlciBkaXJlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHlEZWx0YSA9IDEwO1xuICAgICAgICBjb25zdCBzcGVjID0gZXhwZWN0Lm9iamVjdENvbnRhaW5pbmcoeyB0bzogd2luZG93LnNjcm9sbFkgLSB5RGVsdGEgfSk7XG4gICAgICAgIHNjcm9sbEJ5KHlEZWx0YSk7XG4gICAgICAgIHNjcm9sbEJ5KC15RGVsdGEsIHRydWUpO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHMubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHNbMV0pLnRvRXF1YWwoW3NwZWNdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2Nyb2xsVG8nLCAoKSA9PiB7XG4gICAgaXQoJ3Njcm9sbHMgdG8gYHlgJywgKCkgPT4ge1xuICAgICAgY29uc3QgdG8gPSAxMDtcbiAgICAgIGNvbnN0IHNwZWMgPSBleHBlY3Qub2JqZWN0Q29udGFpbmluZyh7IHRvIH0pO1xuICAgICAgc2Nyb2xsVG8odG8pO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKFR3ZWVuKS5tb2NrLmNhbGxzKS50b0VxdWFsKFtbc3BlY11dKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZ25vcmVzIHRoZSBpbi1wcm9ncmVzcyBzY3JvbGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0byA9IDEwO1xuICAgICAgY29uc3Qgc3BlYyA9IGV4cGVjdC5vYmplY3RDb250YWluaW5nKHsgdG8gfSk7XG4gICAgICBzY3JvbGxUbyhNYXRoLnJhbmRvbSgpKTtcbiAgICAgIHNjcm9sbFRvKHRvKTtcbiAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZChUd2VlbikubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMik7XG4gICAgICBleHBlY3QoamVzdC5tb2NrZWQoVHdlZW4pLm1vY2suY2FsbHNbMV0pLnRvRXF1YWwoW3NwZWNdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NhbmNlbCcsICgpID0+IHtcbiAgICBpdCgnY2FuY2VscyB0aGUgaW4tcHJvZ3Jlc3Mgc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgc2Nyb2xsVG8oMTApO1xuICAgICAgLy8gdGhlcmUgaXMgbm93IGFuIGluLXByb2dyZXNzIHR3ZWVuXG4gICAgICBleHBlY3QodHdlZW5JbnN0YW5jZXMubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgY29uc3QgdHcgPSB0d2Vlbkluc3RhbmNlc1swXTtcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKHR3LmNhbmNlbCkubW9jay5jYWxscykudG9FcXVhbChbW11dKTtcbiAgICB9KTtcblxuICAgIGl0KCdpcyBhIG5vb3AgaWYgdGhlcmUgaXMgbm90IGFuIGluLXByb2dyZXNzIHNjcm9sbCcsICgpID0+IHtcbiAgICAgIHNjcm9sbFRvKDEwKTtcbiAgICAgIC8vIHRoZXJlIGlzIG5vdyBhbiBpbi1wcm9ncmVzcyB0d2VlblxuICAgICAgZXhwZWN0KHR3ZWVuSW5zdGFuY2VzLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgIGNvbnN0IHR3ID0gdHdlZW5JbnN0YW5jZXNbMF07XG4gICAgICBjYW5jZWwoKTtcbiAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZCh0dy5jYW5jZWwpLm1vY2suY2FsbHMpLnRvRXF1YWwoW1tdXSk7XG4gICAgICBqZXN0Lm1vY2tlZCh0dy5jYW5jZWwpLm1vY2tSZXNldCgpO1xuICAgICAgLy8gbm93LCB3ZSBjaGVjayB0byBzZWUgaWYgYGNhbmNlbCgpYCBoYXMgYW4gZWZmZWN0IG9uIHRoZSBsYXN0IGNyZWF0ZWQgdHdlZW5cbiAgICAgIGNhbmNlbCgpO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKHR3LmNhbmNlbCkubW9jay5jYWxscy5sZW5ndGgpLnRvQmUoMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdfb25Ud2VlblVwZGF0ZScsICgpID0+IHtcbiAgICBsZXQgb2xkU2Nyb2xsVG86IHsgKG9wdGlvbnM/OiBTY3JvbGxUb09wdGlvbnMgfCB1bmRlZmluZWQpOiB2b2lkOyAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG9sZFNjcm9sbFRvID0gd2luZG93LnNjcm9sbFRvO1xuICAgICAgd2luZG93LnNjcm9sbFRvID0gamVzdC5mbigpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyA9IG9sZFNjcm9sbFRvO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Njcm9sbHMgdG8gYHZhbHVlYCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gMTIzO1xuICAgICAgLy8gY2F1c2UgYSBgVHdlZW5gIHRvIGJlIGNyZWF0ZWQgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIF9vblR3ZWVuVXBkYXRlXG4gICAgICBzY3JvbGxUbygxMCk7XG4gICAgICBjb25zdCB7IG9uVXBkYXRlIH0gPSB0d2Vlbkluc3RhbmNlc1swXTtcbiAgICAgIG9uVXBkYXRlPy4oeyB2YWx1ZSwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBleHBlY3QoamVzdC5tb2NrZWQod2luZG93LnNjcm9sbFRvKS5tb2NrLmNhbGxzLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgIGV4cGVjdChqZXN0Lm1vY2tlZCh3aW5kb3cuc2Nyb2xsVG8pLm1vY2suY2FsbHNbMF1bMV0pLnRvQmUodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rpc2NhcmRzIHRoZSBpbi1wcm9ncmVzcyBzY3JvbGwgaWYgdGhlIHNjcm9sbCBpcyBkb25lJywgKCkgPT4ge1xuICAgICAgLy8gY2F1c2UgYSBgVHdlZW5gIHRvIGJlIGNyZWF0ZWQgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIF9vblR3ZWVuVXBkYXRlXG4gICAgICBzY3JvbGxUbygxMCk7XG4gICAgICBjb25zdCB7IG9uVXBkYXRlLCBjYW5jZWw6IHR3Q2FuY2VsIH0gPSB0d2Vlbkluc3RhbmNlc1swXTtcbiAgICAgIG9uVXBkYXRlPy4oeyB2YWx1ZTogMTIzLCBkb25lOiB0cnVlIH0pO1xuICAgICAgLy8gaWYgdGhlIHR3ZWVuIGlzIG5vdCBkaXNjYXJkZWQsIGBjYW5jZWwoKWAgd2lsbCBjYW5jZWwgaXRcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgZXhwZWN0KGplc3QubW9ja2VkKHR3Q2FuY2VsKS5tb2NrLmNhbGxzLmxlbmd0aCkudG9CZSgwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFBLElBQUksQ0FBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUVwQixPQUFPQyxLQUFLLE1BQU0sU0FBUztBQUMzQixTQUFTQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxRQUFRLGVBQWU7O0FBRTFEO0FBQ0E7QUFDQSxJQUFNQyxjQUF1QixHQUFHLEVBQUU7QUFFbENDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtFQUMxQkMsVUFBVSxDQUFDLFlBQU07SUFDZkMsTUFBTSxDQUFDQyxPQUFPLEdBQUcsR0FBRztJQUNwQkosY0FBYyxDQUFDSyxNQUFNLEdBQUcsQ0FBQztJQUN6QlgsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDVyxTQUFTLENBQUMsQ0FBQztJQUM5QmIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDWSxrQkFBa0IsQ0FBQyxVQUFDQyxJQUFJLEVBQUs7TUFDOUMsSUFBTUMsRUFBRSxHQUFHO1FBQUVDLEVBQUUsRUFBRUYsSUFBSSxDQUFDRSxFQUFFO1FBQUVDLFFBQVEsRUFBRUgsSUFBSSxDQUFDRyxRQUFRO1FBQUViLE1BQU0sRUFBRUwsSUFBSSxDQUFDbUIsRUFBRSxDQUFDLENBQUM7UUFBRUMsVUFBVSxFQUFFcEIsSUFBSSxDQUFDbUIsRUFBRSxDQUFDO01BQUUsQ0FBcUI7TUFDakhiLGNBQWMsQ0FBQ2UsSUFBSSxDQUFDTCxFQUFFLENBQUM7TUFDdkIsT0FBT0EsRUFBRTtJQUNYLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUVGTSxTQUFTLENBQUMsWUFBTTtJQUNkakIsTUFBTSxDQUFDLENBQUM7RUFDVixDQUFDLENBQUM7RUFFRkUsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFNO0lBQzNCQSxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsWUFBTTtNQUMvQ2dCLEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxZQUFNO1FBQ3JFLElBQU1DLE1BQU0sR0FBRyxFQUFFO1FBQ2pCckIsUUFBUSxDQUFDcUIsTUFBTSxDQUFDO1FBQ2hCLElBQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQztVQUFFVixFQUFFLEVBQUVSLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHYztRQUFPLENBQUMsQ0FBQztRQUNyRUUsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDRCxJQUFJLENBQUMyQixLQUFLLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQ0osSUFBSSxDQUFDLENBQUMsQ0FBQztNQUN6RCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRmxCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxZQUFNO01BQzVDZ0IsRUFBRSxDQUFDLHVFQUF1RSxFQUFFLFlBQU07UUFDaEYsSUFBTUMsTUFBTSxHQUFHLEVBQUU7UUFDakJyQixRQUFRLENBQUNxQixNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ3RCRSxNQUFNLENBQUMxQixJQUFJLENBQUNZLE1BQU0sQ0FBQ1YsS0FBSyxDQUFDLENBQUNELElBQUksQ0FBQzJCLEtBQUssQ0FBQ2pCLE1BQU0sQ0FBQyxDQUFDbUIsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwRDNCLFFBQVEsQ0FBQ3FCLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDdkJFLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDVixLQUFLLENBQUMsQ0FBQ0QsSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQzdCLElBQUksQ0FBQ1ksTUFBTSxDQUFDVixLQUFLLENBQUMsQ0FBQ0QsSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3BGLENBQUMsQ0FBQztNQUVGTCxFQUFFLENBQUMsOERBQThELEVBQUUsWUFBTTtRQUN2RSxJQUFNQyxNQUFNLEdBQUcsRUFBRTtRQUNqQixJQUFNQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUM7VUFBRVYsRUFBRSxFQUFFUixNQUFNLENBQUNDLE9BQU8sR0FBRyxDQUFDLEdBQUdjO1FBQU8sQ0FBQyxDQUFDO1FBQ3pFckIsUUFBUSxDQUFDcUIsTUFBTSxDQUFDO1FBQ2hCckIsUUFBUSxDQUFDcUIsTUFBTSxFQUFFLElBQUksQ0FBQztRQUN0QkUsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDRCxJQUFJLENBQUMyQixLQUFLLENBQUNqQixNQUFNLENBQUMsQ0FBQ21CLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcERKLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDVixLQUFLLENBQUMsQ0FBQ0QsSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDSixJQUFJLENBQUMsQ0FBQztNQUMxRCxDQUFDLENBQUM7TUFFRkYsRUFBRSxDQUFDLHVEQUF1RCxFQUFFLFlBQU07UUFDaEUsSUFBTUMsTUFBTSxHQUFHLEVBQUU7UUFDakIsSUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDO1VBQUVWLEVBQUUsRUFBRVIsTUFBTSxDQUFDQyxPQUFPLEdBQUdjO1FBQU8sQ0FBQyxDQUFDO1FBQ3JFckIsUUFBUSxDQUFDcUIsTUFBTSxDQUFDO1FBQ2hCckIsUUFBUSxDQUFDLENBQUNxQixNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ3ZCRSxNQUFNLENBQUMxQixJQUFJLENBQUNZLE1BQU0sQ0FBQ1YsS0FBSyxDQUFDLENBQUNELElBQUksQ0FBQzJCLEtBQUssQ0FBQ2pCLE1BQU0sQ0FBQyxDQUFDbUIsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwREosTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDRCxJQUFJLENBQUMyQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNKLElBQUksQ0FBQyxDQUFDO01BQzFELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUVGbEIsUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFNO0lBQ3pCZ0IsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQU07TUFDekIsSUFBTU4sRUFBRSxHQUFHLEVBQUU7TUFDYixJQUFNUSxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUM7UUFBRVYsRUFBRSxFQUFGQTtNQUFHLENBQUMsQ0FBQztNQUM1Q2IsUUFBUSxDQUFDYSxFQUFFLENBQUM7TUFDWlMsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDRCxJQUFJLENBQUMyQixLQUFLLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQ0osSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7SUFFRkYsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLFlBQU07TUFDekMsSUFBTU4sRUFBRSxHQUFHLEVBQUU7TUFDYixJQUFNUSxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUM7UUFBRVYsRUFBRSxFQUFGQTtNQUFHLENBQUMsQ0FBQztNQUM1Q2IsUUFBUSxDQUFDMkIsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQ3ZCNUIsUUFBUSxDQUFDYSxFQUFFLENBQUM7TUFDWlMsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNWLEtBQUssQ0FBQyxDQUFDRCxJQUFJLENBQUMyQixLQUFLLENBQUNqQixNQUFNLENBQUMsQ0FBQ21CLElBQUksQ0FBQyxDQUFDLENBQUM7TUFDcERKLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDVixLQUFLLENBQUMsQ0FBQ0QsSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDSixJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRmxCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBTTtJQUN2QmdCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxZQUFNO01BQ3pDbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQztNQUNaO01BQ0FzQixNQUFNLENBQUNwQixjQUFjLENBQUNLLE1BQU0sQ0FBQyxDQUFDbUIsSUFBSSxDQUFDLENBQUMsQ0FBQztNQUNyQyxJQUFNRyxFQUFFLEdBQUczQixjQUFjLENBQUMsQ0FBQyxDQUFDO01BQzVCRCxNQUFNLENBQUMsQ0FBQztNQUNScUIsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUNxQixFQUFFLENBQUM1QixNQUFNLENBQUMsQ0FBQ0osSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQztJQUVGTixFQUFFLENBQUMsaURBQWlELEVBQUUsWUFBTTtNQUMxRG5CLFFBQVEsQ0FBQyxFQUFFLENBQUM7TUFDWjtNQUNBc0IsTUFBTSxDQUFDcEIsY0FBYyxDQUFDSyxNQUFNLENBQUMsQ0FBQ21CLElBQUksQ0FBQyxDQUFDLENBQUM7TUFDckMsSUFBTUcsRUFBRSxHQUFHM0IsY0FBYyxDQUFDLENBQUMsQ0FBQztNQUM1QkQsTUFBTSxDQUFDLENBQUM7TUFDUnFCLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDcUIsRUFBRSxDQUFDNUIsTUFBTSxDQUFDLENBQUNKLElBQUksQ0FBQzJCLEtBQUssQ0FBQyxDQUFDQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUN2RDdCLElBQUksQ0FBQ1ksTUFBTSxDQUFDcUIsRUFBRSxDQUFDNUIsTUFBTSxDQUFDLENBQUM2QixTQUFTLENBQUMsQ0FBQztNQUNsQztNQUNBN0IsTUFBTSxDQUFDLENBQUM7TUFDUnFCLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDcUIsRUFBRSxDQUFDNUIsTUFBTSxDQUFDLENBQUNKLElBQUksQ0FBQzJCLEtBQUssQ0FBQ2pCLE1BQU0sQ0FBQyxDQUFDbUIsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRnZCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFNO0lBQy9CLElBQUk0QixXQUE0RjtJQUVoRzNCLFVBQVUsQ0FBQyxZQUFNO01BQ2YyQixXQUFXLEdBQUcxQixNQUFNLENBQUNMLFFBQVE7TUFDN0JLLE1BQU0sQ0FBQ0wsUUFBUSxHQUFHSixJQUFJLENBQUNtQixFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRkcsU0FBUyxDQUFDLFlBQU07TUFDZGIsTUFBTSxDQUFDTCxRQUFRLEdBQUcrQixXQUFXO0lBQy9CLENBQUMsQ0FBQztJQUVGWixFQUFFLENBQUMsb0JBQW9CLEVBQUUsWUFBTTtNQUM3QixJQUFNYSxLQUFLLEdBQUcsR0FBRztNQUNqQjtNQUNBaEMsUUFBUSxDQUFDLEVBQUUsQ0FBQztNQUNaLElBQVFjLFFBQVEsR0FBS1osY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUE5QlksUUFBUTtNQUNoQkEsUUFBUSxZQUFSQSxRQUFRLENBQUc7UUFBRWtCLEtBQUssRUFBTEEsS0FBSztRQUFFQyxJQUFJLEVBQUU7TUFBTSxDQUFDLENBQUM7TUFDbENYLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDSCxNQUFNLENBQUNMLFFBQVEsQ0FBQyxDQUFDSCxJQUFJLENBQUMyQixLQUFLLENBQUNqQixNQUFNLENBQUMsQ0FBQ21CLElBQUksQ0FBQyxDQUFDLENBQUM7TUFDOURKLE1BQU0sQ0FBQzFCLElBQUksQ0FBQ1ksTUFBTSxDQUFDSCxNQUFNLENBQUNMLFFBQVEsQ0FBQyxDQUFDSCxJQUFJLENBQUMyQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsSUFBSSxDQUFDTSxLQUFLLENBQUM7SUFDbkUsQ0FBQyxDQUFDO0lBRUZiLEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxZQUFNO01BQ2hFO01BQ0FuQixRQUFRLENBQUMsRUFBRSxDQUFDO01BQ1osSUFBQWtDLGdCQUFBLEdBQXVDaEMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUFoRFksUUFBUSxHQUFBb0IsZ0JBQUEsQ0FBUnBCLFFBQVE7UUFBVXFCLFFBQVEsR0FBQUQsZ0JBQUEsQ0FBaEJqQyxNQUFNO01BQ3hCYSxRQUFRLFlBQVJBLFFBQVEsQ0FBRztRQUFFa0IsS0FBSyxFQUFFLEdBQUc7UUFBRUMsSUFBSSxFQUFFO01BQUssQ0FBQyxDQUFDO01BQ3RDO01BQ0FoQyxNQUFNLENBQUMsQ0FBQztNQUNScUIsTUFBTSxDQUFDMUIsSUFBSSxDQUFDWSxNQUFNLENBQUMyQixRQUFRLENBQUMsQ0FBQ3RDLElBQUksQ0FBQzJCLEtBQUssQ0FBQ2pCLE1BQU0sQ0FBQyxDQUFDbUIsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=