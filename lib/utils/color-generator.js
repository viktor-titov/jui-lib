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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZW1vaXplT25lIiwidGlueWNvbG9yIiwiY29sb3JzIiwic3RyVG9SZ2IiLCJzIiwibGVuZ3RoIiwiciIsInNsaWNlIiwiZyIsImIiLCJwYXJzZUludCIsIkNvbG9yR2VuZXJhdG9yIiwiY29sb3JzSGV4IiwidGhlbWUiLCJmaWx0ZXJlZENvbG9ycyIsImdldEZpbHRlcmVkQ29sb3JzIiwiY29sb3JzUmdiIiwibWFwIiwiY2FjaGUiLCJNYXAiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJfZ2V0Q29sb3JJbmRleCIsImtleSIsImkiLCJnZXQiLCJoYXNoIiwiaGFzaENvZGUiLCJ0b0xvd2VyQ2FzZSIsIk1hdGgiLCJhYnMiLCJwcmV2Q2FjaGVJdGVtIiwiQXJyYXkiLCJmcm9tIiwicG9wIiwiZ2V0TmV4dEluZGV4IiwicHJldkNvbG9yIiwicmVhZGFiaWxpdHkiLCJuZXdJbmRleCIsImoiLCJzZXQiLCJjaHIiLCJjaGFyQ29kZUF0IiwiZ2V0Q29sb3JCeUtleSIsImdldFJnYkNvbG9yQnlLZXkiLCJjbGVhciIsImdldEdlbmVyYXRvciIsInJlZEluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInJlZEluZGV4MiIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UiLCJfc3RlcCIsImRvbmUiLCJjb2xvciIsInZhbHVlIiwiYmFja2dyb3VuZCIsInByaW1hcnkiLCJwdXNoIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbG9yLWdlbmVyYXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBtZW1vaXplT25lIGZyb20gJ21lbW9pemUtb25lJztcbmltcG9ydCB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuLy8gVFMgbmVlZHMgdGhlIHByZWNpc2UgcmV0dXJuIHR5cGVcbmZ1bmN0aW9uIHN0clRvUmdiKHM6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIGlmIChzLmxlbmd0aCAhPT0gNykge1xuICAgIHJldHVybiBbMCwgMCwgMF07XG4gIH1cbiAgY29uc3QgciA9IHMuc2xpY2UoMSwgMyk7XG4gIGNvbnN0IGcgPSBzLnNsaWNlKDMsIDUpO1xuICBjb25zdCBiID0gcy5zbGljZSg1KTtcbiAgcmV0dXJuIFtwYXJzZUludChyLCAxNiksIHBhcnNlSW50KGcsIDE2KSwgcGFyc2VJbnQoYiwgMTYpXTtcbn1cblxuY2xhc3MgQ29sb3JHZW5lcmF0b3Ige1xuICBjb2xvcnNIZXg6IHN0cmluZ1tdO1xuICBjb2xvcnNSZ2I6IEFycmF5PFtudW1iZXIsIG51bWJlciwgbnVtYmVyXT47XG4gIGNhY2hlOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbG9yc0hleDogc3RyaW5nW10sIHRoZW1lOiBHcmFmYW5hVGhlbWUyKSB7XG4gICAgY29uc3QgZmlsdGVyZWRDb2xvcnMgPSBnZXRGaWx0ZXJlZENvbG9ycyhjb2xvcnNIZXgsIHRoZW1lKTtcbiAgICB0aGlzLmNvbG9yc0hleCA9IGZpbHRlcmVkQ29sb3JzO1xuICAgIHRoaXMuY29sb3JzUmdiID0gZmlsdGVyZWRDb2xvcnMubWFwKHN0clRvUmdiKTtcbiAgICB0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgX2dldENvbG9ySW5kZXgoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBpID0gdGhpcy5jYWNoZS5nZXQoa2V5KTtcbiAgICBpZiAoaSA9PSBudWxsKSB7XG4gICAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoQ29kZShrZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpID0gTWF0aC5hYnMoaGFzaCAlIHRoaXMuY29sb3JzSGV4Lmxlbmd0aCk7XG5cbiAgICAgIGNvbnN0IHByZXZDYWNoZUl0ZW0gPSBBcnJheS5mcm9tKHRoaXMuY2FjaGUpLnBvcCgpO1xuICAgICAgaWYgKHByZXZDYWNoZUl0ZW0gJiYgcHJldkNhY2hlSXRlbVsxXSkge1xuICAgICAgICAvLyBkaXNhbGxvdyBhIGNvbG9yIHRoYXQgaXMgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIGNvbG9yXG4gICAgICAgIGlmIChwcmV2Q2FjaGVJdGVtWzFdID09PSBpKSB7XG4gICAgICAgICAgaSA9IHRoaXMuZ2V0TmV4dEluZGV4KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGlzYWxsb3cgYSBjb2xvciB0aGF0IGxvb2tzIHZlcnkgc2ltaWxhciB0byB0aGUgcHJldmlvdXMgY29sb3JcbiAgICAgICAgY29uc3QgcHJldkNvbG9yID0gdGhpcy5jb2xvcnNIZXhbcHJldkNhY2hlSXRlbVsxXV07XG4gICAgICAgIGlmICh0aW55Y29sb3IucmVhZGFiaWxpdHkocHJldkNvbG9yLCB0aGlzLmNvbG9yc0hleFtpXSkgPCAxLjUpIHtcbiAgICAgICAgICBsZXQgbmV3SW5kZXggPSBpO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xvcnNIZXgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgobmV3SW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAodGlueWNvbG9yLnJlYWRhYmlsaXR5KHByZXZDb2xvciwgdGhpcy5jb2xvcnNIZXhbbmV3SW5kZXhdKSA+IDEuNSkge1xuICAgICAgICAgICAgICBpID0gbmV3SW5kZXg7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNhY2hlLnNldChrZXksIGkpO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfVxuXG4gIGdldE5leHRJbmRleChpOiBudW1iZXIpIHtcbiAgICAvLyBnZXQgbmV4dCBpbmRleCBvciBnbyBiYWNrIHRvIDBcbiAgICByZXR1cm4gaSArIDEgPCB0aGlzLmNvbG9yc0hleC5sZW5ndGggPyBpICsgMSA6IDA7XG4gIH1cblxuICBoYXNoQ29kZShrZXk6IHN0cmluZykge1xuICAgIGxldCBoYXNoID0gMCxcbiAgICAgIGksXG4gICAgICBjaHI7XG4gICAgZm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgICAgY2hyID0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgICBoYXNoID0gKGhhc2ggPDwgNSkgLSBoYXNoICsgY2hyO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaWxsIGFzc2lnbiBhIGNvbG9yIHRvIGFuIGFyYml0cmFyeSBrZXkuXG4gICAqIElmIHRoZSBrZXkgaGFzIGJlZW4gdXNlZCBhbHJlYWR5LCBpdCB3aWxsXG4gICAqIHVzZSB0aGUgc2FtZSBjb2xvci5cbiAgICovXG4gIGdldENvbG9yQnlLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBpID0gdGhpcy5fZ2V0Q29sb3JJbmRleChrZXkpO1xuICAgIHJldHVybiB0aGlzLmNvbG9yc0hleFtpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgUkdCIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSBrZXkuIEFkZHMgdGhlIGtleSBhbmQgYXNzb2NpYXRlc1xuICAgKiBpdCB3aXRoIGEgY29sb3IgaWYgdGhlIGtleSBpcyBub3QgcmVjb2duaXplZC5cbiAgICogQHJldHVybnMge251bWJlcltdfSBBbiBhcnJheSBvZiB0aHJlZSBpbnRzIFswLCAyNTVdIHJlcHJlc2VudGluZyBhIGNvbG9yLlxuICAgKi9cbiAgZ2V0UmdiQ29sb3JCeUtleShrZXk6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgaSA9IHRoaXMuX2dldENvbG9ySW5kZXgoa2V5KTtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnNSZ2JbaV07XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmNhY2hlLmNsZWFyKCk7XG4gIH1cbn1cblxuY29uc3QgZ2V0R2VuZXJhdG9yID0gbWVtb2l6ZU9uZSgoY29sb3JzOiBzdHJpbmdbXSwgdGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIG5ldyBDb2xvckdlbmVyYXRvcihjb2xvcnMsIHRoZW1lKTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIodGhlbWU6IEdyYWZhbmFUaGVtZTIpIHtcbiAgZ2V0R2VuZXJhdG9yKFtdLCB0aGVtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xvckJ5S2V5KGtleTogc3RyaW5nLCB0aGVtZTogR3JhZmFuYVRoZW1lMikge1xuICByZXR1cm4gZ2V0R2VuZXJhdG9yKGNvbG9ycywgdGhlbWUpLmdldENvbG9yQnlLZXkoa2V5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJnYkNvbG9yQnlLZXkoa2V5OiBzdHJpbmcsIHRoZW1lOiBHcmFmYW5hVGhlbWUyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgcmV0dXJuIGdldEdlbmVyYXRvcihjb2xvcnMsIHRoZW1lKS5nZXRSZ2JDb2xvckJ5S2V5KGtleSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJlZENvbG9ycyhjb2xvcnNIZXg6IHN0cmluZ1tdLCB0aGVtZTogR3JhZmFuYVRoZW1lMikge1xuICAvLyBSZW1vdmUgcmVkIGFzIGEgc3BhbiBjb2xvciBiZWNhdXNlIGl0IGxvb2tzIGxpa2UgYW4gZXJyb3JcbiAgY29uc3QgcmVkSW5kZXggPSBjb2xvcnNIZXguaW5kZXhPZignI0UyNEQ0MicpO1xuICBpZiAocmVkSW5kZXggPiAtMSkge1xuICAgIGNvbG9yc0hleC5zcGxpY2UocmVkSW5kZXgsIDEpO1xuICB9XG4gIGNvbnN0IHJlZEluZGV4MiA9IGNvbG9yc0hleC5pbmRleE9mKCcjQkYxQjAwJyk7XG4gIGlmIChyZWRJbmRleDIgPiAtMSkge1xuICAgIGNvbG9yc0hleC5zcGxpY2UocmVkSW5kZXgyLCAxKTtcbiAgfVxuXG4gIC8vIE9ubHkgYWRkIGNvbG9ycyB0aGF0IGhhdmUgYSBjb250cmFzdCByYXRpbyA+PSAzIGZvciB0aGUgY3VycmVudCB0aGVtZVxuICBsZXQgZmlsdGVyZWRDb2xvcnMgPSBbXTtcbiAgZm9yIChjb25zdCBjb2xvciBvZiBjb2xvcnNIZXgpIHtcbiAgICBpZiAodGlueWNvbG9yLnJlYWRhYmlsaXR5KHRoZW1lLmNvbG9ycy5iYWNrZ3JvdW5kLnByaW1hcnksIGNvbG9yKSA+PSAzKSB7XG4gICAgICBmaWx0ZXJlZENvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICB9XG4gIH1cblxuICBy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