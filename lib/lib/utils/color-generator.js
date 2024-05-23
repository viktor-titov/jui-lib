function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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

import memoizeOne from 'memoize-one';
import tinycolor from 'tinycolor2';
import { colors } from '@grafana/ui';

// TS needs the precise return type
function strToRgb(s) {
  if (s.length !== 7) {
    return [0, 0, 0];
  }
  var r = s.slice(1, 3);
  var g = s.slice(3, 5);
  var b = s.slice(5);
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}
var ColorGenerator = /*#__PURE__*/function () {
  function ColorGenerator(colorsHex, theme) {
    var filteredColors = getFilteredColors(colorsHex, theme);
    this.colorsHex = filteredColors;
    this.colorsRgb = filteredColors.map(strToRgb);
    this.cache = new Map();
  }
  var _proto = ColorGenerator.prototype;
  _proto._getColorIndex = function _getColorIndex(key) {
    var i = this.cache.get(key);
    if (i == null) {
      var hash = this.hashCode(key.toLowerCase());
      i = Math.abs(hash % this.colorsHex.length);
      var prevCacheItem = Array.from(this.cache).pop();
      if (prevCacheItem && prevCacheItem[1]) {
        // disallow a color that is the same as the previous color
        if (prevCacheItem[1] === i) {
          i = this.getNextIndex(i);
        }

        // disallow a color that looks very similar to the previous color
        var prevColor = this.colorsHex[prevCacheItem[1]];
        if (tinycolor.readability(prevColor, this.colorsHex[i]) < 1.5) {
          var newIndex = i;
          for (var j = 0; j < this.colorsHex.length; j++) {
            newIndex = this.getNextIndex(newIndex);
            if (tinycolor.readability(prevColor, this.colorsHex[newIndex]) > 1.5) {
              i = newIndex;
              break;
            }
          }
        }
      }
      this.cache.set(key, i);
    }
    return i;
  };
  _proto.getNextIndex = function getNextIndex(i) {
    // get next index or go back to 0
    return i + 1 < this.colorsHex.length ? i + 1 : 0;
  };
  _proto.hashCode = function hashCode(key) {
    var hash = 0,
      i,
      chr;
    for (i = 0; i < key.length; i++) {
      chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
    }
    return hash;
  }

  /**
   * Will assign a color to an arbitrary key.
   * If the key has been used already, it will
   * use the same color.
   */;
  _proto.getColorByKey = function getColorByKey(key) {
    var i = this._getColorIndex(key);
    return this.colorsHex[i];
  }

  /**
   * Retrieve the RGB values associated with a key. Adds the key and associates
   * it with a color if the key is not recognized.
   * @returns {number[]} An array of three ints [0, 255] representing a color.
   */;
  _proto.getRgbColorByKey = function getRgbColorByKey(key) {
    var i = this._getColorIndex(key);
    return this.colorsRgb[i];
  };
  _proto.clear = function clear() {
    this.cache.clear();
  };
  return ColorGenerator;
}();
var getGenerator = memoizeOne(function (colors, theme) {
  return new ColorGenerator(colors, theme);
});
export function clear(theme) {
  getGenerator([], theme);
}
export function getColorByKey(key, theme) {
  return getGenerator(colors, theme).getColorByKey(key);
}
export function getRgbColorByKey(key, theme) {
  return getGenerator(colors, theme).getRgbColorByKey(key);
}
export function getFilteredColors(colorsHex, theme) {
  // Remove red as a span color because it looks like an error
  var redIndex = colorsHex.indexOf('#E24D42');
  if (redIndex > -1) {
    colorsHex.splice(redIndex, 1);
  }
  var redIndex2 = colorsHex.indexOf('#BF1B00');
  if (redIndex2 > -1) {
    colorsHex.splice(redIndex2, 1);
  }

  // Only add colors that have a contrast ratio >= 3 for the current theme
  var filteredColors = [];
  for (var _iterator = _createForOfIteratorHelperLoose(colorsHex), _step; !(_step = _iterator()).done;) {
    var color = _step.value;
    if (tinycolor.readability(theme.colors.background.primary, color) >= 3) {
      filteredColors.push(color);
    }
  }
  return filteredColors;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZW1vaXplT25lIiwidGlueWNvbG9yIiwiY29sb3JzIiwic3RyVG9SZ2IiLCJzIiwibGVuZ3RoIiwiciIsInNsaWNlIiwiZyIsImIiLCJwYXJzZUludCIsIkNvbG9yR2VuZXJhdG9yIiwiY29sb3JzSGV4IiwidGhlbWUiLCJmaWx0ZXJlZENvbG9ycyIsImdldEZpbHRlcmVkQ29sb3JzIiwiY29sb3JzUmdiIiwibWFwIiwiY2FjaGUiLCJNYXAiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJfZ2V0Q29sb3JJbmRleCIsImtleSIsImkiLCJnZXQiLCJoYXNoIiwiaGFzaENvZGUiLCJ0b0xvd2VyQ2FzZSIsIk1hdGgiLCJhYnMiLCJwcmV2Q2FjaGVJdGVtIiwiQXJyYXkiLCJmcm9tIiwicG9wIiwiZ2V0TmV4dEluZGV4IiwicHJldkNvbG9yIiwicmVhZGFiaWxpdHkiLCJuZXdJbmRleCIsImoiLCJzZXQiLCJjaHIiLCJjaGFyQ29kZUF0IiwiZ2V0Q29sb3JCeUtleSIsImdldFJnYkNvbG9yQnlLZXkiLCJjbGVhciIsImdldEdlbmVyYXRvciIsInJlZEluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInJlZEluZGV4MiIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UiLCJfc3RlcCIsImRvbmUiLCJjb2xvciIsInZhbHVlIiwiYmFja2dyb3VuZCIsInByaW1hcnkiLCJwdXNoIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlscy9jb2xvci1nZW5lcmF0b3IudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgbWVtb2l6ZU9uZSBmcm9tICdtZW1vaXplLW9uZSc7XG5pbXBvcnQgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbi8vIFRTIG5lZWRzIHRoZSBwcmVjaXNlIHJldHVybiB0eXBlXG5mdW5jdGlvbiBzdHJUb1JnYihzOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICBpZiAocy5sZW5ndGggIT09IDcpIHtcbiAgICByZXR1cm4gWzAsIDAsIDBdO1xuICB9XG4gIGNvbnN0IHIgPSBzLnNsaWNlKDEsIDMpO1xuICBjb25zdCBnID0gcy5zbGljZSgzLCA1KTtcbiAgY29uc3QgYiA9IHMuc2xpY2UoNSk7XG4gIHJldHVybiBbcGFyc2VJbnQociwgMTYpLCBwYXJzZUludChnLCAxNiksIHBhcnNlSW50KGIsIDE2KV07XG59XG5cbmNsYXNzIENvbG9yR2VuZXJhdG9yIHtcbiAgY29sb3JzSGV4OiBzdHJpbmdbXTtcbiAgY29sb3JzUmdiOiBBcnJheTxbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0+O1xuICBjYWNoZTogTWFwPHN0cmluZywgbnVtYmVyPjtcblxuICBjb25zdHJ1Y3Rvcihjb2xvcnNIZXg6IHN0cmluZ1tdLCB0aGVtZTogR3JhZmFuYVRoZW1lMikge1xuICAgIGNvbnN0IGZpbHRlcmVkQ29sb3JzID0gZ2V0RmlsdGVyZWRDb2xvcnMoY29sb3JzSGV4LCB0aGVtZSk7XG4gICAgdGhpcy5jb2xvcnNIZXggPSBmaWx0ZXJlZENvbG9ycztcbiAgICB0aGlzLmNvbG9yc1JnYiA9IGZpbHRlcmVkQ29sb3JzLm1hcChzdHJUb1JnYik7XG4gICAgdGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIF9nZXRDb2xvckluZGV4KGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgaSA9IHRoaXMuY2FjaGUuZ2V0KGtleSk7XG4gICAgaWYgKGkgPT0gbnVsbCkge1xuICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaGFzaENvZGUoa2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaSA9IE1hdGguYWJzKGhhc2ggJSB0aGlzLmNvbG9yc0hleC5sZW5ndGgpO1xuXG4gICAgICBjb25zdCBwcmV2Q2FjaGVJdGVtID0gQXJyYXkuZnJvbSh0aGlzLmNhY2hlKS5wb3AoKTtcbiAgICAgIGlmIChwcmV2Q2FjaGVJdGVtICYmIHByZXZDYWNoZUl0ZW1bMV0pIHtcbiAgICAgICAgLy8gZGlzYWxsb3cgYSBjb2xvciB0aGF0IGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyBjb2xvclxuICAgICAgICBpZiAocHJldkNhY2hlSXRlbVsxXSA9PT0gaSkge1xuICAgICAgICAgIGkgPSB0aGlzLmdldE5leHRJbmRleChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2FsbG93IGEgY29sb3IgdGhhdCBsb29rcyB2ZXJ5IHNpbWlsYXIgdG8gdGhlIHByZXZpb3VzIGNvbG9yXG4gICAgICAgIGNvbnN0IHByZXZDb2xvciA9IHRoaXMuY29sb3JzSGV4W3ByZXZDYWNoZUl0ZW1bMV1dO1xuICAgICAgICBpZiAodGlueWNvbG9yLnJlYWRhYmlsaXR5KHByZXZDb2xvciwgdGhpcy5jb2xvcnNIZXhbaV0pIDwgMS41KSB7XG4gICAgICAgICAgbGV0IG5ld0luZGV4ID0gaTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sb3JzSGV4Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBuZXdJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KG5ld0luZGV4KTtcblxuICAgICAgICAgICAgaWYgKHRpbnljb2xvci5yZWFkYWJpbGl0eShwcmV2Q29sb3IsIHRoaXMuY29sb3JzSGV4W25ld0luZGV4XSkgPiAxLjUpIHtcbiAgICAgICAgICAgICAgaSA9IG5ld0luZGV4O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWNoZS5zZXQoa2V5LCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH1cblxuICBnZXROZXh0SW5kZXgoaTogbnVtYmVyKSB7XG4gICAgLy8gZ2V0IG5leHQgaW5kZXggb3IgZ28gYmFjayB0byAwXG4gICAgcmV0dXJuIGkgKyAxIDwgdGhpcy5jb2xvcnNIZXgubGVuZ3RoID8gaSArIDEgOiAwO1xuICB9XG5cbiAgaGFzaENvZGUoa2V5OiBzdHJpbmcpIHtcbiAgICBsZXQgaGFzaCA9IDAsXG4gICAgICBpLFxuICAgICAgY2hyO1xuICAgIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNociA9IGtleS5jaGFyQ29kZUF0KGkpO1xuICAgICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGNocjtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG4gIH1cblxuICAvKipcbiAgICogV2lsbCBhc3NpZ24gYSBjb2xvciB0byBhbiBhcmJpdHJhcnkga2V5LlxuICAgKiBJZiB0aGUga2V5IGhhcyBiZWVuIHVzZWQgYWxyZWFkeSwgaXQgd2lsbFxuICAgKiB1c2UgdGhlIHNhbWUgY29sb3IuXG4gICAqL1xuICBnZXRDb2xvckJ5S2V5KGtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuX2dldENvbG9ySW5kZXgoa2V5KTtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnNIZXhbaV07XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIFJHQiB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEga2V5LiBBZGRzIHRoZSBrZXkgYW5kIGFzc29jaWF0ZXNcbiAgICogaXQgd2l0aCBhIGNvbG9yIGlmIHRoZSBrZXkgaXMgbm90IHJlY29nbml6ZWQuXG4gICAqIEByZXR1cm5zIHtudW1iZXJbXX0gQW4gYXJyYXkgb2YgdGhyZWUgaW50cyBbMCwgMjU1XSByZXByZXNlbnRpbmcgYSBjb2xvci5cbiAgICovXG4gIGdldFJnYkNvbG9yQnlLZXkoa2V5OiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICAgIGNvbnN0IGkgPSB0aGlzLl9nZXRDb2xvckluZGV4KGtleSk7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JzUmdiW2ldO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICB9XG59XG5cbmNvbnN0IGdldEdlbmVyYXRvciA9IG1lbW9pemVPbmUoKGNvbG9yczogc3RyaW5nW10sIHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiBuZXcgQ29sb3JHZW5lcmF0b3IoY29sb3JzLCB0aGVtZSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSB7XG4gIGdldEdlbmVyYXRvcihbXSwgdGhlbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sb3JCeUtleShrZXk6IHN0cmluZywgdGhlbWU6IEdyYWZhbmFUaGVtZTIpIHtcbiAgcmV0dXJuIGdldEdlbmVyYXRvcihjb2xvcnMsIHRoZW1lKS5nZXRDb2xvckJ5S2V5KGtleSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZ2JDb2xvckJ5S2V5KGtleTogc3RyaW5nLCB0aGVtZTogR3JhZmFuYVRoZW1lMik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIHJldHVybiBnZXRHZW5lcmF0b3IoY29sb3JzLCB0aGVtZSkuZ2V0UmdiQ29sb3JCeUtleShrZXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyZWRDb2xvcnMoY29sb3JzSGV4OiBzdHJpbmdbXSwgdGhlbWU6IEdyYWZhbmFUaGVtZTIpIHtcbiAgLy8gUmVtb3ZlIHJlZCBhcyBhIHNwYW4gY29sb3IgYmVjYXVzZSBpdCBsb29rcyBsaWtlIGFuIGVycm9yXG4gIGNvbnN0IHJlZEluZGV4ID0gY29sb3JzSGV4LmluZGV4T2YoJyNFMjRENDInKTtcbiAgaWYgKHJlZEluZGV4ID4gLTEpIHtcbiAgICBjb2xvcnNIZXguc3BsaWNlKHJlZEluZGV4LCAxKTtcbiAgfVxuICBjb25zdCByZWRJbmRleDIgPSBjb2xvcnNIZXguaW5kZXhPZignI0JGMUIwMCcpO1xuICBpZiAocmVkSW5kZXgyID4gLTEpIHtcbiAgICBjb2xvcnNIZXguc3BsaWNlKHJlZEluZGV4MiwgMSk7XG4gIH1cblxuICAvLyBPbmx5IGFkZCBjb2xvcnMgdGhhdCBoYXZlIGEgY29udHJhc3QgcmF0aW8gPj0gMyBmb3IgdGhlIGN1cnJlbnQgdGhlbWVcbiAgbGV0IGZpbHRlcmVkQ29sb3JzID0gW107XG4gIGZvciAoY29uc3QgY29sb3Igb2YgY29sb3JzSGV4KSB7XG4gICAgaWYgKHRpbnljb2xvci5yZWFkYWJpbGl0eSh0aGVtZS5jb2xvcnMuYmFja2dyb3VuZC5wcmltYXJ5LCBjb2xvcikgPj0gMykge1xuICAgICAgZmlsdGVyZWRDb2xvcnMucHVzaChjb2xvcik7XG4gICAgfVxuICB9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