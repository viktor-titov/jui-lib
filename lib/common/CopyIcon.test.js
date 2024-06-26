import _extends from "@babel/runtime/helpers/extends";
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
import * as copy from 'copy-to-clipboard';
import React from 'react';
import CopyIcon from './CopyIcon';
import { jsx as _jsx } from "react/jsx-runtime";
jest.mock('copy-to-clipboard');
describe('<CopyIcon />', function () {
  var props = {
    className: 'classNameValue',
    copyText: 'copyTextValue',
    tooltipTitle: 'tooltipTitleValue'
  };
  var copySpy;
  beforeAll(function () {
    copySpy = jest.spyOn(copy, 'default');
  });
  beforeEach(function () {
    copySpy.mockReset();
  });
  it('renders as expected', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(CopyIcon, _extends({}, props)));
    }).not.toThrow();
  });
  it('copies when clicked', function () {
    render( /*#__PURE__*/_jsx(CopyIcon, _extends({}, props)));
    var button = screen.getByRole('button');
    button.click();
    expect(copySpy).toHaveBeenCalledWith(props.copyText);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJjb3B5IiwiUmVhY3QiLCJDb3B5SWNvbiIsImpzeCIsIl9qc3giLCJqZXN0IiwibW9jayIsImRlc2NyaWJlIiwicHJvcHMiLCJjbGFzc05hbWUiLCJjb3B5VGV4dCIsInRvb2x0aXBUaXRsZSIsImNvcHlTcHkiLCJiZWZvcmVBbGwiLCJzcHlPbiIsImJlZm9yZUVhY2giLCJtb2NrUmVzZXQiLCJpdCIsImV4cGVjdCIsIl9leHRlbmRzIiwibm90IiwidG9UaHJvdyIsImJ1dHRvbiIsImdldEJ5Um9sZSIsImNsaWNrIiwidG9IYXZlQmVlbkNhbGxlZFdpdGgiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL0NvcHlJY29uLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0ICogYXMgY29weSBmcm9tICdjb3B5LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQ29weUljb24gZnJvbSAnLi9Db3B5SWNvbic7XG5cbmplc3QubW9jaygnY29weS10by1jbGlwYm9hcmQnKTtcblxuZGVzY3JpYmUoJzxDb3B5SWNvbiAvPicsICgpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgY2xhc3NOYW1lOiAnY2xhc3NOYW1lVmFsdWUnLFxuICAgIGNvcHlUZXh0OiAnY29weVRleHRWYWx1ZScsXG4gICAgdG9vbHRpcFRpdGxlOiAndG9vbHRpcFRpdGxlVmFsdWUnLFxuICB9O1xuICBsZXQgY29weVNweTogamVzdC5TcHlJbnN0YW5jZTtcblxuICBiZWZvcmVBbGwoKCkgPT4ge1xuICAgIGNvcHlTcHkgPSBqZXN0LnNweU9uKGNvcHksICdkZWZhdWx0Jyk7XG4gIH0pO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGNvcHlTcHkubW9ja1Jlc2V0KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGFzIGV4cGVjdGVkJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiByZW5kZXIoPENvcHlJY29uIHsuLi5wcm9wc30gLz4pKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnY29waWVzIHdoZW4gY2xpY2tlZCcsICgpID0+IHtcbiAgICByZW5kZXIoPENvcHlJY29uIHsuLi5wcm9wc30gLz4pO1xuXG4gICAgY29uc3QgYnV0dG9uID0gc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmNsaWNrKCk7XG5cbiAgICBleHBlY3QoY29weVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgocHJvcHMuY29weVRleHQpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU8sS0FBS0MsSUFBSSxNQUFNLG1CQUFtQjtBQUN6QyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixPQUFPQyxRQUFRLE1BQU0sWUFBWTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUVsQ0MsSUFBSSxDQUFDQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7QUFFOUJDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBTTtFQUM3QixJQUFNQyxLQUFLLEdBQUc7SUFDWkMsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQkMsUUFBUSxFQUFFLGVBQWU7SUFDekJDLFlBQVksRUFBRTtFQUNoQixDQUFDO0VBQ0QsSUFBSUMsT0FBeUI7RUFFN0JDLFNBQVMsQ0FBQyxZQUFNO0lBQ2RELE9BQU8sR0FBR1AsSUFBSSxDQUFDUyxLQUFLLENBQUNkLElBQUksRUFBRSxTQUFTLENBQUM7RUFDdkMsQ0FBQyxDQUFDO0VBRUZlLFVBQVUsQ0FBQyxZQUFNO0lBQ2ZILE9BQU8sQ0FBQ0ksU0FBUyxDQUFDLENBQUM7RUFDckIsQ0FBQyxDQUFDO0VBRUZDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFNO0lBQzlCQyxNQUFNLENBQUM7TUFBQSxPQUFNcEIsTUFBTSxlQUFDTSxJQUFBLENBQUNGLFFBQVEsRUFBQWlCLFFBQUEsS0FBS1gsS0FBSyxDQUFHLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQ1ksR0FBRyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUM3RCxDQUFDLENBQUM7RUFFRkosRUFBRSxDQUFDLHFCQUFxQixFQUFFLFlBQU07SUFDOUJuQixNQUFNLGVBQUNNLElBQUEsQ0FBQ0YsUUFBUSxFQUFBaUIsUUFBQSxLQUFLWCxLQUFLLENBQUcsQ0FBQyxDQUFDO0lBRS9CLElBQU1jLE1BQU0sR0FBR3ZCLE1BQU0sQ0FBQ3dCLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDekNELE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUM7SUFFZE4sTUFBTSxDQUFDTixPQUFPLENBQUMsQ0FBQ2Esb0JBQW9CLENBQUNqQixLQUFLLENBQUNFLFFBQVEsQ0FBQztFQUN0RCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=