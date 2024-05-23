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

// exported for tests
export var ITEM_ALPHA = 0.8;
export var MIN_ITEM_HEIGHT = 2;
export var MAX_TOTAL_HEIGHT = 200;
export var MIN_ITEM_WIDTH = 10;
export var MIN_TOTAL_HEIGHT = 60;
export var MAX_ITEM_HEIGHT = 6;
export default function renderIntoCanvas(canvas, items, totalValueWidth, getFillColor, bgColor) {
  var fillCache = new Map();
  var cHeight = items.length < MIN_TOTAL_HEIGHT ? MIN_TOTAL_HEIGHT : Math.min(items.length, MAX_TOTAL_HEIGHT);
  var cWidth = window.innerWidth * 2;
  // eslint-disable-next-line no-param-reassign
  canvas.width = cWidth;
  // eslint-disable-next-line no-param-reassign
  canvas.height = cHeight;
  var itemHeight = Math.min(MAX_ITEM_HEIGHT, Math.max(MIN_ITEM_HEIGHT, cHeight / items.length));
  var itemYChange = cHeight / items.length;
  var ctx = canvas.getContext('2d', {
    alpha: false
  });
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cWidth, cHeight);
  for (var i = 0; i < items.length; i++) {
    var _items$i = items[i],
      valueWidth = _items$i.valueWidth,
      valueOffset = _items$i.valueOffset,
      serviceName = _items$i.serviceName;
    var x = valueOffset / totalValueWidth * cWidth;
    var width = valueWidth / totalValueWidth * cWidth;
    if (width < MIN_ITEM_WIDTH) {
      width = MIN_ITEM_WIDTH;
    }
    var fillStyle = fillCache.get(serviceName);
    if (!fillStyle) {
      fillStyle = "rgba(" + getFillColor(serviceName).concat(ITEM_ALPHA).join() + ")";
      fillCache.set(serviceName, fillStyle);
    }
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, i * itemYChange, width, itemHeight);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJVEVNX0FMUEhBIiwiTUlOX0lURU1fSEVJR0hUIiwiTUFYX1RPVEFMX0hFSUdIVCIsIk1JTl9JVEVNX1dJRFRIIiwiTUlOX1RPVEFMX0hFSUdIVCIsIk1BWF9JVEVNX0hFSUdIVCIsInJlbmRlckludG9DYW52YXMiLCJjYW52YXMiLCJpdGVtcyIsInRvdGFsVmFsdWVXaWR0aCIsImdldEZpbGxDb2xvciIsImJnQ29sb3IiLCJmaWxsQ2FjaGUiLCJNYXAiLCJjSGVpZ2h0IiwibGVuZ3RoIiwiTWF0aCIsIm1pbiIsImNXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsIml0ZW1IZWlnaHQiLCJtYXgiLCJpdGVtWUNoYW5nZSIsImN0eCIsImdldENvbnRleHQiLCJhbHBoYSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiaSIsIl9pdGVtcyRpIiwidmFsdWVXaWR0aCIsInZhbHVlT2Zmc2V0Iiwic2VydmljZU5hbWUiLCJ4IiwiZ2V0IiwiY29uY2F0Iiwiam9pbiIsInNldCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL3JlbmRlci1pbnRvLWNhbnZhcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLic7XG5cbi8vIGV4cG9ydGVkIGZvciB0ZXN0c1xuZXhwb3J0IGNvbnN0IElURU1fQUxQSEEgPSAwLjg7XG5leHBvcnQgY29uc3QgTUlOX0lURU1fSEVJR0hUID0gMjtcbmV4cG9ydCBjb25zdCBNQVhfVE9UQUxfSEVJR0hUID0gMjAwO1xuZXhwb3J0IGNvbnN0IE1JTl9JVEVNX1dJRFRIID0gMTA7XG5leHBvcnQgY29uc3QgTUlOX1RPVEFMX0hFSUdIVCA9IDYwO1xuZXhwb3J0IGNvbnN0IE1BWF9JVEVNX0hFSUdIVCA9IDY7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckludG9DYW52YXMoXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGl0ZW1zOiBBcnJheTx7IHZhbHVlV2lkdGg6IG51bWJlcjsgdmFsdWVPZmZzZXQ6IG51bWJlcjsgc2VydmljZU5hbWU6IHN0cmluZyB9PixcbiAgdG90YWxWYWx1ZVdpZHRoOiBudW1iZXIsXG4gIGdldEZpbGxDb2xvcjogKHNlcnZpY2VOYW1lOiBzdHJpbmcpID0+IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgYmdDb2xvcjogc3RyaW5nXG4pIHtcbiAgY29uc3QgZmlsbENhY2hlOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBUTmlsPiA9IG5ldyBNYXAoKTtcbiAgY29uc3QgY0hlaWdodCA9IGl0ZW1zLmxlbmd0aCA8IE1JTl9UT1RBTF9IRUlHSFQgPyBNSU5fVE9UQUxfSEVJR0hUIDogTWF0aC5taW4oaXRlbXMubGVuZ3RoLCBNQVhfVE9UQUxfSEVJR0hUKTtcbiAgY29uc3QgY1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAyO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY2FudmFzLndpZHRoID0gY1dpZHRoO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY2FudmFzLmhlaWdodCA9IGNIZWlnaHQ7XG4gIGNvbnN0IGl0ZW1IZWlnaHQgPSBNYXRoLm1pbihNQVhfSVRFTV9IRUlHSFQsIE1hdGgubWF4KE1JTl9JVEVNX0hFSUdIVCwgY0hlaWdodCAvIGl0ZW1zLmxlbmd0aCkpO1xuICBjb25zdCBpdGVtWUNoYW5nZSA9IGNIZWlnaHQgLyBpdGVtcy5sZW5ndGg7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJywgeyBhbHBoYTogZmFsc2UgfSkgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBjdHguZmlsbFN0eWxlID0gYmdDb2xvcjtcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIGNXaWR0aCwgY0hlaWdodCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHZhbHVlV2lkdGgsIHZhbHVlT2Zmc2V0LCBzZXJ2aWNlTmFtZSB9ID0gaXRlbXNbaV07XG4gICAgY29uc3QgeCA9ICh2YWx1ZU9mZnNldCAvIHRvdGFsVmFsdWVXaWR0aCkgKiBjV2lkdGg7XG4gICAgbGV0IHdpZHRoID0gKHZhbHVlV2lkdGggLyB0b3RhbFZhbHVlV2lkdGgpICogY1dpZHRoO1xuICAgIGlmICh3aWR0aCA8IE1JTl9JVEVNX1dJRFRIKSB7XG4gICAgICB3aWR0aCA9IE1JTl9JVEVNX1dJRFRIO1xuICAgIH1cbiAgICBsZXQgZmlsbFN0eWxlID0gZmlsbENhY2hlLmdldChzZXJ2aWNlTmFtZSk7XG4gICAgaWYgKCFmaWxsU3R5bGUpIHtcbiAgICAgIGZpbGxTdHlsZSA9IGByZ2JhKCR7Z2V0RmlsbENvbG9yKHNlcnZpY2VOYW1lKS5jb25jYXQoSVRFTV9BTFBIQSkuam9pbigpfSlgO1xuICAgICAgZmlsbENhY2hlLnNldChzZXJ2aWNlTmFtZSwgZmlsbFN0eWxlKTtcbiAgICB9XG4gICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxTdHlsZTtcbiAgICBjdHguZmlsbFJlY3QoeCwgaSAqIGl0ZW1ZQ2hhbmdlLCB3aWR0aCwgaXRlbUhlaWdodCk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQSxPQUFPLElBQU1BLFVBQVUsR0FBRyxHQUFHO0FBQzdCLE9BQU8sSUFBTUMsZUFBZSxHQUFHLENBQUM7QUFDaEMsT0FBTyxJQUFNQyxnQkFBZ0IsR0FBRyxHQUFHO0FBQ25DLE9BQU8sSUFBTUMsY0FBYyxHQUFHLEVBQUU7QUFDaEMsT0FBTyxJQUFNQyxnQkFBZ0IsR0FBRyxFQUFFO0FBQ2xDLE9BQU8sSUFBTUMsZUFBZSxHQUFHLENBQUM7QUFFaEMsZUFBZSxTQUFTQyxnQkFBZ0JBLENBQ3RDQyxNQUF5QixFQUN6QkMsS0FBOEUsRUFDOUVDLGVBQXVCLEVBQ3ZCQyxZQUErRCxFQUMvREMsT0FBZSxFQUNmO0VBQ0EsSUFBTUMsU0FBcUMsR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FBQztFQUN2RCxJQUFNQyxPQUFPLEdBQUdOLEtBQUssQ0FBQ08sTUFBTSxHQUFHWCxnQkFBZ0IsR0FBR0EsZ0JBQWdCLEdBQUdZLElBQUksQ0FBQ0MsR0FBRyxDQUFDVCxLQUFLLENBQUNPLE1BQU0sRUFBRWIsZ0JBQWdCLENBQUM7RUFDN0csSUFBTWdCLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxVQUFVLEdBQUcsQ0FBQztFQUNwQztFQUNBYixNQUFNLENBQUNjLEtBQUssR0FBR0gsTUFBTTtFQUNyQjtFQUNBWCxNQUFNLENBQUNlLE1BQU0sR0FBR1IsT0FBTztFQUN2QixJQUFNUyxVQUFVLEdBQUdQLElBQUksQ0FBQ0MsR0FBRyxDQUFDWixlQUFlLEVBQUVXLElBQUksQ0FBQ1EsR0FBRyxDQUFDdkIsZUFBZSxFQUFFYSxPQUFPLEdBQUdOLEtBQUssQ0FBQ08sTUFBTSxDQUFDLENBQUM7RUFDL0YsSUFBTVUsV0FBVyxHQUFHWCxPQUFPLEdBQUdOLEtBQUssQ0FBQ08sTUFBTTtFQUUxQyxJQUFNVyxHQUFHLEdBQUduQixNQUFNLENBQUNvQixVQUFVLENBQUMsSUFBSSxFQUFFO0lBQUVDLEtBQUssRUFBRTtFQUFNLENBQUMsQ0FBNkI7RUFDakZGLEdBQUcsQ0FBQ0csU0FBUyxHQUFHbEIsT0FBTztFQUN2QmUsR0FBRyxDQUFDSSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRVosTUFBTSxFQUFFSixPQUFPLENBQUM7RUFDbkMsS0FBSyxJQUFJaUIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHdkIsS0FBSyxDQUFDTyxNQUFNLEVBQUVnQixDQUFDLEVBQUUsRUFBRTtJQUNyQyxJQUFBQyxRQUFBLEdBQWlEeEIsS0FBSyxDQUFDdUIsQ0FBQyxDQUFDO01BQWpERSxVQUFVLEdBQUFELFFBQUEsQ0FBVkMsVUFBVTtNQUFFQyxXQUFXLEdBQUFGLFFBQUEsQ0FBWEUsV0FBVztNQUFFQyxXQUFXLEdBQUFILFFBQUEsQ0FBWEcsV0FBVztJQUM1QyxJQUFNQyxDQUFDLEdBQUlGLFdBQVcsR0FBR3pCLGVBQWUsR0FBSVMsTUFBTTtJQUNsRCxJQUFJRyxLQUFLLEdBQUlZLFVBQVUsR0FBR3hCLGVBQWUsR0FBSVMsTUFBTTtJQUNuRCxJQUFJRyxLQUFLLEdBQUdsQixjQUFjLEVBQUU7TUFDMUJrQixLQUFLLEdBQUdsQixjQUFjO0lBQ3hCO0lBQ0EsSUFBSTBCLFNBQVMsR0FBR2pCLFNBQVMsQ0FBQ3lCLEdBQUcsQ0FBQ0YsV0FBVyxDQUFDO0lBQzFDLElBQUksQ0FBQ04sU0FBUyxFQUFFO01BQ2RBLFNBQVMsYUFBV25CLFlBQVksQ0FBQ3lCLFdBQVcsQ0FBQyxDQUFDRyxNQUFNLENBQUN0QyxVQUFVLENBQUMsQ0FBQ3VDLElBQUksQ0FBQyxDQUFDLE1BQUc7TUFDMUUzQixTQUFTLENBQUM0QixHQUFHLENBQUNMLFdBQVcsRUFBRU4sU0FBUyxDQUFDO0lBQ3ZDO0lBQ0FILEdBQUcsQ0FBQ0csU0FBUyxHQUFHQSxTQUFTO0lBQ3pCSCxHQUFHLENBQUNJLFFBQVEsQ0FBQ00sQ0FBQyxFQUFFTCxDQUFDLEdBQUdOLFdBQVcsRUFBRUosS0FBSyxFQUFFRSxVQUFVLENBQUM7RUFDckQ7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==