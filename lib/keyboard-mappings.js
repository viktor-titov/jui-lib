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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJrZXlib2FyZE1hcHBpbmdzIiwic2Nyb2xsUGFnZURvd24iLCJiaW5kaW5nIiwibGFiZWwiLCJzY3JvbGxQYWdlVXAiLCJzY3JvbGxUb05leHRWaXNpYmxlU3BhbiIsInNjcm9sbFRvUHJldlZpc2libGVTcGFuIiwicGFuTGVmdCIsInBhbkxlZnRGYXN0IiwicGFuUmlnaHQiLCJwYW5SaWdodEZhc3QiLCJ6b29tSW4iLCJ6b29tSW5GYXN0Iiwiem9vbU91dCIsInpvb21PdXRGYXN0IiwiY29sbGFwc2VBbGwiLCJleHBhbmRBbGwiLCJjb2xsYXBzZU9uZSIsImV4cGFuZE9uZSIsInNlYXJjaFNwYW5zIiwiY2xlYXJTZWFyY2giXSwic291cmNlcyI6WyIuLi9zcmMva2V5Ym9hcmQtbWFwcGluZ3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5jb25zdCBrZXlib2FyZE1hcHBpbmdzOiBSZWNvcmQ8c3RyaW5nLCB7IGJpbmRpbmc6IHN0cmluZyB8IHN0cmluZ1tdOyBsYWJlbDogc3RyaW5nIH0+ID0ge1xuICBzY3JvbGxQYWdlRG93bjogeyBiaW5kaW5nOiAncycsIGxhYmVsOiAnU2Nyb2xsIGRvd24nIH0sXG4gIHNjcm9sbFBhZ2VVcDogeyBiaW5kaW5nOiAndycsIGxhYmVsOiAnU2Nyb2xsIHVwJyB9LFxuICBzY3JvbGxUb05leHRWaXNpYmxlU3BhbjogeyBiaW5kaW5nOiAnZicsIGxhYmVsOiAnU2Nyb2xsIHRvIHRoZSBuZXh0IHZpc2libGUgc3BhbicgfSxcbiAgc2Nyb2xsVG9QcmV2VmlzaWJsZVNwYW46IHsgYmluZGluZzogJ2InLCBsYWJlbDogJ1Njcm9sbCB0byB0aGUgcHJldmlvdXMgdmlzaWJsZSBzcGFuJyB9LFxuICBwYW5MZWZ0OiB7IGJpbmRpbmc6IFsnYScsICdsZWZ0J10sIGxhYmVsOiAnUGFuIGxlZnQnIH0sXG4gIHBhbkxlZnRGYXN0OiB7IGJpbmRpbmc6IFsnc2hpZnQrYScsICdzaGlmdCtsZWZ0J10sIGxhYmVsOiAnUGFuIGxlZnQg4oCUIExhcmdlJyB9LFxuICBwYW5SaWdodDogeyBiaW5kaW5nOiBbJ2QnLCAncmlnaHQnXSwgbGFiZWw6ICdQYW4gcmlnaHQnIH0sXG4gIHBhblJpZ2h0RmFzdDogeyBiaW5kaW5nOiBbJ3NoaWZ0K2QnLCAnc2hpZnQrcmlnaHQnXSwgbGFiZWw6ICdQYW4gcmlnaHQg4oCUIExhcmdlJyB9LFxuICB6b29tSW46IHsgYmluZGluZzogJ3VwJywgbGFiZWw6ICdab29tIGluJyB9LFxuICB6b29tSW5GYXN0OiB7IGJpbmRpbmc6ICdzaGlmdCt1cCcsIGxhYmVsOiAnWm9vbSBpbiDigJQgTGFyZ2UnIH0sXG4gIHpvb21PdXQ6IHsgYmluZGluZzogJ2Rvd24nLCBsYWJlbDogJ1pvb20gb3V0JyB9LFxuICB6b29tT3V0RmFzdDogeyBiaW5kaW5nOiAnc2hpZnQrZG93bicsIGxhYmVsOiAnWm9vbSBvdXQg4oCUIExhcmdlJyB9LFxuICBjb2xsYXBzZUFsbDogeyBiaW5kaW5nOiAnXScsIGxhYmVsOiAnQ29sbGFwc2UgQWxsJyB9LFxuICBleHBhbmRBbGw6IHsgYmluZGluZzogJ1snLCBsYWJlbDogJ0V4cGFuZCBBbGwnIH0sXG4gIGNvbGxhcHNlT25lOiB7IGJpbmRpbmc6ICdwJywgbGFiZWw6ICdDb2xsYXBzZSBPbmUgTGV2ZWwnIH0sXG4gIGV4cGFuZE9uZTogeyBiaW5kaW5nOiAnbycsIGxhYmVsOiAnRXhwYW5kIE9uZSBMZXZlbCcgfSxcbiAgc2VhcmNoU3BhbnM6IHsgYmluZGluZzogJ2N0cmwrYicsIGxhYmVsOiAnU2VhcmNoIFNwYW5zJyB9LFxuICBjbGVhclNlYXJjaDogeyBiaW5kaW5nOiAnZXNjYXBlJywgbGFiZWw6ICdDbGVhciBTZWFyY2gnIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBrZXlib2FyZE1hcHBpbmdzO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxnQkFBK0UsR0FBRztFQUN0RkMsY0FBYyxFQUFFO0lBQUVDLE9BQU8sRUFBRSxHQUFHO0lBQUVDLEtBQUssRUFBRTtFQUFjLENBQUM7RUFDdERDLFlBQVksRUFBRTtJQUFFRixPQUFPLEVBQUUsR0FBRztJQUFFQyxLQUFLLEVBQUU7RUFBWSxDQUFDO0VBQ2xERSx1QkFBdUIsRUFBRTtJQUFFSCxPQUFPLEVBQUUsR0FBRztJQUFFQyxLQUFLLEVBQUU7RUFBa0MsQ0FBQztFQUNuRkcsdUJBQXVCLEVBQUU7SUFBRUosT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQXNDLENBQUM7RUFDdkZJLE9BQU8sRUFBRTtJQUFFTCxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO0lBQUVDLEtBQUssRUFBRTtFQUFXLENBQUM7RUFDdERLLFdBQVcsRUFBRTtJQUFFTixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0lBQUVDLEtBQUssRUFBRTtFQUFtQixDQUFDO0VBQzlFTSxRQUFRLEVBQUU7SUFBRVAsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztJQUFFQyxLQUFLLEVBQUU7RUFBWSxDQUFDO0VBQ3pETyxZQUFZLEVBQUU7SUFBRVIsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztJQUFFQyxLQUFLLEVBQUU7RUFBb0IsQ0FBQztFQUNqRlEsTUFBTSxFQUFFO0lBQUVULE9BQU8sRUFBRSxJQUFJO0lBQUVDLEtBQUssRUFBRTtFQUFVLENBQUM7RUFDM0NTLFVBQVUsRUFBRTtJQUFFVixPQUFPLEVBQUUsVUFBVTtJQUFFQyxLQUFLLEVBQUU7RUFBa0IsQ0FBQztFQUM3RFUsT0FBTyxFQUFFO0lBQUVYLE9BQU8sRUFBRSxNQUFNO0lBQUVDLEtBQUssRUFBRTtFQUFXLENBQUM7RUFDL0NXLFdBQVcsRUFBRTtJQUFFWixPQUFPLEVBQUUsWUFBWTtJQUFFQyxLQUFLLEVBQUU7RUFBbUIsQ0FBQztFQUNqRVksV0FBVyxFQUFFO0lBQUViLE9BQU8sRUFBRSxHQUFHO0lBQUVDLEtBQUssRUFBRTtFQUFlLENBQUM7RUFDcERhLFNBQVMsRUFBRTtJQUFFZCxPQUFPLEVBQUUsR0FBRztJQUFFQyxLQUFLLEVBQUU7RUFBYSxDQUFDO0VBQ2hEYyxXQUFXLEVBQUU7SUFBRWYsT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQXFCLENBQUM7RUFDMURlLFNBQVMsRUFBRTtJQUFFaEIsT0FBTyxFQUFFLEdBQUc7SUFBRUMsS0FBSyxFQUFFO0VBQW1CLENBQUM7RUFDdERnQixXQUFXLEVBQUU7SUFBRWpCLE9BQU8sRUFBRSxRQUFRO0lBQUVDLEtBQUssRUFBRTtFQUFlLENBQUM7RUFDekRpQixXQUFXLEVBQUU7SUFBRWxCLE9BQU8sRUFBRSxRQUFRO0lBQUVDLEtBQUssRUFBRTtFQUFlO0FBQzFELENBQUM7QUFFRCxlQUFlSCxnQkFBZ0IiLCJpZ25vcmVMaXN0IjpbXX0=