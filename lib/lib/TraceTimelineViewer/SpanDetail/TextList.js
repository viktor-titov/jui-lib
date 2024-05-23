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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImpzeCIsIl9qc3giLCJnZXRTdHlsZXMiLCJUZXh0TGlzdCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIkxpc3QiLCJfdGVtcGxhdGVPYmplY3QyIiwiaXRlbSIsIl90ZW1wbGF0ZU9iamVjdDMiLCJwcm9wcyIsImRhdGEiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIm1hcCIsInJvdyIsImkiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkRldGFpbC9UZXh0TGlzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBUZXh0TGlzdDogY3NzYFxuICAgICAgbWF4LWhlaWdodDogNDUwcHg7XG4gICAgICBvdmVyZmxvdzogYXV0bztcbiAgICBgLFxuICAgIExpc3Q6IGNzc2BcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgYCxcbiAgICBpdGVtOiBjc3NgXG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAmOm50aC1jaGlsZCgybikge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgICAgfVxuICAgIGAsXG4gIH07XG59O1xuXG50eXBlIFRleHRMaXN0UHJvcHMgPSB7XG4gIGRhdGE6IHN0cmluZ1tdO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGV4dExpc3QocHJvcHM6IFRleHRMaXN0UHJvcHMpIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzdHlsZXMuVGV4dExpc3QpfSBkYXRhLXRlc3RpZD1cIlRleHRMaXN0XCI+XG4gICAgICA8dWwgY2xhc3NOYW1lPXtzdHlsZXMuTGlzdH0+XG4gICAgICAgIHtkYXRhLm1hcCgocm93LCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIC8vIGBpYCBpcyBuZWNlc3NhcnkgaW4gdGhlIGtleSBiZWNhdXNlIHJvdy5rZXkgY2FuIHJlcGVhdFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17c3R5bGVzLml0ZW19IGtleT17YCR7aX1gfT5cbiAgICAgICAgICAgICAge3Jvd31cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFFOUIsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFekMsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztFQUN0QixPQUFPO0lBQ0xDLFFBQVEsRUFBRVAsR0FBRyxDQUFBUSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEsK0RBR1o7SUFDREMsSUFBSSxFQUFFVixHQUFHLENBQUFXLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLGdHQUtSO0lBQ0RHLElBQUksRUFBRVosR0FBRyxDQUFBYSxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSiwyQkFBQTtFQU9YLENBQUM7QUFDSCxDQUFDO0FBTUQsZUFBZSxTQUFTRixRQUFRQSxDQUFDTyxLQUFvQixFQUFFO0VBQ3JELElBQVFDLElBQUksR0FBS0QsS0FBSyxDQUFkQyxJQUFJO0VBQ1osSUFBTUMsTUFBTSxHQUFHYixVQUFVLENBQUNHLFNBQVMsQ0FBQztFQUNwQyxvQkFDRUQsSUFBQTtJQUFLWSxTQUFTLEVBQUVoQixFQUFFLENBQUNlLE1BQU0sQ0FBQ1QsUUFBUSxDQUFFO0lBQUMsZUFBWSxVQUFVO0lBQUFXLFFBQUEsZUFDekRiLElBQUE7TUFBSVksU0FBUyxFQUFFRCxNQUFNLENBQUNOLElBQUs7TUFBQVEsUUFBQSxFQUN4QkgsSUFBSSxDQUFDSSxHQUFHLENBQUMsVUFBQ0MsR0FBRyxFQUFFQyxDQUFDLEVBQUs7UUFDcEI7VUFBQTtVQUNFO1VBQ0FoQixJQUFBO1lBQUlZLFNBQVMsRUFBRUQsTUFBTSxDQUFDSixJQUFLO1lBQUFNLFFBQUEsRUFDeEJFO1VBQUcsUUFEOEJDLENBRWhDO1FBQUM7TUFFVCxDQUFDO0lBQUMsQ0FDQTtFQUFDLENBQ0YsQ0FBQztBQUVWIiwiaWdub3JlTGlzdCI6W119