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

import Positions from './Positions';
describe('Positions', function () {
  var bufferLen = 1;
  var getHeight = function getHeight(i) {
    return i * 2 + 2;
  };
  var ps;
  beforeEach(function () {
    ps = new Positions(bufferLen);
    ps.profileData(10);
  });
  describe('constructor()', function () {
    it('intializes member variables correctly', function () {
      ps = new Positions(1);
      expect(ps.ys).toEqual([]);
      expect(ps.heights).toEqual([]);
      expect(ps.bufferLen).toBe(1);
      expect(ps.dataLen).toBe(-1);
      expect(ps.lastI).toBe(-1);
    });
  });
  describe('profileData(...)', function () {
    it('manages increases in data length correctly', function () {
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
    });
    it('manages decreases in data length correctly', function () {
      ps.lastI = 9;
      ps.profileData(5);
      expect(ps.dataLen).toBe(5);
      expect(ps.ys.length).toBe(5);
      expect(ps.heights.length).toBe(5);
      expect(ps.lastI).toBe(4);
    });
    it('does nothing when data length is unchanged', function () {
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
      ps.profileData(10);
      expect(ps.dataLen).toBe(10);
      expect(ps.ys.length).toBe(10);
      expect(ps.heights.length).toBe(10);
      expect(ps.lastI).toBe(-1);
    });
  });
  describe('calcHeights()', function () {
    it('updates lastI correctly', function () {
      ps.calcHeights(1, getHeight);
      expect(ps.lastI).toBe(bufferLen + 1);
    });
    it('saves the heights and y-values up to `lastI <= max + bufferLen`', function () {
      var ys = [0, 2, 6, 12];
      ys.length = 10;
      var heights = [2, 4, 6];
      heights.length = 10;
      ps.calcHeights(1, getHeight);
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });
    it('does nothing when `max + buffer <= lastI`', function () {
      ps.calcHeights(2, getHeight);
      var ys = ps.ys.slice();
      var heights = ps.heights.slice();
      ps.calcHeights(1, getHeight);
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });
    describe('recalculates values up to `max + bufferLen` when `max + buffer <= lastI` and `forcedLastI = 0` is passed', function () {
      beforeEach(function () {
        // the initial state for the test
        ps.calcHeights(2, getHeight);
      });
      it('test-case has a valid initial state', function () {
        var initialYs = [0, 2, 6, 12, 20];
        initialYs.length = 10;
        var initialHeights = [2, 4, 6, 8];
        initialHeights.length = 10;
        expect(ps.ys).toEqual(initialYs);
        expect(ps.heights).toEqual(initialHeights);
        expect(ps.lastI).toBe(3);
      });
      it('recalcualtes the y-values correctly', function () {
        // recalc a sub-set of the calcualted values using a different getHeight
        ps.calcHeights(1, function () {
          return 2;
        }, 0);
        var ys = [0, 2, 4, 6, 20];
        ys.length = 10;
        expect(ps.ys).toEqual(ys);
      });
      it('recalcualtes the heights correctly', function () {
        // recalc a sub-set of the calcualted values using a different getHeight
        ps.calcHeights(1, function () {
          return 2;
        }, 0);
        var heights = [2, 2, 2, 8];
        heights.length = 10;
        expect(ps.heights).toEqual(heights);
      });
      it('saves lastI correctly', function () {
        // recalc a sub-set of the calcualted values
        ps.calcHeights(1, getHeight, 0);
        expect(ps.lastI).toBe(2);
      });
    });
    it('limits caclulations to the known data length', function () {
      ps.calcHeights(999, getHeight);
      expect(ps.lastI).toBe(ps.dataLen - 1);
    });
  });
  describe('calcYs()', function () {
    it('scans forward until `yValue` is met or exceeded', function () {
      ps.calcYs(11, getHeight);
      var ys = [0, 2, 6, 12, 20];
      ys.length = 10;
      var heights = [2, 4, 6, 8];
      heights.length = 10;
      expect(ps.ys).toEqual(ys);
      expect(ps.heights).toEqual(heights);
    });
    it('exits early if the known y-values exceed `yValue`', function () {
      ps.calcYs(11, getHeight);
      var spy = jest.spyOn(ps, 'calcHeights');
      ps.calcYs(10, getHeight);
      expect(spy).not.toHaveBeenCalled();
    });
    it('exits when exceeds the data length even if yValue is unmet', function () {
      ps.calcYs(999, getHeight);
      expect(ps.ys[ps.ys.length - 1]).toBeLessThan(999);
    });
  });
  describe('findFloorIndex()', function () {
    beforeEach(function () {
      ps.calcYs(11, getHeight);
      // Note: ps.ys = [0, 2, 6, 12, 20, undefined x 5];
    });
    it('scans y-values for index that equals or precedes `yValue`', function () {
      var i = ps.findFloorIndex(3, getHeight);
      expect(i).toBe(1);
      i = ps.findFloorIndex(21, getHeight);
      expect(i).toBe(4);
      ps.calcYs(999, getHeight);
      i = ps.findFloorIndex(11, getHeight);
      expect(i).toBe(2);
      i = ps.findFloorIndex(12, getHeight);
      expect(i).toBe(3);
      i = ps.findFloorIndex(20, getHeight);
      expect(i).toBe(4);
    });
    it('is robust against non-positive y-values', function () {
      var i = ps.findFloorIndex(0, getHeight);
      expect(i).toBe(0);
      i = ps.findFloorIndex(-10, getHeight);
      expect(i).toBe(0);
    });
    it('scans no further than dataLen even if `yValue` is unmet', function () {
      var i = ps.findFloorIndex(999, getHeight);
      expect(i).toBe(ps.lastI);
    });
  });
  describe('getEstimatedHeight()', function () {
    var simpleGetHeight = function simpleGetHeight() {
      return 2;
    };
    beforeEach(function () {
      ps.calcYs(5, simpleGetHeight);
      // Note: ps.ys = [0, 2, 4, 6, 8, undefined x 5];
    });
    it('returns the estimated max height, surpassing known values', function () {
      var estHeight = ps.getEstimatedHeight();
      expect(estHeight).toBeGreaterThan(ps.heights[ps.lastI]);
    });
    it('returns the known max height, if all heights have been calculated', function () {
      ps.calcYs(999, simpleGetHeight);
      var totalHeight = ps.getEstimatedHeight();
      expect(totalHeight).toBeGreaterThan(ps.heights[ps.heights.length - 1]);
    });
  });
  describe('confirmHeight()', function () {
    var simpleGetHeight = function simpleGetHeight() {
      return 2;
    };
    beforeEach(function () {
      ps.calcYs(5, simpleGetHeight);
      // Note: ps.ys = [0, 2, 4, 6, 8, undefined x 5];
    });
    it('calculates heights up to and including `_i` if necessary', function () {
      var startNumHeights = ps.heights.filter(Boolean).length;
      var calcHeightsSpy = jest.spyOn(ps, 'calcHeights');
      ps.confirmHeight(7, simpleGetHeight);
      var endNumHeights = ps.heights.filter(Boolean).length;
      expect(startNumHeights).toBeLessThan(endNumHeights);
      expect(calcHeightsSpy).toHaveBeenCalled();
    });
    it('invokes `heightGetter` at `_i` to compare result with known height', function () {
      var getHeightSpy = jest.fn(simpleGetHeight);
      ps.confirmHeight(ps.lastI - 1, getHeightSpy);
      expect(getHeightSpy).toHaveBeenCalled();
    });
    it('cascades difference in observed height vs known height to known y-values', function () {
      var getLargerHeight = function getLargerHeight() {
        return simpleGetHeight() + 2;
      };
      var knownYs = ps.ys.slice();
      var expectedYValues = knownYs.map(function (value) {
        return value ? value + 2 : value;
      });
      ps.confirmHeight(0, getLargerHeight);
      expect(ps.ys).toEqual(expectedYValues);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQb3NpdGlvbnMiLCJkZXNjcmliZSIsImJ1ZmZlckxlbiIsImdldEhlaWdodCIsImkiLCJwcyIsImJlZm9yZUVhY2giLCJwcm9maWxlRGF0YSIsIml0IiwiZXhwZWN0IiwieXMiLCJ0b0VxdWFsIiwiaGVpZ2h0cyIsInRvQmUiLCJkYXRhTGVuIiwibGFzdEkiLCJsZW5ndGgiLCJjYWxjSGVpZ2h0cyIsInNsaWNlIiwiaW5pdGlhbFlzIiwiaW5pdGlhbEhlaWdodHMiLCJjYWxjWXMiLCJzcHkiLCJqZXN0Iiwic3B5T24iLCJub3QiLCJ0b0hhdmVCZWVuQ2FsbGVkIiwidG9CZUxlc3NUaGFuIiwiZmluZEZsb29ySW5kZXgiLCJzaW1wbGVHZXRIZWlnaHQiLCJlc3RIZWlnaHQiLCJnZXRFc3RpbWF0ZWRIZWlnaHQiLCJ0b0JlR3JlYXRlclRoYW4iLCJ0b3RhbEhlaWdodCIsInN0YXJ0TnVtSGVpZ2h0cyIsImZpbHRlciIsIkJvb2xlYW4iLCJjYWxjSGVpZ2h0c1NweSIsImNvbmZpcm1IZWlnaHQiLCJlbmROdW1IZWlnaHRzIiwiZ2V0SGVpZ2h0U3B5IiwiZm4iLCJnZXRMYXJnZXJIZWlnaHQiLCJrbm93bllzIiwiZXhwZWN0ZWRZVmFsdWVzIiwibWFwIiwidmFsdWUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9MaXN0Vmlldy9Qb3NpdGlvbnMudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IFBvc2l0aW9ucyBmcm9tICcuL1Bvc2l0aW9ucyc7XG5cbmRlc2NyaWJlKCdQb3NpdGlvbnMnLCAoKSA9PiB7XG4gIGNvbnN0IGJ1ZmZlckxlbiA9IDE7XG4gIGNvbnN0IGdldEhlaWdodCA9IChpOiBudW1iZXIpID0+IGkgKiAyICsgMjtcblxuICBsZXQgcHM6IFBvc2l0aW9ucztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBwcyA9IG5ldyBQb3NpdGlvbnMoYnVmZmVyTGVuKTtcbiAgICBwcy5wcm9maWxlRGF0YSgxMCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcigpJywgKCkgPT4ge1xuICAgIGl0KCdpbnRpYWxpemVzIG1lbWJlciB2YXJpYWJsZXMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgcHMgPSBuZXcgUG9zaXRpb25zKDEpO1xuICAgICAgZXhwZWN0KHBzLnlzKS50b0VxdWFsKFtdKTtcbiAgICAgIGV4cGVjdChwcy5oZWlnaHRzKS50b0VxdWFsKFtdKTtcbiAgICAgIGV4cGVjdChwcy5idWZmZXJMZW4pLnRvQmUoMSk7XG4gICAgICBleHBlY3QocHMuZGF0YUxlbikudG9CZSgtMSk7XG4gICAgICBleHBlY3QocHMubGFzdEkpLnRvQmUoLTEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncHJvZmlsZURhdGEoLi4uKScsICgpID0+IHtcbiAgICBpdCgnbWFuYWdlcyBpbmNyZWFzZXMgaW4gZGF0YSBsZW5ndGggY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHBzLmRhdGFMZW4pLnRvQmUoMTApO1xuICAgICAgZXhwZWN0KHBzLnlzLmxlbmd0aCkudG9CZSgxMCk7XG4gICAgICBleHBlY3QocHMuaGVpZ2h0cy5sZW5ndGgpLnRvQmUoMTApO1xuICAgICAgZXhwZWN0KHBzLmxhc3RJKS50b0JlKC0xKTtcbiAgICB9KTtcblxuICAgIGl0KCdtYW5hZ2VzIGRlY3JlYXNlcyBpbiBkYXRhIGxlbmd0aCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICBwcy5sYXN0SSA9IDk7XG4gICAgICBwcy5wcm9maWxlRGF0YSg1KTtcbiAgICAgIGV4cGVjdChwcy5kYXRhTGVuKS50b0JlKDUpO1xuICAgICAgZXhwZWN0KHBzLnlzLmxlbmd0aCkudG9CZSg1KTtcbiAgICAgIGV4cGVjdChwcy5oZWlnaHRzLmxlbmd0aCkudG9CZSg1KTtcbiAgICAgIGV4cGVjdChwcy5sYXN0SSkudG9CZSg0KTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdGhpbmcgd2hlbiBkYXRhIGxlbmd0aCBpcyB1bmNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocHMuZGF0YUxlbikudG9CZSgxMCk7XG4gICAgICBleHBlY3QocHMueXMubGVuZ3RoKS50b0JlKDEwKTtcbiAgICAgIGV4cGVjdChwcy5oZWlnaHRzLmxlbmd0aCkudG9CZSgxMCk7XG4gICAgICBleHBlY3QocHMubGFzdEkpLnRvQmUoLTEpO1xuICAgICAgcHMucHJvZmlsZURhdGEoMTApO1xuICAgICAgZXhwZWN0KHBzLmRhdGFMZW4pLnRvQmUoMTApO1xuICAgICAgZXhwZWN0KHBzLnlzLmxlbmd0aCkudG9CZSgxMCk7XG4gICAgICBleHBlY3QocHMuaGVpZ2h0cy5sZW5ndGgpLnRvQmUoMTApO1xuICAgICAgZXhwZWN0KHBzLmxhc3RJKS50b0JlKC0xKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NhbGNIZWlnaHRzKCknLCAoKSA9PiB7XG4gICAgaXQoJ3VwZGF0ZXMgbGFzdEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgcHMuY2FsY0hlaWdodHMoMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChwcy5sYXN0SSkudG9CZShidWZmZXJMZW4gKyAxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzYXZlcyB0aGUgaGVpZ2h0cyBhbmQgeS12YWx1ZXMgdXAgdG8gYGxhc3RJIDw9IG1heCArIGJ1ZmZlckxlbmAnLCAoKSA9PiB7XG4gICAgICBjb25zdCB5cyA9IFswLCAyLCA2LCAxMl07XG4gICAgICB5cy5sZW5ndGggPSAxMDtcbiAgICAgIGNvbnN0IGhlaWdodHMgPSBbMiwgNCwgNl07XG4gICAgICBoZWlnaHRzLmxlbmd0aCA9IDEwO1xuICAgICAgcHMuY2FsY0hlaWdodHMoMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChwcy55cykudG9FcXVhbCh5cyk7XG4gICAgICBleHBlY3QocHMuaGVpZ2h0cykudG9FcXVhbChoZWlnaHRzKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdGhpbmcgd2hlbiBgbWF4ICsgYnVmZmVyIDw9IGxhc3RJYCcsICgpID0+IHtcbiAgICAgIHBzLmNhbGNIZWlnaHRzKDIsIGdldEhlaWdodCk7XG4gICAgICBjb25zdCB5cyA9IHBzLnlzLnNsaWNlKCk7XG4gICAgICBjb25zdCBoZWlnaHRzID0gcHMuaGVpZ2h0cy5zbGljZSgpO1xuICAgICAgcHMuY2FsY0hlaWdodHMoMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChwcy55cykudG9FcXVhbCh5cyk7XG4gICAgICBleHBlY3QocHMuaGVpZ2h0cykudG9FcXVhbChoZWlnaHRzKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWNhbGN1bGF0ZXMgdmFsdWVzIHVwIHRvIGBtYXggKyBidWZmZXJMZW5gIHdoZW4gYG1heCArIGJ1ZmZlciA8PSBsYXN0SWAgYW5kIGBmb3JjZWRMYXN0SSA9IDBgIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSBmb3IgdGhlIHRlc3RcbiAgICAgICAgcHMuY2FsY0hlaWdodHMoMiwgZ2V0SGVpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGVzdC1jYXNlIGhhcyBhIHZhbGlkIGluaXRpYWwgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxZcyA9IFswLCAyLCA2LCAxMiwgMjBdO1xuICAgICAgICBpbml0aWFsWXMubGVuZ3RoID0gMTA7XG4gICAgICAgIGNvbnN0IGluaXRpYWxIZWlnaHRzID0gWzIsIDQsIDYsIDhdO1xuICAgICAgICBpbml0aWFsSGVpZ2h0cy5sZW5ndGggPSAxMDtcbiAgICAgICAgZXhwZWN0KHBzLnlzKS50b0VxdWFsKGluaXRpYWxZcyk7XG4gICAgICAgIGV4cGVjdChwcy5oZWlnaHRzKS50b0VxdWFsKGluaXRpYWxIZWlnaHRzKTtcbiAgICAgICAgZXhwZWN0KHBzLmxhc3RJKS50b0JlKDMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZWNhbGN1YWx0ZXMgdGhlIHktdmFsdWVzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgLy8gcmVjYWxjIGEgc3ViLXNldCBvZiB0aGUgY2FsY3VhbHRlZCB2YWx1ZXMgdXNpbmcgYSBkaWZmZXJlbnQgZ2V0SGVpZ2h0XG4gICAgICAgIHBzLmNhbGNIZWlnaHRzKDEsICgpID0+IDIsIDApO1xuICAgICAgICBjb25zdCB5cyA9IFswLCAyLCA0LCA2LCAyMF07XG4gICAgICAgIHlzLmxlbmd0aCA9IDEwO1xuICAgICAgICBleHBlY3QocHMueXMpLnRvRXF1YWwoeXMpO1xuICAgICAgfSk7XG4gICAgICBpdCgncmVjYWxjdWFsdGVzIHRoZSBoZWlnaHRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgLy8gcmVjYWxjIGEgc3ViLXNldCBvZiB0aGUgY2FsY3VhbHRlZCB2YWx1ZXMgdXNpbmcgYSBkaWZmZXJlbnQgZ2V0SGVpZ2h0XG4gICAgICAgIHBzLmNhbGNIZWlnaHRzKDEsICgpID0+IDIsIDApO1xuICAgICAgICBjb25zdCBoZWlnaHRzID0gWzIsIDIsIDIsIDhdO1xuICAgICAgICBoZWlnaHRzLmxlbmd0aCA9IDEwO1xuICAgICAgICBleHBlY3QocHMuaGVpZ2h0cykudG9FcXVhbChoZWlnaHRzKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3NhdmVzIGxhc3RJIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgLy8gcmVjYWxjIGEgc3ViLXNldCBvZiB0aGUgY2FsY3VhbHRlZCB2YWx1ZXNcbiAgICAgICAgcHMuY2FsY0hlaWdodHMoMSwgZ2V0SGVpZ2h0LCAwKTtcbiAgICAgICAgZXhwZWN0KHBzLmxhc3RJKS50b0JlKDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbGltaXRzIGNhY2x1bGF0aW9ucyB0byB0aGUga25vd24gZGF0YSBsZW5ndGgnLCAoKSA9PiB7XG4gICAgICBwcy5jYWxjSGVpZ2h0cyg5OTksIGdldEhlaWdodCk7XG4gICAgICBleHBlY3QocHMubGFzdEkpLnRvQmUocHMuZGF0YUxlbiAtIDEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2FsY1lzKCknLCAoKSA9PiB7XG4gICAgaXQoJ3NjYW5zIGZvcndhcmQgdW50aWwgYHlWYWx1ZWAgaXMgbWV0IG9yIGV4Y2VlZGVkJywgKCkgPT4ge1xuICAgICAgcHMuY2FsY1lzKDExLCBnZXRIZWlnaHQpO1xuICAgICAgY29uc3QgeXMgPSBbMCwgMiwgNiwgMTIsIDIwXTtcbiAgICAgIHlzLmxlbmd0aCA9IDEwO1xuICAgICAgY29uc3QgaGVpZ2h0cyA9IFsyLCA0LCA2LCA4XTtcbiAgICAgIGhlaWdodHMubGVuZ3RoID0gMTA7XG4gICAgICBleHBlY3QocHMueXMpLnRvRXF1YWwoeXMpO1xuICAgICAgZXhwZWN0KHBzLmhlaWdodHMpLnRvRXF1YWwoaGVpZ2h0cyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXhpdHMgZWFybHkgaWYgdGhlIGtub3duIHktdmFsdWVzIGV4Y2VlZCBgeVZhbHVlYCcsICgpID0+IHtcbiAgICAgIHBzLmNhbGNZcygxMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGNvbnN0IHNweSA9IGplc3Quc3B5T24ocHMsICdjYWxjSGVpZ2h0cycpO1xuICAgICAgcHMuY2FsY1lzKDEwLCBnZXRIZWlnaHQpO1xuICAgICAgZXhwZWN0KHNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdleGl0cyB3aGVuIGV4Y2VlZHMgdGhlIGRhdGEgbGVuZ3RoIGV2ZW4gaWYgeVZhbHVlIGlzIHVubWV0JywgKCkgPT4ge1xuICAgICAgcHMuY2FsY1lzKDk5OSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChwcy55c1twcy55cy5sZW5ndGggLSAxXSkudG9CZUxlc3NUaGFuKDk5OSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdmaW5kRmxvb3JJbmRleCgpJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcHMuY2FsY1lzKDExLCBnZXRIZWlnaHQpO1xuICAgICAgLy8gTm90ZTogcHMueXMgPSBbMCwgMiwgNiwgMTIsIDIwLCB1bmRlZmluZWQgeCA1XTtcbiAgICB9KTtcblxuICAgIGl0KCdzY2FucyB5LXZhbHVlcyBmb3IgaW5kZXggdGhhdCBlcXVhbHMgb3IgcHJlY2VkZXMgYHlWYWx1ZWAnLCAoKSA9PiB7XG4gICAgICBsZXQgaSA9IHBzLmZpbmRGbG9vckluZGV4KDMsIGdldEhlaWdodCk7XG4gICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgIGkgPSBwcy5maW5kRmxvb3JJbmRleCgyMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChpKS50b0JlKDQpO1xuICAgICAgcHMuY2FsY1lzKDk5OSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGkgPSBwcy5maW5kRmxvb3JJbmRleCgxMSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgICAgaSA9IHBzLmZpbmRGbG9vckluZGV4KDEyLCBnZXRIZWlnaHQpO1xuICAgICAgZXhwZWN0KGkpLnRvQmUoMyk7XG4gICAgICBpID0gcHMuZmluZEZsb29ySW5kZXgoMjAsIGdldEhlaWdodCk7XG4gICAgICBleHBlY3QoaSkudG9CZSg0KTtcbiAgICB9KTtcblxuICAgIGl0KCdpcyByb2J1c3QgYWdhaW5zdCBub24tcG9zaXRpdmUgeS12YWx1ZXMnLCAoKSA9PiB7XG4gICAgICBsZXQgaSA9IHBzLmZpbmRGbG9vckluZGV4KDAsIGdldEhlaWdodCk7XG4gICAgICBleHBlY3QoaSkudG9CZSgwKTtcbiAgICAgIGkgPSBwcy5maW5kRmxvb3JJbmRleCgtMTAsIGdldEhlaWdodCk7XG4gICAgICBleHBlY3QoaSkudG9CZSgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzY2FucyBubyBmdXJ0aGVyIHRoYW4gZGF0YUxlbiBldmVuIGlmIGB5VmFsdWVgIGlzIHVubWV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgaSA9IHBzLmZpbmRGbG9vckluZGV4KDk5OSwgZ2V0SGVpZ2h0KTtcbiAgICAgIGV4cGVjdChpKS50b0JlKHBzLmxhc3RJKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldEVzdGltYXRlZEhlaWdodCgpJywgKCkgPT4ge1xuICAgIGNvbnN0IHNpbXBsZUdldEhlaWdodCA9ICgpID0+IDI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHBzLmNhbGNZcyg1LCBzaW1wbGVHZXRIZWlnaHQpO1xuICAgICAgLy8gTm90ZTogcHMueXMgPSBbMCwgMiwgNCwgNiwgOCwgdW5kZWZpbmVkIHggNV07XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZXN0aW1hdGVkIG1heCBoZWlnaHQsIHN1cnBhc3Npbmcga25vd24gdmFsdWVzJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXN0SGVpZ2h0ID0gcHMuZ2V0RXN0aW1hdGVkSGVpZ2h0KCk7XG4gICAgICBleHBlY3QoZXN0SGVpZ2h0KS50b0JlR3JlYXRlclRoYW4ocHMuaGVpZ2h0c1twcy5sYXN0SV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGtub3duIG1heCBoZWlnaHQsIGlmIGFsbCBoZWlnaHRzIGhhdmUgYmVlbiBjYWxjdWxhdGVkJywgKCkgPT4ge1xuICAgICAgcHMuY2FsY1lzKDk5OSwgc2ltcGxlR2V0SGVpZ2h0KTtcbiAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gcHMuZ2V0RXN0aW1hdGVkSGVpZ2h0KCk7XG4gICAgICBleHBlY3QodG90YWxIZWlnaHQpLnRvQmVHcmVhdGVyVGhhbihwcy5oZWlnaHRzW3BzLmhlaWdodHMubGVuZ3RoIC0gMV0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29uZmlybUhlaWdodCgpJywgKCkgPT4ge1xuICAgIGNvbnN0IHNpbXBsZUdldEhlaWdodCA9ICgpID0+IDI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHBzLmNhbGNZcyg1LCBzaW1wbGVHZXRIZWlnaHQpO1xuICAgICAgLy8gTm90ZTogcHMueXMgPSBbMCwgMiwgNCwgNiwgOCwgdW5kZWZpbmVkIHggNV07XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsY3VsYXRlcyBoZWlnaHRzIHVwIHRvIGFuZCBpbmNsdWRpbmcgYF9pYCBpZiBuZWNlc3NhcnknLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGFydE51bUhlaWdodHMgPSBwcy5oZWlnaHRzLmZpbHRlcihCb29sZWFuKS5sZW5ndGg7XG4gICAgICBjb25zdCBjYWxjSGVpZ2h0c1NweSA9IGplc3Quc3B5T24ocHMsICdjYWxjSGVpZ2h0cycpO1xuICAgICAgcHMuY29uZmlybUhlaWdodCg3LCBzaW1wbGVHZXRIZWlnaHQpO1xuICAgICAgY29uc3QgZW5kTnVtSGVpZ2h0cyA9IHBzLmhlaWdodHMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aDtcbiAgICAgIGV4cGVjdChzdGFydE51bUhlaWdodHMpLnRvQmVMZXNzVGhhbihlbmROdW1IZWlnaHRzKTtcbiAgICAgIGV4cGVjdChjYWxjSGVpZ2h0c1NweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ludm9rZXMgYGhlaWdodEdldHRlcmAgYXQgYF9pYCB0byBjb21wYXJlIHJlc3VsdCB3aXRoIGtub3duIGhlaWdodCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGdldEhlaWdodFNweSA9IGplc3QuZm4oc2ltcGxlR2V0SGVpZ2h0KTtcbiAgICAgIHBzLmNvbmZpcm1IZWlnaHQocHMubGFzdEkgLSAxLCBnZXRIZWlnaHRTcHkpO1xuICAgICAgZXhwZWN0KGdldEhlaWdodFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Nhc2NhZGVzIGRpZmZlcmVuY2UgaW4gb2JzZXJ2ZWQgaGVpZ2h0IHZzIGtub3duIGhlaWdodCB0byBrbm93biB5LXZhbHVlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGdldExhcmdlckhlaWdodCA9ICgpID0+IHNpbXBsZUdldEhlaWdodCgpICsgMjtcbiAgICAgIGNvbnN0IGtub3duWXMgPSBwcy55cy5zbGljZSgpO1xuICAgICAgY29uc3QgZXhwZWN0ZWRZVmFsdWVzID0ga25vd25Zcy5tYXAoKHZhbHVlKSA9PiAodmFsdWUgPyB2YWx1ZSArIDIgOiB2YWx1ZSkpO1xuICAgICAgcHMuY29uZmlybUhlaWdodCgwLCBnZXRMYXJnZXJIZWlnaHQpO1xuICAgICAgZXhwZWN0KHBzLnlzKS50b0VxdWFsKGV4cGVjdGVkWVZhbHVlcyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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