import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3;
import { css, cx } from '@emotion/css';
import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../Theme';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    Divider: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      background: ", ";\n    "])), autoColor(theme, '#ddd')),
    DividerVertical: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: DividerVertical;\n      display: inline-block;\n      width: 1px;\n      height: 0.9em;\n      margin: 0 8px;\n      vertical-align: middle;\n    "]))),
    DividerHorizontal: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: DividerHorizontal;\n      display: block;\n      height: 1px;\n      width: 100%;\n      margin: 24px 0;\n      clear: both;\n      vertical-align: middle;\n      position: relative;\n      top: -0.06em;\n    "])))
  };
};
export function Divider(_ref) {
  var className = _ref.className,
    style = _ref.style,
    type = _ref.type;
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsx("div", {
    style: style,
    className: cx(styles.Divider, type === 'horizontal' ? styles.DividerHorizontal : styles.DividerVertical, className)
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsImpzeCIsIl9qc3giLCJnZXRTdHlsZXMiLCJ0aGVtZSIsIkRpdmlkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJEaXZpZGVyVmVydGljYWwiLCJfdGVtcGxhdGVPYmplY3QyIiwiRGl2aWRlckhvcml6b250YWwiLCJfdGVtcGxhdGVPYmplY3QzIiwiX3JlZiIsImNsYXNzTmFtZSIsInN0eWxlIiwidHlwZSIsInN0eWxlcyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vRGl2aWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi9UaGVtZSc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIERpdmlkZXI6IGNzc2BcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2RkZCcpfTtcbiAgICBgLFxuXG4gICAgRGl2aWRlclZlcnRpY2FsOiBjc3NgXG4gICAgICBsYWJlbDogRGl2aWRlclZlcnRpY2FsO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgd2lkdGg6IDFweDtcbiAgICAgIGhlaWdodDogMC45ZW07XG4gICAgICBtYXJnaW46IDAgOHB4O1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBgLFxuXG4gICAgRGl2aWRlckhvcml6b250YWw6IGNzc2BcbiAgICAgIGxhYmVsOiBEaXZpZGVySG9yaXpvbnRhbDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbjogMjRweCAwO1xuICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiAtMC4wNmVtO1xuICAgIGAsXG4gIH07XG59O1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgdHlwZT86ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCc7XG59XG5leHBvcnQgZnVuY3Rpb24gRGl2aWRlcih7IGNsYXNzTmFtZSwgc3R5bGUsIHR5cGUgfTogUHJvcHMpIHtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHN0eWxlcy5EaXZpZGVyLFxuICAgICAgICB0eXBlID09PSAnaG9yaXpvbnRhbCcgPyBzdHlsZXMuRGl2aWRlckhvcml6b250YWwgOiBzdHlsZXMuRGl2aWRlclZlcnRpY2FsLFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgLz5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxHQUFHLEVBQUVDLEVBQUUsUUFBUSxjQUFjO0FBQ3RDLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBR3pCLFNBQVNDLFVBQVUsUUFBUSxhQUFhO0FBRXhDLFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRXJDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJQyxLQUFvQixFQUFLO0VBQzFDLE9BQU87SUFDTEMsT0FBTyxFQUFFVCxHQUFHLENBQUFVLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQSx3Q0FDSVAsU0FBUyxDQUFDSSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQ3ZDO0lBRURJLGVBQWUsRUFBRVosR0FBRyxDQUFBYSxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBRiwyQkFBQSx5S0FPbkI7SUFFREcsaUJBQWlCLEVBQUVkLEdBQUcsQ0FBQWUsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUosMkJBQUE7RUFXeEIsQ0FBQztBQUNILENBQUM7QUFPRCxPQUFPLFNBQVNGLE9BQU9BLENBQUFPLElBQUEsRUFBb0M7RUFBQSxJQUFqQ0MsU0FBUyxHQUFBRCxJQUFBLENBQVRDLFNBQVM7SUFBRUMsS0FBSyxHQUFBRixJQUFBLENBQUxFLEtBQUs7SUFBRUMsSUFBSSxHQUFBSCxJQUFBLENBQUpHLElBQUk7RUFDOUMsSUFBTUMsTUFBTSxHQUFHakIsVUFBVSxDQUFDSSxTQUFTLENBQUM7RUFDcEMsb0JBQ0VELElBQUE7SUFDRVksS0FBSyxFQUFFQSxLQUFNO0lBQ2JELFNBQVMsRUFBRWhCLEVBQUUsQ0FDWG1CLE1BQU0sQ0FBQ1gsT0FBTyxFQUNkVSxJQUFJLEtBQUssWUFBWSxHQUFHQyxNQUFNLENBQUNOLGlCQUFpQixHQUFHTSxNQUFNLENBQUNSLGVBQWUsRUFDekVLLFNBQ0Y7RUFBRSxDQUNILENBQUM7QUFFTiIsImlnbm9yZUxpc3QiOltdfQ==