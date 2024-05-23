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
 * Keeps track of the height and y-position for anything sequenctial where
 * y-positions follow one-after-another and can be derived from the height of
 * the prior entries. The height is known from an accessor function parameter
 * to the methods that require new knowledge the heights.
 *
 * @export
 * @class Positions
 */
var Positions = /*#__PURE__*/function () {
  /**
   * Indicates how far past the explicitly required height or y-values should
   * checked.
   */

  /**
   * `lastI` keeps track of which values have already been visited. In many
   * scenarios, values do not need to be revisited. But, revisiting is required
   * when heights have changed, so `lastI` can be forced.
   */

  function Positions(bufferLen) {
    this.ys = [];
    this.heights = [];
    this.bufferLen = bufferLen;
    this.dataLen = -1;
    this.lastI = -1;
  }

  /**
   * Used to make sure the length of y-values and heights is consistent with
   * the context; in particular `lastI` needs to remain valid.
   */
  var _proto = Positions.prototype;
  _proto.profileData = function profileData(dataLength) {
    if (dataLength !== this.dataLen) {
      this.dataLen = dataLength;
      this.ys.length = dataLength;
      this.heights.length = dataLength;
      if (this.lastI >= dataLength) {
        this.lastI = dataLength - 1;
      }
    }
  }

  /**
   * Calculate and save the heights and y-values, based on `heightGetter`, from
   * `lastI` until the`max` index; the starting point (`lastI`) can be forced
   * via the `forcedLastI` parameter.
   * @param {number=} forcedLastI
   */;
  _proto.calcHeights = function calcHeights(max, heightGetter, forcedLastI) {
    if (forcedLastI != null) {
      this.lastI = forcedLastI;
    }
    var _max = max + this.bufferLen;
    if (_max <= this.lastI) {
      return;
    }
    if (_max >= this.heights.length) {
      _max = this.heights.length - 1;
    }
    var i = this.lastI;
    if (this.lastI === -1) {
      i = 0;
      this.ys[0] = 0;
    }
    while (i <= _max) {
      // eslint-disable-next-line no-multi-assign
      var h = this.heights[i] = heightGetter(i);
      this.ys[i + 1] = this.ys[i] + h;
      i++;
    }
    this.lastI = _max;
  }

  /**
   * Verify the height and y-values from `lastI` up to `yValue`.
   */;
  _proto.calcYs = function calcYs(yValue, heightGetter) {
    while ((this.ys[this.lastI] == null || yValue > this.ys[this.lastI]) && this.lastI < this.dataLen - 1) {
      this.calcHeights(this.lastI, heightGetter);
    }
  }

  /**
   * Get the latest height for index `_i`. If it's in new terretory
   * (_i > lastI), find the heights (and y-values) leading up to it. If it's in
   * known territory (_i <= lastI) and the height is different than what is
   * known, recalculate subsequent y values, but don't confirm the heights of
   * those items, just update based on the difference.
   */;
  _proto.confirmHeight = function confirmHeight(_i, heightGetter) {
    var i = _i;
    if (i > this.lastI) {
      this.calcHeights(i, heightGetter);
      return;
    }
    var h = heightGetter(i);
    if (h === this.heights[i]) {
      return;
    }
    var chg = h - this.heights[i];
    this.heights[i] = h;
    // shift the y positions by `chg` for all known y positions
    while (++i <= this.lastI) {
      this.ys[i] += chg;
    }
    if (this.ys[this.lastI + 1] != null) {
      this.ys[this.lastI + 1] += chg;
    }
  }

  /**
   * Given a target y-value (`yValue`), find the closest index (in the `.ys`
   * array) that is prior to the y-value; e.g. map from y-value to index in
   * `.ys`.
   */;
  _proto.findFloorIndex = function findFloorIndex(yValue, heightGetter) {
    this.calcYs(yValue, heightGetter);
    var imin = 0;
    var imax = this.lastI;
    if (this.ys.length < 2 || yValue < this.ys[1]) {
      return 0;
    }
    if (yValue > this.ys[imax]) {
      return imax;
    }
    var i;
    while (imin < imax) {
      // eslint-disable-next-line no-bitwise
      i = imin + 0.5 * (imax - imin) | 0;
      if (yValue > this.ys[i]) {
        if (yValue <= this.ys[i + 1]) {
          return i;
        }
        imin = i;
      } else if (yValue < this.ys[i]) {
        if (yValue >= this.ys[i - 1]) {
          return i - 1;
        }
        imax = i;
      } else {
        return i;
      }
    }
    throw new Error("unable to find floor index for y=" + yValue);
  }

  /**
   * Get the `y` and `height` for a given row.
   *
   * @returns {{ height: number, y: number }}
   */;
  _proto.getRowPosition = function getRowPosition(index, heightGetter) {
    this.confirmHeight(index, heightGetter);
    return {
      height: this.heights[index],
      y: this.ys[index]
    };
  }

  /**
   * Get the estimated height of the whole shebang by extrapolating based on
   * the average known height.
   */;
  _proto.getEstimatedHeight = function getEstimatedHeight() {
    var known = this.ys[this.lastI] + this.heights[this.lastI];
    if (this.lastI >= this.dataLen - 1) {
      // eslint-disable-next-line no-bitwise
      return known | 0;
    }
    // eslint-disable-next-line no-bitwise
    return known / (this.lastI + 1) * this.heights.length | 0;
  };
  return Positions;
}();
export { Positions as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQb3NpdGlvbnMiLCJidWZmZXJMZW4iLCJ5cyIsImhlaWdodHMiLCJkYXRhTGVuIiwibGFzdEkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJwcm9maWxlRGF0YSIsImRhdGFMZW5ndGgiLCJsZW5ndGgiLCJjYWxjSGVpZ2h0cyIsIm1heCIsImhlaWdodEdldHRlciIsImZvcmNlZExhc3RJIiwiX21heCIsImkiLCJoIiwiY2FsY1lzIiwieVZhbHVlIiwiY29uZmlybUhlaWdodCIsIl9pIiwiY2hnIiwiZmluZEZsb29ySW5kZXgiLCJpbWluIiwiaW1heCIsIkVycm9yIiwiZ2V0Um93UG9zaXRpb24iLCJpbmRleCIsImhlaWdodCIsInkiLCJnZXRFc3RpbWF0ZWRIZWlnaHQiLCJrbm93biIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9MaXN0Vmlldy9Qb3NpdGlvbnMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG50eXBlIFRIZWlnaHRHZXR0ZXIgPSAoaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBoZWlnaHQgYW5kIHktcG9zaXRpb24gZm9yIGFueXRoaW5nIHNlcXVlbmN0aWFsIHdoZXJlXG4gKiB5LXBvc2l0aW9ucyBmb2xsb3cgb25lLWFmdGVyLWFub3RoZXIgYW5kIGNhbiBiZSBkZXJpdmVkIGZyb20gdGhlIGhlaWdodCBvZlxuICogdGhlIHByaW9yIGVudHJpZXMuIFRoZSBoZWlnaHQgaXMga25vd24gZnJvbSBhbiBhY2Nlc3NvciBmdW5jdGlvbiBwYXJhbWV0ZXJcbiAqIHRvIHRoZSBtZXRob2RzIHRoYXQgcmVxdWlyZSBuZXcga25vd2xlZGdlIHRoZSBoZWlnaHRzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQb3NpdGlvbnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25zIHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBob3cgZmFyIHBhc3QgdGhlIGV4cGxpY2l0bHkgcmVxdWlyZWQgaGVpZ2h0IG9yIHktdmFsdWVzIHNob3VsZFxuICAgKiBjaGVja2VkLlxuICAgKi9cbiAgYnVmZmVyTGVuOiBudW1iZXI7XG4gIGRhdGFMZW46IG51bWJlcjtcbiAgaGVpZ2h0czogbnVtYmVyW107XG4gIC8qKlxuICAgKiBgbGFzdElgIGtlZXBzIHRyYWNrIG9mIHdoaWNoIHZhbHVlcyBoYXZlIGFscmVhZHkgYmVlbiB2aXNpdGVkLiBJbiBtYW55XG4gICAqIHNjZW5hcmlvcywgdmFsdWVzIGRvIG5vdCBuZWVkIHRvIGJlIHJldmlzaXRlZC4gQnV0LCByZXZpc2l0aW5nIGlzIHJlcXVpcmVkXG4gICAqIHdoZW4gaGVpZ2h0cyBoYXZlIGNoYW5nZWQsIHNvIGBsYXN0SWAgY2FuIGJlIGZvcmNlZC5cbiAgICovXG4gIGxhc3RJOiBudW1iZXI7XG4gIHlzOiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXJMZW46IG51bWJlcikge1xuICAgIHRoaXMueXMgPSBbXTtcbiAgICB0aGlzLmhlaWdodHMgPSBbXTtcbiAgICB0aGlzLmJ1ZmZlckxlbiA9IGJ1ZmZlckxlbjtcbiAgICB0aGlzLmRhdGFMZW4gPSAtMTtcbiAgICB0aGlzLmxhc3RJID0gLTE7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBtYWtlIHN1cmUgdGhlIGxlbmd0aCBvZiB5LXZhbHVlcyBhbmQgaGVpZ2h0cyBpcyBjb25zaXN0ZW50IHdpdGhcbiAgICogdGhlIGNvbnRleHQ7IGluIHBhcnRpY3VsYXIgYGxhc3RJYCBuZWVkcyB0byByZW1haW4gdmFsaWQuXG4gICAqL1xuICBwcm9maWxlRGF0YShkYXRhTGVuZ3RoOiBudW1iZXIpIHtcbiAgICBpZiAoZGF0YUxlbmd0aCAhPT0gdGhpcy5kYXRhTGVuKSB7XG4gICAgICB0aGlzLmRhdGFMZW4gPSBkYXRhTGVuZ3RoO1xuICAgICAgdGhpcy55cy5sZW5ndGggPSBkYXRhTGVuZ3RoO1xuICAgICAgdGhpcy5oZWlnaHRzLmxlbmd0aCA9IGRhdGFMZW5ndGg7XG4gICAgICBpZiAodGhpcy5sYXN0SSA+PSBkYXRhTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGFzdEkgPSBkYXRhTGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGFuZCBzYXZlIHRoZSBoZWlnaHRzIGFuZCB5LXZhbHVlcywgYmFzZWQgb24gYGhlaWdodEdldHRlcmAsIGZyb21cbiAgICogYGxhc3RJYCB1bnRpbCB0aGVgbWF4YCBpbmRleDsgdGhlIHN0YXJ0aW5nIHBvaW50IChgbGFzdElgKSBjYW4gYmUgZm9yY2VkXG4gICAqIHZpYSB0aGUgYGZvcmNlZExhc3RJYCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyPX0gZm9yY2VkTGFzdElcbiAgICovXG4gIGNhbGNIZWlnaHRzKG1heDogbnVtYmVyLCBoZWlnaHRHZXR0ZXI6IFRIZWlnaHRHZXR0ZXIsIGZvcmNlZExhc3RJPzogbnVtYmVyKSB7XG4gICAgaWYgKGZvcmNlZExhc3RJICE9IG51bGwpIHtcbiAgICAgIHRoaXMubGFzdEkgPSBmb3JjZWRMYXN0STtcbiAgICB9XG4gICAgbGV0IF9tYXggPSBtYXggKyB0aGlzLmJ1ZmZlckxlbjtcbiAgICBpZiAoX21heCA8PSB0aGlzLmxhc3RJKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfbWF4ID49IHRoaXMuaGVpZ2h0cy5sZW5ndGgpIHtcbiAgICAgIF9tYXggPSB0aGlzLmhlaWdodHMubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgbGV0IGkgPSB0aGlzLmxhc3RJO1xuICAgIGlmICh0aGlzLmxhc3RJID09PSAtMSkge1xuICAgICAgaSA9IDA7XG4gICAgICB0aGlzLnlzWzBdID0gMDtcbiAgICB9XG4gICAgd2hpbGUgKGkgPD0gX21heCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW11bHRpLWFzc2lnblxuICAgICAgY29uc3QgaCA9ICh0aGlzLmhlaWdodHNbaV0gPSBoZWlnaHRHZXR0ZXIoaSkpO1xuICAgICAgdGhpcy55c1tpICsgMV0gPSB0aGlzLnlzW2ldICsgaDtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgdGhpcy5sYXN0SSA9IF9tYXg7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IHRoZSBoZWlnaHQgYW5kIHktdmFsdWVzIGZyb20gYGxhc3RJYCB1cCB0byBgeVZhbHVlYC5cbiAgICovXG4gIGNhbGNZcyh5VmFsdWU6IG51bWJlciwgaGVpZ2h0R2V0dGVyOiBUSGVpZ2h0R2V0dGVyKSB7XG4gICAgd2hpbGUgKCh0aGlzLnlzW3RoaXMubGFzdEldID09IG51bGwgfHwgeVZhbHVlID4gdGhpcy55c1t0aGlzLmxhc3RJXSkgJiYgdGhpcy5sYXN0SSA8IHRoaXMuZGF0YUxlbiAtIDEpIHtcbiAgICAgIHRoaXMuY2FsY0hlaWdodHModGhpcy5sYXN0SSwgaGVpZ2h0R2V0dGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsYXRlc3QgaGVpZ2h0IGZvciBpbmRleCBgX2lgLiBJZiBpdCdzIGluIG5ldyB0ZXJyZXRvcnlcbiAgICogKF9pID4gbGFzdEkpLCBmaW5kIHRoZSBoZWlnaHRzIChhbmQgeS12YWx1ZXMpIGxlYWRpbmcgdXAgdG8gaXQuIElmIGl0J3MgaW5cbiAgICoga25vd24gdGVycml0b3J5IChfaSA8PSBsYXN0SSkgYW5kIHRoZSBoZWlnaHQgaXMgZGlmZmVyZW50IHRoYW4gd2hhdCBpc1xuICAgKiBrbm93biwgcmVjYWxjdWxhdGUgc3Vic2VxdWVudCB5IHZhbHVlcywgYnV0IGRvbid0IGNvbmZpcm0gdGhlIGhlaWdodHMgb2ZcbiAgICogdGhvc2UgaXRlbXMsIGp1c3QgdXBkYXRlIGJhc2VkIG9uIHRoZSBkaWZmZXJlbmNlLlxuICAgKi9cbiAgY29uZmlybUhlaWdodChfaTogbnVtYmVyLCBoZWlnaHRHZXR0ZXI6IFRIZWlnaHRHZXR0ZXIpIHtcbiAgICBsZXQgaSA9IF9pO1xuICAgIGlmIChpID4gdGhpcy5sYXN0SSkge1xuICAgICAgdGhpcy5jYWxjSGVpZ2h0cyhpLCBoZWlnaHRHZXR0ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoID0gaGVpZ2h0R2V0dGVyKGkpO1xuICAgIGlmIChoID09PSB0aGlzLmhlaWdodHNbaV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2hnID0gaCAtIHRoaXMuaGVpZ2h0c1tpXTtcbiAgICB0aGlzLmhlaWdodHNbaV0gPSBoO1xuICAgIC8vIHNoaWZ0IHRoZSB5IHBvc2l0aW9ucyBieSBgY2hnYCBmb3IgYWxsIGtub3duIHkgcG9zaXRpb25zXG4gICAgd2hpbGUgKCsraSA8PSB0aGlzLmxhc3RJKSB7XG4gICAgICB0aGlzLnlzW2ldICs9IGNoZztcbiAgICB9XG4gICAgaWYgKHRoaXMueXNbdGhpcy5sYXN0SSArIDFdICE9IG51bGwpIHtcbiAgICAgIHRoaXMueXNbdGhpcy5sYXN0SSArIDFdICs9IGNoZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSB0YXJnZXQgeS12YWx1ZSAoYHlWYWx1ZWApLCBmaW5kIHRoZSBjbG9zZXN0IGluZGV4IChpbiB0aGUgYC55c2BcbiAgICogYXJyYXkpIHRoYXQgaXMgcHJpb3IgdG8gdGhlIHktdmFsdWU7IGUuZy4gbWFwIGZyb20geS12YWx1ZSB0byBpbmRleCBpblxuICAgKiBgLnlzYC5cbiAgICovXG4gIGZpbmRGbG9vckluZGV4KHlWYWx1ZTogbnVtYmVyLCBoZWlnaHRHZXR0ZXI6IFRIZWlnaHRHZXR0ZXIpOiBudW1iZXIge1xuICAgIHRoaXMuY2FsY1lzKHlWYWx1ZSwgaGVpZ2h0R2V0dGVyKTtcblxuICAgIGxldCBpbWluID0gMDtcbiAgICBsZXQgaW1heCA9IHRoaXMubGFzdEk7XG5cbiAgICBpZiAodGhpcy55cy5sZW5ndGggPCAyIHx8IHlWYWx1ZSA8IHRoaXMueXNbMV0pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoeVZhbHVlID4gdGhpcy55c1tpbWF4XSkge1xuICAgICAgcmV0dXJuIGltYXg7XG4gICAgfVxuICAgIGxldCBpO1xuICAgIHdoaWxlIChpbWluIDwgaW1heCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIGkgPSAoaW1pbiArIDAuNSAqIChpbWF4IC0gaW1pbikpIHwgMDtcbiAgICAgIGlmICh5VmFsdWUgPiB0aGlzLnlzW2ldKSB7XG4gICAgICAgIGlmICh5VmFsdWUgPD0gdGhpcy55c1tpICsgMV0pIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpbWluID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoeVZhbHVlIDwgdGhpcy55c1tpXSkge1xuICAgICAgICBpZiAoeVZhbHVlID49IHRoaXMueXNbaSAtIDFdKSB7XG4gICAgICAgICAgcmV0dXJuIGkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGltYXggPSBpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgdW5hYmxlIHRvIGZpbmQgZmxvb3IgaW5kZXggZm9yIHk9JHt5VmFsdWV9YCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBgeWAgYW5kIGBoZWlnaHRgIGZvciBhIGdpdmVuIHJvdy5cbiAgICpcbiAgICogQHJldHVybnMge3sgaGVpZ2h0OiBudW1iZXIsIHk6IG51bWJlciB9fVxuICAgKi9cbiAgZ2V0Um93UG9zaXRpb24oaW5kZXg6IG51bWJlciwgaGVpZ2h0R2V0dGVyOiBUSGVpZ2h0R2V0dGVyKSB7XG4gICAgdGhpcy5jb25maXJtSGVpZ2h0KGluZGV4LCBoZWlnaHRHZXR0ZXIpO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0c1tpbmRleF0sXG4gICAgICB5OiB0aGlzLnlzW2luZGV4XSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXN0aW1hdGVkIGhlaWdodCBvZiB0aGUgd2hvbGUgc2hlYmFuZyBieSBleHRyYXBvbGF0aW5nIGJhc2VkIG9uXG4gICAqIHRoZSBhdmVyYWdlIGtub3duIGhlaWdodC5cbiAgICovXG4gIGdldEVzdGltYXRlZEhlaWdodCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGtub3duID0gdGhpcy55c1t0aGlzLmxhc3RJXSArIHRoaXMuaGVpZ2h0c1t0aGlzLmxhc3RJXTtcbiAgICBpZiAodGhpcy5sYXN0SSA+PSB0aGlzLmRhdGFMZW4gLSAxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgcmV0dXJuIGtub3duIHwgMDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICByZXR1cm4gKChrbm93biAvICh0aGlzLmxhc3RJICsgMSkpICogdGhpcy5oZWlnaHRzLmxlbmd0aCkgfCAwO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkEsSUFTcUJBLFNBQVM7RUFDNUI7QUFDRjtBQUNBO0FBQ0E7O0VBSUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7RUFJRSxTQUFBQSxVQUFZQyxTQUFpQixFQUFFO0lBQzdCLElBQUksQ0FBQ0MsRUFBRSxHQUFHLEVBQUU7SUFDWixJQUFJLENBQUNDLE9BQU8sR0FBRyxFQUFFO0lBQ2pCLElBQUksQ0FBQ0YsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ0csT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUNDLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDakI7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7RUFIRSxJQUFBQyxNQUFBLEdBQUFOLFNBQUEsQ0FBQU8sU0FBQTtFQUFBRCxNQUFBLENBSUFFLFdBQVcsR0FBWCxTQUFBQSxZQUFZQyxVQUFrQixFQUFFO0lBQzlCLElBQUlBLFVBQVUsS0FBSyxJQUFJLENBQUNMLE9BQU8sRUFBRTtNQUMvQixJQUFJLENBQUNBLE9BQU8sR0FBR0ssVUFBVTtNQUN6QixJQUFJLENBQUNQLEVBQUUsQ0FBQ1EsTUFBTSxHQUFHRCxVQUFVO01BQzNCLElBQUksQ0FBQ04sT0FBTyxDQUFDTyxNQUFNLEdBQUdELFVBQVU7TUFDaEMsSUFBSSxJQUFJLENBQUNKLEtBQUssSUFBSUksVUFBVSxFQUFFO1FBQzVCLElBQUksQ0FBQ0osS0FBSyxHQUFH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