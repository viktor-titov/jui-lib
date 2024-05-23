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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQb3NpdGlvbnMiLCJidWZmZXJMZW4iLCJ5cyIsImhlaWdodHMiLCJkYXRhTGVuIiwibGFzdEkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJwcm9maWxlRGF0YSIsImRhdGFMZW5ndGgiLCJsZW5ndGgiLCJjYWxjSGVpZ2h0cyIsIm1heCIsImhlaWdodEdldHRlciIsImZvcmNlZExhc3RJIiwiX21heCIsImkiLCJoIiwiY2FsY1lzIiwieVZhbHVlIiwiY29uZmlybUhlaWdodCIsIl9pIiwiY2hnIiwiZmluZEZsb29ySW5kZXgiLCJpbWluIiwiaW1heCIsIkVycm9yIiwiZ2V0Um93UG9zaXRpb24iLCJpbmRleCIsImhlaWdodCIsInkiLCJnZXRFc3RpbWF0ZWRIZWlnaHQiLCJrbm93biIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvTGlzdFZpZXcvUG9zaXRpb25zLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxudHlwZSBUSGVpZ2h0R2V0dGVyID0gKGluZGV4OiBudW1iZXIpID0+IG51bWJlcjtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgaGVpZ2h0IGFuZCB5LXBvc2l0aW9uIGZvciBhbnl0aGluZyBzZXF1ZW5jdGlhbCB3aGVyZVxuICogeS1wb3NpdGlvbnMgZm9sbG93IG9uZS1hZnRlci1hbm90aGVyIGFuZCBjYW4gYmUgZGVyaXZlZCBmcm9tIHRoZSBoZWlnaHQgb2ZcbiAqIHRoZSBwcmlvciBlbnRyaWVzLiBUaGUgaGVpZ2h0IGlzIGtub3duIGZyb20gYW4gYWNjZXNzb3IgZnVuY3Rpb24gcGFyYW1ldGVyXG4gKiB0byB0aGUgbWV0aG9kcyB0aGF0IHJlcXVpcmUgbmV3IGtub3dsZWRnZSB0aGUgaGVpZ2h0cy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUG9zaXRpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9ucyB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IGZhciBwYXN0IHRoZSBleHBsaWNpdGx5IHJlcXVpcmVkIGhlaWdodCBvciB5LXZhbHVlcyBzaG91bGRcbiAgICogY2hlY2tlZC5cbiAgICovXG4gIGJ1ZmZlckxlbjogbnVtYmVyO1xuICBkYXRhTGVuOiBudW1iZXI7XG4gIGhlaWdodHM6IG51bWJlcltdO1xuICAvKipcbiAgICogYGxhc3RJYCBrZWVwcyB0cmFjayBvZiB3aGljaCB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW4gdmlzaXRlZC4gSW4gbWFueVxuICAgKiBzY2VuYXJpb3MsIHZhbHVlcyBkbyBub3QgbmVlZCB0byBiZSByZXZpc2l0ZWQuIEJ1dCwgcmV2aXNpdGluZyBpcyByZXF1aXJlZFxuICAgKiB3aGVuIGhlaWdodHMgaGF2ZSBjaGFuZ2VkLCBzbyBgbGFzdElgIGNhbiBiZSBmb3JjZWQuXG4gICAqL1xuICBsYXN0STogbnVtYmVyO1xuICB5czogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoYnVmZmVyTGVuOiBudW1iZXIpIHtcbiAgICB0aGlzLnlzID0gW107XG4gICAgdGhpcy5oZWlnaHRzID0gW107XG4gICAgdGhpcy5idWZmZXJMZW4gPSBidWZmZXJMZW47XG4gICAgdGhpcy5kYXRhTGVuID0gLTE7XG4gICAgdGhpcy5sYXN0SSA9IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gbWFrZSBzdXJlIHRoZSBsZW5ndGggb2YgeS12YWx1ZXMgYW5kIGhlaWdodHMgaXMgY29uc2lzdGVudCB3aXRoXG4gICAqIHRoZSBjb250ZXh0OyBpbiBwYXJ0aWN1bGFyIGBsYXN0SWAgbmVlZHMgdG8gcmVtYWluIHZhbGlkLlxuICAgKi9cbiAgcHJvZmlsZURhdGEoZGF0YUxlbmd0aDogbnVtYmVyKSB7XG4gICAgaWYgKGRhdGFMZW5ndGggIT09IHRoaXMuZGF0YUxlbikge1xuICAgICAgdGhpcy5kYXRhTGVuID0gZGF0YUxlbmd0aDtcbiAgICAgIHRoaXMueXMubGVuZ3RoID0gZGF0YUxlbmd0aDtcbiAgICAgIHRoaXMuaGVpZ2h0cy5sZW5ndGggPSBkYXRhTGVuZ3RoO1xuICAgICAgaWYgKHRoaXMubGFzdEkgPj0gZGF0YUxlbmd0aCkge1xuICAgICAgICB0aGlzLmxhc3RJID0gZGF0YUxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBhbmQgc2F2ZSB0aGUgaGVpZ2h0cyBhbmQgeS12YWx1ZXMsIGJhc2VkIG9uIGBoZWlnaHRHZXR0ZXJgLCBmcm9tXG4gICAqIGBsYXN0SWAgdW50aWwgdGhlYG1heGAgaW5kZXg7IHRoZSBzdGFydGluZyBwb2ludCAoYGxhc3RJYCkgY2FuIGJlIGZvcmNlZFxuICAgKiB2aWEgdGhlIGBmb3JjZWRMYXN0SWAgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge251bWJlcj19IGZvcmNlZExhc3RJXG4gICAqL1xuICBjYWxjSGVpZ2h0cyhtYXg6IG51bWJlciwgaGVpZ2h0R2V0dGVyOiBUSGVpZ2h0R2V0dGVyLCBmb3JjZWRMYXN0ST86IG51bWJlcikge1xuICAgIGlmIChmb3JjZWRMYXN0SSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmxhc3RJID0gZm9yY2VkTGFzdEk7XG4gICAgfVxuICAgIGxldCBfbWF4ID0gbWF4ICsgdGhpcy5idWZmZXJMZW47XG4gICAgaWYgKF9tYXggPD0gdGhpcy5sYXN0SSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX21heCA+PSB0aGlzLmhlaWdodHMubGVuZ3RoKSB7XG4gICAgICBfbWF4ID0gdGhpcy5oZWlnaHRzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIGxldCBpID0gdGhpcy5sYXN0STtcbiAgICBpZiAodGhpcy5sYXN0SSA9PT0gLTEpIHtcbiAgICAgIGkgPSAwO1xuICAgICAgdGhpcy55c1swXSA9IDA7XG4gICAgfVxuICAgIHdoaWxlIChpIDw9IF9tYXgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tdWx0aS1hc3NpZ25cbiAgICAgIGNvbnN0IGggPSAodGhpcy5oZWlnaHRzW2ldID0gaGVpZ2h0R2V0dGVyKGkpKTtcbiAgICAgIHRoaXMueXNbaSArIDFdID0gdGhpcy55c1tpXSArIGg7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHRoaXMubGFzdEkgPSBfbWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSB0aGUgaGVpZ2h0IGFuZCB5LXZhbHVlcyBmcm9tIGBsYXN0SWAgdXAgdG8gYHlWYWx1ZWAuXG4gICAqL1xuICBjYWxjWXMoeVZhbHVlOiBudW1iZXIsIGhlaWdodEdldHRlcjogVEhlaWdodEdldHRlcikge1xuICAgIHdoaWxlICgodGhpcy55c1t0aGlzLmxhc3RJXSA9PSBudWxsIHx8IHlWYWx1ZSA+IHRoaXMueXNbdGhpcy5sYXN0SV0pICYmIHRoaXMubGFzdEkgPCB0aGlzLmRhdGFMZW4gLSAxKSB7XG4gICAgICB0aGlzLmNhbGNIZWlnaHRzKHRoaXMubGFzdEksIGhlaWdodEdldHRlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGF0ZXN0IGhlaWdodCBmb3IgaW5kZXggYF9pYC4gSWYgaXQncyBpbiBuZXcgdGVycmV0b3J5XG4gICAqIChfaSA+IGxhc3RJKSwgZmluZCB0aGUgaGVpZ2h0cyAoYW5kIHktdmFsdWVzKSBsZWFkaW5nIHVwIHRvIGl0LiBJZiBpdCdzIGluXG4gICAqIGtub3duIHRlcnJpdG9yeSAoX2kgPD0gbGFzdEkpIGFuZCB0aGUgaGVpZ2h0IGlzIGRpZmZlcmVudCB0aGFuIHdoYXQgaXNcbiAgICoga25vd24sIHJlY2FsY3VsYXRlIHN1YnNlcXVlbnQgeSB2YWx1ZXMsIGJ1dCBkb24ndCBjb25maXJtIHRoZSBoZWlnaHRzIG9mXG4gICAqIHRob3NlIGl0ZW1zLCBqdXN0IHVwZGF0ZSBiYXNlZCBvbiB0aGUgZGlmZmVyZW5jZS5cbiAgICovXG4gIGNvbmZpcm1IZWlnaHQoX2k6IG51bWJlciwgaGVpZ2h0R2V0dGVyOiBUSGVpZ2h0R2V0dGVyKSB7XG4gICAgbGV0IGkgPSBfaTtcbiAgICBpZiAoaSA+IHRoaXMubGFzdEkpIHtcbiAgICAgIHRoaXMuY2FsY0hlaWdodHMoaSwgaGVpZ2h0R2V0dGVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaCA9IGhlaWdodEdldHRlcihpKTtcbiAgICBpZiAoaCA9PT0gdGhpcy5oZWlnaHRzW2ldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNoZyA9IGggLSB0aGlzLmhlaWdodHNbaV07XG4gICAgdGhpcy5oZWlnaHRzW2ldID0gaDtcbiAgICAvLyBzaGlmdCB0aGUgeSBwb3NpdGlvbnMgYnkgYGNoZ2AgZm9yIGFsbCBrbm93biB5IHBvc2l0aW9uc1xuICAgIHdoaWxlICgrK2kgPD0gdGhpcy5sYXN0SSkge1xuICAgICAgdGhpcy55c1tpXSArPSBjaGc7XG4gICAgfVxuICAgIGlmICh0aGlzLnlzW3RoaXMubGFzdEkgKyAxXSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnlzW3RoaXMubGFzdEkgKyAxXSArPSBjaGc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgdGFyZ2V0IHktdmFsdWUgKGB5VmFsdWVgKSwgZmluZCB0aGUgY2xvc2VzdCBpbmRleCAoaW4gdGhlIGAueXNgXG4gICAqIGFycmF5KSB0aGF0IGlzIHByaW9yIHRvIHRoZSB5LXZhbHVlOyBlLmcuIG1hcCBmcm9tIHktdmFsdWUgdG8gaW5kZXggaW5cbiAgICogYC55c2AuXG4gICAqL1xuICBmaW5kRmxvb3JJbmRleCh5VmFsdWU6IG51bWJlciwgaGVpZ2h0R2V0dGVyOiBUSGVpZ2h0R2V0dGVyKTogbnVtYmVyIHtcbiAgICB0aGlzLmNhbGNZcyh5VmFsdWUsIGhlaWdodEdldHRlcik7XG5cbiAgICBsZXQgaW1pbiA9IDA7XG4gICAgbGV0IGltYXggPSB0aGlzLmxhc3RJO1xuXG4gICAgaWYgKHRoaXMueXMubGVuZ3RoIDwgMiB8fCB5VmFsdWUgPCB0aGlzLnlzWzFdKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHlWYWx1ZSA+IHRoaXMueXNbaW1heF0pIHtcbiAgICAgIHJldHVybiBpbWF4O1xuICAgIH1cbiAgICBsZXQgaTtcbiAgICB3aGlsZSAoaW1pbiA8IGltYXgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBpID0gKGltaW4gKyAwLjUgKiAoaW1heCAtIGltaW4pKSB8IDA7XG4gICAgICBpZiAoeVZhbHVlID4gdGhpcy55c1tpXSkge1xuICAgICAgICBpZiAoeVZhbHVlIDw9IHRoaXMueXNbaSArIDFdKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgaW1pbiA9IGk7XG4gICAgICB9IGVsc2UgaWYgKHlWYWx1ZSA8IHRoaXMueXNbaV0pIHtcbiAgICAgICAgaWYgKHlWYWx1ZSA+PSB0aGlzLnlzW2kgLSAxXSkge1xuICAgICAgICAgIHJldHVybiBpIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBpbWF4ID0gaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYHVuYWJsZSB0byBmaW5kIGZsb29yIGluZGV4IGZvciB5PSR7eVZhbHVlfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYHlgIGFuZCBgaGVpZ2h0YCBmb3IgYSBnaXZlbiByb3cuXG4gICAqXG4gICAqIEByZXR1cm5zIHt7IGhlaWdodDogbnVtYmVyLCB5OiBudW1iZXIgfX1cbiAgICovXG4gIGdldFJvd1Bvc2l0aW9uKGluZGV4OiBudW1iZXIsIGhlaWdodEdldHRlcjogVEhlaWdodEdldHRlcikge1xuICAgIHRoaXMuY29uZmlybUhlaWdodChpbmRleCwgaGVpZ2h0R2V0dGVyKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodHNbaW5kZXhdLFxuICAgICAgeTogdGhpcy55c1tpbmRleF0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGVzdGltYXRlZCBoZWlnaHQgb2YgdGhlIHdob2xlIHNoZWJhbmcgYnkgZXh0cmFwb2xhdGluZyBiYXNlZCBvblxuICAgKiB0aGUgYXZlcmFnZSBrbm93biBoZWlnaHQuXG4gICAqL1xuICBnZXRFc3RpbWF0ZWRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBrbm93biA9IHRoaXMueXNbdGhpcy5sYXN0SV0gKyB0aGlzLmhlaWdodHNbdGhpcy5sYXN0SV07XG4gICAgaWYgKHRoaXMubGFzdEkgPj0gdGhpcy5kYXRhTGVuIC0gMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIHJldHVybiBrbm93biB8IDA7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgcmV0dXJuICgoa25vd24gLyAodGhpcy5sYXN0SSArIDEpKSAqIHRoaXMuaGVpZ2h0cy5sZW5ndGgpIHwgMDtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBLElBU3FCQSxTQUFTO0VBQzVCO0FBQ0Y7QUFDQTtBQUNBOztFQUlFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0VBSUUsU0FBQUEsVUFBWUMsU0FBaUIsRUFBRTtJQUM3QixJQUFJLENBQUNDLEVBQUUsR0FBRyxFQUFFO0lBQ1osSUFBSSxDQUFDQyxPQUFPLEdBQUcsRUFBRTtJQUNqQixJQUFJLENBQUNGLFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNHLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0VBSEUsSUFBQUMsTUFBQSxHQUFBTixTQUFBLENBQUFPLFNBQUE7RUFBQUQsTUFBQSxDQUlBRSxXQUFXLEdBQVgsU0FBQUEsWUFBWUMsVUFBa0IsRUFBRTtJQUM5QixJQUFJQSxVQUFVLEtBQUssSUFBSSxDQUFDTCxPQUFPLEVBQUU7TUFDL0IsSUFBSSxDQUFDQSxPQUFPLEdBQUdLLFVBQVU7TUFDekIsSUFBSSxDQUFDUCxFQUFFLENBQUNRLE1BQU0sR0FBR0QsVUFBVTtNQUMzQixJQUFJLENBQUNOLE9BQU8sQ0FBQ08sTUFBTSxHQUFHRCxVQUFVO01BQ2hDLElBQUksSUFBSSxDQUFDSixLQUFLLElBQUlJLFVBQVUsRUFBRTtRQUM1QixJQUFJLENBQUNKLEtB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