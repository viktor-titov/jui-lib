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

import { render } from '@testing-library/react';
import React from 'react';
import { createTheme } from '@grafana/data';
import { UnthemedCanvasSpanGraph } from './CanvasSpanGraph';
import { jsx as _jsx } from "react/jsx-runtime";
describe('CanvasSpanGraph tests', function () {
  it('renders without exploding', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(UnthemedCanvasSpanGraph, {
        items: items,
        valueWidth: 4000,
        theme: createTheme()
      }));
    }).not.toThrow();
  });
});
var items = [{
  valueWidth: 1,
  valueOffset: 1,
  serviceName: 'service-name-0'
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJSZWFjdCIsImNyZWF0ZVRoZW1lIiwiVW50aGVtZWRDYW52YXNTcGFuR3JhcGgiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsIml0ZW1zIiwidmFsdWVXaWR0aCIsInRoZW1lIiwibm90IiwidG9UaHJvdyIsInZhbHVlT2Zmc2V0Iiwic2VydmljZU5hbWUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvQ2FudmFzU3BhbkdyYXBoLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNyZWF0ZVRoZW1lIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5cbmltcG9ydCB7IFVudGhlbWVkQ2FudmFzU3BhbkdyYXBoIH0gZnJvbSAnLi9DYW52YXNTcGFuR3JhcGgnO1xuXG5kZXNjcmliZSgnQ2FudmFzU3BhbkdyYXBoIHRlc3RzJywgKCkgPT4ge1xuICBpdCgncmVuZGVycyB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT5cbiAgICAgIHJlbmRlcig8VW50aGVtZWRDYW52YXNTcGFuR3JhcGggaXRlbXM9e2l0ZW1zfSB2YWx1ZVdpZHRoPXs0MDAwfSB0aGVtZT17Y3JlYXRlVGhlbWUoKX0gLz4pXG4gICAgKS5ub3QudG9UaHJvdygpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBpdGVtcyA9IFtcbiAge1xuICAgIHZhbHVlV2lkdGg6IDEsXG4gICAgdmFsdWVPZmZzZXQ6IDEsXG4gICAgc2VydmljZU5hbWU6ICdzZXJ2aWNlLW5hbWUtMCcsXG4gIH0sXG5dO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLFFBQVEsd0JBQXdCO0FBQy9DLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLFNBQVNDLFdBQVcsUUFBUSxlQUFlO0FBRTNDLFNBQVNDLHVCQUF1QixRQUFRLG1CQUFtQjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUU1REMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQU07RUFDdENDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxZQUFNO0lBQ3BDQyxNQUFNLENBQUM7TUFBQSxPQUNMUixNQUFNLGVBQUNLLElBQUEsQ0FBQ0YsdUJBQXVCO1FBQUNNLEtBQUssRUFBRUEsS0FBTTtRQUFDQyxVQUFVLEVBQUUsSUFBSztRQUFDQyxLQUFLLEVBQUVULFdBQVcsQ0FBQztNQUFFLENBQUUsQ0FBQyxDQUFDO0lBQUEsQ0FDM0YsQ0FBQyxDQUFDVSxHQUFHLENBQUNDLE9BQU8sQ0FBQyxDQUFDO0VBQ2pCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU1KLEtBQUssR0FBRyxDQUNaO0VBQ0VDLFVBQVUsRUFBRSxDQUFDO0VBQ2JJLFdBQVcsRUFBRSxDQUFDO0VBQ2RDLFdBQVcsRUFBRTtBQUNmLENBQUMsQ0FDRiIsImlnbm9yZUxpc3QiOltdfQ==