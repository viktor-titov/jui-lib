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

import { render } from '@testing-library/react';
import React from 'react';
import NewWindowIcon, { getStyles } from './NewWindowIcon';
import { jsx as _jsx } from "react/jsx-runtime";
describe('NewWindowIcon', function () {
  it('adds is-large className when props.isLarge is true', function () {
    var _render = render( /*#__PURE__*/_jsx(NewWindowIcon, {
        isLarge: true
      })),
      container = _render.container;
    var styles = getStyles();
    expect(container.firstChild).toHaveClass(styles.NewWindowIconLarge);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJSZWFjdCIsIk5ld1dpbmRvd0ljb24iLCJnZXRTdHlsZXMiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJpdCIsIl9yZW5kZXIiLCJpc0xhcmdlIiwiY29udGFpbmVyIiwic3R5bGVzIiwiZXhwZWN0IiwiZmlyc3RDaGlsZCIsInRvSGF2ZUNsYXNzIiwiTmV3V2luZG93SWNvbkxhcmdlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9OZXdXaW5kb3dJY29uLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBOZXdXaW5kb3dJY29uLCB7IGdldFN0eWxlcyB9IGZyb20gJy4vTmV3V2luZG93SWNvbic7XG5cbmRlc2NyaWJlKCdOZXdXaW5kb3dJY29uJywgKCkgPT4ge1xuICBpdCgnYWRkcyBpcy1sYXJnZSBjbGFzc05hbWUgd2hlbiBwcm9wcy5pc0xhcmdlIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBjb250YWluZXIgfSA9IHJlbmRlcig8TmV3V2luZG93SWNvbiBpc0xhcmdlIC8+KTtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXMoKTtcbiAgICBleHBlY3QoY29udGFpbmVyLmZpcnN0Q2hpbGQpLnRvSGF2ZUNsYXNzKHN0eWxlcy5OZXdXaW5kb3dJY29uTGFyZ2UpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLFFBQVEsd0JBQXdCO0FBQy9DLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLE9BQU9DLGFBQWEsSUFBSUMsU0FBUyxRQUFRLGlCQUFpQjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUUzREMsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFNO0VBQzlCQyxFQUFFLENBQUMsb0RBQW9ELEVBQUUsWUFBTTtJQUM3RCxJQUFBQyxPQUFBLEdBQXNCUixNQUFNLGVBQUNLLElBQUEsQ0FBQ0gsYUFBYTtRQUFDTyxPQUFPO01BQUEsQ0FBRSxDQUFDLENBQUM7TUFBL0NDLFNBQVMsR0FBQUYsT0FBQSxDQUFURSxTQUFTO0lBQ2pCLElBQU1DLE1BQU0sR0FBR1IsU0FBUyxDQUFDLENBQUM7SUFDMUJTLE1BQU0sQ0FBQ0YsU0FBUyxDQUFDRyxVQUFVLENBQUMsQ0FBQ0MsV0FBVyxDQUFDSCxNQUFNLENBQUNJLGtCQUFrQixDQUFDO0VBQ3JFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==