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

var keyboardMappings = {
  scrollPageDown: {
    binding: 's',
    label: 'Scroll down'
  },
  scrollPageUp: {
    binding: 'w',
    label: 'Scroll up'
  },
  scrollToNextVisibleSpan: {
    binding: 'f',
    label: 'Scroll to the next visible span'
  },
  scrollToPrevVisibleSpan: {
    binding: 'b',
    label: 'Scroll to the previous visible span'
  },
  panLeft: {
    binding: ['a', 'left'],
    label: 'Pan left'
  },
  panLeftFast: {
    binding: ['shift+a', 'shift+left'],
    label: 'Pan left — Large'
  },
  panRight: {
    binding: ['d', 'right'],
    label: 'Pan right'
  },
  panRightFast: {
    binding: ['shift+d', 'shift+right'],
    label: 'Pan right — Large'
  },
  zoomIn: {
    binding: 'up',
    label: 'Zoom in'
  },
  zoomInFast: {
    binding: 'shift+up',
    label: 'Zoom in — Large'
  },
  zoomOut: {
    binding: 'down',
    label: 'Zoom out'
  },
  zoomOutFast: {
    binding: 'shift+down',
    label: 'Zoom out — Large'
  },
  collapseAll: {
    binding: ']',
    label: 'Collapse All'
  },
  expandAll: {
    binding: '[',
    label: 'Expand All'
  },
  collapseOne: {
    binding: 'p',
    label: 'Collapse One Level'
  },
  expandOne: {
    binding: 'o',
    label: 'Expand One Level'
  },
  searchSpans: {
    binding: 'ctrl+b',
    label: 'Search Spans'
  },
  clearSearch: {
    binding: 'escape',
    label: 'Clear Search'
  }
};
export default keyboardMappings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJrZXlib2FyZE1hcHBpbmdzIiwic2Nyb2xsUGFnZURvd24iLCJiaW5kaW5nIiwibGFiZWwiLCJzY3JvbGxQYWdlVXAiLCJzY3JvbGxUb05leHRWaXNpYmxlU3BhbiIsInNjcm9sbFRvUHJldlZpc2libGVTcGFuIiwicGFuTGVmdCIsInBhbkxlZnRGYXN0IiwicGFuUmlnaHQiLCJwYW5SaWdodEZhc3QiLCJ6b29tSW4iLCJ6b29tSW5GYXN0Iiwiem9vbU91dCIsInpvb21PdXRGYXN0IiwiY29sbGFwc2VBbGwiLCJleHBhbmRBbGwiLCJjb2xsYXBzZU9uZSIsImV4cGFuZE9uZSIsInNlYXJjaFNwYW5zIiwiY2xlYXJTZWFyY2giXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2tleWJvYXJkLW1hcHBpbmdzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuY29uc3Qga2V5Ym9hcmRNYXBwaW5nczogUmVjb3JkPHN0cmluZywgeyBiaW5kaW5nOiBzdHJpbmcgfCBzdHJpbmdbXTsgbGFiZWw6IHN0cmluZyB9PiA9IHtcbiAgc2Nyb2xsUGFnZURvd246IHsgYmluZGluZzogJ3MnLCBsYWJlbDogJ1Njcm9sbCBkb3duJyB9LFxuICBzY3JvbGxQYWdlVXA6IHsgYmluZGluZzogJ3cnLCBsYWJlbDogJ1Njcm9sbCB1cCcgfSxcbiAgc2Nyb2xsVG9OZXh0VmlzaWJsZVNwYW46IHsgYmluZGluZzogJ2YnLCBsYWJlbDogJ1Njcm9sbCB0byB0aGUgbmV4dCB2aXNpYmxlIHNwYW4nIH0sXG4gIHNjcm9sbFRvUHJldlZpc2libGVTcGFuOiB7IGJpbmRpbmc6ICdiJywgbGFiZWw6ICdTY3JvbGwgdG8gdGhlIHByZXZpb3VzIHZpc2libGUgc3BhbicgfSxcbiAgcGFuTGVmdDogeyBiaW5kaW5nOiBbJ2EnLCAnbGVmdCddLCBsYWJlbDogJ1BhbiBsZWZ0JyB9LFxuICBwYW5MZWZ0RmFzdDogeyBiaW5kaW5nOiBbJ3NoaWZ0K2EnLCAnc2hpZnQrbGVmdCddLCBsYWJlbDogJ1BhbiBsZWZ0IOKAlCBMYXJnZScgfSxcbiAgcGFuUmlnaHQ6IHsgYmluZGluZzogWydkJywgJ3JpZ2h0J10sIGxhYmVsOiAnUGFuIHJpZ2h0JyB9LFxuICBwYW5SaWdodEZhc3Q6IHsgYmluZGluZzogWydzaGlmdCtkJywgJ3NoaWZ0K3JpZ2h0J10sIGxhYmVsOiAnUGFuIHJpZ2h0IOKAlCBMYXJnZScgfSxcbiAgem9vbUluOiB7IGJpbmRpbmc6ICd1cCcsIGxhYmVsOiAnWm9vbSBpbicgfSxcbiAgem9vbUluRmFzdDogeyBiaW5kaW5nOiAnc2hpZnQrdXAnLCBsYWJlbDogJ1pvb20gaW4g4oCUIExhcmdlJyB9LFxuICB6b29tT3V0OiB7IGJpbmRpbmc6ICdkb3duJywgbGFiZWw6ICdab29tIG91dCcgfSxcbiAgem9vbU91dEZhc3Q6IHsgYmluZGluZzogJ3NoaWZ0K2Rvd24nLCBsYWJlbDogJ1pvb20gb3V0IOKAlCBMYXJnZScgfSxcbiAgY29sbGFwc2VBbGw6IHsgYmluZGluZzogJ10nLCBsYWJlbDogJ0NvbGxhcHNlIEFsbCcgfSxcbiAgZXhwYW5kQWxsOiB7IGJpbmRpbmc6ICdbJywgbGFiZWw6ICdFeHBhbmQgQWxsJyB9LFxuICBjb2xsYXBzZU9uZTogeyBiaW5kaW5nOiAncCcsIGxhYmVsOiAnQ29sbGFwc2UgT25lIExldmVsJyB9LFxuICBleHBhbmRPbmU6IHsgYmluZGluZzogJ28nLCBsYWJlbDogJ0V4cGFuZCBPbmUgTGV2ZWwnIH0sXG4gIHNlYXJjaFNwYW5zOiB7IGJpbmRpbmc6ICdjdHJsK2InLCBsYWJlbDogJ1NlYXJjaCBTcGFucycgfSxcbiAgY2xlYXJTZWFyY2g6IHsgYmluZGluZzogJ2VzY2FwZScsIGxhYmVsOiAnQ2xlYXIgU2VhcmNoJyB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQga2V5Ym9hcmRNYXBwaW5ncztcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsZ0JBQStFLEdBQUc7RUFDdEZDLGNBQWMsRUFBRTtJQUFFQyxPQUFPLEVBQUUsR0FBRztJQUFFQyxLQUFLLEVBQUU7RUFBYyxDQUFDO0VBQ3REQyxZQUFZLEVBQUU7SUFBRUYsT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQVksQ0FBQztFQUNsREUsdUJBQXVCLEVBQUU7SUFBRUgsT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQWtDLENBQUM7RUFDbkZHLHVCQUF1QixFQUFFO0lBQUVKLE9BQU8sRUFBRSxHQUFHO0lBQUVDLEtBQUssRUFBRTtFQUFzQyxDQUFDO0VBQ3ZGSSxPQUFPLEVBQUU7SUFBRUwsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztJQUFFQyxLQUFLLEVBQUU7RUFBVyxDQUFDO0VBQ3RESyxXQUFXLEVBQUU7SUFBRU4sT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztJQUFFQyxLQUFLLEVBQUU7RUFBbUIsQ0FBQztFQUM5RU0sUUFBUSxFQUFFO0lBQUVQLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO0VBQVksQ0FBQztFQUN6RE8sWUFBWSxFQUFFO0lBQUVSLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUM7SUFBRUMsS0FBSyxFQUFFO0VBQW9CLENBQUM7RUFDakZRLE1BQU0sRUFBRTtJQUFFVCxPQUFPLEVBQUUsSUFBSTtJQUFFQyxLQUFLLEVBQUU7RUFBVSxDQUFDO0VBQzNDUyxVQUFVLEVBQUU7SUFBRVYsT0FBTyxFQUFFLFVBQVU7SUFBRUMsS0FBSyxFQUFFO0VBQWtCLENBQUM7RUFDN0RVLE9BQU8sRUFBRTtJQUFFWCxPQUFPLEVBQUUsTUFBTTtJQUFFQyxLQUFLLEVBQUU7RUFBVyxDQUFDO0VBQy9DVyxXQUFXLEVBQUU7SUFBRVosT0FBTyxFQUFFLFlBQVk7SUFBRUMsS0FBSyxFQUFFO0VBQW1CLENBQUM7RUFDakVZLFdBQVcsRUFBRTtJQUFFYixPQUFPLEVBQUUsR0FBRztJQUFFQyxLQUFLLEVBQUU7RUFBZSxDQUFDO0VBQ3BEYSxTQUFTLEVBQUU7SUFBRWQsT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQWEsQ0FBQztFQUNoRGMsV0FBVyxFQUFFO0lBQUVmLE9BQU8sRUFBRSxHQUFHO0lBQUVDLEtBQUssRUFBRTtFQUFxQixDQUFDO0VBQzFEZSxTQUFTLEVBQUU7SUFBRWhCLE9BQU8sRUFBRSxHQUFHO0lBQUVDLEtBQUssRUFBRTtFQUFtQixDQUFDO0VBQ3REZ0IsV0FBVyxFQUFFO0lBQUVqQixPQUFPLEVBQUUsUUFBUTtJQUFFQyxLQUFLLEVBQUU7RUFBZSxDQUFDO0VBQ3pEaUIsV0FBVyxFQUFFO0lBQUVsQixPQUFPLEVBQUUsUUFBUTtJQUFFQyxLQUFLLEVBQUU7RUFBZTtBQUMxRCxDQUFDO0FBRUQsZUFBZUgsZ0JBQWdCIiwiaWdub3JlTGlzdCI6W119