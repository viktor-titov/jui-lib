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

import { render, screen } from '@testing-library/react';
import React from 'react';
import TextList from './TextList';
import { jsx as _jsx } from "react/jsx-runtime";
describe('<TextList>', function () {
  var data = ['client', 'mos-def'];
  it('renders without exploding', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(TextList, {
        data: data
      }));
    }).not.toThrow();
  });
  it('renders a table row for each data element', function () {
    render( /*#__PURE__*/_jsx(TextList, {
      data: data
    }));
    expect(screen.getAllByRole('listitem')).toHaveLength(data.length);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIlRleHRMaXN0IiwianN4IiwiX2pzeCIsImRlc2NyaWJlIiwiZGF0YSIsIml0IiwiZXhwZWN0Iiwibm90IiwidG9UaHJvdyIsImdldEFsbEJ5Um9sZSIsInRvSGF2ZUxlbmd0aCIsImxlbmd0aCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL1RleHRMaXN0LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFRleHRMaXN0IGZyb20gJy4vVGV4dExpc3QnO1xuXG5kZXNjcmliZSgnPFRleHRMaXN0PicsICgpID0+IHtcbiAgY29uc3QgZGF0YSA9IFsnY2xpZW50JywgJ21vcy1kZWYnXTtcblxuICBpdCgncmVuZGVycyB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gcmVuZGVyKDxUZXh0TGlzdCBkYXRhPXtkYXRhfSAvPikpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGEgdGFibGUgcm93IGZvciBlYWNoIGRhdGEgZWxlbWVudCcsICgpID0+IHtcbiAgICByZW5kZXIoPFRleHRMaXN0IGRhdGE9e2RhdGF9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5Um9sZSgnbGlzdGl0ZW0nKSkudG9IYXZlTGVuZ3RoKGRhdGEubGVuZ3RoKTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLE9BQU9DLFFBQVEsTUFBTSxZQUFZO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRWxDQyxRQUFRLENBQUMsWUFBWSxFQUFFLFlBQU07RUFDM0IsSUFBTUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztFQUVsQ0MsRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQU07SUFDcENDLE1BQU0sQ0FBQztNQUFBLE9BQU1ULE1BQU0sZUFBQ0ssSUFBQSxDQUFDRixRQUFRO1FBQUNJLElBQUksRUFBRUE7TUFBSyxDQUFFLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQ0csR0FBRyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUM5RCxDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLFlBQU07SUFDcERSLE1BQU0sZUFBQ0ssSUFBQSxDQUFDRixRQUFRO01BQUNJLElBQUksRUFBRUE7SUFBSyxDQUFFLENBQUMsQ0FBQztJQUNoQ0UsTUFBTSxDQUFDUixNQUFNLENBQUNXLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDQyxZQUFZLENBQUNOLElBQUksQ0FBQ08sTUFBTSxDQUFDO0VBQ25FLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==