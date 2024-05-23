import _extends from "@babel/runtime/helpers/extends";
import React, { useRef } from 'react';
import { Popover as GrafanaPopover, PopoverController } from '@grafana/ui';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function Popover(_ref) {
  var _children = _ref.children,
    content = _ref.content,
    overlayClassName = _ref.overlayClassName;
  var popoverRef = useRef(null);
  return /*#__PURE__*/_jsx(PopoverController, {
    content: content,
    hideAfter: 300,
    children: function children(showPopper, hidePopper, popperProps) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [popoverRef.current && /*#__PURE__*/_jsx(GrafanaPopover, _extends({}, popperProps, {
          referenceElement: popoverRef.current,
          wrapperClassName: overlayClassName,
          onMouseLeave: hidePopper,
          onMouseEnter: showPopper
        })), /*#__PURE__*/React.cloneElement(_children, {
          ref: popoverRef,
          onMouseEnter: showPopper,
          onMouseLeave: hidePopper
        })]
      });
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsInVzZVJlZiIsIlBvcG92ZXIiLCJHcmFmYW5hUG9wb3ZlciIsIlBvcG92ZXJDb250cm9sbGVyIiwianN4IiwiX2pzeCIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwianN4cyIsIl9qc3hzIiwiX3JlZiIsImNoaWxkcmVuIiwiY29udGVudCIsIm92ZXJsYXlDbGFzc05hbWUiLCJwb3BvdmVyUmVmIiwiaGlkZUFmdGVyIiwic2hvd1BvcHBlciIsImhpZGVQb3BwZXIiLCJwb3BwZXJQcm9wcyIsImN1cnJlbnQiLCJfZXh0ZW5kcyIsInJlZmVyZW5jZUVsZW1lbnQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwib25Nb3VzZUxlYXZlIiwib25Nb3VzZUVudGVyIiwiY2xvbmVFbGVtZW50IiwicmVmIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21tb24vUG9wb3Zlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBQb3BvdmVyIGFzIEdyYWZhbmFQb3BvdmVyLCBQb3BvdmVyQ29udHJvbGxlciB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuZXhwb3J0IHR5cGUgUG9wb3ZlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50O1xuICBjb250ZW50OiBSZWFjdEVsZW1lbnQ7XG4gIG92ZXJsYXlDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gUG9wb3Zlcih7IGNoaWxkcmVuLCBjb250ZW50LCBvdmVybGF5Q2xhc3NOYW1lIH06IFBvcG92ZXJQcm9wcykge1xuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50PihudWxsKTtcblxuICByZXR1cm4gKFxuICAgIDxQb3BvdmVyQ29udHJvbGxlciBjb250ZW50PXtjb250ZW50fSBoaWRlQWZ0ZXI9ezMwMH0+XG4gICAgICB7KHNob3dQb3BwZXIsIGhpZGVQb3BwZXIsIHBvcHBlclByb3BzKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtwb3BvdmVyUmVmLmN1cnJlbnQgJiYgKFxuICAgICAgICAgICAgICA8R3JhZmFuYVBvcG92ZXJcbiAgICAgICAgICAgICAgICB7Li4ucG9wcGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudD17cG9wb3ZlclJlZi5jdXJyZW50fVxuICAgICAgICAgICAgICAgIHdyYXBwZXJDbGFzc05hbWU9e292ZXJsYXlDbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtoaWRlUG9wcGVyfVxuICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17c2hvd1BvcHBlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHtcbiAgICAgICAgICAgICAgcmVmOiBwb3BvdmVyUmVmLFxuICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI6IHNob3dQb3BwZXIsXG4gICAgICAgICAgICAgIG9uTW91c2VMZWF2ZTogaGlkZVBvcHBlcixcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvPlxuICAgICAgICApO1xuICAgICAgfX1cbiAgICA8L1BvcG92ZXJDb250cm9sbGVyPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUEsT0FBT0EsS0FBSyxJQUFrQkMsTUFBTSxRQUFRLE9BQU87QUFFbkQsU0FBU0MsT0FBTyxJQUFJQyxjQUFjLEVBQUVDLGlCQUFpQixRQUFRLGFBQWE7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsUUFBQSxJQUFBQyxTQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQVEzRSxPQUFPLFNBQVNSLE9BQU9BLENBQUFTLElBQUEsRUFBd0Q7RUFBQSxJQUFyREMsU0FBUSxHQUFBRCxJQUFBLENBQVJDLFFBQVE7SUFBRUMsT0FBTyxHQUFBRixJQUFBLENBQVBFLE9BQU87SUFBRUMsZ0JBQWdCLEdBQUFILElBQUEsQ0FBaEJHLGdCQUFnQjtFQUMzRCxJQUFNQyxVQUFVLEdBQUdkLE1BQU0sQ0FBYyxJQUFJLENBQUM7RUFFNUMsb0JBQ0VLLElBQUEsQ0FBQ0YsaUJBQWlCO0lBQUNTLE9BQU8sRUFBRUEsT0FBUTtJQUFDRyxTQUFTLEVBQUUsR0FBSTtJQUFBSixRQUFBLEVBQ2pELFNBQUFBLFNBQUNLLFVBQVUsRUFBRUMsVUFBVSxFQUFFQyxXQUFXLEVBQUs7TUFDeEMsb0JBQ0VULEtBQUEsQ0FBQUYsU0FBQTtRQUFBSSxRQUFBLEdBQ0dHLFVBQVUsQ0FBQ0ssT0FBTyxpQkFDakJkLElBQUEsQ0FBQ0gsY0FBYyxFQUFBa0IsUUFBQSxLQUNURixXQUFXO1VBQ2ZHLGdCQUFnQixFQUFFUCxVQUFVLENBQUNLLE9BQVE7VUFDckNHLGdCQUFnQixFQUFFVCxnQkFBaUI7VUFDbkNVLFlBQVksRUFBRU4sVUFBVztVQUN6Qk8sWUFBWSxFQUFFUjtRQUFXLEVBQzFCLENBQ0YsZUFFQWpCLEtBQUssQ0FBQzBCLFlBQVksQ0FBQ2QsU0FBUSxFQUFFO1VBQzVCZSxHQUFHLEVBQUVaLFVBQVU7VUFDZlUsWUFBWSxFQUFFUixVQUFVO1VBQ3hCTyxZQUFZLEVBQUVOO1FBQ2hCLENBQUMsQ0FBQztNQUFBLENBQ0YsQ0FBQztJQUVQO0VBQUMsQ0FDZ0IsQ0FBQztBQUV4QiIsImlnbm9yZUxpc3QiOltdfQ==