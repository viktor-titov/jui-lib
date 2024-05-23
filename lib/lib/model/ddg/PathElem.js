import _extends from "@babel/runtime/helpers/extends";
import _createClass from "@babel/runtime/helpers/createClass";
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
var PathElem = /*#__PURE__*/function () {
  function PathElem(_ref) {
    var _this = this;
    var path = _ref.path,
      operation = _ref.operation,
      memberIdx = _ref.memberIdx;
    this.toJSONHelper = function () {
      return {
        memberIdx: _this.memberIdx,
        operation: _this.operation.name,
        service: _this.operation.service.name,
        visibilityIdx: _this._visibilityIdx
      };
    };
    this.memberIdx = memberIdx;
    this.memberOf = path;
    this.operation = operation;
  }
  var _proto = PathElem.prototype;
  /*
   * Because the memberOf on a PathElem contains an array of all of its members which in turn all contain
   * memberOf back to the path, some assistance is necessary when creating error messages. toJSON is called by
   * JSON.stringify and expected to return a JSON object. To that end, this method simplifies the
   * representation of the PathElems in memberOf's path to remove the circular reference.
   */
  _proto.toJSON = function toJSON() {
    return _extends({}, this.toJSONHelper(), {
      memberOf: {
        focalIdx: this.memberOf.focalIdx,
        members: this.memberOf.members.map(function (member) {
          return member.toJSONHelper();
        })
      }
    });
  }

  // `toJSON` is called by `JSON.stringify` while `toString` is used by template strings and string concat
  ;
  _proto.toString = function toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  // `[Symbol.toStringTag]` is used when attempting to use an object as a key on an object, where a full
  // stringified JSON would reduce clarity
  ;
  return _createClass(PathElem, [{
    key: "distance",
    get: function get() {
      return this.memberIdx - this.memberOf.focalIdx;
    }
  }, {
    key: "externalPath",
    get: function get() {
      var result = [];
      var current = this;
      while (current) {
        result.push(current);
        current = current.externalSideNeighbor;
      }
      if (this.distance < 0) {
        result.reverse();
      }
      return result;
    }
  }, {
    key: "externalSideNeighbor",
    get: function get() {
      if (!this.distance) {
        return null;
      }
      return this.memberOf.members[this.memberIdx + Math.sign(this.distance)];
    }
  }, {
    key: "focalPath",
    get: function get() {
      var result = [];
      var current = this;
      while (current) {
        result.push(current);
        current = current.focalSideNeighbor;
      }
      if (this.distance > 0) {
        result.reverse();
      }
      return result;
    }
  }, {
    key: "focalSideNeighbor",
    get: function get() {
      if (!this.distance) {
        return null;
      }
      return this.memberOf.members[this.memberIdx - Math.sign(this.distance)];
    }
  }, {
    key: "isExternal",
    get: function get() {
      return Boolean(this.distance) && (this.memberIdx === 0 || this.memberIdx === this.memberOf.members.length - 1);
    }
  }, {
    key: "visibilityIdx",
    get: function get() {
      if (this._visibilityIdx == null) {
        throw new Error('Visibility Index was never set for this PathElem');
      }
      return this._visibilityIdx;
    },
    set: function set(visibilityIdx) {
      if (this._visibilityIdx == null) {
        this._visibilityIdx = visibilityIdx;
      } else {
        throw new Error('Visibility Index cannot be changed once set');
      }
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return "PathElem " + this._visibilityIdx;
    }
  }]);
}();
export { PathElem as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXRoRWxlbSIsIl9yZWYiLCJfdGhpcyIsInBhdGgiLCJvcGVyYXRpb24iLCJtZW1iZXJJZHgiLCJ0b0pTT05IZWxwZXIiLCJuYW1lIiwic2VydmljZSIsInZpc2liaWxpdHlJZHgiLCJfdmlzaWJpbGl0eUlkeCIsIm1lbWJlck9mIiwiX3Byb3RvIiwicHJvdG90eXBlIiwidG9KU09OIiwiX2V4dGVuZHMiLCJmb2NhbElkeCIsIm1lbWJlcnMiLCJtYXAiLCJtZW1iZXIiLCJ0b1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJnZXQiLCJyZXN1bHQiLCJjdXJyZW50IiwicHVzaCIsImV4dGVybmFsU2lkZU5laWdoYm9yIiwiZGlzdGFuY2UiLCJyZXZlcnNlIiwiTWF0aCIsInNpZ24iLCJmb2NhbFNpZGVOZWlnaGJvciIsIkJvb2xlYW4iLCJsZW5ndGgiLCJFcnJvciIsInNldCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbW9kZWwvZGRnL1BhdGhFbGVtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgVERkZ09wZXJhdGlvbiwgVERkZ1BhdGggfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aEVsZW0ge1xuICBtZW1iZXJJZHg6IG51bWJlcjtcbiAgbWVtYmVyT2Y6IFREZGdQYXRoO1xuICBvcGVyYXRpb246IFREZGdPcGVyYXRpb247XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlJZHg/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeyBwYXRoLCBvcGVyYXRpb24sIG1lbWJlcklkeCB9OiB7IHBhdGg6IFREZGdQYXRoOyBvcGVyYXRpb246IFREZGdPcGVyYXRpb247IG1lbWJlcklkeDogbnVtYmVyIH0pIHtcbiAgICB0aGlzLm1lbWJlcklkeCA9IG1lbWJlcklkeDtcbiAgICB0aGlzLm1lbWJlck9mID0gcGF0aDtcbiAgICB0aGlzLm9wZXJhdGlvbiA9IG9wZXJhdGlvbjtcbiAgfVxuXG4gIGdldCBkaXN0YW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tZW1iZXJJZHggLSB0aGlzLm1lbWJlck9mLmZvY2FsSWR4O1xuICB9XG5cbiAgZ2V0IGV4dGVybmFsUGF0aCgpOiBQYXRoRWxlbVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IFBhdGhFbGVtW10gPSBbXTtcbiAgICBsZXQgY3VycmVudDogUGF0aEVsZW0gfCBudWxsIHwgdW5kZWZpbmVkID0gdGhpcztcbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgcmVzdWx0LnB1c2goY3VycmVudCk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5leHRlcm5hbFNpZGVOZWlnaGJvcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlzdGFuY2UgPCAwKSB7XG4gICAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0IGV4dGVybmFsU2lkZU5laWdoYm9yKCk6IFBhdGhFbGVtIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLmRpc3RhbmNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWVtYmVyT2YubWVtYmVyc1t0aGlzLm1lbWJlcklkeCArIE1hdGguc2lnbih0aGlzLmRpc3RhbmNlKV07XG4gIH1cblxuICBnZXQgZm9jYWxQYXRoKCk6IFBhdGhFbGVtW10ge1xuICAgIGNvbnN0IHJlc3VsdDogUGF0aEVsZW1bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50OiBQYXRoRWxlbSB8IG51bGwgPSB0aGlzO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICByZXN1bHQucHVzaChjdXJyZW50KTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmZvY2FsU2lkZU5laWdoYm9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5kaXN0YW5jZSA+IDApIHtcbiAgICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXQgZm9jYWxTaWRlTmVpZ2hib3IoKTogUGF0aEVsZW0gfCBudWxsIHtcbiAgICBpZiAoIXRoaXMuZGlzdGFuY2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tZW1iZXJPZi5tZW1iZXJzW3RoaXMubWVtYmVySWR4IC0gTWF0aC5zaWduKHRoaXMuZGlzdGFuY2UpXTtcbiAgfVxuXG4gIGdldCBpc0V4dGVybmFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZGlzdGFuY2UpICYmICh0aGlzLm1lbWJlcklkeCA9PT0gMCB8fCB0aGlzLm1lbWJlcklkeCA9PT0gdGhpcy5tZW1iZXJPZi5tZW1iZXJzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgc2V0IHZpc2liaWxpdHlJZHgodmlzaWJpbGl0eUlkeDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlJZHggPT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmlzaWJpbGl0eUlkeCA9IHZpc2liaWxpdHlJZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVmlzaWJpbGl0eSBJbmRleCBjYW5ub3QgYmUgY2hhbmdlZCBvbmNlIHNldCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aXNpYmlsaXR5SWR4KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlJZHggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWaXNpYmlsaXR5IEluZGV4IHdhcyBuZXZlciBzZXQgZm9yIHRoaXMgUGF0aEVsZW0nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2liaWxpdHlJZHg7XG4gIH1cblxuICBwcml2YXRlIHRvSlNPTkhlbHBlciA9ICgpID0+ICh7XG4gICAgbWVtYmVySWR4OiB0aGlzLm1lbWJlcklkeCxcbiAgICBvcGVyYXRpb246IHRoaXMub3BlcmF0aW9uLm5hbWUsXG4gICAgc2VydmljZTogdGhpcy5vcGVyYXRpb24uc2VydmljZS5uYW1lLFxuICAgIHZpc2liaWxpdHlJZHg6IHRoaXMuX3Zpc2liaWxpdHlJZHgsXG4gIH0pO1xuXG4gIC8qXG4gICAqIEJlY2F1c2UgdGhlIG1lbWJlck9mIG9uIGEgUGF0aEVsZW0gY29udGFpbnMgYW4gYXJyYXkgb2YgYWxsIG9mIGl0cyBtZW1iZXJzIHdoaWNoIGluIHR1cm4gYWxsIGNvbnRhaW5cbiAgICogbWVtYmVyT2YgYmFjayB0byB0aGUgcGF0aCwgc29tZSBhc3Npc3RhbmNlIGlzIG5lY2Vzc2FyeSB3aGVuIGNyZWF0aW5nIGVycm9yIG1lc3NhZ2VzLiB0b0pTT04gaXMgY2FsbGVkIGJ5XG4gICAqIEpTT04uc3RyaW5naWZ5IGFuZCBleHBlY3RlZCB0byByZXR1cm4gYSBKU09OIG9iamVjdC4gVG8gdGhhdCBlbmQsIHRoaXMgbWV0aG9kIHNpbXBsaWZpZXMgdGhlXG4gICAqIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBQYXRoRWxlbXMgaW4gbWVtYmVyT2YncyBwYXRoIHRvIHJlbW92ZSB0aGUgY2lyY3VsYXIgcmVmZXJlbmNlLlxuICAgKi9cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnRvSlNPTkhlbHBlcigpLFxuICAgICAgbWVtYmVyT2Y6IHtcbiAgICAgICAgZm9jYWxJZHg6IHRoaXMubWVtYmVyT2YuZm9jYWxJZHgsXG4gICAgICAgIG1lbWJlcnM6IHRoaXMubWVtYmVyT2YubWVtYmVycy5tYXAoKG1lbWJlcikgPT4gbWVtYmVyLnRvSlNPTkhlbHBlcigpKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8vIGB0b0pTT05gIGlzIGNhbGxlZCBieSBgSlNPTi5zdHJpbmdpZnlgIHdoaWxlIGB0b1N0cmluZ2AgaXMgdXNlZCBieSB0ZW1wbGF0ZSBzdHJpbmdzIGFuZCBzdHJpbmcgY29uY2F0XG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpLCBudWxsLCAyKTtcbiAgfVxuXG4gIC8vIGBbU3ltYm9sLnRvU3RyaW5nVGFnXWAgaXMgdXNlZCB3aGVuIGF0dGVtcHRpbmcgdG8gdXNlIGFuIG9iamVjdCBhcyBhIGtleSBvbiBhbiBvYmplY3QsIHdoZXJlIGEgZnVsbFxuICAvLyBzdHJpbmdpZmllZCBKU09OIHdvdWxkIHJlZHVjZSBjbGFyaXR5XG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gYFBhdGhFbGVtICR7dGhpcy5fdmlzaWJpbGl0eUlkeH1gO1xuICB9XG59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