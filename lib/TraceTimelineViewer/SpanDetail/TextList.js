import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3;
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

import { css } from '@emotion/css';
import cx from 'classnames';
import * as React from 'react';
import { useStyles2 } from '@grafana/ui';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    TextList: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      max-height: 450px;\n      overflow: auto;\n    "]))),
    List: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      width: 100%;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n    "]))),
    item: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      padding: 0.25rem 0.5rem;\n      vertical-align: top;\n      &:nth-child(2n) {\n        background: #f5f5f5;\n      }\n    "])))
  };
};
export default function TextList(props) {
  var data = props.data;
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsx("div", {
    className: cx(styles.TextList),
    "data-testid": "TextList",
    children: /*#__PURE__*/_jsx("ul", {
      className: styles.List,
      children: data.map(function (row, i) {
        return (
          /*#__PURE__*/
          // `i` is necessary in the key because row.key can repeat
          _jsx("li", {
            className: styles.item,
            children: row
          }, "" + i)
        );
      })
    })
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImpzeCIsIl9qc3giLCJnZXRTdHlsZXMiLCJUZXh0TGlzdCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIkxpc3QiLCJfdGVtcGxhdGVPYmplY3QyIiwiaXRlbSIsIl90ZW1wbGF0ZU9iamVjdDMiLCJwcm9wcyIsImRhdGEiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIm1hcCIsInJvdyIsImkiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL1RleHRMaXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIFRleHRMaXN0OiBjc3NgXG4gICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGAsXG4gICAgTGlzdDogY3NzYFxuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICBgLFxuICAgIGl0ZW06IGNzc2BcbiAgICAgIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICY6bnRoLWNoaWxkKDJuKSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gICAgICB9XG4gICAgYCxcbiAgfTtcbn07XG5cbnR5cGUgVGV4dExpc3RQcm9wcyA9IHtcbiAgZGF0YTogc3RyaW5nW107XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUZXh0TGlzdChwcm9wczogVGV4dExpc3RQcm9wcykge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2N4KHN0eWxlcy5UZXh0TGlzdCl9IGRhdGEtdGVzdGlkPVwiVGV4dExpc3RcIj5cbiAgICAgIDx1bCBjbGFzc05hbWU9e3N0eWxlcy5MaXN0fT5cbiAgICAgICAge2RhdGEubWFwKChyb3csIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgLy8gYGlgIGlzIG5lY2Vzc2FyeSBpbiB0aGUga2V5IGJlY2F1c2Ugcm93LmtleSBjYW4gcmVwZWF0XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzdHlsZXMuaXRlbX0ga2V5PXtgJHtpfWB9PlxuICAgICAgICAgICAgICB7cm93fVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FBTztBQUU5QixTQUFTQyxVQUFVLFFBQVEsYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUV6QyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFTO0VBQ3RCLE9BQU87SUFDTEMsUUFBUSxFQUFFUCxHQUFHLENBQUFRLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQSwrREFHWjtJQUNEQyxJQUFJLEVBQUVWLEdBQUcsQ0FBQVcsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUYsMkJBQUEsZ0dBS1I7SUFDREcsSUFBSSxFQUFFWixHQUFHLENBQUFhLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFKLDJCQUFBO0VBT1gsQ0FBQztBQUNILENBQUM7QUFNRCxlQUFlLFNBQVNGLFFBQVFBLENBQUNPLEtBQW9CLEVBQUU7RUFDckQsSUFBUUMsSUFBSSxHQUFLRCxLQUFLLENBQWRDLElBQUk7RUFDWixJQUFNQyxNQUFNLEdBQUdiLFVBQVUsQ0FBQ0csU0FBUyxDQUFDO0VBQ3BDLG9CQUNFRCxJQUFBO0lBQUtZLFNBQVMsRUFBRWhCLEVBQUUsQ0FBQ2UsTUFBTSxDQUFDVCxRQUFRLENBQUU7SUFBQyxlQUFZLFVBQVU7SUFBQVcsUUFBQSxlQUN6RGIsSUFBQTtNQUFJWSxTQUFTLEVBQUVELE1BQU0sQ0FBQ04sSUFBSztNQUFBUSxRQUFBLEVBQ3hCSCxJQUFJLENBQUNJLEdBQUcsQ0FBQyxVQUFDQyxHQUFHLEVBQUVDLENBQUMsRUFBSztRQUNwQjtVQUFBO1VBQ0U7VUFDQWhCLElBQUE7WUFBSVksU0FBUyxFQUFFRCxNQUFNLENBQUNKLElBQUs7WUFBQU0sUUFBQSxFQUN4QkU7VUFBRyxRQUQ4QkMsQ0FFaEM7UUFBQztNQUVULENBQUM7SUFBQyxDQUNBO0VBQUMsQ0FDRixDQUFDO0FBRVYiLCJpZ25vcmVMaXN0IjpbXX0=