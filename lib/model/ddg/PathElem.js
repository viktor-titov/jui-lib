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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXRoRWxlbSIsIl9yZWYiLCJfdGhpcyIsInBhdGgiLCJvcGVyYXRpb24iLCJtZW1iZXJJZHgiLCJ0b0pTT05IZWxwZXIiLCJuYW1lIiwic2VydmljZSIsInZpc2liaWxpdHlJZHgiLCJfdmlzaWJpbGl0eUlkeCIsIm1lbWJlck9mIiwiX3Byb3RvIiwicHJvdG90eXBlIiwidG9KU09OIiwiX2V4dGVuZHMiLCJmb2NhbElkeCIsIm1lbWJlcnMiLCJtYXAiLCJtZW1iZXIiLCJ0b1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJnZXQiLCJyZXN1bHQiLCJjdXJyZW50IiwicHVzaCIsImV4dGVybmFsU2lkZU5laWdoYm9yIiwiZGlzdGFuY2UiLCJyZXZlcnNlIiwiTWF0aCIsInNpZ24iLCJmb2NhbFNpZGVOZWlnaGJvciIsIkJvb2xlYW4iLCJsZW5ndGgiLCJFcnJvciIsInNldCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9kZGcvUGF0aEVsZW0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBURGRnT3BlcmF0aW9uLCBURGRnUGF0aCB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoRWxlbSB7XG4gIG1lbWJlcklkeDogbnVtYmVyO1xuICBtZW1iZXJPZjogVERkZ1BhdGg7XG4gIG9wZXJhdGlvbjogVERkZ09wZXJhdGlvbjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eUlkeD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih7IHBhdGgsIG9wZXJhdGlvbiwgbWVtYmVySWR4IH06IHsgcGF0aDogVERkZ1BhdGg7IG9wZXJhdGlvbjogVERkZ09wZXJhdGlvbjsgbWVtYmVySWR4OiBudW1iZXIgfSkge1xuICAgIHRoaXMubWVtYmVySWR4ID0gbWVtYmVySWR4O1xuICAgIHRoaXMubWVtYmVyT2YgPSBwYXRoO1xuICAgIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xuICB9XG5cbiAgZ2V0IGRpc3RhbmNlKCkge1xuICAgIHJldHVybiB0aGlzLm1lbWJlcklkeCAtIHRoaXMubWVtYmVyT2YuZm9jYWxJZHg7XG4gIH1cblxuICBnZXQgZXh0ZXJuYWxQYXRoKCk6IFBhdGhFbGVtW10ge1xuICAgIGNvbnN0IHJlc3VsdDogUGF0aEVsZW1bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50OiBQYXRoRWxlbSB8IG51bGwgfCB1bmRlZmluZWQgPSB0aGlzO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICByZXN1bHQucHVzaChjdXJyZW50KTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmV4dGVybmFsU2lkZU5laWdoYm9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5kaXN0YW5jZSA8IDApIHtcbiAgICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXQgZXh0ZXJuYWxTaWRlTmVpZ2hib3IoKTogUGF0aEVsZW0gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuZGlzdGFuY2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tZW1iZXJPZi5tZW1iZXJzW3RoaXMubWVtYmVySWR4ICsgTWF0aC5zaWduKHRoaXMuZGlzdGFuY2UpXTtcbiAgfVxuXG4gIGdldCBmb2NhbFBhdGgoKTogUGF0aEVsZW1bXSB7XG4gICAgY29uc3QgcmVzdWx0OiBQYXRoRWxlbVtdID0gW107XG4gICAgbGV0IGN1cnJlbnQ6IFBhdGhFbGVtIHwgbnVsbCA9IHRoaXM7XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnQpO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuZm9jYWxTaWRlTmVpZ2hib3I7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpc3RhbmNlID4gMCkge1xuICAgICAgcmVzdWx0LnJldmVyc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldCBmb2NhbFNpZGVOZWlnaGJvcigpOiBQYXRoRWxlbSB8IG51bGwge1xuICAgIGlmICghdGhpcy5kaXN0YW5jZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1lbWJlck9mLm1lbWJlcnNbdGhpcy5tZW1iZXJJZHggLSBNYXRoLnNpZ24odGhpcy5kaXN0YW5jZSldO1xuICB9XG5cbiAgZ2V0IGlzRXh0ZXJuYWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5kaXN0YW5jZSkgJiYgKHRoaXMubWVtYmVySWR4ID09PSAwIHx8IHRoaXMubWVtYmVySWR4ID09PSB0aGlzLm1lbWJlck9mLm1lbWJlcnMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBzZXQgdmlzaWJpbGl0eUlkeCh2aXNpYmlsaXR5SWR4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fdmlzaWJpbGl0eUlkeCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl92aXNpYmlsaXR5SWR4ID0gdmlzaWJpbGl0eUlkeDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWaXNpYmlsaXR5IEluZGV4IGNhbm5vdCBiZSBjaGFuZ2VkIG9uY2Ugc2V0Jyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpc2liaWxpdHlJZHgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fdmlzaWJpbGl0eUlkeCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Zpc2liaWxpdHkgSW5kZXggd2FzIG5ldmVyIHNldCBmb3IgdGhpcyBQYXRoRWxlbScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmlzaWJpbGl0eUlkeDtcbiAgfVxuXG4gIHByaXZhdGUgdG9KU09OSGVscGVyID0gKCkgPT4gKHtcbiAgICBtZW1iZXJJZHg6IHRoaXMubWVtYmVySWR4LFxuICAgIG9wZXJhdGlvbjogdGhpcy5vcGVyYXRpb24ubmFtZSxcbiAgICBzZXJ2aWNlOiB0aGlzLm9wZXJhdGlvbi5zZXJ2aWNlLm5hbWUsXG4gICAgdmlzaWJpbGl0eUlkeDogdGhpcy5fdmlzaWJpbGl0eUlkeCxcbiAgfSk7XG5cbiAgLypcbiAgICogQmVjYXVzZSB0aGUgbWVtYmVyT2Ygb24gYSBQYXRoRWxlbSBjb250YWlucyBhbiBhcnJheSBvZiBhbGwgb2YgaXRzIG1lbWJlcnMgd2hpY2ggaW4gdHVybiBhbGwgY29udGFpblxuICAgKiBtZW1iZXJPZiBiYWNrIHRvIHRoZSBwYXRoLCBzb21lIGFzc2lzdGFuY2UgaXMgbmVjZXNzYXJ5IHdoZW4gY3JlYXRpbmcgZXJyb3IgbWVzc2FnZXMuIHRvSlNPTiBpcyBjYWxsZWQgYnlcbiAgICogSlNPTi5zdHJpbmdpZnkgYW5kIGV4cGVjdGVkIHRvIHJldHVybiBhIEpTT04gb2JqZWN0LiBUbyB0aGF0IGVuZCwgdGhpcyBtZXRob2Qgc2ltcGxpZmllcyB0aGVcbiAgICogcmVwcmVzZW50YXRpb24gb2YgdGhlIFBhdGhFbGVtcyBpbiBtZW1iZXJPZidzIHBhdGggdG8gcmVtb3ZlIHRoZSBjaXJjdWxhciByZWZlcmVuY2UuXG4gICAqL1xuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMudG9KU09OSGVscGVyKCksXG4gICAgICBtZW1iZXJPZjoge1xuICAgICAgICBmb2NhbElkeDogdGhpcy5tZW1iZXJPZi5mb2NhbElkeCxcbiAgICAgICAgbWVtYmVyczogdGhpcy5tZW1iZXJPZi5tZW1iZXJzLm1hcCgobWVtYmVyKSA9PiBtZW1iZXIudG9KU09OSGVscGVyKCkpLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgLy8gYHRvSlNPTmAgaXMgY2FsbGVkIGJ5IGBKU09OLnN0cmluZ2lmeWAgd2hpbGUgYHRvU3RyaW5nYCBpcyB1c2VkIGJ5IHRlbXBsYXRlIHN0cmluZ3MgYW5kIHN0cmluZyBjb25jYXRcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9KU09OKCksIG51bGwsIDIpO1xuICB9XG5cbiAgLy8gYFtTeW1ib2wudG9TdHJpbmdUYWddYCBpcyB1c2VkIHdoZW4gYXR0ZW1wdGluZyB0byB1c2UgYW4gb2JqZWN0IGFzIGEga2V5IG9uIGFuIG9iamVjdCwgd2hlcmUgYSBmdWxsXG4gIC8vIHN0cmluZ2lmaWVkIEpTT04gd291bGQgcmVkdWNlIGNsYXJpdHlcbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiBgUGF0aEVsZW0gJHt0aGlzLl92aXNpYmlsaXR5SWR4fWA7XG4gIH1cbn1cbiJdLCJt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