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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIlRleHRMaXN0IiwianN4IiwiX2pzeCIsImRlc2NyaWJlIiwiZGF0YSIsIml0IiwiZXhwZWN0Iiwibm90IiwidG9UaHJvdyIsImdldEFsbEJ5Um9sZSIsInRvSGF2ZUxlbmd0aCIsImxlbmd0aCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvVGV4dExpc3QudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgVGV4dExpc3QgZnJvbSAnLi9UZXh0TGlzdCc7XG5cbmRlc2NyaWJlKCc8VGV4dExpc3Q+JywgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gWydjbGllbnQnLCAnbW9zLWRlZiddO1xuXG4gIGl0KCdyZW5kZXJzIHdpdGhvdXQgZXhwbG9kaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiByZW5kZXIoPFRleHRMaXN0IGRhdGE9e2RhdGF9IC8+KSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgYSB0YWJsZSByb3cgZm9yIGVhY2ggZGF0YSBlbGVtZW50JywgKCkgPT4ge1xuICAgIHJlbmRlcig8VGV4dExpc3QgZGF0YT17ZGF0YX0gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QWxsQnlSb2xlKCdsaXN0aXRlbScpKS50b0hhdmVMZW5ndGgoZGF0YS5sZW5ndGgpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0MsUUFBUSxNQUFNLFlBQVk7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFbENDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBTTtFQUMzQixJQUFNQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO0VBRWxDQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsWUFBTTtJQUNwQ0MsTUFBTSxDQUFDO01BQUEsT0FBTVQsTUFBTSxlQUFDSyxJQUFBLENBQUNGLFFBQVE7UUFBQ0ksSUFBSSxFQUFFQTtNQUFLLENBQUUsQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUFDRyxHQUFHLENBQUNDLE9BQU8sQ0FBQyxDQUFDO0VBQzlELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsMkNBQTJDLEVBQUUsWUFBTTtJQUNwRFIsTUFBTSxlQUFDSyxJQUFBLENBQUNGLFFBQVE7TUFBQ0ksSUFBSSxFQUFFQTtJQUFLLENBQUUsQ0FBQyxDQUFDO0lBQ2hDRSxNQUFNLENBQUNSLE1BQU0sQ0FBQ1csWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUNDLFlBQVksQ0FBQ04sSUFBSSxDQUFDTyxNQUFNLENBQUM7RUFDbkUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119